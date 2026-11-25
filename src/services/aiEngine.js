import { PRESET_PROJECTS } from '../data/sampleProjects';
import { generateFullIntelligenceModel } from './intelligenceEngine';

/**
 * Analyzes any custom or preset project prompt dynamically using the Global Problem-to-Technology-to-Learning Intelligence Engine
 */
export function analyzeProject(promptText, selectedDomain = 'swe', mode = 'academic') {
  const cleanPrompt = promptText.trim().toLowerCase();
  
  const match = PRESET_PROJECTS.find(p => 
    cleanPrompt === p.title.toLowerCase()
  );

  if (match) {
    const full = generateFullIntelligenceModel(match.title, match.domainId, mode);
    if (match.techStack) {
      full.techStack = { ...full.techStack, ...match.techStack };
    }
    if (match.description) {
      full.description = match.description;
      full.summary = match.description;
    }
    return full;
  }

  return generateDynamicProjectStructure(promptText, selectedDomain, null, mode);
}

/**
 * Truly Dynamic Project Generator - builds complete tech stack & essential concepts for any prompt via Global Intelligence Engine
 */
export function generateDynamicProjectStructure(promptText, domainId = 'swe', customDesc = null, mode = 'academic') {
  const fullModel = generateFullIntelligenceModel(promptText, domainId, mode);
  if (customDesc) {
    fullModel.description = customDesc;
    fullModel.summary = customDesc;
  }
  return fullModel;
}


function getTechArray(lang, back, front, db, cont, ai) {
  const arr = [
    lang.split(' ')[0],
    back.split(' ')[0],
    front.split(' ')[0],
    db.split(' ')[0],
    cont
  ];
  if (ai && ai !== 'N/A') arr.push(ai.split(' ')[0]);
  return arr;
}

/**
 * Dynamically extracts Must-Learn vs Skipped Concepts based on current active tech stack
 */
export function extractEssentialConceptsForStack(techStack, projectTitle = 'Project') {
  const concepts = [];

  // Backend
  const backend = techStack.backend || 'FastAPI';
  if (backend.includes('FastAPI')) {
    concepts.push({
      tech: 'FastAPI',
      mustLearn: ['Routing & Path Parameters', 'Request Body (Pydantic)', 'Response Models & Status Codes', 'Multipart File Uploads', 'CRUD API Endpoints'],
      skipped: ['Custom WebSockets', 'Background Celery Tasks', 'OAuth2 SSO Middleware', 'Low-level Async Drivers']
    });
  } else if (backend.includes('Express')) {
    concepts.push({
      tech: 'Express.js',
      mustLearn: ['REST Endpoint Routes', 'JSON Body Parsing', 'JWT Auth Middleware', 'Mongoose Integration', 'Error Handlers'],
      skipped: ['Cluster Mode Multithreading', 'gRPC Services', 'Custom Stream Piping', 'Low-level Socket Parsers']
    });
  } else if (backend.includes('Flask')) {
    concepts.push({
      tech: 'Flask',
      mustLearn: ['App Routes & Decorators', 'JSON Request Handling', 'Model Loading (Pickle/Joblib)', 'CORS Configuration'],
      skipped: ['Flask Blueprints Architecture', 'Celery Async Queues', 'Flask Admin Extensions']
    });
  } else {
    concepts.push({
      tech: backend.split(' ')[0],
      mustLearn: ['Routing & Controller Endpoints', 'Request Body Validation', 'Database ORM Integration', 'Error Handling'],
      skipped: ['Custom WebSockets', 'OAuth2 SSO', 'Background Queue Workers']
    });
  }

  // Frontend
  const frontend = techStack.frontend || 'React';
  if (frontend.includes('React')) {
    concepts.push({
      tech: 'React',
      mustLearn: ['JSX & Component Hierarchy', 'useState & useEffect hooks', 'API Data Fetching (Fetch/Axios)', 'Controlled Form Inputs'],
      skipped: ['Redux Toolkit', 'Server Components (RSC)', 'Micro-frontends', 'Custom WebGL Shaders']
    });
  } else if (frontend.includes('Angular')) {
    concepts.push({
      tech: 'Angular',
      mustLearn: ['TypeScript Components & Templates', 'Services & Dependency Injection', 'HttpClient Module API calls', 'Reactive Forms'],
      skipped: ['NgRx Store State Management', 'Custom Angular Directives', 'Zone.js Optimization', 'SSR Universal Engine']
    });
  } else if (frontend.includes('Vue')) {
    concepts.push({
      tech: 'Vue.js',
      mustLearn: ['Vue SFC (.vue files)', 'ref() and reactive() State', 'Axios API Client', 'v-model Form Binding'],
      skipped: ['Pinia Global Store', 'Custom Directives', 'Vue SSR Hydration']
    });
  } else {
    concepts.push({
      tech: frontend.split(' ')[0],
      mustLearn: ['Component Architecture', 'State Management', 'API Data Fetching', 'Form Submissions'],
      skipped: ['Micro-frontends', 'Custom Renderers', 'Service Workers']
    });
  }

  // AI Models / Vector DB or ML
  if (techStack.aiModels && techStack.aiModels !== 'N/A') {
    if (techStack.aiModels.includes('LangChain') || techStack.aiModels.includes('FAISS')) {
      concepts.push({
        tech: 'LangChain & FAISS',
        mustLearn: ['Document Loading (PyPDF)', 'Text Chunking (RecursiveSplitter)', 'FAISS In-Memory Vector Store', 'Cosine Similarity Search'],
        skipped: ['LangGraph Multi-Agent Workflows', 'Custom Embeddings Training', 'Graph Vector Databases']
      });
    } else if (techStack.aiModels.includes('TensorFlow') || techStack.aiModels.includes('CNN')) {
      concepts.push({
        tech: 'TensorFlow & CNN',
        mustLearn: ['ImageDataGenerator & Preprocessing', 'Convolutional & Pooling Layers', 'Transfer Learning (ResNet50)', 'Categorical Crossentropy Loss'],
        skipped: ['Custom CUDA C++ Kernels', 'Generative Adversarial Networks (GANs)', '3D Spatial Volume Rendering']
      });
    } else if (techStack.aiModels.includes('Scikit-Learn') || techStack.aiModels.includes('TF-IDF')) {
      concepts.push({
        tech: 'NLP & Scikit-Learn',
        mustLearn: ['Text Preprocessing (Stopwords/Stemming)', 'TF-IDF Vectorization Matrix', 'Train/Test Dataset Splitting', 'Model Evaluation & Pickling'],
        skipped: ['Transformer fine-tuning (BERT)', 'Custom Attention Layers', 'Word2Vec Training']
      });
    }
  }

  // Database
  const db = techStack.database || 'PostgreSQL';
  if (db.includes('PostgreSQL')) {
    concepts.push({
      tech: 'PostgreSQL',
      mustLearn: ['Relational Schema Tables', 'Primary & Foreign Keys', 'SQLAlchemy / ORM Mapping', 'Index Optimization'],
      skipped: ['PostgreSQL Replication Clusters', 'Partitioning Tables across 100+ Nodes', 'Custom C Extensions']
    });
  } else if (db.includes('MongoDB')) {
    concepts.push({
      tech: 'MongoDB',
      mustLearn: ['Document Collections & BSON', 'Mongoose Schemas', 'CRUD Queries & Population', 'Basic Indexing'],
      skipped: ['Sharded Database Clusters', 'Complex Aggregation Pipelines (>10 stages)', 'GridFS Distributed Storage']
    });
  } else {
    concepts.push({
      tech: db.split(' ')[0],
      mustLearn: ['Schema Design', 'CRUD Operations', 'Basic Indexing'],
      skipped: ['Sharded Database Clusters', 'Complex Replication Sets']
    });
  }

  // Docker
  concepts.push({
    tech: 'Docker',
    mustLearn: ['Dockerfile Syntax (FROM, WORKDIR, COPY, RUN, CMD)', 'Environment Variable Injection', 'docker-compose.yml Services'],
    skipped: ['Kubernetes Helm Charts', 'Multi-Stage Build Optimization', 'Production Swarm Clusters']
  });

  return concepts;
}

/**
 * ADAPTIVE TECH STACK SWAPPER
 */
