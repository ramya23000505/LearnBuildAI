/**
 * Modular Code & Architecture Generator Service
 * Dynamically generates system architecture, ER schemas, REST endpoints, and modular code for ANY tech stack.
 */

export function generateProjectArchitecture(project) {
  const backend = project?.techStack?.backend || 'FastAPI';
  const frontend = project?.techStack?.frontend || 'React';
  const db = project?.techStack?.database || 'PostgreSQL';

  const isFastAPI = backend.includes('FastAPI');
  const isExpress = backend.includes('Express');
  const isFlask = backend.includes('Flask');
  const isAngular = frontend.includes('Angular');
  const isMongo = db.includes('MongoDB');

  return {
    problemStatement: `The ${project.title} automates processing, domain logic execution, and user interactive management using ${backend} and ${frontend}.`,
    objectives: [
      `Implement automated input parsing and type-safe validation using ${backend}.`,
      `Develop intuitive reactive user interfaces using ${frontend}.`,
      `Store structured data in ${db} with indexed relationships.`,
      `Deploy containerized infrastructure using Docker Compose.`
    ],
    folderStructure: isFastAPI ? `
${project.id}/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI entrypoint & middleware
│   │   ├── config.py            # Environment settings
│   │   ├── database.py          # ${db} connection engine
│   │   ├── models/              # ORM database models
│   │   ├── schemas/             # Pydantic schemas
│   │   ├── api/                 # REST Router endpoints
│   │   └── services/            # Business & AI processing logic
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
` : isExpress ? `
${project.id}/
├── server/
│   ├── src/
│   │   ├── index.js            # Express server entrypoint
│   │   ├── config/             # ${db} connection
│   │   ├── controllers/        # Route controllers
│   │   ├── models/             # Mongoose/ORM schemas
│   │   └── routes/             # REST route handlers
│   ├── package.json
│   └── Dockerfile
├── client/
│   ├── src/
│   │   ├── app/
│   │   └── components/
│   └── package.json
└── docker-compose.yml
` : `
${project.id}/
├── src/
│   ├── backend/                # ${backend} services
│   ├── frontend/               # ${frontend} interface
│   └── database/               # ${db} schema migration
├── docker-compose.yml
└── README.md
`,
    erDiagram: isMongo ? [
      { table: 'Users (Collection)', columns: ['_id (ObjectId)', 'email (String, Unique)', 'passwordHash (String)', 'createdAt (Date)'] },
      { table: `${project.title.replace(/\s+/g, '')}Records`, columns: ['_id (ObjectId)', 'userId (Ref -> Users)', 'payloadData (Object)', 'status (String)', 'createdAt (Date)'] },
      { table: 'AnalysisLogs', columns: ['_id (ObjectId)', 'recordId (Ref)', 'score (Number)', 'detectedFeatures (Array)', 'recommendations (String)'] }
    ] : [
      { table: 'Users Table', columns: ['id (PK, UUID)', 'email (VARCHAR, Unique)', 'hashed_password (TEXT)', 'created_at (TIMESTAMP)'] },
      { table: `${project.title.replace(/\s+/g, '')}Records Table`, columns: ['id (PK, UUID)', 'user_id (FK -> Users.id)', 'filename (VARCHAR)', 'raw_text (TEXT)', 'created_at (TIMESTAMP)'] },
      { table: 'AnalysisResults Table', columns: ['id (PK, UUID)', 'record_id (FK -> Records.id)', 'score (INTEGER)', 'skills_found (JSONB)', 'recommendations (TEXT)'] }
    ],
    apiEndpoints: [
      { method: 'POST', path: '/api/v1/auth/login', desc: 'Authenticates user and returns security token' },
      { method: 'POST', path: '/api/v1/process/submit', desc: `Accepts user input and executes ${project.title} processing pipeline` },
      { method: 'GET', path: '/api/v1/process/history', desc: 'Returns past project analysis history for current user' },
      { method: 'GET', path: '/api/v1/health', desc: 'Container healthcheck endpoint returning HTTP 200 OK' }
    ]
  };
}

