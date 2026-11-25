export const DOMAINS = [
  { id: 'swe', name: 'Software Engineering', color: 'from-blue-500 to-indigo-600', icon: 'Code' },
  { id: 'ml', name: 'Machine Learning', color: 'from-purple-500 to-pink-600', icon: 'Brain' },
  { id: 'dl', name: 'Deep Learning', color: 'from-amber-500 to-red-600', icon: 'Cpu' },
  { id: 'nlp', name: 'NLP', color: 'from-emerald-500 to-teal-600', icon: 'FileText' },
  { id: 'ds', name: 'Data Science', color: 'from-cyan-500 to-blue-600', icon: 'BarChart' },
  { id: 'genai', name: 'Generative AI', color: 'from-violet-500 to-fuchsia-600', icon: 'Sparkles' }
];

export const REUSABLE_CONCEPT_BLOCKS = [
  // -------------------------------------------------------------------------
  // 1. Software Engineering
  // -------------------------------------------------------------------------
  {
    id: 'swe-jwt-auth',
    title: 'Login/Signup Auth System (JWT + bcrypt)',
    domain: 'Software Engineering',
    domainId: 'swe',
    difficulty: 'Beginner - Intermediate',
    estimatedTime: '1-2 Weeks',
    description: 'Stateless user authentication, password hashing with bcrypt, JWT token verification middleware, and protected API routes.',
    techStack: { language: 'Node.js', backend: 'Express.js', frontend: 'React', database: 'MongoDB', aiModels: 'N/A', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Express.js & Auth', mustLearn: ['Password Hashing with bcrypt', 'JWT Signing & Verification', 'Auth Middleware Guards', 'Protected API Routes', 'CORS & Cookie Headers'], skipped: ['OAuth2 Provider Integrations', 'Multi-tenant SSO', 'Biometric Passkeys'] }
    ]
  },
  {
    id: 'swe-rest-crud',
    title: 'REST API CRUD Service (Express / FastAPI)',
    domain: 'Software Engineering',
    domainId: 'swe',
    difficulty: 'Beginner',
    estimatedTime: '1 Week',
    description: 'Foundational backend routing, request validation with Pydantic/Joi, status codes (200, 201, 404, 500), and database CRUD operations.',
    techStack: { language: 'Python / JS', backend: 'FastAPI / Express', frontend: 'React', database: 'PostgreSQL', aiModels: 'N/A', container: 'Docker' },
    essentialConcepts: [
      { tech: 'REST Architecture', mustLearn: ['HTTP Methods (GET, POST, PUT, DELETE)', 'Path & Query Parameters', 'JSON Body Parsing', 'Response Schemas', 'Database Connections'], skipped: ['gRPC Streams', 'GraphQL Resolvers', 'Custom Binary Protocols'] }
    ]
  },
  {
    id: 'swe-kanban-board',
    title: 'Task/Kanban Board (Drag & Drop)',
    domain: 'Software Engineering',
    domainId: 'swe',
    difficulty: 'Intermediate',
    estimatedTime: '2 Weeks',
    description: 'Interactive Kanban board with drag-and-drop state management, real-time status updates, column ordering, and persistent storage.',
    techStack: { language: 'TypeScript', backend: 'Express.js', frontend: 'React + Dnd Kit', database: 'PostgreSQL', aiModels: 'N/A', container: 'Docker' },
    essentialConcepts: [
      { tech: 'React & State', mustLearn: ['Drag and Drop Hooks', 'Optimistic UI Updates', 'State Normalization', 'Reorder Mutations', 'Persisted Board State'], skipped: ['WebSockets Multi-cursor Sync', 'CRDT Conflict Resolution'] }
    ]
  },
  {
    id: 'swe-url-shortener',
    title: 'URL Shortener (Base62 Hashing)',
    domain: 'Software Engineering',
    domainId: 'swe',
    difficulty: 'Intermediate',
    estimatedTime: '1-2 Weeks',
    description: 'High-performance short URL generator using Base62 encoding, fast database lookups, redirection analytics, and collision avoidance.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React', database: 'Redis + PostgreSQL', aiModels: 'N/A', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Backend & Hashing', mustLearn: ['Base62 Encoding Algorithm', 'Fast Redis Caching', 'HTTP 301/302 Redirects', 'Click Counter Analytics', 'Unique Hash Indexing'], skipped: ['Global Distributed Geo-DNS', 'BGP Anycast Routing'] }
    ]
  },
  {
    id: 'swe-rate-limiter',
    title: 'Rate-Limited API Gateway (Token Bucket)',
    domain: 'Software Engineering',
    domainId: 'swe',
    difficulty: 'Advanced',
    estimatedTime: '2 Weeks',
    description: 'API gateway middleware implementing Token Bucket / Sliding Window rate limiting algorithm to prevent DDoS and API abuse.',
    techStack: { language: 'Go / Node.js', backend: 'Express / Gin', frontend: 'React Dashboard', database: 'Redis', aiModels: 'N/A', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Gateway & Systems', mustLearn: ['Token Bucket Algorithm', 'Sliding Window Counter', 'Redis Atomic Scripts', 'HTTP 429 Too Many Requests', 'IP / API Key Headers'], skipped: ['Hardware Load Balancers', 'eBPF Kernel Filtering'] }
    ]
  },

  // -------------------------------------------------------------------------
  // 2. Machine Learning
  // -------------------------------------------------------------------------
  {
    id: 'ml-house-price',
    title: 'Titanic / House Price Prediction',
    domain: 'Machine Learning',
    domainId: 'ml',
    difficulty: 'Beginner',
    estimatedTime: '1 Week',
    description: 'Classic supervised learning entry point demonstrating regression/classification, feature scaling, missing value imputation, and evaluation metrics.',
    techStack: { language: 'Python', backend: 'Flask', frontend: 'React', database: 'SQLite', aiModels: 'Scikit-Learn (Linear Regression / Random Forest)', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Scikit-Learn', mustLearn: ['Data Imputation & Encoding', 'Feature Scaling (StandardScaler)', 'Train/Test Split', 'MSE / R2 Score Evaluation', 'Model Pickling'], skipped: ['Neural Architecture Search', 'Distributed Training Clusters'] }
    ]
  },
  {
    id: 'ml-customer-churn',
    title: 'Customer Churn Predictor',
    domain: 'Machine Learning',
    domainId: 'ml',
    difficulty: 'Intermediate',
    estimatedTime: '1-2 Weeks',
    description: 'Industrial classification project analyzing customer attrition factors using XGBoost, ROC-AUC curve evaluation, and risk scoring APIs.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React', database: 'PostgreSQL', aiModels: 'XGBoost + LightGBM', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Feature Engineering', mustLearn: ['Categorical One-Hot Encoding', 'Feature Importance Analysis', 'XGBoost Classifier Tuning', 'Precision-Recall & ROC-AUC', 'Probability Thresholding'], skipped: ['Automated Pipeline Retraining', 'Spark Big Data Clusters'] }
    ]
  },
  {
    id: 'ml-spam-classifier',
    title: 'Spam Email Classifier (Naive Bayes)',
    domain: 'Machine Learning',
    domainId: 'ml',
    difficulty: 'Beginner - Intermediate',
    estimatedTime: '1 Week',
    description: 'Text classification model converting raw emails to numerical feature vectors using Bag-of-Words / TF-IDF and Naive Bayes algorithm.',
    techStack: { language: 'Python', backend: 'Flask', frontend: 'React', database: 'SQLite', aiModels: 'Scikit-Learn (MultinomialNB + TF-IDF)', container: 'Docker' },
    essentialConcepts: [
      { tech: 'ML & Text Vectorization', mustLearn: ['Text Normalization & Stemming', 'CountVectorizer & TF-IDF', 'Multinomial Naive Bayes', 'Confusion Matrix & F1 Score', 'REST API Model Endpoint'], skipped: ['Custom Transformer Encoders', 'Word Embeddings Training'] }
    ]
  },
  {
    id: 'ml-movie-recommender',
    title: 'Movie Recommendation System',
    domain: 'Machine Learning',
    domainId: 'ml',
    difficulty: 'Intermediate',
    estimatedTime: '2 Weeks',
    description: 'Collaborative filtering and content-based recommendation engine using Cosine Similarity matrix and Matrix Factorization (SVD).',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React', database: 'PostgreSQL', aiModels: 'Surprise / Scikit-Learn (SVD + Cosine Sim)', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Recommendation Models', mustLearn: ['Item-based & User-based Filtering', 'Cosine Similarity Matrix', 'Singular Value Decomposition (SVD)', 'Top-K Recommendation Queries', 'Cold-Start Fallbacks'], skipped: ['Real-time Streaming Graph Embeddings', 'Deep Factorization Machines'] }
    ]
  },
  {
    id: 'ml-model-deployment',
    title: 'Model Deployment via FastAPI API',
    domain: 'Machine Learning',
    domainId: 'ml',
    difficulty: 'Intermediate',
    estimatedTime: '1 Week',
    description: 'Packaging a trained machine learning model into a production-ready REST endpoint with input validation, batch inferencing, and Dockerization.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React', database: 'Redis', aiModels: 'Joblib / ONNX Runtime', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Model Serving', mustLearn: ['Pydantic Request Schemas', 'Loading Pickled / ONNX Artifacts', 'Inference Endpoint Optimization', 'Batch Prediction Handlers', 'Health & Latency Checkers'], skipped: ['Triton Inference Server Clusters', 'Edge TensorRT Compilers'] }
    ]
  },

  // -------------------------------------------------------------------------
  // 3. Deep Learning
  // -------------------------------------------------------------------------
  {
    id: 'dl-mnist-digits',
    title: 'Handwritten Digit Recognition (MNIST CNN)',
    domain: 'Deep Learning',
    domainId: 'dl',
    difficulty: 'Beginner',
    estimatedTime: '1 Week',
    description: 'Foundational Computer Vision entry point building a Convolutional Neural Network (CNN) in TensorFlow/PyTorch for digit image recognition.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React + Canvas Draw', database: 'SQLite', aiModels: 'PyTorch / Keras (CNN)', container: 'Docker' },
    essentialConcepts: [
      { tech: 'PyTorch / Keras', mustLearn: ['Convolutional & Max-Pooling Layers', 'ReLU Activation & Softmax Output', 'Cross-Entropy Loss & Adam', 'Epoch Training & Accuracy Loops', 'Canvas Image Preprocessing (28x28)'], skipped: ['Custom CUDA C++ Kernels', 'Multi-GPU Distributed Data Parallel'] }
    ]
  },
  {
    id: 'dl-image-classifier',
    title: 'Image Classifier (Transfer Learning ResNet)',
    domain: 'Deep Learning',
    domainId: 'dl',
    difficulty: 'Intermediate',
    estimatedTime: '2 Weeks',
    description: 'Custom dataset image classification system utilizing Transfer Learning with pretrained ResNet50 / MobileNet architectures.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React', database: 'PostgreSQL', aiModels: 'PyTorch / torchvision (ResNet50)', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Transfer Learning', mustLearn: ['Pretrained Weights & Layer Freezing', 'Data Augmentation (Flips, Rotations)', 'Fine-Tuning Final Classification Head', 'Image Tensor Normalization', 'Confidence Score Calculation'], skipped: ['Vision Transformer Architecture Pretraining', 'Self-Supervised Contrastive Learning'] }
    ]
  },
  {
    id: 'dl-face-detection',
    title: 'Face Detection & Recognition App',
    domain: 'Deep Learning',
    domainId: 'dl',
    difficulty: 'Intermediate - Advanced',
    estimatedTime: '2-3 Weeks',
    description: 'Real-time facial detection and identity recognition web app integrating OpenCV image processing and DeepFace embedding vectors.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React + WebCam', database: 'PostgreSQL', aiModels: 'OpenCV + DeepFace / dlib', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Computer Vision', mustLearn: ['Haar Cascades / MTCNN Face Alignment', 'Face Embedding Vector Extraction', 'Euclidean / Cosine Distance Matching', 'WebCam Video Frame Parsing', 'Bounding Box Rendering'], skipped: ['3D Mesh Face Morphing', 'Thermal Infrared Video Alignment'] }
    ]
  },
  {
    id: 'dl-sentiment-rnn',
    title: 'Sentiment Analysis with RNN / LSTM',
    domain: 'Deep Learning',
    domainId: 'dl',
    difficulty: 'Intermediate',
    estimatedTime: '2 Weeks',
    description: 'Sequence modeling neural network using Recurrent Neural Networks (RNN) and Long Short-Term Memory (LSTM) cells for review sentiment classification.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React', database: 'SQLite', aiModels: 'PyTorch (Embedding + LSTM + Linear)', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Sequence Models', mustLearn: ['Tokenization & Vocabulary Mapping', 'Word Embedding Layer (GloVe / nn.Embedding)', 'Bidirectional LSTM Gates', 'Sequence Padding & Truncation', 'Binary Cross-Entropy Loss'], skipped: ['Transformer Attention Heads', 'Custom Cell Gating Math'] }
    ]
  },
  {
    id: 'dl-object-detection',
    title: 'Object Detection (YOLO-Lite)',
    domain: 'Deep Learning',
    domainId: 'dl',
    difficulty: 'Advanced',
    estimatedTime: '3 Weeks',
    description: 'Real-time multi-object detection pipeline utilizing YOLOv8 / YOLO-nano model for bounding box prediction, class labels, and confidence filtering.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React + Canvas', database: 'PostgreSQL', aiModels: 'Ultralytics YOLOv8 / ONNX', container: 'Docker GPU' },
    essentialConcepts: [
      { tech: 'YOLO & Bounding Boxes', mustLearn: ['Bounding Box Coordinates (xywh)', 'Non-Maximum Suppression (NMS)', 'Intersection over Union (IoU)', 'ONNX Runtime Web Serving', 'Class Label Mapping'], skipped: ['3D LiDAR Point Cloud Segmentation', 'Anchor Box Manual Clustering'] }
    ]
  },

  // -------------------------------------------------------------------------
  // 4. NLP (Natural Language Processing)
  // -------------------------------------------------------------------------
  {
    id: 'nlp-text-summarizer',
    title: 'Text Summarizer (Extractive vs Abstractive)',
    domain: 'NLP',
    domainId: 'nlp',
    difficulty: 'Beginner - Intermediate',
    estimatedTime: '1-2 Weeks',
    description: 'Document condensation engine demonstrating extractive summarization (TextRank / TF-IDF) and abstractive summarization (BART / T5 models).',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React', database: 'SQLite', aiModels: 'HuggingFace Transformers (BART / T5)', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Summarization NLP', mustLearn: ['TextRank Graph Summarization', 'HuggingFace Pipeline Integration', 'Token Length Chunking', 'Rouge-1 / Rouge-L Metrics', 'Summary Compression Ratio'], skipped: ['Multi-Document Cross-lingual Summarization', 'Custom Attention Fine-tuning'] }
    ]
  },
  {
    id: 'nlp-ner-tool',
    title: 'Named Entity Recognition (NER) Tool',
    domain: 'NLP',
    domainId: 'nlp',
    difficulty: 'Intermediate',
    estimatedTime: '1-2 Weeks',
    description: 'Information extraction pipeline identifying medical/business entities (PER, ORG, LOC, DATE) from unstructured text using SpaCy and BERT.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React', database: 'PostgreSQL', aiModels: 'SpaCy + HuggingFace dslim/bert-base-NER', container: 'Docker' },
    essentialConcepts: [
      { tech: 'NER & Token Tagging', mustLearn: ['Subword Tokenization & BIO Tagging', 'SpaCy Entity Recognizer', 'Entity Offset Indexing', 'Entity Label Color Highlighting', 'Custom Dictionary Regex Matchers'], skipped: ['Nested Entity Tree Parsing', 'Zero-shot Cross-lingual Tagging'] }
    ]
  },
  {
    id: 'nlp-sentiment-tool',
    title: 'Sentiment Analysis Tool (VADER & RoBERTa)',
    domain: 'NLP',
    domainId: 'nlp',
    difficulty: 'Beginner',
    estimatedTime: '1 Week',
    description: 'Real-time text sentiment analyzer comparing lexicon-based VADER scores against deep learning RoBERTa sentiment predictions.',
    techStack: { language: 'Python', backend: 'Flask', frontend: 'React', database: 'SQLite', aiModels: 'NLTK VADER + RoBERTa Sentiment', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Sentiment & Lexicons', mustLearn: ['VADER Compound Scoring', 'RoBERTa Softmax Probability Output', 'Text Preprocessing & Emoji Handling', 'Batch Text Analytics API', 'Gauge Chart Visualization'], skipped: ['Aspect-Based Fine-grained Sentiment Parsing', 'Audio Pitch Emotion Analysis'] }
    ]
  },
  {
    id: 'nlp-intent-chatbot',
    title: 'Chatbot with Intent Classification',
    domain: 'NLP',
    domainId: 'nlp',
    difficulty: 'Intermediate',
    estimatedTime: '2 Weeks',
    description: 'Conversational agent identifying user intents and extracting slot entities using intent classification pipelines and response templates.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React', database: 'PostgreSQL', aiModels: 'Rasa / Scikit-Learn Intent Model', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Intent & Entity Parsing', mustLearn: ['Intent Classification Pipeline', 'Slot Filling & Entity Extraction', 'Dialogue Context State Tracking', 'Fallback Intent Handling', 'Interactive Chat Widget'], skipped: ['Voice Telephony Speech-to-Text Integrations', 'Multi-party Dialogue Managers'] }
    ]
  },
  {
    id: 'nlp-rag-qa',
    title: 'RAG-based Q&A over Documents',
    domain: 'NLP',
    domainId: 'nlp',
    difficulty: 'Advanced',
    estimatedTime: '2-3 Weeks',
    description: 'High-demand RAG pipeline retrieving context from PDF documents using ChromaDB vector database and generating answers via LLMs.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React', database: 'ChromaDB + PostgreSQL', aiModels: 'LangChain + OpenAI / Llama-3', container: 'Docker' },
    essentialConcepts: [
      { tech: 'RAG Architecture', mustLearn: ['PDF Document Splitting & Chunking', 'Vector Embedding Generation', 'Vector DB Similarity Querying', 'Context Injection Prompting', 'Source Citation Tracking'], skipped: ['Graph-RAG Knowledge Base Parsing', 'Self-RAG Reflection Loops'] }
    ]
  },

  // -------------------------------------------------------------------------
  // 5. Data Science
  // -------------------------------------------------------------------------
  {
    id: 'ds-eda-pipeline',
    title: 'Exploratory Data Analysis (EDA) Tool',
    domain: 'Data Science',
    domainId: 'ds',
    difficulty: 'Beginner',
    estimatedTime: '1 Week',
    description: 'Automated data profiling dashboard generating correlation heatmaps, missing value summaries, outlier detection boxplots, and distributions.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React + Plotly.js', database: 'PostgreSQL', aiModels: 'Pandas + Seaborn', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Pandas & Profiling', mustLearn: ['Missing Value Imputation Strategy', 'Outlier Detection (IQR / Z-score)', 'Correlation Matrix Heatmaps', 'Feature Skewness Transformation', 'Plotly Interactive Visualizations'], skipped: ['Distributed Dask Big Data Processing', 'Custom C++ Cython Extensions'] }
    ]
  },
  {
    id: 'ds-sales-dashboard',
    title: 'Sales & Revenue Analytics Dashboard',
    domain: 'Data Science',
    domainId: 'ds',
    difficulty: 'Intermediate',
    estimatedTime: '1-2 Weeks',
    description: 'Business metric storytelling dashboard displaying Monthly Recurring Revenue (MRR), Churn Rate, Customer Lifetime Value (CLV), and cohorts.',
    techStack: { language: 'Python / SQL', backend: 'FastAPI', frontend: 'React + Recharts', database: 'PostgreSQL', aiModels: 'Pandas Analytics', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Metrics & Data Science', mustLearn: ['Cohort Retention Matrix Computation', 'Customer Lifetime Value (CLV)', 'SQL Aggregations & Grouping', 'KPI Card Metric Calculations', 'Time-series Date Binning'], skipped: ['Real-time Kafka Event Streaming', 'Multi-tenant Data Warehouses'] }
    ]
  },
  {
    id: 'ds-ab-testing',
    title: 'A/B Testing & Hypothesis Analyzer',
    domain: 'Data Science',
    domainId: 'ds',
    difficulty: 'Intermediate',
    estimatedTime: '1-2 Weeks',
    description: 'Statistical significance calculator evaluating A/B test conversion rates using Z-tests, t-tests, P-values, confidence intervals, and power analysis.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React', database: 'SQLite', aiModels: 'SciPy Stats + Statsmodels', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Statistical Analysis', mustLearn: ['Null & Alternative Hypothesis Rules', 'Two-Sample Z-Test & T-Test', 'P-value Calculation (< 0.05)', '95% Confidence Interval Bounds', 'Minimum Sample Size Calculation'], skipped: ['Multi-Armed Bandit Reinforcement Routing', 'Bayesian Sequential Testing'] }
    ]
  },
  {
    id: 'ds-timeseries-forecasting',
    title: 'Time-Series Forecasting System',
    domain: 'Data Science',
    domainId: 'ds',
    difficulty: 'Advanced',
    estimatedTime: '2 Weeks',
    description: 'Trend and seasonality forecasting system modeling sales and stock demand using Prophet, ARIMA, and Exponential Smoothing.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React + Chart.js', database: 'PostgreSQL', aiModels: 'Prophet + Statsmodels ARIMA', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Time-Series Analysis', mustLearn: ['Stationarity & Dickey-Fuller Test', 'Trend & Seasonality Decomposition', 'ARIMA (p, d, q) Parameter Tuning', 'Prophet Holiday Component Setup', 'MAPE / RMSE Forecast Evaluation'], skipped: ['Deep Temporal Convolutional Networks', 'High-Frequency Algorithmic Order Matching'] }
    ]
  },
  {
    id: 'ds-sql-data-pipeline',
    title: 'SQL-based Data Pipeline Project',
    domain: 'Data Science',
    domainId: 'ds',
    difficulty: 'Intermediate',
    estimatedTime: '2 Weeks',
    description: 'ETL data warehouse pipeline executing complex SQL transformations, window functions, CTEs, indexing optimizations, and star schemas.',
    techStack: { language: 'Python / SQL', backend: 'FastAPI', frontend: 'React', database: 'PostgreSQL / DuckDB', aiModels: 'SQLAlchemy / dbt', container: 'Docker' },
    essentialConcepts: [
      { tech: 'SQL & Data Pipelines', mustLearn: ['Window Functions (ROW_NUMBER, DENSE_RANK)', 'Common Table Expressions (CTEs)', 'INNER / LEFT / FULL JOIN Optimizations', 'B-Tree Indexing Strategy', 'Star Schema & Fact/Dimension Tables'], skipped: ['Snowflake Warehouse Query Tuning', 'Spark Cluster Sharding'] }
    ]
  },

  // -------------------------------------------------------------------------
  // 6. Generative AI
  // -------------------------------------------------------------------------
  {
    id: 'genai-notes-quiz',
    title: 'AI Notes-to-Quiz Generator',
    domain: 'Generative AI',
    domainId: 'genai',
    difficulty: 'Beginner - Intermediate',
    estimatedTime: '1-2 Weeks',
    description: 'Generative AI application taking raw text notes or PDFs and outputting structured multiple-choice quizzes with explanations using Pydantic output parsers.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React', database: 'PostgreSQL', aiModels: 'LangChain + OpenAI / Llama-3', container: 'Docker' },
    essentialConcepts: [
      { tech: 'GenAI & Structured Outputs', mustLearn: ['System Prompt Engineering', 'Pydantic Output JSON Parsers', 'Few-Shot Prompting Examples', 'Temperature & Top-P Parameters', 'Interactive Quiz Component'], skipped: ['Fine-tuning Llama Weights from Scratch', 'LoRA Adapter Merging'] }
    ]
  },
  {
    id: 'genai-resume-analyzer',
    title: 'Resume/JD Skill-Gap Analyzer',
    domain: 'Generative AI',
    domainId: 'genai',
    difficulty: 'Intermediate',
    estimatedTime: '2 Weeks',
    description: 'LLM-driven resume evaluation tool analyzing job description requirements, computing match percentages, and generating missing skill roadmaps.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React', database: 'PostgreSQL', aiModels: 'LangChain + OpenAI / Claude', container: 'Docker' },
    essentialConcepts: [
      { tech: 'LLM Analysis', mustLearn: ['Structured Resume PDF Parsing', 'Job Description Requirement Extraction', 'Match Score Computation', 'Actionable Recommendation Prompts', 'Markdown Report Generation'], skipped: ['Multi-model Agentic Ensembles', 'Custom Embeddings Fine-tuning'] }
    ]
  },
  {
    id: 'genai-rag-chatbot',
    title: 'RAG-based Document Chatbot',
    domain: 'Generative AI',
    domainId: 'genai',
    difficulty: 'Advanced',
    estimatedTime: '2-3 Weeks',
    description: 'Top-demand GenAI skill: Document Q&A assistant leveraging vector embeddings (FAISS/Chroma), similarity retrieval, and streamed LLM responses.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React', database: 'FAISS + PostgreSQL', aiModels: 'LangChain + OpenAI / Llama-3', container: 'Docker' },
    essentialConcepts: [
      { tech: 'RAG Systems', mustLearn: ['Recursive Text Chunking', 'Vector Embedding Storage', 'Cosine Similarity Vector Search', 'Prompt Context Injection', 'Streaming Server-Sent Events (SSE)'], skipped: ['Graph Vector DB HyDE Hybrids', 'Custom Attention Layers'] }
    ]
  },
  {
    id: 'genai-image-caption',
    title: 'AI Image Caption Generator (Multimodal)',
    domain: 'Generative AI',
    domainId: 'genai',
    difficulty: 'Intermediate',
    estimatedTime: '2 Weeks',
    description: 'Multimodal Generative AI project combining vision models (BLIP / GPT-4o Vision) to generate natural language descriptions and tags for uploaded images.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React', database: 'PostgreSQL', aiModels: 'HuggingFace BLIP / GPT-4o Vision', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Multimodal AI', mustLearn: ['Vision Tensor Preprocessing', 'BLIP Caption Generation Model', 'Prompt Guided Image Querying', 'Image Upload API Endpoints', 'Tag Extraction Parsing'], skipped: ['Stable Diffusion UNet Fine-Tuning', 'Diffusion Latent Space Manipulation'] }
    ]
  },
  {
    id: 'genai-prompt-chaining',
    title: 'Prompt-Chaining Workflow App',
    domain: 'Generative AI',
    domainId: 'genai',
    difficulty: 'Advanced',
    estimatedTime: '2-3 Weeks',
    description: 'Agentic workflow generator executing multi-step LLM chains (Outline -> Draft -> Review -> Refine) with state persistence and step-by-step verification.',
    techStack: { language: 'Python', backend: 'FastAPI', frontend: 'React', database: 'PostgreSQL', aiModels: 'LangChain Sequential Chains / LangGraph', container: 'Docker' },
    essentialConcepts: [
      { tech: 'Agentic Workflows', mustLearn: ['Sequential Chain Data Passing', 'Step-by-step Output Validation', 'Intermediate State Persistence', 'Chain Exception Fallbacks', 'Step Stepper UX Rendering'], skipped: ['Autonomous Multi-agent Swarms', 'RLHF Reward Modeling'] }
    ]
  }
];

export const PRESET_PROJECTS = REUSABLE_CONCEPT_BLOCKS;