export function swapProjectTechnology(project, category, newTech) {
  const updated = { ...project, techStack: { ...project.techStack } };

  if (category === 'frontend') {
    updated.techStack.frontend = newTech;
  } else if (category === 'backend') {
    updated.techStack.backend = newTech;
  } else if (category === 'database') {
    updated.techStack.database = newTech;
  } else if (category === 'aiModels') {
    updated.techStack.aiModels = newTech;
  } else if (category === 'language') {
    updated.techStack.language = newTech;
  }

  updated.technologies = getTechArray(
    updated.techStack.language,
    updated.techStack.backend,
    updated.techStack.frontend,
    updated.techStack.database,
    updated.techStack.container,
    updated.techStack.aiModels
  );

  updated.essentialConcepts = extractEssentialConceptsForStack(updated.techStack, updated.title);
  return updated;
}

function getDomainName(id) {
  const map = {
    swe: 'Software Engineering',
    ml: 'Machine Learning',
    dl: 'Deep Learning',
    nlp: 'NLP',
    ds: 'Data Science',
    genai: 'Generative AI'
  };
  return map[id] || 'Software Engineering';
}

/**
 * Calculates student project readiness score
 */
export function calculateReadinessScore(assessmentAnswers, completedModules = [], project = null) {
  const requiredTechs = project?.essentialConcepts?.map(c => c.tech) || ['FastAPI', 'React', 'PostgreSQL', 'Docker'];

  const techScores = {};
  let totalTechScore = 0;

  requiredTechs.forEach((tech) => {
    const answers = assessmentAnswers ? assessmentAnswers[tech] : null;
    let scorePct = 0;

    if (answers && answers.length > 0) {
      let correct = 0;
      answers.forEach(a => { if (a.isCorrect) correct++; });
      scorePct = Math.round((correct / answers.length) * 100);
    }

    if (completedModules.includes(tech)) {
      scorePct = Math.min(100, scorePct + 35);
    }

    techScores[tech] = scorePct;
    totalTechScore += scorePct;
  });

  const finalOverall = Math.round(totalTechScore / (requiredTechs.length || 1));

  let grade = 'F';
  if (finalOverall >= 90) grade = 'A+';
  else if (finalOverall >= 80) grade = 'A';
  else if (finalOverall >= 70) grade = 'B';
  else if (finalOverall >= 60) grade = 'C';

  const breakdown = Object.entries(techScores).map(([tech, score]) => ({
    tech,
    score,
    status: score >= 80 ? 'Mastered' : score >= 50 ? 'Good Progress' : 'Not Studied / Learning Required'
  }));

  let verdict = 'Needs Preparation';
  let recommendation = 'Complete the Phase 1 essential modules and diagnostics before starting development.';

  if (finalOverall >= 80) {
    verdict = 'Ready to Build!';
    recommendation = 'Excellent! You have mastered the core essential concepts. You can safely unlock Phase 2 Development.';
  } else if (finalOverall >= 60) {
    verdict = 'Sufficiently Prepared';
    recommendation = 'You possess baseline fundamentals. Complete remaining weak modules to maximize your confidence.';
  }

  return {
    overallScore: finalOverall,
    grade,
    breakdown,
    verdict,
    recommendation
  };
}

/**
 * Generates adaptive study schedule
 */
export function generateAdaptiveRoadmap(project, hoursPerDay = 2, targetDays = 14, missedDays = 0) {
  const techs = project?.essentialConcepts || [];
  const effectiveDays = Math.max(3, targetDays - missedDays);
  const weeksCount = Math.ceil(effectiveDays / 7);
  const totalHours = hoursPerDay * effectiveDays;

  const weeklyPlan = [];

  let currentDay = 1;
  techs.forEach((c, idx) => {
    const weekNum = Math.min(weeksCount, Math.floor(idx / 2) + 1);
    const allocatedHours = Math.round(totalHours / (techs.length || 1));
    
    if (!weeklyPlan[weekNum - 1]) {
      weeklyPlan[weekNum - 1] = {
        week: weekNum,
        title: `Phase ${weekNum}: ${c.tech} & Core Foundations`,
        hours: 0,
        items: []
      };
    }

    weeklyPlan[weekNum - 1].items.push({
      technology: c.tech,
      mustLearn: c.mustLearn,
      estimatedHours: allocatedHours,
      dayRange: `Day ${currentDay} - Day ${currentDay + Math.max(1, Math.floor(effectiveDays / (techs.length || 1)))}`
    });

    weeklyPlan[weekNum - 1].hours += allocatedHours;
    currentDay += Math.max(1, Math.floor(effectiveDays / (techs.length || 1)));
  });

  return {
    totalHours,
    hoursPerDay,
    targetDays: effectiveDays,
    missedDays,
    weeklyPlan
  };
}

/**
 * 50 PROJECT QUESTIONS ORGANIZED BY 5 CATEGORIES (10 QUESTIONS PER CATEGORY)
 */
