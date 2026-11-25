export const VIVA_QUESTIONS = [
  {
    id: 'viva-1',
    category: 'Architecture & Design',
    question: 'Can you explain the overall system architecture of your project and how data flows from the frontend to the database?',
    expectedKeywords: ['REST API', 'FastAPI', 'React', 'HTTP Request', 'Pydantic', 'Database query', 'JSON Response'],
    guidance: 'Break your response into 3 parts: Frontend trigger -> API handling -> DB/Vector operation -> Response rendering.'
  },
  {
    id: 'viva-2',
    category: 'Technology Selection',
    question: 'Why did you choose FastAPI over Flask or Django for this specific implementation?',
    expectedKeywords: ['Pydantic', 'Async/Await', 'OpenAPI/Swagger docs', 'Speed/Performance', 'Type safety', 'Automatic Validation'],
    guidance: 'Emphasize automatic data validation via Pydantic, high async concurrency, and auto-generated Swagger documentation.'
  },
  {
    id: 'viva-3',
    category: 'AI & Data Processing',
    question: 'How does vector similarity search work in your project, and why did you use chunking on the PDF documents?',
    expectedKeywords: ['Embeddings', 'High-dimensional vectors', 'FAISS', 'Cosine similarity', 'Context window limits', 'Precision'],
    guidance: 'Explain that LLMs have context limits and embeddings convert text into mathematical vector spaces where similar concepts sit close together.'
  },
  {
    id: 'viva-4',
    category: 'Database & Schema Design',
    question: 'How did you structure your relational tables or document collections, and how do you ensure query indexing efficiency?',
    expectedKeywords: ['Primary key', 'Foreign key', 'Indexes', 'ORM', 'SQLAlchemy / Mongoose', 'Normalisation'],
    guidance: 'Discuss key tables (e.g. Users, Resumes, AnalysisLogs), relationships, and index strategy on frequently searched columns.'
  },
  {
    id: 'viva-5',
    category: 'Deployment & Containerization',
    question: 'What challenges did you face when containerizing your application with Docker, and how did you configure Docker Compose?',
    expectedKeywords: ['Environment variables', 'Port mapping', 'Volume mounts', 'Docker Compose', 'Network bridge', 'Base image'],
    guidance: 'Mention multi-container setup (backend + DB), environment variable security, and host port binding (0.0.0.0).'
  }
];
