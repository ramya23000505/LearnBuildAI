export const LEARNING_RESOURCES = {
  FastAPI: {
    title: 'FastAPI Minimal Core Essentials',
    summary: 'FastAPI is a modern, high-performance web framework for building APIs with Python based on standard Python type hints.',
    docUrl: 'https://fastapi.tiangolo.com/tutorial/',
    cheatSheet: [
      { topic: 'Path Parameters', code: '@app.get("/items/{item_id}")\ndef read_item(item_id: int):\n    return {"item_id": item_id}' },
      { topic: 'Request Body (Pydantic)', code: 'class Resume(BaseModel):\n    name: str\n    skills: List[str]\n\n@app.post("/resumes/")\ndef create(res: Resume):\n    return res' },
      { topic: 'File Upload', code: '@app.post("/upload")\nasync def upload_file(file: UploadFile = File(...)):\n    contents = await file.read()\n    return {"filename": file.filename, "size": len(contents)}' }
    ],
    shortNotes: [
      'FastAPI uses Pydantic for standard data validation without writing custom regex/parser logic.',
      'Automatic Swagger UI is generated at `/docs` out-of-the-box.',
      'Use `UploadFile` instead of raw `bytes` for handling large PDFs or images to prevent RAM memory spikes.'
    ],
    miniExercise: {
      instructions: 'Write a FastAPI POST endpoint named `/analyze` that receives a JSON body containing `text` (string) and returns a JSON response with `word_count` (integer).',
      initialCode: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class TextPayload(BaseModel):
    text: str

# TODO: Add POST route /analyze
`,
      solutionCode: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class TextPayload(BaseModel):
    text: str

@app.post("/analyze")
def analyze_text(payload: TextPayload):
    words = payload.text.split()
    return {"word_count": len(words), "status": "success"}
`
    }
  },
  'LangChain & Vector DB': {
    title: 'LangChain & RAG Vector Retrieval',
    summary: 'Retrieval-Augmented Generation (RAG) connects an LLM with external PDF documents using embeddings and vector similarity indexes like FAISS.',
    docUrl: 'https://python.langchain.com/docs/get_started/introduction',
    cheatSheet: [
      { topic: 'PDF Loading & Splitting', code: 'from langchain.document_loaders import PyPDFLoader\nfrom langchain.text_splitter import RecursiveCharacterTextSplitter\n\nloader = PyPDFLoader("resume.pdf")\ndocs = loader.load()\nsplitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)\nchunks = splitter.split_documents(docs)' },
      { topic: 'FAISS Embedding Store', code: 'from langchain.embeddings import OpenAIEmbeddings\nfrom langchain.vectorstores import FAISS\n\nembeddings = OpenAIEmbeddings()\nvector_db = FAISS.from_documents(chunks, embeddings)\nresults = vector_db.similarity_search("Python developer", k=3)' }
    ],
    shortNotes: [
      'Chunk size of 500-1000 characters balances contextual richness with vector retrieval granularity.',
      'FAISS runs locally in memory, making it ideal for quick prototyping without external cloud subscription fees.',
      'Always include overlap (e.g. 50-100 chars) between chunks to avoid cutting sentences in half.'
    ],
    miniExercise: {
      instructions: 'Complete the Python script to split text into chunks of 100 characters with 20 overlap.',
      initialCode: `from langchain.text_splitter import RecursiveCharacterTextSplitter

text = "LearnBuild AI teaches essential concepts before project building..."
# TODO: Initialize RecursiveCharacterTextSplitter
`,
      solutionCode: `from langchain.text_splitter import RecursiveCharacterTextSplitter

text = "LearnBuild AI teaches essential concepts before project building..."
splitter = RecursiveCharacterTextSplitter(chunk_size=100, chunk_overlap=20)
chunks = splitter.split_text(text)
print(f"Created {len(chunks)} chunks")
`
    }
  },
  React: {
    title: 'React Core Essentials for APIs',
    summary: 'Focus on component lifecycle, `useState` for component reactivity, `useEffect` for fetching API data, and handling user inputs.',
    docUrl: 'https://react.dev/learn',
    cheatSheet: [
      { topic: 'Fetching API Data', code: 'const [data, setData] = useState(null);\nuseEffect(() => {\n  fetch("/api/status")\n    .then(res => res.json())\n    .then(json => setData(json));\n}, []);' },
      { topic: 'File Input State', code: 'const [file, setFile] = useState(null);\nconst handleUpload = (e) => {\n  setFile(e.target.files[0]);\n};' }
    ],
    shortNotes: [
      'Keep state local unless multiple components need access.',
      'Use `FormData` object in JavaScript when posting multipart files via Axios or fetch.'
    ],
    miniExercise: {
      instructions: 'Create a state hook to track user upload progress percentage.',
      initialCode: `import React, { useState } from 'react';

function UploadProgress() {
  // TODO: Add useState for progress (number 0-100)
  return <div>Progress: 0%</div>;
}
`,
      solutionCode: `import React, { useState } from 'react';

function UploadProgress() {
  const [progress, setProgress] = useState(0);
  return (
    <div>
      <div>Progress: {progress}%</div>
      <button onClick={() => setProgress(prev => Math.min(100, prev + 10))}>Increase</button>
    </div>
  );
}
`
    }
  },
  Docker: {
    title: 'Docker Containerization Fundamentals',
    summary: 'Docker packages your code, runtime, and system dependencies into reproducible containers.',
    docUrl: 'https://docs.docker.com/get-started/',
    cheatSheet: [
      { topic: 'Python Dockerfile', code: 'FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]' },
      { topic: 'Docker Compose', code: 'version: "3.8"\nservices:\n  backend:\n    build: .\n    ports:\n      - "8000:8000"\n    environment:\n      - DB_HOST=db\n  db:\n    image: postgres:15\n    environment:\n      POSTGRES_PASSWORD=secret' }
    ],
    shortNotes: [
      'Always place `COPY requirements.txt` BEFORE `COPY . .` to leverage Docker layer caching during rebuilds.',
      '`0.0.0.0` host binding inside Docker ensures containers can expose ports outside.'
    ],
    miniExercise: {
      instructions: 'Write the command in Dockerfile to expose port 8000 and run uvicorn.',
      initialCode: `# Dockerfile fragment
# TODO: Specify EXPOSE and CMD instructions
`,
      solutionCode: `# Dockerfile fragment
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
`
    }
  }
};