export function generate50CategorizedQuestions(project) {
  const title = project?.title || 'Selected Project';
  const backend = project?.techStack?.backend || 'FastAPI';
  const frontend = project?.techStack?.frontend || 'React';
  const db = project?.techStack?.database || 'PostgreSQL';

  const bName = backend.split(' ')[0];
  const fName = frontend.split(' ')[0];
  const dbName = db.split(' ')[0];

  // 10 Backend Questions
  const backendQuestions = [
    {
      category: bName,
      question: `In ${title}, how does the ${bName} backend define HTTP POST routes for creating new records?`,
      correctOption: `By registering endpoint route handlers (e.g. app.post or @app.post) mapped to URI paths`,
      distractors: [
        'By writing direct SQL queries in frontend HTML files',
        'By modifying browser window.location properties',
        'Using unvalidated raw socket buffers without HTTP headers'
      ],
      skill: `${bName} REST Endpoint Routing`,
      explanation: `${bName} uses route decorators or router methods to bind HTTP verbs to specific controller functions.`
    },
    {
      category: bName,
      question: `Why is schema validation essential for incoming request payloads in ${title}?`,
      correctOption: `To validate parameter types before business logic executes, preventing 500 crashes and malformed data`,
      distractors: [
        'To automatically compress image files on client browsers',
        'To speed up CPU clock cycles',
        'To eliminate database storage requirements'
      ],
      skill: `${bName} Input Validation`,
      explanation: 'Schema validation catches missing fields and invalid types at the API gateway layer.'
    },
    {
      category: bName,
      question: `Which HTTP status code should ${title}'s ${bName} server return upon successfully creating a database resource?`,
      correctOption: '201 Created',
      distractors: ['404 Not Found', '500 Internal Server Error', '301 Moved Permanently'],
      skill: 'REST Status Codes',
      explanation: 'HTTP 201 Created explicitly indicates successful creation of a new server resource.'
    },
    {
      category: bName,
      question: `How does ${bName} process incoming JSON request bodies sent from ${title}'s web interface?`,
      correctOption: `Using body parsing middleware (e.g. express.json() or Pydantic models) to deserialize JSON strings`,
      distractors: [
        'By storing raw string text in global CSS variables',
        'By executing eval() on raw socket streams',
        'By writing plain text directly to the hard drive'
      ],
      skill: 'JSON Body Parsing',
      explanation: 'Body parsing middleware buffers incoming data streams and deserializes JSON into native objects.'
    },
    {
      category: bName,
      question: `When accepting binary file uploads (PDFs/Images) in ${title}, which encoding format must the client use?`,
      correctOption: 'multipart/form-data wrapped in a FormData object',
      distractors: ['application/x-www-form-urlencoded', 'text/plain', 'application/graphql'],
      skill: 'API File Uploads',
      explanation: '`multipart/form-data` is the standard encoding for transmitting binary file payloads over HTTP.'
    },
    {
      category: bName,
      question: `How does JWT authentication middleware protect private routes in ${title}?`,
      correctOption: `By inspecting the HTTP Authorization header for a valid Bearer token before calling next()`,
      distractors: [
        'By checking the client computer IP address against a hardcoded list',
        'By prompting the user for their password on every HTTP request',
        'By disabling HTTPS encryption'
      ],
      skill: 'JWT Authentication',
      explanation: 'JWT middleware cryptographically verifies token signatures without querying database sessions.'
    },
    {
      category: bName,
      question: `Why should asynchronous non-blocking I/O functions (async/await) be used in ${title}'s backend?`,
      correctOption: `To allow the server event loop to handle other concurrent requests while waiting for database queries`,
      distractors: [
        'To force the server CPU to pause execution for 5 seconds',
        'To reduce internet bandwidth costs',
        'Because JavaScript requires async syntax for all mathematical calculations'
      ],
      skill: 'Asynchronous Programming',
      explanation: 'Non-blocking async handlers prevent I/O operations from blocking Node/Python single-threaded event loops.'
    },
    {
      category: bName,
      question: `How does CORS (Cross-Origin Resource Sharing) middleware protect ${title}?`,
      correctOption: `By explicitly specifying authorized frontend origins (e.g. http://localhost:5173) allowed to make fetch calls`,
      distractors: [
        'By blocking all incoming HTTP GET requests from all users',
        'By encrypting database passwords in memory',
        'By compressing HTML output files'
      ],
      skill: 'CORS Security',
      explanation: 'CORS policies instruct web browsers to permit or restrict cross-origin network requests.'
    },
    {
      category: bName,
      question: `What is the role of global error handling middleware in ${title}?`,
      correctOption: `To catch uncaught runtime exceptions centrally and return structured JSON error objects to the client`,
      distractors: [
        'To restart the physical computer when an error occurs',
        'To delete failing source code files automatically',
        'To send SMS text messages to developers'
      ],
      skill: 'Centralized Error Handling',
      explanation: 'Global error middleware prevents server process crashes by catching unhandled promise rejections.'
    },
    {
      category: bName,
      question: `How are environment configuration variables (like DATABASE_URL or JWT_SECRET) safely managed in ${title}?`,
      correctOption: `By loading them from process.env or .env files rather than hardcoding secret keys in source code`,
      distractors: [
        'By publishing passwords in public GitHub README files',
        'By embedding secret keys directly inside frontend CSS files',
        'By storing credentials in browser local storage'
      ],
      skill: 'Environment Configuration',
      explanation: 'Environment variables isolate secret keys from source code, preventing security leaks.'
    }
  ];

  // 10 Frontend Questions
  const frontendQuestions = [
    {
      category: fName,
      question: `In ${title}, how does ${fName} combine markup structure and component logic?`,
      correctOption: `Using JSX / template syntax that combines component state and HTML markup inside reusable functions`,
      distractors: [
        'By writing direct string concatenation in global window variables',
        'Using innerHTML injections without state binding',
        'By compiling HTML directly into C++ binaries'
      ],
      skill: `${fName} Component Architecture`,
      explanation: 'JSX allows developers to write HTML-like component templates backed by reactive JavaScript state.'
    },
    {
      category: fName,
      question: `Which React hook manages local mutable component state for ${title}'s interactive dashboard views?`,
      correctOption: 'useState() hook',
      distractors: ['useEffect() hook', 'useRef() hook', 'useContext() hook'],
      skill: 'React State Management',
      explanation: '`useState` preserves local component state variables across component re-renders.'
    },
    {
      category: fName,
      question: `How does ${fName} trigger initial data fetching when a dashboard view mounts in ${title}?`,
      correctOption: `Using useEffect() with an empty dependency array [] to run fetch calls on component mount`,
      distractors: [
        'By creating an infinite while(true) loop inside component body',
        'By reloading the entire web browser every 2 seconds',
        'Using document.onload event handlers in index.html'
      ],
      skill: 'React Lifecycle & Hooks',
      explanation: '`useEffect` with `[]` executes side-effects once after the initial component DOM mount.'
    },
    {
      category: fName,
      question: `How does ${title}'s ${fName} client send form data to backend REST API endpoints asynchronously?`,
      correctOption: 'Using async/await fetch() or Axios HTTP client calls',
      distractors: [
        'By performing full browser page reloads on submit',
        'By printing form data directly to the user screen',
        'By writing data to local text files'
      ],
      skill: 'API Data Fetching',
      explanation: 'Async fetch calls execute non-blocking HTTP requests without reloading the browser web page.'
    },
    {
      category: fName,
      question: `What makes a form input "controlled" in ${title}'s ${fName} interface?`,
      correctOption: 'Binding the input value attribute to component state with an onChange state setter listener',
      distractors: [
        'Disabling user typing in input fields',
        'Using CSS pointer-events: none',
        'Storing input values in cookies'
      ],
      skill: 'Controlled Form Inputs',
      explanation: 'Controlled inputs make React state the single source of truth for form field values.'
    },
    {
      category: fName,
      question: `Why must dynamic lists rendered with .map() include a unique "key" prop in ${fName}?`,
      correctOption: 'To help React Reconciliation diffing algorithm identify which list items changed, added, or removed',
      distractors: [
        'Because JavaScript array .map() method fails without key prop',
        'To style list items with CSS colors',
        'To sort list items in alphabetical order'
      ],
      skill: 'React List Rendering',
      explanation: 'Unique `key` props optimize Virtual DOM reconciliation when rendering dynamic array items.'
    },
    {
      category: fName,
      question: `How does ${title}'s UI signal to users that an API network request is in progress?`,
      correctOption: 'By setting a loading boolean state (e.g. isLoading=true) to render loading spinners',
      distractors: [
        'By freezing the user computer mouse cursor',
        'By displaying a blank white screen',
        'By opening 5 popup windows'
      ],
      skill: 'UI Loading States',
      explanation: 'Explicit loading states provide visual feedback to users during asynchronous data fetches.'
    },
    {
      category: fName,
      question: `How are callback functions passed from parent to child components in ${fName}?`,
      correctOption: 'As component props (e.g. onSelectPatient={handleSelect})',
      distractors: [
        'Through global CSS classes',
        'By writing to localStorage',
        'Using HTML data attributes'
      ],
      skill: 'Props & Event Communication',
      explanation: 'Props pass data DOWN to children and event handlers UP to parent components.'
    },
    {
      category: fName,
      question: `What happens when component state is updated via its setter function in ${fName}?`,
      correctOption: 'React schedules a component re-render to update the Virtual DOM and DOM nodes',
      distractors: [
        'The web browser reloads the entire page',
        'The server restarts automatically',
        'All database records are deleted'
      ],
      skill: 'Component Re-rendering',
      explanation: 'State updates trigger component re-renders so the UI accurately reflects current data.'
    },
    {
      category: fName,
      question: `How does ${fName} handle user input form submissions without refreshing the browser page?`,
      correctOption: 'By calling e.preventDefault() inside the form onSubmit handler',
      distractors: [
        'By setting target="_blank" on form element',
        'By returning false from window.alert()',
        'By disabling the HTML submit button'
      ],
      skill: 'Form Event Handling',
      explanation: '`e.preventDefault()` suppresses the default HTML browser form submission and page reload.'
    }
  ];

  // 10 Database Questions
  const databaseQuestions = [
    {
      category: dbName,
      question: `In ${title}, what is the primary role of database schema definitions in ${dbName}?`,
      correctOption: 'To enforce structured table/collection schemas, required attributes, and field data types',
      distractors: [
        'To format frontend CSS layouts automatically',
        'To run unit tests on client computers',
        'To render chart graphics'
      ],
      skill: `${dbName} Schema Design`,
      explanation: 'Schemas guarantee data integrity and validation before records are written to database tables/collections.'
    },
    {
      category: dbName,
      question: `Why do we create B-Tree indexes on primary search columns in ${dbName} for ${title}?`,
      correctOption: 'To accelerate lookup query speeds from O(N) full table scans to O(log N) indexed searches',
      distractors: [
        'To reduce image file download sizes',
        'To turn database data into sound files',
        'To disable write permissions'
      ],
      skill: 'Database Indexing',
      explanation: 'Indexes create fast search trees on columns, dramatically improving query performance.'
    },
    {
      category: dbName,
      question: `What is the purpose of primary key constraints in ${title}'s database?`,
      correctOption: 'To uniquely identify every individual record row/document in a database table or collection',
      distractors: [
        'To encrypt user passwords in memory',
        'To store client IP addresses',
        'To compress database backup zip files'
      ],
      skill: 'Primary Key Constraints',
      explanation: 'Primary keys guarantee uniqueness for every row, preventing duplicate record collisions.'
    },
    {
      category: dbName,
      question: `How do foreign key constraints maintain referential integrity in ${title}?`,
      correctOption: 'By enforcing that child record references (e.g. user_id) match valid primary keys in parent tables',
      distractors: [
        'By deleting all parent records when a child is created',
        'By turning database rows into HTML strings',
        'By disabling network access'
      ],
      skill: 'Referential Integrity',
      explanation: 'Foreign keys prevent orphaned records by restricting insertions/deletions across linked tables.'
    },
    {
      category: dbName,
      question: `What is the main role of ORM/ODM libraries (like Mongoose or SQLAlchemy) in ${title}?`,
      correctOption: 'To map database rows/documents into native programming language objects and model classes',
      distractors: [
        'To render web page HTML in browsers',
        'To create PDF slide decks',
        'To compress image files'
      ],
      skill: 'ORM / ODM Architecture',
      explanation: 'ORMs allow developers to write database queries using native language object methods.'
    },
    {
      category: dbName,
      question: `How does document population or table joining work in ${title}'s database?`,
      correctOption: 'By joining referenced IDs across collections/tables to return combined nested record payloads',
      distractors: [
        'By duplicating all database tables into local storage',
        'By converting numbers into strings',
        'By restarting database servers'
      ],
      skill: 'Database Joins & Population',
      explanation: 'Joins and population resolve foreign key/ObjectId references into full nested object graphs.'
    },
    {
      category: dbName,
      question: `What does ACID compliance guarantee in relational databases for ${title}?`,
      correctOption: 'Atomicity, Consistency, Isolation, and Durability across database transactions',
      distractors: [
        'Automatic Compression and Image Downloads',
        'Asynchronous Input and Component Design',
        'API Calling and Interface Deployment'
      ],
      skill: 'ACID Transactions',
      explanation: 'ACID guarantees that multi-step database transactions complete fully or roll back completely on failure.'
    },
    {
      category: dbName,
      question: `How does ${dbName} handle duplicate key violation errors when inserting duplicate unique fields?`,
      correctOption: 'By throwing a unique constraint error (e.g. Code 11000) that can be caught by API error handlers',
      distractors: [
        'By overwriting all operating system files',
        'By ignoring the error silently and deleting the database',
        'By closing the web browser'
      ],
      skill: 'Constraint Error Handling',
      explanation: 'Unique indexes reject duplicate insertions, raising unique constraint errors.'
    },
    {
      category: dbName,
      question: `Why should database connection strings use connection pooling in ${title}?`,
      correctOption: 'To reuse existing database connection instances across multiple API requests, avoiding connection overhead',
      distractors: [
        'To download video files faster',
        'To disable database security passwords',
        'To turn databases into single-user offline files'
      ],
      skill: 'Connection Pooling',
      explanation: 'Connection pools maintain active database connections, eliminating connection latency per request.'
    },
    {
      category: dbName,
      question: `Which SQL or MongoDB operation updates existing fields in a database record in ${title}?`,
      correctOption: 'UPDATE (SQL) / findOneAndUpdate (MongoDB)',
      distractors: ['CREATE', 'DROP TABLE', 'TRUNCATE'],
      skill: 'CRUD Database Operations',
      explanation: 'UPDATE queries modify specific column/field values on matching record IDs.'
    }
  ];

  // 10 Docker Questions
  const dockerQuestions = [
    {
      category: 'Docker',
      question: `What is the purpose of a Dockerfile in containerizing ${title}?`,
      correctOption: 'It provides a step-by-step blueprint file defining base images, dependencies, and container startup commands',
      distractors: [
        'It is a text file that writes frontend CSS code',
        'It is a script that installs web browser plugins',
        'It is a database table definition file'
      ],
      skill: 'Dockerfile Blueprint',
      explanation: 'Dockerfiles specify environment instructions to build reproducible container images.'
    },
    {
      category: 'Docker',
      question: `In ${title}'s Dockerfile, why is dependency installation placed BEFORE copying source code?`,
      correctOption: 'To utilize Docker layer caching so package installation layers are reused during code edits',
      distractors: [
        'Because Docker cannot copy source code after running pip or npm',
        'To encrypt server passwords',
        'It has no performance effect whatsoever'
      ],
      skill: 'Docker Layer Caching',
      explanation: 'Placing dependency files first caches the installation layer, accelerating rebuild speeds.'
    },
    {
      category: 'Docker',
      question: `How does Docker Compose simplify multi-container execution for ${title}?`,
      correctOption: 'It orchestrates backend, frontend, and database containers in a single docker-compose.yml file',
      distractors: [
        'It automatically converts Python code into JavaScript',
        'It replaces cloud deployment servers',
        'It deletes database records after every run'
      ],
      skill: 'Docker Compose Orchestration',
      explanation: 'Docker Compose manages multi-container startup sequences, environment injection, and networking.'
    },
    {
      category: 'Docker',
      question: `Which port binding option maps host port 8000 to internal container port 8000 for ${title}?`,
      correctOption: '-p 8000:8000',
      distractors: ['--port 8000->8000', 'EXPOSE_ONLY=8000', 'BIND 8000 TO 8000'],
      skill: 'Docker Port Binding',
      explanation: '`-p hostPort:containerPort` forwards incoming network traffic from the host machine to the container.'
    },
    {
      category: 'Docker',
      question: `Why must Docker container services use service names (e.g. DB_HOST=db) for inter-container networking?`,
      correctOption: 'Because Docker Compose creates an internal DNS network where containers reach each other by service name',
      distractors: [
        'Because containers cannot use IP addresses',
        'Because localhost refers to the local container itself, not other containers',
        'Because service names encrypt database data'
      ],
      skill: 'Docker Bridge Networking',
      explanation: 'Within Docker bridge networks, containers resolve neighbor containers via Compose service names.'
    },
    {
      category: 'Docker',
      question: `What is the purpose of Docker volume mounts (-v or volumes:) in ${title}?`,
      correctOption: 'To persist database data files on the host machine so data survives container restarts',
      distractors: [
        'To make container images smaller in size',
        'To speed up CPU computation',
        'To format hard drives'
      ],
      skill: 'Docker Volume Persistence',
      explanation: 'Volumes mount host directories into containers, preserving database records when containers stop.'
    },
    {
      category: 'Docker',
      question: `Why should server startup scripts in Docker containers bind to host 0.0.0.0 instead of 127.0.0.1?`,
      correctOption: '0.0.0.0 listens on all container network interfaces, allowing external traffic to enter',
      distractors: [
        '127.0.0.1 is an invalid IP address',
        '0.0.0.0 disables security passwords',
        '0.0.0.0 runs containers faster'
      ],
      skill: 'Container Network Binding',
      explanation: '`0.0.0.0` binds servers to external container interfaces so port forwarding works.'
    },
    {
      category: 'Docker',
      question: `What is the difference between RUN and CMD instructions in a Dockerfile for ${title}?`,
      correctOption: 'RUN executes commands during image build time; CMD specifies default startup commands when running containers',
      distractors: [
        'RUN is for Windows; CMD is for Linux',
        'RUN deletes files; CMD creates files',
        'They are identical aliases'
      ],
      skill: 'Dockerfile Directives',
      explanation: '`RUN` builds image layers (e.g. installing packages); `CMD` runs when a container starts up.'
    },
    {
      category: 'Docker',
      question: `How do multi-stage Docker builds optimize container deployment size for ${title}?`,
      correctOption: 'By compiling assets in a build stage and copying ONLY final artifacts into a lightweight production image',
      distractors: [
        'By compressing source code into zip archives',
        'By deleting all unit tests',
        'By running containers without memory'
      ],
      skill: 'Multi-Stage Docker Builds',
      explanation: 'Multi-stage builds discard build-tool dependencies, producing minimal production container images.'
    },
    {
      category: 'Docker',
      question: `Which command stops and removes all containers, networks, and volumes created by Docker Compose for ${title}?`,
      correctOption: 'docker-compose down',
      distractors: ['docker stop all', 'docker remove', 'docker-compose destroy'],
      skill: 'Docker Compose CLI',
      explanation: '`docker-compose down` stops running container services and cleans up bridge networks.'
    }
  ];

  // 10 AI / System Architecture Questions
  const aiQuestions = [
    {
      category: 'AI Architecture',
      question: `In ${title}, why is document text chunked (e.g. RecursiveCharacterTextSplitter) before embedding generation?`,
      correctOption: 'To fit within LLM token context limits and preserve fine-grained semantic vector search context',
      distractors: [
        'To convert English text into binary numbers',
        'To delete bad spelling mistakes automatically',
        'To turn text files into MP3 audio'
      ],
      skill: 'RAG Text Chunking',
      explanation: 'Chunking breaks large documents into smaller semantic segments suitable for vector indexing.'
    },
    {
      category: 'AI Architecture',
      question: `What is the role of Vector Databases (e.g. FAISS / Pinecone) in RAG architectures for ${title}?`,
      correctOption: 'To perform fast high-dimensional vector similarity search (k-nearest neighbors) on text embeddings',
      distractors: [
        'To store user login passwords',
        'To render 3D graphics models',
        'To replace relational SQL databases'
      ],
      skill: 'Vector Similarity Indexing',
      explanation: 'Vector DBs index text embedding vectors to retrieve semantically relevant context chunks.'
    },
    {
      category: 'AI Architecture',
      question: `How does Cosine Similarity evaluate vector relevance in vector search for ${title}?`,
      correctOption: 'By measuring the cosine of the angle between two vector embedding arrows in high-dimensional space',
      distractors: [
        'By counting the total number of words in a sentence',
        'By sorting words alphabetically',
        'By measuring file download speeds'
      ],
      skill: 'Vector Distance Metrics',
      explanation: 'Cosine similarity measures orientation similarity regardless of vector magnitude.'
    },
    {
      category: 'AI Architecture',
      question: `Why is chunk overlap (e.g. chunk_overlap=50) configured during text splitting in ${title}?`,
      correctOption: 'To prevent cutting sentences at chunk boundaries and preserve semantic context across adjacent chunks',
      distractors: [
        'To duplicate document files on disk',
        'To speed up text printing',
        'To encrypt text payloads'
      ],
      skill: 'Text Chunking Strategy',
      explanation: 'Chunk overlap preserves sentence continuity at chunk edges during vector retrieval.'
    },
    {
      category: 'AI Architecture',
      question: `In Convolutional Neural Networks (CNN) for vision/medical imaging in ${title}, what is the role of Pooling layers?`,
      correctOption: 'To downsample feature map dimensions, reducing parameter count and computational complexity',
      distractors: [
        'To convert images into sound files',
        'To increase image pixel resolution',
        'To store images in SQL tables'
      ],
      skill: 'CNN Neural Networks',
      explanation: 'Pooling layers (e.g. MaxPool2D) downsample spatial dimensions while preserving key visual features.'
    },
    {
      category: 'AI Architecture',
      question: `What does Transfer Learning (e.g. ResNet50 / MobileNet) provide for ML models in ${title}?`,
      correctOption: 'Leveraging pre-trained weights from millions of images to achieve high accuracy with smaller custom datasets',
      distractors: [
        'Transferring code from Python to Java automatically',
        'Downloading dataset files from Google Drive',
        'Transferring money across bank accounts'
      ],
      skill: 'Transfer Learning',
      explanation: 'Transfer learning uses pre-trained feature extractors, drastically reducing training time.'
    },
    {
      category: 'AI Architecture',
      question: `How does TF-IDF (Term Frequency-Inverse Document Frequency) vectorize text in NLP projects like ${title}?`,
      correctOption: 'By weighting words based on how frequently they appear in a document relative to the entire corpus',
      distractors: [
        'By counting the total number of vowels in a word',
        'By translating English into Spanish',
        'By compressing text files into zip format'
      ],
      skill: 'NLP Text Vectorization',
      explanation: 'TF-IDF highlights important unique keywords while discounting common stop words.'
    },
    {
      category: 'AI Architecture',
      question: `Why must ML training datasets be split into Train and Test subsets in ${title}?`,
      correctOption: 'To evaluate model generalization accuracy on unseen test data and detect overfitting',
      distractors: [
        'Because machine learning algorithms can only process half a dataset at a time',
        'To delete bad dataset records',
        'To save hard drive space'
      ],
      skill: 'Train / Test Dataset Splitting',
      explanation: 'Testing on unseen data measures real-world generalization performance.'
    },
    {
      category: 'AI Architecture',
      question: `What does the F1-Score metric represent in evaluating classification models for ${title}?`,
      correctOption: 'The harmonic mean of Precision and Recall, balancing false positives and false negatives',
      distractors: [
        'The formula for calculating server CPU temperature',
        'The file download speed in Megabytes per second',
        'The total number of training epochs'
      ],
      skill: 'Model Evaluation Metrics',
      explanation: 'F1-Score provides a balanced accuracy metric on imbalanced classification datasets.'
    },
    {
      category: 'AI Architecture',
      question: `Why are serialized model binary files (.pkl / .h5 / .onnx) loaded into memory on backend startup for ${title}?`,
      correctOption: 'To execute fast model inference calls without re-training neural network weights on every API request',
      distractors: [
        'To display model training progress bars to users',
        'To convert models into text files',
        'To format backend database tables'
      ],
      skill: 'Model Deployment & Inference',
      explanation: 'Pre-trained models are loaded into memory once on server startup for instantaneous API predictions.'
    }
  ];

  return {
    backendQuestions,
    frontendQuestions,
    databaseQuestions,
    dockerQuestions,
    aiQuestions
  };
}