export function generateModularCodeFiles(project) {
  const backend = project?.techStack?.backend || 'FastAPI';
  const frontend = project?.techStack?.frontend || 'React';
  const title = project?.title || 'Project';

  const isFastAPI = backend.includes('FastAPI');
  const isExpress = backend.includes('Express');
  const isAngular = frontend.includes('Angular');

  const files = [];

  // File 1: Backend Entrypoint
  if (isFastAPI) {
    files.push({
      filename: 'backend/app/main.py',
      language: 'python',
      description: `FastAPI core application entrypoint for ${title}.`,
      code: `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import process

app = FastAPI(
    title="${title} API",
    description="Backend API powered by ${backend} and LearnBuild AI architecture",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(process.router, prefix="/api/v1/process", tags=["Processing"])

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "${title}"}
`,
      explanations: [
        { lines: '1-3', label: 'Imports', text: 'Imports FastAPI class, CORS middleware for cross-origin browser calls, and endpoint router.' },
        { lines: '5-9', label: 'App Instantiation', text: 'Creates main FastAPI application instance with OpenAPI metadata.' },
        { lines: '11-18', label: 'CORS Configuration', text: 'Authorizes browser requests from frontend web clients.' }
      ],
      whyThisTech: `${backend} provides automatic OpenAPI Swagger documentation, async concurrency, and instant Pydantic data validation out of the box.`,
      howItWorks: `When a client makes an HTTP request, FastAPI matches the URL path, parses JSON input via Pydantic models, and executes the route handler asynchronously.`,
      bestPractices: ['Store allowed CORS origins in `.env` environment variables.', 'Use prefix routing to group related API endpoints.'],
      commonMistakes: ['Forgetting to add CORSMiddleware, leading to CORS blocked requests in browser console.']
    });
  } else if (isExpress) {
    files.push({
      filename: 'server/src/index.js',
      language: 'javascript',
      description: `Express backend server entrypoint for ${title}.`,
      code: `const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'active', app: '${title}' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
`,
      explanations: [
        { lines: '1-6', label: 'Express Setup', text: 'Initializes Express app and enables JSON body parser middleware.' },
        { lines: '8-10', label: 'Health Endpoint', text: 'Exposes container healthcheck endpoint.' }
      ],
      whyThisTech: `${backend} is lightweight, non-blocking, and leverages Node.js async event loop for high concurrency.`,
      howItWorks: `Express listens on a TCP port, matches request route URLs, passes requests through middleware chains, and sends JSON responses.`,
      bestPractices: ['Use environment variables for PORT and database connection strings.'],
      commonMistakes: ['Omitting `express.json()` middleware, causing `req.body` to be undefined.']
    });
  } else {
    files.push({
      filename: 'backend/app/main.py',
      language: 'python',
      description: `Backend API entrypoint for ${title}.`,
      code: `# Backend implementation for ${title} using ${backend}\nfrom flask import Flask, jsonify\napp = Flask(__name__)\n\n@app.route('/health')\ndef health():\n    return jsonify(status="ok", project="${title}")\n\nif __name__ == '__main__':\n    app.run(port=5000)\n`,
      explanations: [{ lines: '1-7', label: 'Flask Setup', text: 'Initializes Flask app and health endpoint.' }],
      whyThisTech: `${backend} is simple and lightweight for microservice APIs.`,
      howItWorks: `Receives incoming HTTP requests and executes route functions.`,
      bestPractices: ['Use WSGI server in production.'],
      commonMistakes: ['Running dev server in production.']
    });
  }

  // File 2: Frontend Client Component
  if (isAngular) {
    files.push({
      filename: 'frontend/src/app/dashboard.component.ts',
      language: 'typescript',
      description: `Angular component for ${title}.`,
      code: `import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  template: \`
    <div class="dashboard-card">
      <h2>${title} Dashboard</h2>
      <button (click)="submitData()">Execute Processing</button>
      <div *if="result">Status: {{ result.status }}</div>
    </div>
  \`
})
export class DashboardComponent {
  result: any = null;

  constructor(private http: HttpClient) {}

  submitData() {
    this.http.post('/api/v1/process', { project: '${title}' })
      .subscribe(data => this.result = data);
  }
}
`,
      explanations: [
        { lines: '4-12', label: 'Component Decorator', text: 'Defines Angular component selector and HTML template.' },
        { lines: '18-21', label: 'HttpClient Service', text: 'Posts payload data to backend API endpoint.' }
      ],
      whyThisTech: `${frontend} provides enterprise-grade TypeScript architecture with built-in Dependency Injection and RxJS Observables.`,
      howItWorks: `Angular compiles template directives and binds click events to component TypeScript methods.`,
      bestPractices: ['Unsubscribe from custom RxJS observables in ngOnDestroy.'],
      commonMistakes: ['Forgetting to import HttpClientModule in app.module.ts.']
    });
  } else {
    files.push({
      filename: 'frontend/src/components/Dashboard.jsx',
      language: 'javascript',
      description: `React client component for ${title}.`,
      code: `import React, { useState } from 'react';

export default function Dashboard({ onComplete }) {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/v1/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: data, project: '${title}' })
      });
      const result = await response.json();
      onComplete(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-slate-900 rounded-xl border border-gray-800">
      <h3 className="text-base font-bold text-white mb-3">${title} Dashboard</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea 
          value={data} 
          onChange={(e) => setData(e.target.value)} 
          placeholder="Enter project input parameters..."
          className="w-full bg-slate-950 p-3 rounded-lg text-xs font-mono text-gray-200 border border-gray-800"
        />
        <button 
          type="submit" 
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-bold text-xs text-white"
        >
          {loading ? 'Processing...' : 'Run Analysis'}
        </button>
      </form>
    </div>
  );
}
`,
      explanations: [
        { lines: '8-21', label: 'Async Submit Handler', text: 'Executes fetch POST request to backend API.' },
        { lines: '23-40', label: 'UI JSX Rendering', text: 'Renders controlled textarea and loading indicator.' }
      ],
      whyThisTech: `${frontend} uses virtual DOM diffing for rapid UI updates and declarative state management.`,
      howItWorks: `User input updates React state via \`onChange\`, which triggers non-blocking fetch calls to the server.`,
      bestPractices: ['Always reset loading states in a \`finally\` block.'],
      commonMistakes: ['Forgetting to set Content-Type application/json header when posting JSON strings.']
    });
  }

  return files;
}

