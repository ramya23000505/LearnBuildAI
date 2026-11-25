export const QUESTION_BANK = {
  Python: [
    {
      id: 'py-1',
      question: 'Which Pydantic feature in FastAPI automatically validates request payloads against defined TypeScript/Python types?',
      options: ['BaseModel schema classes', 'Marshmallow serializer', 'JSON.parse validator', 'Pickle deserializer'],
      answer: 0,
      skill: 'FastAPI / Python',
      explanation: 'FastAPI uses Pydantic\'s `BaseModel` to validate input types, parse incoming JSON, and automatically document endpoints in OpenAPI/Swagger UI.'
    },
    {
      id: 'py-2',
      question: 'In Python list comprehensions, what is the output of `[x**2 for x in range(5) if x % 2 == 0]`?',
      options: ['[0, 4, 16]', '[1, 9, 25]', '[0, 1, 4, 9, 16]', '[0, 2, 4]'],
      answer: 0,
      skill: 'Python Fundamentals',
      explanation: 'range(5) produces 0, 1, 2, 3, 4. Even numbers are 0, 2, 4. Their squares are 0, 4, and 16.'
    }
  ],
  FastAPI: [
    {
      id: 'fa-1',
      question: 'How do you accept an uploaded PDF file in a FastAPI route handler?',
      options: [
        'def upload(file: UploadFile = File(...))',
        'def upload(file: StringPath)',
        'def upload(file: Dict[str, Any])',
        'def upload(file: BinaryBlob)'
      ],
      answer: 0,
      skill: 'FastAPI File Handling',
      explanation: 'FastAPI provides `UploadFile` combined with `File(...)` from `fastapi` module for handling multipart form file uploads efficiently without storing everything in memory.'
    },
    {
      id: 'fa-2',
      question: 'Which HTTP status code should be returned when a client successfully creates a new resource (e.g. uploading a resume record)?',
      options: ['200 OK', '201 Created', '204 No Content', '302 Found'],
      answer: 1,
      skill: 'REST API Best Practices',
      explanation: 'HTTP 201 Created explicitly indicates that the request succeeded and led to the creation of a new resource.'
    }
  ],
  React: [
    {
      id: 're-1',
      question: 'What happens if you omit the dependency array in a `useEffect` hook (`useEffect(() => { ... })`)?',
      options: [
        'The effect runs only once on initial mount',
        'The effect never runs',
        'The effect runs after every single render cycle',
        'React throws a compile-time syntax error'
      ],
      answer: 2,
      skill: 'React Hooks',
      explanation: 'Without a dependency array, `useEffect` executes after every render, which can cause performance degradation or infinite render loops if state is updated inside.'
    },
    {
      id: 're-2',
      question: 'How should form inputs be handled in modern React applications to keep component state synchronized?',
      options: [
        'Controlled components linked to state via `onChange` handlers',
        'Direct DOM mutations via `document.getElementById`',
        'Global window variables',
        'Inline script tags in index.html'
      ],
      answer: 0,
      skill: 'React State Management',
      explanation: 'Controlled components bind input elements to React state, ensuring predictable single-source-of-truth state updates.'
    }
  ],
  LangChain: [
    {
      id: 'lc-1',
      question: 'Why do we chunk large documents into smaller text fragments (e.g. 500-1000 characters) before generating embeddings for vector search?',
      options: [
        'To reduce disk space usage',
        'To fit within LLM context limits and maximize vector retrieval precision',
        'To compress PDF files into zip archives',
        'Because vector databases cannot store text strings longer than 100 characters'
      ],
      answer: 1,
      skill: 'RAG & Vector Search',
      explanation: 'Chunking preserves local semantic context and prevents diluting embedding vectors, allowing similarity search to pinpoint exact relevant paragraphs.'
    },
    {
      id: 'lc-2',
      question: 'In FAISS or Pinecone, what metric is commonly calculated to measure similarity between query embeddings and document chunks?',
      options: ['Cosine Similarity / Inner Product', 'Euclidean Manhattan Grid Sum', 'Levenshtein Edit Distance', 'Jaccard Token Count'],
      answer: 0,
      skill: 'Vector Math',
      explanation: 'Cosine similarity (or normalized dot product) measures the cosine of the angle between high-dimensional embedding vectors to determine semantic closeness.'
    }
  ],
  Docker: [
    {
      id: 'dk-1',
      question: 'In a `Dockerfile`, which directive specifies the base operating environment or language runtime image?',
      options: ['FROM', 'RUN', 'WORKDIR', 'ENTRYPOINT'],
      answer: 0,
      skill: 'Docker Containerization',
      explanation: 'The `FROM` instruction initializes a new build stage and sets the Base Image (e.g., `FROM python:3.11-slim`).'
    },
    {
      id: 'dk-2',
      question: 'What is the primary benefit of using `docker-compose.yml` for a project with FastAPI backend and PostgreSQL database?',
      options: [
        'It automatically writes Python code for the backend',
        'It allows defining, configuring, and running multi-container applications with a single command (`docker-compose up`)',
        'It converts React components into native iOS apps',
        'It eliminates the need for any database passwords'
      ],
      answer: 1,
      skill: 'Docker Compose Orchestration',
      explanation: 'Docker Compose orchestrates multiple interconnected containers (e.g., app + database + cache) with unified networking and environment variables.'
    }
  ]
};