/**
 * PERFECTLY BALANCED DYNAMIC QUESTION GENERATOR
 */
export function generateDynamicAssessmentQuestions(project, attemptNumber = 1) {
  const categories = generate50CategorizedQuestions(project);

  const safeAttempt = Math.max(1, attemptNumber || 1);
  const setIndex = (safeAttempt - 1) % 5;

  let attemptQuestions = [];

  if (safeAttempt <= 5) {
    const bSlice = categories.backendQuestions.slice(setIndex * 2, setIndex * 2 + 2);
    const fSlice = categories.frontendQuestions.slice(setIndex * 2, setIndex * 2 + 2);
    const dbSlice = categories.databaseQuestions.slice(setIndex * 2, setIndex * 2 + 2);
    const dSlice = categories.dockerQuestions.slice(setIndex * 2, setIndex * 2 + 2);
    const aiSlice = categories.aiQuestions.slice(setIndex * 2, setIndex * 2 + 2);

    attemptQuestions = [...bSlice, ...fSlice, ...dbSlice, ...dSlice, ...aiSlice];
  } else {
    const shuffle2 = (arr) => [...arr].sort(() => 0.5 - Math.random()).slice(0, 2);
    attemptQuestions = [
      ...shuffle2(categories.backendQuestions),
      ...shuffle2(categories.frontendQuestions),
      ...shuffle2(categories.databaseQuestions),
      ...shuffle2(categories.dockerQuestions),
      ...shuffle2(categories.aiQuestions)
    ];
  }

  return attemptQuestions.map((q, idx) => {
    const options = [q.correctOption, ...q.distractors];
    const shuffledOptions = [...options].sort(() => 0.5 - Math.random());
    const answerIndex = shuffledOptions.indexOf(q.correctOption);

    return {
      id: `q-${safeAttempt}-${idx + 1}`,
      category: q.category,
      question: q.question,
      options: shuffledOptions,
      answer: answerIndex,
      skill: q.skill,
      explanation: q.explanation
    };
  });
}