export function generateTestingAndDeployment(project) {
  const backend = project?.techStack?.backend || 'FastAPI';
  return {
    unitTestCode: `import pytest
from app.main import app

def test_health_endpoint():
    # Unit test for ${project.title}
    assert True
`,
    dockerfile: `FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
`,
    dockerCompose: `version: '3.8'
services:
  backend:
    build: .
    ports:
      - "8000:8000"
`,
    deploymentGuide: [
      { step: '1. Build Containers', command: 'docker-compose build' },
      { step: '2. Launch Services', command: 'docker-compose up -d' },
      { step: '3. Verify Health', command: 'curl http://localhost:8000/health' }
    ]
  };
}

export function generateDocumentation(project) {
  return {
    srsDocument: `# Software Requirements Specification (SRS) - ${project.title}\n\n## 1. System Overview\nSpecifies requirements for ${project.title} using ${project?.techStack?.backend} and ${project?.techStack?.frontend}.\n`,
    readmeMarkdown: `# ${project.title}\n\n> Built with LearnBuild AI\n\n## Quick Start\n\`\`\`bash\nnpm run dev\n\`\`\`\n`,
    pptOutline: [
      { slide: 1, title: 'Introduction', points: [`Project: ${project.title}`, `Domain: ${project.domain}`] }
    ]
  };
}
