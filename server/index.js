import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'learnbuild_super_secret_jwt_key_2026';

// Middleware
app.use(cors());
app.use(express.json());

// Persistent Data File Database Path
const DB_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Ensure DB Directory & File Exist
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

function loadDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading db.json, initializing fresh database:', e);
  }
  return { users: [], userData: {} };
}

function saveDB(db) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving db.json:', e);
  }
}

// Authentication Verification Middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
}

// ---------------------------------------------------------------------------
// REST API ENDPOINTS
// ---------------------------------------------------------------------------

// Welcome Root & /api Route Handler
app.get(['/', '/api'], (req, res) => {
  res.json({
    status: 'ok',
    message: 'LearnBuild AI Express REST API Server Running',
    health: '/api/health',
    endpoints: {
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      resetPassword: 'POST /api/auth/reset-password',
      me: 'GET /api/auth/me',
      userData: 'GET /api/user/data',
      userSync: 'POST /api/user/sync'
    }
  });
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'LearnBuild AI Backend REST API Server Running', timestamp: new Date() });
});

// Register Endpoint (User Signup)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const db = loadDB();
    const existing = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = `usr_${Date.now()}`;
    const newUser = {
      id: userId,
      name: name || email.split('@')[0],
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    saveDB(db);

    const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (e) {
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// Login Endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const db = loadDB();
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (e) {
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Reset Password Endpoint (Forgot Password Workflow)
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ error: 'Email and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const db = loadDB();
    const userIndex = db.users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
    if (userIndex === -1) {
      return res.status(404).json({ error: 'No account found with this email address' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.users[userIndex].password = hashedPassword;
    db.users[userIndex].updatedAt = new Date().toISOString();
    saveDB(db);

    const user = db.users[userIndex];
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Password reset successfully! You are now logged in.',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (e) {
    res.status(500).json({ error: 'Server error during password reset' });
  }
});

// Get Current Profile
app.get('/api/auth/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

// Get User Saved Data (Keyed by userId)
app.get('/api/user/data', verifyToken, (req, res) => {
  const db = loadDB();
  const userData = db.userData[req.user.id] || {
    activeProject: null,
    assessmentHistory: [],
    completedModules: ['FastAPI'],
    unlockedStep: 1
  };
  res.json({ data: userData });
});

// Sync User Data
app.post('/api/user/sync', verifyToken, (req, res) => {
  const { activeProject, assessmentHistory, completedModules, unlockedStep } = req.body;
  const db = loadDB();

  const prevStep = db.userData[req.user.id]?.unlockedStep || 1;
  const nextUnlocked = Math.max(prevStep, unlockedStep || 1);

  db.userData[req.user.id] = {
    activeProject: activeProject || db.userData[req.user.id]?.activeProject || null,
    assessmentHistory: assessmentHistory || db.userData[req.user.id]?.assessmentHistory || [],
    completedModules: completedModules || db.userData[req.user.id]?.completedModules || ['FastAPI'],
    unlockedStep: nextUnlocked,
    updatedAt: new Date().toISOString()
  };

  saveDB(db);
  res.json({ message: 'User data synced successfully', data: db.userData[req.user.id] });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 LearnBuild AI REST API Server running on http://localhost:${PORT}`);
});