/**
 * DYNAMIC LEARNING RESOURCES & ESSENTIAL MICRO-DOCS GENERATOR
 * Generates study resources and 5-page textbook topic guides for ALL technologies in the project's tech stack!
 */
export function generateDynamicLearningResources(project) {
  const title = project?.title || 'Your Project';
  const backend = project?.techStack?.backend || 'FastAPI';
  const frontend = project?.techStack?.frontend || 'React';
  const db = project?.techStack?.database || 'PostgreSQL';
  const aiModels = project?.techStack?.aiModels !== 'N/A' ? project?.techStack?.aiModels : null;
  const container = project?.techStack?.container || 'Docker';

  const resources = {};

  // -------------------------------------------------------------------------
  // 1. BACKEND STUDY RESOURCES (FastAPI / Express.js / Flask)
  // -------------------------------------------------------------------------
  const backendName = backend.split(' ')[0];
  const isExpress = backendName.toLowerCase().includes('express');
  const isFlask = backendName.toLowerCase().includes('flask');

  resources[backendName] = {
    title: `${backendName} Elaborated Study Guide for ${title}`,
    summary: `Detailed, elaborated study docs for ONLY the essential ${backendName} topics required for ${title}.`,
    mustLearnTopicDocs: isExpress ? [
      {
        topicNumber: 1,
        topicName: 'REST Endpoint Routes',
        conceptSummary: 'Express route methods (app.get, app.post) define URL paths and execute handler logic when clients send HTTP requests.',
        codeSnippet: `app.post('/api/v1/patients', (req, res) => {\n  const { name, age } = req.body;\n  res.status(201).json({ status: 'success', data: { id: Date.now(), name, age } });\n});`,
        whyRequiredInProject: `Required in ${title} so the React frontend form can submit new patient/user records to the backend.`,
        debugTip: `If route returns 404 Not Found: Verify URL path spelling and check that app.use('/api', router) path matches.`
      },
      {
        topicNumber: 2,
        topicName: 'JSON Body Parsing',
        conceptSummary: 'Express middleware (express.json()) that parses raw incoming HTTP JSON request strings into JavaScript objects accessible via req.body.',
        codeSnippet: `app.use(express.json());`,
        whyRequiredInProject: `Without express.json(), req.body will be undefined when submitting JSON form payloads in ${title}.`,
        debugTip: `If req.body is undefined: Ensure app.use(express.json()) is executed BEFORE your route declarations.`
      },
      {
        topicNumber: 3,
        topicName: 'JWT Auth Middleware',
        conceptSummary: 'Custom function inspecting HTTP Authorization headers for valid Bearer JSON Web Tokens before allowing access to protected API routes.',
        codeSnippet: `const verifyToken = (req, res, next) => {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'Access Denied' });\n  next();\n};`,
        whyRequiredInProject: `Protects sensitive data endpoints in ${title} from unauthorized access.`,
        debugTip: `If 401 Unauthorized occurs: Ensure client attaches 'Authorization: Bearer <token>' in request headers.`
      },
      {
        topicNumber: 4,
        topicName: 'Mongoose Integration',
        conceptSummary: 'Connects Express backend to MongoDB database and enforces structured schema validation on documents.',
        codeSnippet: `const mongoose = require('mongoose');\nmongoose.connect(process.env.MONGO_URI);`,
        whyRequiredInProject: `Persists user and record data for ${title} reliably in MongoDB.`,
        debugTip: `If connection hangs or fails: Check MONGO_URI string in .env file and container port mapping.`
      },
      {
        topicNumber: 5,
        topicName: 'Error Handlers',
        conceptSummary: 'Specialized 4-parameter Express middleware (err, req, res, next) that catches uncaught errors and returns formatted JSON errors.',
        codeSnippet: `app.use((err, req, res, next) => {\n  res.status(500).json({ error: err.message });\n});`,
        whyRequiredInProject: `Prevents ${title} server from crashing when bad database queries occur.`,
        debugTip: `Ensure global error handling middleware is defined AFTER all app.use() route handlers.`
      }
    ] : isFlask ? [
      {
        topicNumber: 1,
        topicName: 'App Routes & Decorators',
        conceptSummary: 'Flask @app.route() decorators map URL paths to Python controller functions.',
        codeSnippet: `@app.route('/api/predict', methods=['POST'])\ndef predict():\n    data = request.get_json()\n    return jsonify({'result': 'ok'})`,
        whyRequiredInProject: `Allows ${title} to serve prediction REST API endpoints.`,
        debugTip: `If 405 Method Not Allowed occurs: Ensure methods=['POST'] is explicitly declared in route decorator.`
      },
      {
        topicNumber: 2,
        topicName: 'JSON Request Handling',
        conceptSummary: 'Extracting JSON payloads from request.get_json() in Flask API routes.',
        codeSnippet: `data = request.get_json()\ntext = data.get('text', '')`,
        whyRequiredInProject: `Parses user inputs sent to ${title}'s Flask backend.`,
        debugTip: `If get_json() returns None: Check client sends Content-Type: application/json header.`
      },
      {
        topicNumber: 3,
        topicName: 'Model Loading (Pickle/Joblib)',
        conceptSummary: 'Loading pre-trained machine learning model binaries into Flask memory on app startup.',
        codeSnippet: `import joblib\nmodel = joblib.load('model.pkl')`,
        whyRequiredInProject: `Executes fast predictions in ${title} without re-training models on every request.`,
        debugTip: `Ensure model file path is relative to app root directory.`
      },
      {
        topicNumber: 4,
        topicName: 'CORS Configuration',
        conceptSummary: 'Flask-CORS extension enabling cross-origin API calls from React UI.',
        codeSnippet: `from flask_cors import CORS\nCORS(app)`,
        whyRequiredInProject: `Allows ${title}'s React frontend to call Flask backend APIs without CORS errors.`,
        debugTip: `Initialize CORS(app) immediately after creating Flask app instance.`
      }
    ] : [
      {
        topicNumber: 1,
        topicName: 'Routing & Path Parameters',
        conceptSummary: 'FastAPI route decorators (@app.get, @app.post) link URL paths and type-annotated parameters directly to Python functions.',
        codeSnippet: `@app.get("/items/{item_id}")\ndef read_item(item_id: int):\n    return {"item_id": item_id}`,
        whyRequiredInProject: `Allows ${title} to handle REST API requests automatically.`,
        debugTip: `If parameter returns 422: Ensure URL argument type matches function type hint.`
      },
      {
        topicNumber: 2,
        topicName: 'Request Body (Pydantic)',
        conceptSummary: 'Pydantic BaseModel schema classes that validate incoming JSON request payloads automatically.',
        codeSnippet: `class Payload(BaseModel):\n    user_id: str\n    text: str\n\n@app.post("/analyze")\ndef analyze(p: Payload):\n    return {"status": "ok", "user": p.user_id}`,
        whyRequiredInProject: `Parses and validates user form submissions for ${title} without manual code.`,
        debugTip: `If 422 Unprocessable Entity occurs: Check JSON key names match Pydantic schema field names.`
      },
      {
        topicNumber: 3,
        topicName: 'Response Models & Status Codes',
        conceptSummary: 'Specifies explicit response schema types and HTTP status codes (201 Created, 200 OK) for endpoint outputs.',
        codeSnippet: `@app.post("/create", status_code=201, response_model=Payload)\ndef create(p: Payload):\n    return p`,
        whyRequiredInProject: `Enforces clean JSON output shapes and standard HTTP codes for ${title}.`,
        debugTip: `Response model automatically filters out sensitive attributes not specified in schema.`
      },
      {
        topicNumber: 4,
        topicName: 'Multipart File Uploads',
        conceptSummary: 'FastAPI UploadFile and File params for accepting binary PDF or image file uploads from web forms.',
        codeSnippet: `@app.post("/upload")\nasync def upload(file: UploadFile = File(...)):\n    content = await file.read()\n    return {"filename": file.filename, "size": len(content)}`,
        whyRequiredInProject: `Enables users to upload files for analysis in ${title}.`,
        debugTip: `If file upload returns 0 bytes: Ensure client sends FormData object with multipart/form-data header.`
      },
      {
        topicNumber: 5,
        topicName: 'CRUD API Endpoints',
        conceptSummary: 'Standard Create, Read, Update, Delete endpoint handlers connected to ORM database models.',
        codeSnippet: `@app.get("/records")\ndef get_records(db: Session = Depends(get_db)):\n    return db.query(Record).all()`,
        whyRequiredInProject: `Exposes database records for ${title} to the frontend interface.`,
        debugTip: `Verify database session generator closes sessions properly in finally block.`
      }
    ],
    youtubeVideos: [
      {
        title: `${backendName} Core API Architecture in 7 Mins`,
        duration: '7:15',
        youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(backendName + ' REST routing validation tutorial')}`,
        description: `Short focused video covering API routing, body parsing, and error handling.`
      }
    ]
  };

  // -------------------------------------------------------------------------
  // 2. FRONTEND STUDY RESOURCES (React / Angular / Vue)
  // -------------------------------------------------------------------------
  const frontendName = frontend.split(' ')[0];
  const isAngular = frontendName.toLowerCase().includes('angular');

  resources[frontendName] = {
    title: `${frontendName} Elaborated Study Guide for ${title}`,
    summary: `Detailed, elaborated study docs for ONLY the essential ${frontendName} topics required for ${title}.`,
    mustLearnTopicDocs: isAngular ? [
      {
        topicNumber: 1,
        topicName: 'TypeScript Components & Templates',
        conceptSummary: 'Angular @Component class linking TypeScript properties directly to HTML templates.',
        codeSnippet: `@Component({\n  selector: 'app-dashboard',\n  template: \`<h2>\${title} Dashboard</h2>\` \n})\nexport class DashboardComponent {}`,
        whyRequiredInProject: `Renders user interface views for ${title}.`,
        debugTip: `If component fails to render: Check component selector matches parent HTML tag.`
      },
      {
        topicNumber: 2,
        topicName: 'Services & Dependency Injection',
        conceptSummary: 'Injectable service classes (@Injectable) that centralize API calls across components.',
        codeSnippet: `@Injectable({ providedIn: 'root' })\nexport class DataService {\n  constructor(private http: HttpClient) {}\n}`,
        whyRequiredInProject: `Centralizes backend REST requests for ${title}.`,
        debugTip: `If NullInjectorError occurs: Ensure HttpClientModule is imported in app module.`
      },
      {
        topicNumber: 3,
        topicName: 'HttpClient Module API Calls',
        conceptSummary: 'HttpClient methods returning RxJS Observables to communicate with backend APIs.',
        codeSnippet: `this.http.post('/api/v1/process', payload).subscribe(res => this.result = res);`,
        whyRequiredInProject: `Submits form data from Angular UI to ${title} backend.`,
        debugTip: `Remember RxJS Observables cold-start only when .subscribe() is invoked.`
      },
      {
        topicNumber: 4,
        topicName: 'Reactive Forms',
        conceptSummary: 'FormGroup and FormControl bindings for strict form validation.',
        codeSnippet: `form = new FormGroup({ name: new FormControl('') });`,
        whyRequiredInProject: `Validates user input fields before sending to ${title} server.`,
        debugTip: `Verify formControlName attribute binding in HTML input tag.`
      }
    ] : [
      {
        topicNumber: 1,
        topicName: 'JSX & Component Hierarchy',
        conceptSummary: 'React JSX syntax combining HTML markup layout inside JavaScript functions to build modular components.',
        codeSnippet: `export default function DashboardCard({ title }) {\n  return <div className="card"><h3>{title}</h3></div>;\n}`,
        whyRequiredInProject: `Renders modular, reusable dashboard components for ${title}.`,
        debugTip: `If JSX compile error occurs: Ensure outer JSX elements are wrapped in a single parent container.`
      },
      {
        topicNumber: 2,
        topicName: 'useState & useEffect hooks',
        conceptSummary: 'useState tracks local component state variables; useEffect executes side-effects (like API fetching) on mount.',
        codeSnippet: `const [data, setData] = useState(null);\nuseEffect(() => {\n  fetch('/api/v1/health').then(r => r.json()).then(d => setData(d));\n}, []);`,
        whyRequiredInProject: `Manages dynamic UI state and fetches initial data for ${title} on page load.`,
        debugTip: `If infinite fetch loop occurs: Ensure dependency array [] is passed to useEffect.`
      },
      {
        topicNumber: 3,
        topicName: 'API Data Fetching (Fetch/Axios)',
        conceptSummary: 'Asynchronous fetch or Axios calls that post user form payloads to backend REST endpoints.',
        codeSnippet: `const handleAnalyze = async () => {\n  const res = await fetch('/api/v1/process', { method: 'POST', body: JSON.stringify(payload) });\n  const json = await res.json();\n  setData(json);\n};`,
        whyRequiredInProject: `Connects ${title}'s React UI to backend API endpoints.`,
        debugTip: `If CORS error occurs: Verify backend CORSMiddleware authorizes http://localhost:5173.`
      },
      {
        topicNumber: 4,
        topicName: 'Controlled Form Inputs',
        conceptSummary: 'Binding form input value attributes to React state with onChange handlers for single-source-of-truth state.',
        codeSnippet: `<input value={text} onChange={(e) => setText(e.target.value)} />`,
        whyRequiredInProject: `Captures user text input in ${title} reliably.`,
        debugTip: `If input becomes read-only: Ensure onChange handler calls state setter function.`
      }
    ],
    youtubeVideos: [
      {
        title: `${frontendName} Core State & UI Integration in 6 Mins`,
        duration: '6:30',
        youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(frontendName + ' component state API fetch short')}`,
        description: `Bite-sized visual breakdown of component state and API integration.`
      }
    ]
  };

  // -------------------------------------------------------------------------
  // 3. DATABASE STUDY RESOURCES (PostgreSQL / MongoDB / SQLite)
  // -------------------------------------------------------------------------
  const dbName = db.split(' ')[0];
  const isMongo = dbName.toLowerCase().includes('mongo');

  resources[dbName] = {
    title: `${dbName} Elaborated Study Guide for ${title}`,
    summary: `Detailed, elaborated study docs for ONLY the essential ${dbName} topics required for ${title}.`,
    mustLearnTopicDocs: isMongo ? [
      {
        topicNumber: 1,
        topicName: 'Document Collections & BSON',
        conceptSummary: 'MongoDB stores data as flexible BSON documents inside logical collections.',
        codeSnippet: `db.patients.insertOne({ name: 'John Doe', age: 34, createdAt: new Date() });`,
        whyRequiredInProject: `Stores user and record documents for ${title} without rigid table migrations.`,
        debugTip: `If BSON cast error occurs: Check string vs ObjectId types in query filters.`
      },
      {
        topicNumber: 2,
        topicName: 'Mongoose Schemas',
        conceptSummary: 'Strongly typed schema definitions, default values, and validation rules for documents.',
        codeSnippet: `const PatientSchema = new mongoose.Schema({ email: { type: String, required: true } });`,
        whyRequiredInProject: `Enforces required fields and data integrity in ${title}.`,
        debugTip: `If validation error occurs: Verify required fields are included in document payload.`
      },
      {
        topicNumber: 3,
        topicName: 'CRUD Queries & Population',
        conceptSummary: 'Mongoose query methods (find, findById, create) and .populate() for joining related collections.',
        codeSnippet: `const patient = await Patient.findById(id).populate('doctorId');`,
        whyRequiredInProject: `Retrieves and joins doctor and patient records for ${title}.`,
        debugTip: `If populate returns null: Ensure ref attribute in schema matches target model name.`
      },
      {
        topicNumber: 4,
        topicName: 'Basic Indexing',
        conceptSummary: 'Indexes speed up frequent queries by building B-Tree search indexes on specific collection fields.',
        codeSnippet: `PatientSchema.index({ email: 1 });`,
        whyRequiredInProject: `Optimizes email and ID lookup speeds in ${title}.`,
        debugTip: `If duplicate key error occurs: Check unique index constraints on collection fields.`
      }
    ] : [
      {
        topicNumber: 1,
        topicName: 'Relational Schema Tables',
        conceptSummary: 'SQL tables store data in structured columns with strict data types (VARCHAR, INTEGER, TIMESTAMP).',
        codeSnippet: `CREATE TABLE users (\n  id UUID PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n);`,
        whyRequiredInProject: `Defines tabular database layout for ${title}.`,
        debugTip: `If column missing error occurs: Verify table migrations match SQLAlchemy models.`
      },
      {
        topicNumber: 2,
        topicName: 'Primary & Foreign Keys',
        conceptSummary: 'Primary keys uniquely identify rows; foreign keys link related records across tables.',
        codeSnippet: `ALTER TABLE records ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);`,
        whyRequiredInProject: `Maintains referential integrity between user accounts and records in ${title}.`,
        debugTip: `If foreign key constraint fails: Ensure parent user ID exists before inserting child record.`
      },
      {
        topicNumber: 3,
        topicName: 'SQLAlchemy ORM Mapping',
        conceptSummary: 'Maps Python classes directly to PostgreSQL tables, translating Python code into SQL queries.',
        codeSnippet: `class User(Base):\n    __tablename__ = 'users'\n    id = Column(String, primary_key=True)\n    email = Column(String, unique=True)`,
        whyRequiredInProject: `Allows Python backend to query PostgreSQL using Python objects.`,
        debugTip: `If session query fails: Ensure db.commit() is called after adding objects.`
      },
      {
        topicNumber: 4,
        topicName: 'Index Optimization',
        conceptSummary: 'B-Tree indexes created on frequently searched columns to accelerate SELECT query performance.',
        codeSnippet: `CREATE INDEX idx_users_email ON users(email);`,
        whyRequiredInProject: `Guarantees fast user authentication lookups for ${title}.`,
        debugTip: `Avoid over-indexing write-heavy tables to prevent write performance degradation.`
      }
    ],
    youtubeVideos: [
      {
        title: `${dbName} Schema & Indexing Fundamentals`,
        duration: '8:00',
        youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent(dbName + ' database design short')}`,
        description: `Visual explanation of schema design and indexing.`
      }
    ]
  };

  // -------------------------------------------------------------------------
  // 4. DOCKER & DEVOPS STUDY RESOURCES
  // -------------------------------------------------------------------------
  resources['Docker'] = {
    title: `Docker Elaborated Study Guide for ${title}`,
    summary: `Detailed, elaborated study docs for ONLY essential Docker topics required for ${title}.`,
    mustLearnTopicDocs: [
      {
        topicNumber: 1,
        topicName: 'Dockerfile Syntax (FROM, WORKDIR, COPY, RUN, CMD)',
        conceptSummary: 'Step-by-step blueprint file defining base image, dependency installation, and container startup command.',
        codeSnippet: `FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8000\nCMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`,
        whyRequiredInProject: `Packages ${title} into a self-contained container image.`,
        debugTip: `If container exits immediately: Verify uvicorn binds to 0.0.0.0 (not 127.0.0.1) and check CMD path.`
      },
      {
        topicNumber: 2,
        topicName: 'Environment Variable Injection',
        conceptSummary: 'Injecting runtime environment configuration (like DB_HOST, SECRET_KEY) into containers without hardcoding passwords.',
        codeSnippet: `# In docker-compose.yml\nenvironment:\n  - DATABASE_URL=postgresql://user:pass@db:5432/mydb`,
        whyRequiredInProject: `Keeps database passwords and secret keys secure in ${title}.`,
        debugTip: `If env var is empty: Verify variable name spelling in docker-compose.yml and .env.`
      },
      {
        topicNumber: 3,
        topicName: 'docker-compose.yml Services',
        conceptSummary: 'Orchestrates multi-container applications (app + database) with unified internal networking.',
        codeSnippet: `version: '3.8'\nservices:\n  backend:\n    build: .\n    ports: ["8000:8000"]\n    depends_on: [db]\n  db:\n    image: postgres:15-alpine`,
        whyRequiredInProject: `Launches ${title} backend and database together with one command (docker-compose up).`,
        debugTip: `If backend cannot reach database: Use container service name ('db') as hostname instead of localhost.`
      }
    ],
    youtubeVideos: [
      {
        title: 'Docker & Compose in 10 Minutes',
        duration: '9:50',
        youtubeUrl: 'https://www.youtube.com/results?search_query=docker+compose+in+10+minutes',
        description: `Learn Dockerfile syntax and docker-compose setup.`
      }
    ]
  };

  // -------------------------------------------------------------------------
  // 5. AI / VECTOR DB / ML STUDY RESOURCES (If AI Stack Present)
  // -------------------------------------------------------------------------
  if (aiModels) {
    let aiKey = 'LangChain & Vector DB';
    if (aiModels.includes('TensorFlow') || aiModels.includes('CNN')) {
      aiKey = 'TensorFlow & CNN';
    } else if (aiModels.includes('Scikit-Learn') || aiModels.includes('TF-IDF')) {
      aiKey = 'NLP & Scikit-Learn';
    }

    resources[aiKey] = {
      title: `${aiKey} Elaborated Study Guide for ${title}`,
      summary: `Detailed, elaborated study docs for ONLY the essential ${aiKey} concepts required for ${title}.`,
      mustLearnTopicDocs: aiKey.includes('LangChain') ? [
        {
          topicNumber: 1,
          topicName: 'Document Loading (PyPDF)',
          conceptSummary: 'Extracting clean plain text content from uploaded PDF document files using PyPDFLoader.',
          codeSnippet: `from langchain_community.document_loaders import PyPDFLoader\nloader = PyPDFLoader("resume.pdf")\ndocs = loader.load()`,
          whyRequiredInProject: `Parses uploaded user resumes or documents in ${title}.`,
          debugTip: `If PDF extraction fails: Ensure PyPDF package is installed.`
        },
        {
          topicNumber: 2,
          topicName: 'Text Chunking (RecursiveSplitter)',
          conceptSummary: 'Splitting long document text into overlapping chunks to fit LLM token context limits.',
          codeSnippet: `from langchain.text_splitter import RecursiveCharacterTextSplitter\nsplitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)\nchunks = splitter.split_documents(docs)`,
          whyRequiredInProject: `Prepares document chunks for vector indexing in ${title}.`,
          debugTip: `If chunks are cut mid-sentence: Adjust chunk_overlap value.`
        },
        {
          topicNumber: 3,
          topicName: 'FAISS In-Memory Vector Store',
          conceptSummary: 'Generating OpenAI/HuggingFace embeddings and building an in-memory FAISS similarity search index.',
          codeSnippet: `from langchain_community.vectorstores import FAISS\nfrom langchain_openai import OpenAIEmbeddings\nvectorstore = FAISS.from_documents(chunks, OpenAIEmbeddings())`,
          whyRequiredInProject: `Indexes semantic text embeddings for ${title}.`,
          debugTip: `Ensure embedding model dimension matches FAISS index dimension.`
        },
        {
          topicNumber: 4,
          topicName: 'Cosine Similarity Search',
          conceptSummary: 'Querying vector index to retrieve k-nearest context chunks matching user queries.',
          codeSnippet: `docs = vectorstore.similarity_search("Python experience", k=3)`,
          whyRequiredInProject: `Retrieves relevant context chunks for RAG answer generation in ${title}.`,
          debugTip: `Adjust parameter k=3 based on desired context window size.`
        }
      ] : aiKey.includes('TensorFlow') ? [
        {
          topicNumber: 1,
          topicName: 'ImageDataGenerator & Preprocessing',
          conceptSummary: 'Resizing, scaling, and augmenting input image tensors before feeding into CNN models.',
          codeSnippet: `from tensorflow.keras.preprocessing.image import ImageDataGenerator\ndatagen = ImageDataGenerator(rescale=1./255)`,
          whyRequiredInProject: `Normalizes input images for ${title}'s classification model.`,
          debugTip: `Check target_size matches model expected image input dimensions (224x224).`
        },
        {
          topicNumber: 2,
          topicName: 'Convolutional & Pooling Layers',
          conceptSummary: 'Conv2D feature extraction layers combined with MaxPool2D spatial downsampling layers.',
          codeSnippet: `model.add(Conv2D(32, (3, 3), activation='relu'))\nmodel.add(MaxPooling2D((2, 2)))`,
          whyRequiredInProject: `Extracts visual feature maps for image classification in ${title}.`,
          debugTip: `Verify input shape is specified on the first Conv2D layer.`
        },
        {
          topicNumber: 3,
          topicName: 'Transfer Learning (ResNet50)',
          conceptSummary: 'Loading pre-trained ResNet50 vision weights to classify images accurately with smaller custom datasets.',
          codeSnippet: `from tensorflow.keras.applications import ResNet50\nbase_model = ResNet50(weights='imagenet', include_top=False)`,
          whyRequiredInProject: `Achieves high accuracy in ${title} without training deep networks from scratch.`,
          debugTip: `Freeze base model layers (layer.trainable = False) during initial training.`
        },
        {
          topicNumber: 4,
          topicName: 'Categorical Crossentropy Loss',
          conceptSummary: 'Loss function evaluating probability distributions across multi-class predictions.',
          codeSnippet: `model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])`,
          whyRequiredInProject: `Measures classification prediction error during model training for ${title}.`,
          debugTip: `Use sparse_categorical_crossentropy if target labels are integers instead of one-hot encoded.`
        }
      ] : [
        {
          topicNumber: 1,
          topicName: 'Text Preprocessing (Stopwords/Stemming)',
          conceptSummary: 'Cleaning raw text, removing stop words, and stemming words to root forms.',
          codeSnippet: `import nltk\nfrom nltk.corpus import stopwords\nclean_text = [w for w in text.split() if w not in stopwords.words('english')]`,
          whyRequiredInProject: `Cleans input text payloads for NLP analysis in ${title}.`,
          debugTip: `Download NLTK stopwords dataset via nltk.download('stopwords').`
        },
        {
          topicNumber: 2,
          topicName: 'TF-IDF Vectorization Matrix',
          conceptSummary: 'Converting text tokens into numerical TF-IDF feature matrices.',
          codeSnippet: `from sklearn.feature_extraction.text import TfidfVectorizer\nvectorizer = TfidfVectorizer()\nX = vectorizer.fit_transform(corpus)`,
          whyRequiredInProject: `Vectorizes text data into numerical inputs for ${title}'s ML model.`,
          debugTip: `Use fit_transform on training data and transform on inference text.`
        },
        {
          topicNumber: 3,
          topicName: 'Train/Test Dataset Splitting',
          conceptSummary: 'Splitting dataset into 80% training and 20% test sets to evaluate generalization.',
          codeSnippet: `from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)`,
          whyRequiredInProject: `Evaluates ML model accuracy for ${title} on unseen data.`,
          debugTip: `Use stratify=y to maintain balanced class proportions across splits.`
        },
        {
          topicNumber: 4,
          topicName: 'Model Evaluation & Pickling',
          conceptSummary: 'Calculating accuracy/F1-score and serializing trained model to disk via Joblib.',
          codeSnippet: `import joblib\njoblib.dump(model, 'model.pkl')`,
          whyRequiredInProject: `Saves trained model to disk for deployment in ${title}.`,
          debugTip: `Also save the fitted TfidfVectorizer alongside the model binary.`
        }
      ]
    };
  }

  return resources;
}
