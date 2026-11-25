/**
 * LearnBuild AI — Global Technology Knowledge Base & Graph
 * 
 * Reusable, extensible, domain-independent knowledge graph mapping:
 * Capabilities -> Technologies -> Concepts -> Prerequisites -> Tradeoffs
 */

export const DOMAINS_TAXONOMY = {
  swe: { id: 'swe', name: 'Software Engineering', icon: 'Code', color: 'from-blue-500 to-indigo-600' },
  web: { id: 'web', name: 'Web Development', icon: 'Globe', color: 'from-cyan-500 to-blue-600' },
  mobile: { id: 'mobile', name: 'Mobile Development', icon: 'Smartphone', color: 'from-sky-500 to-indigo-600' },
  webrtc: { id: 'webrtc', name: 'Real-Time / WebRTC Systems', icon: 'Radio', color: 'from-rose-500 to-pink-600' },
  ai: { id: 'ai', name: 'Artificial Intelligence', icon: 'Sparkles', color: 'from-violet-500 to-purple-600' },
  ml: { id: 'ml', name: 'Machine Learning', icon: 'Brain', color: 'from-purple-500 to-pink-600' },
  dl: { id: 'dl', name: 'Deep Learning', icon: 'Cpu', color: 'from-amber-500 to-red-600' },
  cv: { id: 'cv', name: 'Computer Vision', icon: 'Camera', color: 'from-amber-500 to-orange-600' },
  nlp: { id: 'nlp', name: 'Natural Language Processing', icon: 'FileText', color: 'from-emerald-500 to-teal-600' },
  genai: { id: 'genai', name: 'Generative AI & LLMs', icon: 'Sparkles', color: 'from-fuchsia-500 to-purple-600' },
  ds: { id: 'ds', name: 'Data Science & Analytics', icon: 'BarChart', color: 'from-cyan-500 to-emerald-600' },
  data_eng: { id: 'data_eng', name: 'Data Engineering & Pipelines', icon: 'Database', color: 'from-teal-500 to-cyan-600' },
  cybersecurity: { id: 'cybersecurity', name: 'Cybersecurity & Privacy', icon: 'ShieldAlert', color: 'from-red-500 to-rose-700' },
  cloud: { id: 'cloud', name: 'Cloud & Infrastructure', icon: 'Cloud', color: 'from-sky-500 to-blue-700' },
  devops: { id: 'devops', name: 'DevOps & CI/CD', icon: 'Terminal', color: 'from-slate-500 to-gray-700' },
  iot: { id: 'iot', name: 'Internet of Things (IoT)', icon: 'Wifi', color: 'from-green-500 to-emerald-700' },
  robotics: { id: 'robotics', name: 'Robotics & Embedded Systems', icon: 'Bot', color: 'from-zinc-500 to-stone-700' },
  blockchain: { id: 'blockchain', name: 'Blockchain & Web3', icon: 'Link2', color: 'from-amber-500 to-yellow-600' },
  fintech: { id: 'fintech', name: 'FinTech & Payments', icon: 'DollarSign', color: 'from-emerald-500 to-green-600' },
  healthcare: { id: 'healthcare', name: 'Healthcare & MedTech', icon: 'Activity', color: 'from-red-500 to-pink-600' },
  education: { id: 'education', name: 'EdTech & Learning', icon: 'BookOpen', color: 'from-indigo-500 to-violet-600' },
  ecommerce: { id: 'ecommerce', name: 'E-Commerce & Retail', icon: 'ShoppingBag', color: 'from-orange-500 to-amber-600' },
  social: { id: 'social', name: 'Social Platforms & Communities', icon: 'Users', color: 'from-pink-500 to-rose-600' },
  enterprise: { id: 'enterprise', name: 'Enterprise Software & ERP', icon: 'Briefcase', color: 'from-blue-600 to-slate-800' }
};

export const CAPABILITIES_REGISTRY = {
  // Real-time & Communication
  realtime_video_audio: {
    id: 'realtime_video_audio',
    name: 'Real-Time Audio / Video Communication',
    category: 'communication',
    description: 'Sub-second peer-to-peer or media-server-assisted audio and video streams between clients.',
    keywords: ['video call', 'video streaming', 'webrtc', 'audio call', 'video conference', 'screen share', 'stream video', 'live streaming']
  },
  realtime_messaging: {
    id: 'realtime_messaging',
    name: 'Real-Time Bi-Directional Messaging & Events',
    category: 'communication',
    description: 'Full-duplex low-latency socket communication for chats, live notifications, or collaborative cursors.',
    keywords: ['chat', 'instant messaging', 'socket', 'websocket', 'live updates', 'presence', 'collaborative', 'real-time notification']
  },
  iot_telemetry_streaming: {
    id: 'iot_telemetry_streaming',
    name: 'Lightweight IoT Sensor Ingestion & Telemetry',
    category: 'communication',
    description: 'Low-overhead publish/subscribe telemetry message streaming for constrained microcontrollers.',
    keywords: ['iot', 'sensor', 'telemetry', 'mqtt', 'esp32', 'arduino', 'raspberry pi', 'embedded', 'temperature', 'humidity', 'smart device']
  },

  // Client & Presentation
  responsive_web_ui: {
    id: 'responsive_web_ui',
    name: 'Interactive Responsive Web Presentation',
    category: 'presentation',
    description: 'Component-driven, accessible web interface adapting across mobile, tablet, and desktop screens.',
    keywords: ['web', 'browser', 'dashboard', 'portal', 'website', 'landing page', 'frontend', 'ui', 'user interface']
  },
  cross_platform_mobile: {
    id: 'cross_platform_mobile',
    name: 'Cross-Platform Mobile Application',
    category: 'presentation',
    description: 'Native mobile client running on iOS and Android with access to device hardware (camera, GPS, sensors).',
    keywords: ['mobile', 'android', 'ios', 'smartphone', 'mobile app', 'flutter', 'react native', 'apk']
  },
  cli_interface: {
    id: 'cli_interface',
    name: 'Command-Line Interface & Tooling',
    category: 'presentation',
    description: 'Terminal-based developer tool, CLI parser, and interactive console workflow.',
    keywords: ['cli', 'command line', 'terminal', 'script', 'shell tool', 'developer utility']
  },

  // API & Application Logic
  restful_api_services: {
    id: 'restful_api_services',
    name: 'RESTful API Endpoint Services',
    category: 'application',
    description: 'HTTP/JSON endpoint routing, request deserialization, status codes, and CRUD controllers.',
    keywords: ['api', 'rest', 'endpoints', 'crud', 'backend', 'routing', 'http service', 'web service']
  },
  high_performance_microservice: {
    id: 'high_performance_microservice',
    name: 'Low-Latency High-Throughput Service',
    category: 'application',
    description: 'Compiled, concurrent backend microservice capable of tens of thousands of requests per second.',
    keywords: ['high throughput', 'microservice', 'low latency', 'concurrency', 'scalable backend', 'grpc', 'high performance']
  },
  event_driven_pipeline: {
    id: 'event_driven_pipeline',
    name: 'Asynchronous Event-Driven Processing',
    category: 'application',
    description: 'Decoupled asynchronous worker queues and pub/sub message brokers for background jobs.',
    keywords: ['background job', 'queue', 'async worker', 'event driven', 'celery', 'kafka', 'message queue', 'pub sub']
  },

  // Security & Authentication
  stateless_token_auth: {
    id: 'stateless_token_auth',
    name: 'Stateless User Authentication & Authorization',
    category: 'security',
    description: 'Secure password hashing (bcrypt/Argon2), signed JWT tokens, and role-based access control (RBAC).',
    keywords: ['login', 'signup', 'auth', 'authentication', 'jwt', 'password', 'user accounts', 'rbac', 'permissions']
  },
  federated_oauth_sso: {
    id: 'federated_oauth_sso',
    name: 'Federated OAuth2 & Single Sign-On (SSO)',
    category: 'security',
    description: 'Third-party social authentication (Google, GitHub, Microsoft) via OAuth2 and OpenID Connect.',
    keywords: ['oauth', 'sso', 'google login', 'single sign on', 'oidc', 'third party login']
  },
  network_packet_inspection: {
    id: 'network_packet_inspection',
    name: 'Network Traffic Inspection & Intrusion Detection',
    category: 'security',
    description: 'Deep packet inspection, anomaly detection, port scanning, and firewall rule enforcement.',
    keywords: ['cybersecurity', 'firewall', 'packet', 'ids', 'ips', 'snort', 'pcap', 'intrusion detection', 'network security', 'threat detection']
  },

  // Data & Storage
  relational_acid_persistence: {
    id: 'relational_acid_persistence',
    name: 'Relational ACID Structured Persistence',
    category: 'data',
    description: 'Strict schema integrity, relational foreign keys, SQL joins, and transactional consistency.',
    keywords: ['sql', 'relational', 'acid', 'transactions', 'database', 'postgres', 'orders', 'users table', 'inventory', 'financial ledger']
  },
  flexible_document_persistence: {
    id: 'flexible_document_persistence',
    name: 'Schemaless Hierarchical Document Storage',
    category: 'data',
    description: 'Flexible JSON/BSON document collections suitable for polymorphic content or rapid schema iteration.',
    keywords: ['document db', 'nosql', 'mongodb', 'json storage', 'flexible schema', 'catalog', 'content management']
  },
  fast_in_memory_caching: {
    id: 'fast_in_memory_caching',
    name: 'In-Memory Key-Value Caching & Rate Limiting',
    category: 'data',
    description: 'Sub-millisecond read/write cache, token bucket rate limiters, session stores, and pub/sub.',
    keywords: ['cache', 'redis', 'rate limit', 'session store', 'fast lookup', 'in memory', 'ttl']
  },
  embedded_analytical_olap: {
    id: 'embedded_analytical_olap',
    name: 'Embedded Analytical OLAP & Fast Aggregations',
    category: 'data',
    description: 'Columnar analytical database engine for fast SQL aggregations over millions of rows without a server.',
    keywords: ['olap', 'analytics', 'duckdb', 'columnar', 'aggregations', 'parquet', 'data science query']
  },

  // AI / ML / CV / NLP / GenAI
  tabular_supervised_ml: {
    id: 'tabular_supervised_ml',
    name: 'Tabular Supervised Classification & Regression',
    category: 'ai_ml',
    description: 'Feature engineering, model training (Random Forest, XGBoost), cross-validation, and metrics (RMSE, F1).',
    keywords: ['predict', 'classification', 'regression', 'churn', 'price prediction', 'tabular', 'scikit-learn', 'xgboost', 'random forest']
  },
  computer_vision_inference: {
    id: 'computer_vision_inference',
    name: 'Image & Video Computer Vision Inference',
    category: 'ai_ml',
    description: 'Image preprocessing, convolutional feature extraction, object detection (YOLO), or segmentation (CNN).',
    keywords: ['image', 'video', 'vision', 'opencv', 'object detection', 'yolo', 'cnn', 'face recognition', 'medical imaging', 'mri', 'tumor']
  },
  nlp_text_processing: {
    id: 'nlp_text_processing',
    name: 'Natural Language Text Processing & Classification',
    category: 'ai_ml',
    description: 'Tokenization, stopword filtering, TF-IDF vectorization, named entity recognition (NER), and sentiment analysis.',
    keywords: ['nlp', 'text', 'sentiment', 'ner', 'named entity', 'text classification', 'spam', 'summarization']
  },
  rag_semantic_search: {
    id: 'rag_semantic_search',
    name: 'Document-Grounded RAG & Vector Semantic Search',
    category: 'ai_ml',
    description: 'Document chunking, dense vector embeddings, similarity search (cosine/dot), and grounded LLM answers.',
    keywords: ['rag', 'vector', 'embeddings', 'similarity search', 'faiss', 'chroma', 'document qa', 'langchain', 'semantic search', 'knowledge base']
  },
  multimodal_generative_ai: {
    id: 'multimodal_generative_ai',
    name: 'Multimodal Generative AI (Vision + Text)',
    category: 'ai_ml',
    description: 'Joint processing of visual and textual tokens for automated image captioning or visual Q&A.',
    keywords: ['multimodal', 'image caption', 'vision llm', 'gpt-4o', 'blip', 'visual qa']
  },

  // Specialized Domains
  smart_contract_consensus: {
    id: 'smart_contract_consensus',
    name: 'Decentralized Smart Contract Execution',
    category: 'blockchain',
    description: 'Immutable, decentralized state machines, ERC token standards, and cryptographic wallet signatures.',
    keywords: ['blockchain', 'smart contract', 'solidity', 'ethereum', 'web3', 'nft', 'crypto', 'wallet']
  },
  payment_processing_gateway: {
    id: 'payment_processing_gateway',
    name: 'PCI-Compliant Payment Gateway Processing',
    category: 'fintech',
    description: 'Secure tokenized credit card processing, subscription webhooks, and invoice management.',
    keywords: ['payment', 'stripe', 'checkout', 'credit card', 'subscription', 'billing', 'invoice', 'fintech']
  },
  healthcare_interoperability: {
    id: 'healthcare_interoperability',
    name: 'Healthcare Standards Interoperability (FHIR / DICOM)',
    category: 'healthcare',
    description: 'Electronic health record (EHR) exchange protocols, HIPAA privacy compliance, and medical image storage.',
    keywords: ['healthcare', 'patient', 'hospital', 'medical', 'ehr', 'fhir', 'dicom', 'hipaa', 'clinic']
  },
  robot_hardware_control: {
    id: 'robot_hardware_control',
    name: 'Actuator & Sensor Robotics Middleware (ROS2)',
    category: 'robotics',
    description: 'Distributed pub/sub messaging nodes for motor controllers, LiDAR sensors, and path planning.',
    keywords: ['robot', 'robotics', 'ros', 'ros2', 'actuator', 'motor', 'lidar', 'autonomous navigation', 'slam']
  },
  ai_symptom_triage: {
    id: 'ai_symptom_triage',
    name: 'AI-Assisted Symptom Triage & Clinical Decision Support',
    category: 'ai_ml',
    description: 'Structured questionnaire scoring and ML risk classification for preliminary patient triage (non-diagnostic).',
    keywords: ['symptom', 'triage', 'symptom assessment', 'preliminary assessment', 'clinical support', 'health risk', 'assessment']
  },
  file_upload_storage: {
    id: 'file_upload_storage',
    name: 'Secure Multipart File Upload & Document Storage',
    category: 'data',
    description: 'Handling multipart binary file uploads (medical reports, PDFs, documents) with local or object storage.',
    keywords: ['upload', 'report', 'document', 'pdf', 'file upload', 'multipart', 'medical report']
  },
  recommendation_engine: {
    id: 'recommendation_engine',
    name: 'Personalized Recommendation Engine',
    category: 'ai_ml',
    description: 'Collaborative filtering and content-based item scoring for personalized recommendations.',
    keywords: ['recommend', 'collaborative filtering', 'recommendation system', 'personalized suggestion']
  },
  phishing_threat_analysis: {
    id: 'phishing_threat_analysis',
    name: 'Phishing Detection & Threat Analysis',
    category: 'security',
    description: 'Heuristic and rule-based inspection of emails/URLs and credential protection.',
    keywords: ['phishing', 'threat', 'malicious', 'scam', 'url check', 'phishing protection']
  },

  // DevOps & Deployment
  containerized_deployment: {
    id: 'containerized_deployment',
    name: 'Containerized Packaging & Multi-Service Compose',
    category: 'infrastructure',
    description: 'Hermetic Docker images, multi-stage builds, environment variables, and local compose networking.',
    keywords: ['docker', 'container', 'deployment', 'docker-compose', 'portability', 'microservices']
  },
  serverless_edge_execution: {
    id: 'serverless_edge_execution',
    name: 'Serverless Edge Function Execution',
    category: 'infrastructure',
    description: 'On-demand stateless compute functions scaling to zero with ultra-low latency worldwide.',
    keywords: ['serverless', 'lambda', 'edge', 'cloudflare workers', 'scale to zero']
  },
  notification_delivery: {
    id: 'notification_delivery',
    name: 'Transactional Notification Delivery (Email / SMS / Push)',
    category: 'communication',
    description: 'Multi-channel asynchronous delivery for event confirmations, alerts, OTPs, and reminders.',
    keywords: ['notification', 'email', 'sms', 'push notification', 'alert', 'reminder', 'confirmation', 'sendgrid', 'twilio']
  },
  data_security_rbac: {
    id: 'data_security_rbac',
    name: 'Data Security, TLS Encryption & Role-Based Access Control',
    category: 'security',
    description: 'Data encryption in transit and at rest, role-based authorization boundaries, and clinical/enterprise privacy compliance.',
    keywords: ['security', 'https', 'tls', 'encryption', 'rbac', 'privacy', 'hipaa', 'access control', 'roles']
  },
  api_documentation: {
    id: 'api_documentation',
    name: 'Interactive API Schema Documentation & Testing',
    category: 'application',
    description: 'Automatic OpenAPI (Swagger) contract generation and interactive API playground.',
    keywords: ['api documentation', 'swagger', 'openapi', 'api docs', 'endpoints spec', 'contract']
  }
};

export const TECHNOLOGY_KNOWLEDGE_BASE = [
  // --- PROGRAMMING LANGUAGES ---
  {
    technology: 'Python 3.11',
    category: 'language',
    domain: ['ai', 'ml', 'dl', 'cv', 'nlp', 'genai', 'ds', 'data_eng', 'iot', 'cybersecurity'],
    capabilities: ['tabular_supervised_ml', 'computer_vision_inference', 'nlp_text_processing', 'rag_semantic_search', 'embedded_analytical_olap'],
    use_cases: ['AI/ML research', 'FastAPI backends', 'Data pipelines', 'Computer vision pipelines', 'Scripting'],
    prerequisites: ['Basic programming', 'Data types & functions'],
    concepts: ['Virtual environments (venv)', 'Package management (pip)', 'List comprehensions & generators', 'Type annotations', 'Async/await', 'OOP classes'],
    alternatives: ['TypeScript', 'Go', 'Rust', 'Julia'],
    advantages: ['Dominant AI/ML ecosystem (PyTorch, TF, Scikit)', 'Fast prototyping', 'Massive scientific library support'],
    limitations: ['Higher runtime latency than Go/Rust', 'Global Interpreter Lock (GIL)', 'Higher memory footprint'],
    integration_requirements: ['Python 3.10+ runtime'],
    deployment_options: ['Docker container', 'AWS Lambda', 'Bare metal VM'],
    complexity: 'low',
    learning_difficulty: 'beginner',
    typical_project_types: ['Machine Learning', 'AI Assistants', 'Data Analysis', 'Web APIs']
  },
  {
    technology: 'TypeScript / Node.js',
    category: 'language',
    domain: ['swe', 'web', 'mobile', 'webrtc', 'ecommerce', 'fintech', 'social', 'enterprise'],
    capabilities: ['responsive_web_ui', 'restful_api_services', 'realtime_messaging', 'stateless_token_auth'],
    use_cases: ['Full-stack web applications', 'Real-time WebSocket servers', 'Cross-platform mobile (React Native)', 'Microservices'],
    prerequisites: ['JavaScript fundamentals', 'ES6+ syntax'],
    concepts: ['Static typing & interfaces', 'Generics & unions', 'Event loop & non-blocking I/O', 'npm package ecosystem', 'Async/Promise handling'],
    alternatives: ['Python', 'Go', 'Java', 'C#'],
    advantages: ['Unified language across frontend and backend', 'Massive npm ecosystem', 'Rich developer tooling and compile-time safety'],
    limitations: ['Single-threaded event loop requires clustering for CPU-heavy tasks', 'Complex build configs'],
    integration_requirements: ['Node.js runtime v18+'],
    deployment_options: ['Docker', 'Vercel', 'Node server VM', 'Serverless'],
    complexity: 'medium',
    learning_difficulty: 'intermediate',
    typical_project_types: ['Full-Stack Web App', 'Real-Time Chat', 'E-commerce Platform', 'SaaS Tool']
  },
  {
    technology: 'Go (Golang)',
    category: 'language',
    domain: ['swe', 'cloud', 'devops', 'cybersecurity', 'webrtc', 'data_eng'],
    capabilities: ['high_performance_microservice', 'network_packet_inspection', 'restful_api_services'],
    use_cases: ['High-throughput API gateways', 'Microservices', 'Network tools & proxies', 'Distributed systems'],
    prerequisites: ['C-like syntax', 'Basic networking'],
    concepts: ['Goroutines & channels', 'Static compilation', 'Structs & interfaces', 'Memory pointers', 'Standard library net/http'],
    alternatives: ['Rust', 'Java', 'Node.js'],
    advantages: ['Blazing-fast execution & instant startup', 'Single binary output', 'First-class lightweight concurrency'],
    limitations: ['Smaller AI/ML ecosystem compared to Python', 'No inheritance/OOP polymorphism'],
    integration_requirements: ['Go toolchain 1.21+'],
    deployment_options: ['Minimal Scratch Docker container', 'Bare metal binary'],
    complexity: 'medium',
    learning_difficulty: 'intermediate',
    typical_project_types: ['High-Performance Microservice', 'API Gateway', 'Packet Sniffer', 'Cloud Tool']
  },
  {
    technology: 'Solidity',
    category: 'blockchain',
    domain: ['blockchain', 'fintech'],
    capabilities: ['smart_contract_consensus'],
    use_cases: ['ERC-20 tokens', 'DeFi liquidity pools', 'Decentralized escrow', 'NFT smart contracts'],
    prerequisites: ['Basic JavaScript or C++', 'Cryptographic hashing concepts'],
    concepts: ['Gas optimization', 'State variables vs memory', 'Function modifiers & require statements', 'Reentrancy guard patterns', 'Events & ABI encoding'],
    alternatives: ['Rust (Solana)', 'Vyper'],
    advantages: ['Standard language for Ethereum Virtual Machine (EVM)', 'Massive developer ecosystem and audited libraries (OpenZeppelin)'],
    limitations: ['Immutable code once deployed', 'High cost of errors/bugs', 'Strict gas limits'],
    integration_requirements: ['Hardhat / Foundry', 'Ethers.js / Viem'],
    deployment_options: ['Ethereum / Polygon / Arbitrum testnet'],
    complexity: 'high',
    learning_difficulty: 'advanced',
    typical_project_types: ['Decentralized App (dApp)', 'Token Escrow', 'DeFi Protocol']
  },
  {
    technology: 'C++ / ROS2',
    category: 'language',
    domain: ['robotics', 'iot', 'cv'],
    capabilities: ['robot_hardware_control', 'computer_vision_inference'],
    use_cases: ['Autonomous mobile robots', 'LiDAR SLAM mapping', 'Hardware device drivers'],
    prerequisites: ['C++ syntax', 'Linux CLI'],
    concepts: ['Pointers & memory management', 'ROS2 Publisher/Subscriber nodes', 'Service & Action clients', 'URDF robot description', 'TF2 coordinate transforms'],
    alternatives: ['Python (rclpy)', 'Rust'],
    advantages: ['Deterministic real-time execution', 'Standard industry robotics framework'],
    limitations: ['Steep learning curve', 'Complex CMake build toolchains'],
    integration_requirements: ['Ubuntu 22.04 LTS', 'ROS2 Humble/Iron'],
    deployment_options: ['NVIDIA Jetson', 'Raspberry Pi', 'Robotic SBC'],
    complexity: 'high',
    learning_difficulty: 'advanced',
    typical_project_types: ['Autonomous Robot', 'Drone Controller', 'Embedded Vision']
  },

  // --- FRONTEND & CLIENT FRAMEWORKS ---
  {
    technology: 'React + Vite',
    category: 'frontend',
    domain: ['swe', 'web', 'ecommerce', 'education', 'social', 'healthcare', 'fintech', 'ai', 'genai'],
    capabilities: ['responsive_web_ui'],
    use_cases: ['Interactive single-page applications (SPAs)', 'SaaS dashboards', 'AI chat interfaces'],
    prerequisites: ['HTML5 & CSS3', 'Modern JavaScript (ES6+)', 'DOM manipulation'],
    concepts: ['Component hierarchy', 'useState & useEffect hooks', 'Props & state lifting', 'API client requests (Fetch/Axios)', 'Tailwind CSS utility styling'],
    alternatives: ['Vue.js', 'Next.js', 'Svelte', 'HTMX'],
    advantages: ['Vast community & UI component libraries', 'Component reusability', 'Fast HMR with Vite'],
    limitations: ['Client-side rendering requires extra configuration for SEO', 'Large bundle sizes if unoptimized'],
    integration_requirements: ['Node.js & npm'],
    deployment_options: ['Vercel', 'Netlify', 'GitHub Pages', 'Docker Nginx'],
    complexity: 'low',
    learning_difficulty: 'beginner',
    typical_project_types: ['Web Dashboard', 'AI Assistant UI', 'Portal', 'CRUD App']
  },
  {
    technology: 'Next.js (React Full-Stack)',
    category: 'frontend',
    domain: ['web', 'ecommerce', 'enterprise'],
    capabilities: ['responsive_web_ui', 'restful_api_services'],
    use_cases: ['SEO-critical web portals', 'E-commerce stores', 'Server-rendered dashboards'],
    prerequisites: ['React fundamentals', 'Node.js basics'],
    concepts: ['Server-Side Rendering (SSR)', 'Static Site Generation (SSG)', 'App Router architecture', 'Server Actions', 'API Route Handlers'],
    alternatives: ['React + Vite', 'Remix', 'Nuxt.js'],
    advantages: ['Top-tier SEO and page speed', 'Built-in full-stack API routes', 'Automatic image and font optimization'],
    limitations: ['Steeper learning curve with React Server Components', 'Vercel platform lock-in nuances'],
    integration_requirements: ['Node.js 18+'],
    deployment_options: ['Vercel', 'Docker container'],
    complexity: 'medium',
    learning_difficulty: 'intermediate',
    typical_project_types: ['E-Commerce Storefront', 'Content Portal', 'B2B SaaS']
  },
  {
    technology: 'React Native / Expo',
    category: 'mobile',
    domain: ['mobile'],
    capabilities: ['cross_platform_mobile'],
    use_cases: ['iOS & Android cross-platform mobile apps', 'Mobile patient monitoring', 'Mobile delivery tracking'],
    prerequisites: ['React fundamentals', 'Mobile UI concepts'],
    concepts: ['Core Mobile Components (View, Text, ScrollView)', 'Flexbox mobile layout', 'AsyncStorage & secure storage', 'Camera & Geolocation device APIs', 'Expo Go testing'],
    alternatives: ['Flutter', 'Kotlin Multiplatform', 'Swift'],
    advantages: ['One codebase for iOS and Android', 'Instant testing on physical devices via Expo QR codes', 'Code reuse with React web'],
    limitations: ['Native bridging overhead for complex 3D graphics', 'Certain native SDKs require custom native builds'],
    integration_requirements: ['Node.js', 'Expo CLI', 'Expo Go mobile app'],
    deployment_options: ['Expo EAS Build', 'Apple App Store', 'Google Play Store'],
    complexity: 'medium',
    learning_difficulty: 'intermediate',
    typical_project_types: ['Mobile Social App', 'Fitness Tracker', 'Mobile E-Commerce']
  },
  {
    technology: 'Flutter',
    category: 'mobile',
    domain: ['mobile'],
    capabilities: ['cross_platform_mobile'],
    use_cases: ['High-performance mobile apps', 'FinTech mobile wallets', 'Custom animated mobile UIs'],
    prerequisites: ['Dart programming language', 'OOP concepts'],
    concepts: ['Widget tree (Stateless vs Stateful)', 'Scaffold & Material Design', 'Provider / Riverpod state management', 'HTTP package API calls'],
    alternatives: ['React Native', 'Kotlin (Android)'],
    advantages: ['Compiled native ARM performance', 'Consistent 60-120fps UI rendering across all devices'],
    limitations: ['Requires learning Dart', 'Larger initial APK bundle size'],
    integration_requirements: ['Flutter SDK', 'Android Studio / Xcode'],
    deployment_options: ['Google Play Store', 'Apple App Store'],
    complexity: 'medium',
    learning_difficulty: 'intermediate',
    typical_project_types: ['FinTech Mobile App', 'Healthcare Client App']
  },

  // --- BACKEND FRAMEWORKS ---
  {
    technology: 'FastAPI',
    category: 'backend',
    domain: ['swe', 'web', 'ai', 'ml', 'dl', 'cv', 'nlp', 'genai', 'ds', 'healthcare', 'fintech'],
    capabilities: ['restful_api_services', 'stateless_token_auth'],
    use_cases: ['Serving ML/DL model predictions', 'RAG document endpoints', 'High-speed Python REST APIs'],
    prerequisites: ['Python basics', 'HTTP protocol concepts'],
    concepts: ['Path & Query Parameters', 'Pydantic Request/Response models', 'Status codes & HTTPException', 'Dependency Injection (Depends)', 'Swagger / OpenAPI auto-documentation', 'CORS Middleware'],
    alternatives: ['Flask', 'Express.js', 'Django REST', 'Go/Gin'],
    advantages: ['Asynchronous ASGI performance (Uvicorn)', 'Automatic interactive Swagger documentation', 'Seamless integration with PyTorch/TensorFlow/LangChain'],
    limitations: ['Python CPU bottlenecks if blocking synchronous tasks are not threaded properly'],
    integration_requirements: ['Python 3.10+', 'Uvicorn'],
    deployment_options: ['Docker', 'AWS Lambda', 'Render / Fly.io'],
    complexity: 'low',
    learning_difficulty: 'beginner',
    typical_project_types: ['AI Model API', 'RAG Document Backend', 'Data Science Service']
  },
  {
    technology: 'Express.js',
    category: 'backend',
    domain: ['swe', 'web', 'ecommerce', 'social', 'fintech', 'enterprise'],
    capabilities: ['restful_api_services', 'stateless_token_auth', 'realtime_messaging'],
    use_cases: ['Full-stack CRUD services', 'User authentication & JWT middleware', 'Microservices'],
    prerequisites: ['JavaScript / Node.js', 'HTTP request-response cycle'],
    concepts: ['Router & HTTP Methods (GET, POST, PUT, DELETE)', 'Middleware chain & next()', 'JSON body parsing', 'JWT verification guard', 'Mongoose / Prisma ORM integration', 'Error handling middleware'],
    alternatives: ['NestJS', 'FastAPI', 'Go/Gin', 'Koa'],
    advantages: ['Extremely lightweight and minimalist', 'Huge ecosystem of middleware', 'Ideal for JavaScript full-stack developers'],
    limitations: ['Unopinionated structure requires careful architectural discipline', 'No built-in validation (needs Joi/Zod)'],
    integration_requirements: ['Node.js v18+'],
    deployment_options: ['Docker', 'Railway', 'Heroku / Render', 'AWS EC2'],
    complexity: 'low',
    learning_difficulty: 'beginner',
    typical_project_types: ['Full-Stack SaaS', 'E-Commerce Backend', 'Social Network API']
  },
  {
    technology: 'Gin Web Framework (Go)',
    category: 'backend',
    domain: ['swe', 'cloud', 'cybersecurity', 'fintech'],
    capabilities: ['restful_api_services', 'high_performance_microservice', 'stateless_token_auth'],
    use_cases: ['High-throughput financial transaction APIs', 'Rate-limiting API gateways', 'Security monitoring backends'],
    prerequisites: ['Go programming language basics'],
    concepts: ['Gin Context & JSON binding', 'Custom Middleware handlers', 'Goroutine concurrency in handlers', 'GORM SQL database mapping', 'Benchmark profiling'],
    alternatives: ['Fiber (Go)', 'Express.js', 'FastAPI'],
    advantages: ['Extremely low memory footprint (<20MB RAM)', 'Handles 40,000+ requests/sec easily on modest hardware'],
    limitations: ['Smaller web ecosystem than Node or Python'],
    integration_requirements: ['Go toolchain'],
    deployment_options: ['Docker (Alpine/Scratch)', 'Kubernetes'],
    complexity: 'medium',
    learning_difficulty: 'intermediate',
    typical_project_types: ['High-Performance Microservice', 'Payment Processor Gateway']
  },

  // --- REAL-TIME & WEBRTC ---
  {
    technology: 'WebRTC (Peer-to-Peer & MediaStreams)',
    category: 'communication',
    domain: ['webrtc', 'healthcare', 'education', 'social'],
    capabilities: ['realtime_video_audio'],
    use_cases: ['Browser video conferencing', 'Telehealth remote doctor consultations', 'Screen sharing', 'Peer-to-peer data channels'],
    prerequisites: ['JavaScript', 'Browser MediaDevices API', 'Basic networking (IP, ports, NAT)'],
    concepts: ['MediaStream & getUserMedia() API', 'RTCPeerConnection lifecycle', 'Session Description Protocol (SDP) Offer/Answer', 'Interactive Connectivity Establishment (ICE)', 'STUN/TURN NAT traversal servers', 'Signaling channel handshake'],
    alternatives: ['LiveKit', 'mediasoup', 'Agora SDK (Proprietary)'],
    advantages: ['Direct peer-to-peer audio/video with ultra-low sub-200ms latency', 'Zero media server server costs for 1-on-1 calls', 'W3C web standard supported by all browsers'],
    limitations: ['Mesh architecture does not scale past 4-5 participants without an SFU/MCU media server', 'Strict firewall/NAT traversal challenges'],
    integration_requirements: ['WebRTC-compatible browser', 'WebSocket signaling server', 'Free public STUN server (stun:stun.l.google.com:19302)'],
    deployment_options: ['Client-side browser + Node.js signaling server'],
    complexity: 'high',
    learning_difficulty: 'intermediate',
    typical_project_types: ['Video Call App', 'Telemedicine Platform', 'Remote Pair Programming']
  },
  {
    technology: 'Socket.io',
    category: 'communication',
    domain: ['swe', 'web', 'webrtc', 'social', 'iot'],
    capabilities: ['realtime_messaging'],
    use_cases: ['Live chat rooms', 'WebRTC signaling server', 'Collaborative whiteboards', 'Real-time dashboard telemetry'],
    prerequisites: ['Node.js & Express', 'Client-side JavaScript'],
    concepts: ['WebSocket handshake & HTTP long-polling fallback', 'Event emission (socket.emit, socket.on)', 'Rooms & Namespaces', 'Broadcasting to peers', 'Connection lifecycle & reconnection handling'],
    alternatives: ['Native ws library', 'Pusher', 'Centrifugo'],
    advantages: ['Reliable auto-reconnection and buffering', 'Built-in room partitioning for multi-user chat', 'Seamless WebRTC signaling'],
    limitations: ['Custom protocol wrapper (not raw WebSocket)', 'Requires Sticky Sessions when scaled across multiple server instances'],
    integration_requirements: ['Node.js backend', 'Socket.io client library'],
    deployment_options: ['Docker', 'Node server VM'],
    complexity: 'low',
    learning_difficulty: 'beginner',
    typical_project_types: ['Real-Time Chat', 'WebRTC Signaling Server', 'Live Bidding App']
  },
  {
    technology: 'MQTT (Mosquitto)',
    category: 'communication',
    domain: ['iot', 'robotics'],
    capabilities: ['iot_telemetry_streaming'],
    use_cases: ['Smart agriculture sensor telemetry', 'Home automation systems', 'Fleet vehicle GPS tracking'],
    prerequisites: ['Networking basics', 'Microcontroller basics (ESP32/Arduino)'],
    concepts: ['Publish / Subscribe architecture', 'Topic hierarchies & wildcards (+, #)', 'Quality of Service (QoS 0, 1, 2)', 'Last Will and Testament (LWT)', 'Mosquitto broker configuration'],
    alternatives: ['CoAP', 'HTTP Webhooks', 'WebSocket'],
    advantages: ['Minimal 2-byte header overhead', 'Operates reliably over unstable cellular/satellite connections', 'Trivial to run on ESP32 or Raspberry Pi'],
    limitations: ['Not natively supported in standard browser DOM without WebSocket bridge'],
    integration_requirements: ['Mosquitto Broker', 'PubSubClient (Arduino) / Paho MQTT (Python)'],
    deployment_options: ['Docker container', 'Raspberry Pi', 'Cloud VM'],
    complexity: 'medium',
    learning_difficulty: 'intermediate',
    typical_project_types: ['Smart IoT Monitor', 'Weather Station Telemetry', 'Drone Telemetry']
  },

  // --- DATABASES & STORAGE ---
  {
    technology: 'PostgreSQL',
    category: 'database',
    domain: ['swe', 'web', 'ecommerce', 'fintech', 'healthcare', 'enterprise', 'genai'],
    capabilities: ['relational_acid_persistence'],
    use_cases: ['User management & orders', 'Financial accounting ledgers', 'Complex relational records', 'Vector storage with pgvector'],
    prerequisites: ['Basic SQL concepts', 'Relational database theory'],
    concepts: ['Relational Schema Design (DDL)', 'Primary & Foreign Key Constraints', 'SQL Joins (INNER, LEFT, FULL)', 'B-Tree & GIN Index Optimization', 'ACID Transactions & Row Locking', 'ORM Mapping (Prisma / SQLAlchemy)'],
    alternatives: ['MySQL', 'SQLite', 'MongoDB', 'Supabase'],
    advantages: ['Rock-solid reliability and strict ACID compliance', 'Rich extensions (pgvector, PostGIS, JSONB)', 'Most widely used relational database in modern engineering'],
    limitations: ['Requires schema migrations when data models evolve', 'Vertical scaling preferred over horizontal sharding'],
    integration_requirements: ['PostgreSQL Server 15+'],
    deployment_options: ['Docker container', 'AWS RDS', 'Supabase / Neon serverless'],
    complexity: 'medium',
    learning_difficulty: 'intermediate',
    typical_project_types: ['SaaS Backend', 'E-Commerce Database', 'Financial Ledger']
  },
  {
    technology: 'MongoDB',
    category: 'database',
    domain: ['swe', 'web', 'social', 'ecommerce'],
    capabilities: ['flexible_document_persistence'],
    use_cases: ['Catalogs with polymorphic attributes', 'User-generated content & social feeds', 'Rapid prototyping'],
    prerequisites: ['JSON structure', 'Basic JavaScript'],
    concepts: ['Document Collections & BSON', 'Mongoose Schemas & Models', 'CRUD Queries & Query Operators', 'Sub-document Embedding vs Referencing', 'Aggregation Pipeline Stages ($match, $group)'],
    alternatives: ['PostgreSQL (JSONB)', 'CouchDB', 'Firebase Firestore'],
    advantages: ['Schemaless flexibility allows rapid frontend iteration', 'Natural mapping to JavaScript objects', 'Built-in replica set clustering'],
    limitations: ['Lack of strict relational constraints can lead to orphaned data if not enforced in app logic'],
    integration_requirements: ['MongoDB Server 6+'],
    deployment_options: ['Docker container', 'MongoDB Atlas cloud'],
    complexity: 'low',
    learning_difficulty: 'beginner',
    typical_project_types: ['Social Feed App', 'Product Catalog', 'Content Management System']
  },
  {
    technology: 'Redis',
    category: 'database',
    domain: ['swe', 'web', 'ecommerce', 'fintech', 'webrtc'],
    capabilities: ['fast_in_memory_caching'],
    use_cases: ['Sub-millisecond API response caching', 'Session store', 'API rate limiting', 'Pub/Sub event dispatch'],
    prerequisites: ['Key-value data structure concepts'],
    concepts: ['Key-Value Strings & TTL expiration', 'Hashes, Lists, and Sets', 'Sorted Sets for Leaderboards', 'Redis Atomic Commands & Lua Scripts', 'In-memory persistence (RDB/AOF)'],
    alternatives: ['Memcached', 'DragonflyDB'],
    advantages: ['Ultra-fast sub-millisecond responses (<1ms)', 'In-memory single-threaded safety', 'Extremely lightweight'],
    limitations: ['Data size bounded by available RAM', 'Not suitable as a primary durable transactional database'],
    integration_requirements: ['Redis Server 7+'],
    deployment_options: ['Docker container', 'Redis Cloud'],
    complexity: 'low',
    learning_difficulty: 'beginner',
    typical_project_types: ['API Rate Limiter', 'Leaderboard System', 'Session Cache']
  },
  {
    technology: 'FAISS / ChromaDB',
    category: 'database',
    domain: ['genai', 'ai', 'nlp'],
    capabilities: ['rag_semantic_search'],
    use_cases: ['Dense vector embeddings index', 'Cosine similarity search over document chunks', 'RAG knowledge bases'],
    prerequisites: ['Linear algebra vector concepts', 'Python basics'],
    concepts: ['Embedding dimensionality', 'IndexFlatIP vs IndexFlatL2', 'Cosine similarity metric', 'Top-K nearest neighbor retrieval', 'In-memory vs persistent vector storage'],
    alternatives: ['Pinecone', 'Qdrant', 'pgvector (PostgreSQL)', 'Weaviate'],
    advantages: ['Sub-second retrieval across millions of vectors', 'Runs locally in Python memory without external cloud accounts', 'Zero cost for academic and student projects'],
    limitations: ['In-memory FAISS indices must be serialized to disk manually'],
    integration_requirements: ['faiss-cpu / chromadb python package'],
    deployment_options: ['Embedded inside FastAPI application container'],
    complexity: 'medium',
    learning_difficulty: 'intermediate',
    typical_project_types: ['RAG Document Assistant', 'Semantic Code Search', 'Recommendation Engine']
  },
  {
    technology: 'DuckDB',
    category: 'database',
    domain: ['ds', 'data_eng'],
    capabilities: ['embedded_analytical_olap'],
    use_cases: ['Local data analytics over large CSVs/Parquet files', 'Interactive data exploration dashboards'],
    prerequisites: ['SQL basics', 'Pandas basics'],
    concepts: ['Columnar storage architecture', 'Vectorized query execution', 'Querying remote Parquet/S3 directly', 'Window functions & analytical aggregations'],
    alternatives: ['SQLite', 'Snowflake', 'BigQuery'],
    advantages: ['The SQLite of analytical databases (zero server setup)', '100x faster than Pandas for complex SQL joins and aggregations on millions of rows'],
    limitations: ['Not designed for concurrent high-frequency transactional OLTP writes'],
    integration_requirements: ['duckdb python package'],
    deployment_options: ['Embedded in Python process'],
    complexity: 'low',
    learning_difficulty: 'beginner',
    typical_project_types: ['Data Analytics Dashboard', 'Financial Portfolio Analysis']
  },

  {
    technology: 'Secure File Storage (Local / S3)',
    category: 'database',
    domain: ['healthcare', 'swe', 'web', 'enterprise'],
    capabilities: ['file_upload_storage'],
    use_cases: ['Medical report uploads', 'Document PDFs', 'User profile attachments'],
    prerequisites: ['Multipart form data', 'Filesystem or Object Storage API'],
    concepts: ['Multipart upload streaming', 'MIME-type validation & extension whitelisting', 'Path traversal sanitization', 'Presigned URLs'],
    alternatives: ['AWS S3', 'MinIO', 'Local File Directory'],
    advantages: ['Decouples binary blobs from relational tables for optimal DB performance', 'Secure and scalable'],
    limitations: ['Requires virus scanning and file size limits in production'],
    integration_requirements: ['Multer (Node) / python-multipart (FastAPI)'],
    deployment_options: ['Local uploads volume / S3 bucket'],
    complexity: 'low',
    learning_difficulty: 'beginner',
    typical_project_types: ['Healthcare Portal', 'Document Management System']
  },

  // --- AI, ML, COMPUTER VISION & NLP ---
  {
    technology: 'Scikit-Learn',
    category: 'ai_ml',
    domain: ['ml', 'ds', 'fintech', 'healthcare', 'cybersecurity'],
    capabilities: ['tabular_supervised_ml', 'ai_symptom_triage', 'recommendation_engine', 'phishing_threat_analysis'],
    use_cases: ['Customer churn prediction', 'Symptom triage risk scoring', 'Collaborative filtering recommendations', 'Phishing email classification'],
    prerequisites: ['Python basics', 'NumPy & Pandas'],
    concepts: ['Data Imputation & Encoding (OneHotEncoder)', 'Feature Scaling (StandardScaler)', 'Train / Test Dataset Split', 'Model Selection (Random Forest, Logistic Regression)', 'Evaluation Metrics (Confusion Matrix, Precision, Recall, F1, ROC-AUC)', 'Model Serialization (Joblib)'],
    alternatives: ['XGBoost', 'LightGBM', 'AutoGluon'],
    advantages: ['Industry gold standard for tabular and risk prediction models', 'Superb documentation and consistent fit/transform/predict API', 'Runs efficiently on standard CPUs without GPU requirements'],
    limitations: ['Not suited for raw image pixels or deep audio sequences'],
    integration_requirements: ['scikit-learn', 'numpy', 'pandas'],
    deployment_options: ['Serialized .pkl / .joblib loaded into FastAPI/Flask'],
    complexity: 'low',
    learning_difficulty: 'beginner',
    typical_project_types: ['Symptom Triage Model', 'Customer Churn Model', 'Loan Default Predictor', 'Recommender System']
  },
  {
    technology: 'OpenCV + YOLO / MediaPipe',
    category: 'ai_ml',
    domain: ['cv', 'dl'],
    capabilities: ['computer_vision_inference'],
    use_cases: ['Real-time object detection', 'Face mask / helmet compliance', 'Tumor detection on MRI scans', 'Gesture recognition'],
    prerequisites: ['Python basics', 'Image coordinate systems & matrices'],
    concepts: ['Image Loading & Color Space Conversion (BGR to RGB)', 'Bounding Box Coordinates & Normalization', 'YOLO Object Detection Pipeline', 'Non-Maximum Suppression (NMS)', 'Confidence Threshold Filtering', 'Video Stream Frame Processing Loop'],
    alternatives: ['PyTorch Faster-RCNN', 'TensorFlow Object Detection API'],
    advantages: ['Pre-trained weights achieve 30+ FPS on edge devices and standard webcams', 'Extremely visual and impressive for project demonstrations and vivas'],
    limitations: ['Requires GPU acceleration for high-resolution video streams in production'],
    integration_requirements: ['opencv-python', 'ultralytics (YOLO)'],
    deployment_options: ['Local machine / Docker container with OpenCV'],
    complexity: 'medium',
    learning_difficulty: 'intermediate',
    typical_project_types: ['Smart Surveillance System', 'Medical Scan Classifier', 'PPE Detection Tool']
  },
  {
    technology: 'LangChain & Prompt Engineering',
    category: 'ai_ml',
    domain: ['genai', 'nlp', 'education'],
    capabilities: ['rag_semantic_search', 'multimodal_generative_ai'],
    use_cases: ['Document Q&A assistants', 'Automated report generators', 'Intelligent tutoring bots'],
    prerequisites: ['Python basics', 'LLM concepts (Tokens, Prompts)'],
    concepts: ['System Prompts & Prompt Templates', 'Document Loaders (PyPDF, TextLoader)', 'RecursiveCharacterTextSplitter chunking', 'Embeddings Generation (OpenAI / HuggingFace)', 'RetrievalQA Chains & Context Injection', 'Pydantic Output Parsers for Structured JSON'],
    alternatives: ['LlamaIndex', 'Raw OpenAI SDK', 'DSPy'],
    advantages: ['Comprehensive modular building blocks for RAG applications', 'Wide support for local (Ollama) and cloud LLMs'],
    limitations: ['Rapid API changes across version upgrades; over-abstraction if not understood deeply'],
    integration_requirements: ['langchain', 'langchain-community', 'pydantic'],
    deployment_options: ['FastAPI backend container'],
    complexity: 'medium',
    learning_difficulty: 'intermediate',
    typical_project_types: ['RAG Document Chatbot', 'AI Resume Reviewer', 'Quiz Generator']
  },

  // --- CYBERSECURITY TOOLS ---
  {
    technology: 'Snort / Suricata & Scapy',
    category: 'security',
    domain: ['cybersecurity'],
    capabilities: ['network_packet_inspection'],
    use_cases: ['Network intrusion detection system (NIDS)', 'Malicious packet crafting & testing', 'DDoS anomaly detection'],
    prerequisites: ['TCP/IP model', 'Wireshark & packet capture principles'],
    concepts: ['Packet Capture (pcap) & Promiscuous Mode', 'TCP 3-Way Handshake analysis', 'Snort Rule Syntax (alert, drop, log)', 'Scapy Packet Dissection (IP, TCP, UDP headers)', 'Port Scan & SYN Flood Detection'],
    alternatives: ['Zeek (Bro)', 'Wazuh'],
    advantages: ['Standard open-source intrusion detection engines used in industry SOCs', 'Deep hands-on networking understanding'],
    limitations: ['High CPU overhead during 1Gbps+ network traffic saturation'],
    integration_requirements: ['Linux network tools (libpcap)', 'Python scapy'],
    deployment_options: ['Linux VM / Bare metal gateway'],
    complexity: 'high',
    learning_difficulty: 'advanced',
    typical_project_types: ['Network Intrusion Detection System', 'DDoS Packet Analyzer']
  },

  // --- FINTECH & PAYMENTS ---
  {
    technology: 'Stripe API',
    category: 'fintech',
    domain: ['fintech', 'ecommerce', 'swe'],
    capabilities: ['payment_processing_gateway'],
    use_cases: ['Credit card checkout', 'Recurring monthly SaaS billing', 'Webhook order fulfillment'],
    prerequisites: ['REST APIs', 'Asynchronous webhooks'],
    concepts: ['Stripe Checkout Sessions', 'PaymentIntents & Client Secret tokens', 'Webhook Signature Verification', 'Idempotency Keys to prevent double charging', 'Test Card Numbers & Sandbox Environment'],
    alternatives: ['PayPal SDK', 'Razorpay', 'Adyen'],
    advantages: ['PCI-DSS compliant without storing raw card numbers on your server', 'World-class documentation and test sandbox'],
    limitations: ['Transaction percentage fees in live production'],
    integration_requirements: ['stripe-node / stripe-python SDK', 'Stripe CLI for local webhook forwarding'],
    deployment_options: ['Backend service integration'],
    complexity: 'low',
    learning_difficulty: 'beginner',
    typical_project_types: ['E-Commerce Checkout', 'SaaS Subscription Portal']
  },

  // --- DEVOPS & INFRASTRUCTURE ---
  {
    technology: 'Docker & Docker Compose',
    category: 'infrastructure',
    domain: ['swe', 'cloud', 'devops', 'enterprise'],
    capabilities: ['containerized_deployment'],
    use_cases: ['Packaging multi-tier applications', 'Reproducible local environments', 'Eliminating "works on my machine" issues'],
    prerequisites: ['Linux command line basics', 'Networking ports'],
    concepts: ['Dockerfile Instructions (FROM, WORKDIR, COPY, RUN, CMD)', 'Image layers and caching', 'Environment variable injection', 'docker-compose.yml service orchestration', 'Bridge networks and volume persistence'],
    alternatives: ['Podman', 'Kubernetes (Enterprise)'],
    advantages: ['Runs identically on any Mac, Windows, or Linux machine', 'Essential for final year project demonstrations'],
    limitations: ['Small container disk storage overhead'],
    integration_requirements: ['Docker Engine / Docker Desktop'],
    deployment_options: ['Local machine', 'Cloud VPS (DigitalOcean, AWS, Linode)'],
    complexity: 'low',
    learning_difficulty: 'beginner',
    typical_project_types: ['Every production-ready capstone project']
  },

  // --- NOTIFICATIONS, SECURITY & API DOCS ---
  {
    technology: 'Email/SMS Notification Service',
    category: 'communication',
    domain: ['healthcare', 'ecommerce', 'fintech', 'swe', 'enterprise'],
    capabilities: ['notification_delivery'],
    use_cases: ['Appointment reminders', 'Order confirmations', 'Security OTPs', 'System alerts'],
    prerequisites: ['REST APIs', 'Asynchronous queues'],
    concepts: ['Transactional templates', 'Webhook delivery receipts', 'Rate limiting and bounce handling', 'Multi-channel routing (Email vs SMS)'],
    alternatives: ['SendGrid', 'Twilio', 'AWS SES', 'Firebase Cloud Messaging'],
    advantages: ['Guaranteed external delivery without running an in-house mail transfer agent', 'High deliverability'],
    limitations: ['External API usage costs at high volume'],
    integration_requirements: ['API credentials', 'SDK client'],
    deployment_options: ['Cloud SaaS API'],
    complexity: 'low',
    learning_difficulty: 'beginner',
    typical_project_types: ['Healthcare Portal', 'E-Commerce Storefront', 'Alert System']
  },
  {
    technology: 'HTTPS/TLS + Encryption + RBAC',
    category: 'security',
    domain: ['healthcare', 'fintech', 'swe', 'ecommerce', 'enterprise'],
    capabilities: ['data_security_rbac'],
    use_cases: ['Protected Health Information (PHI) security', 'Financial data protection', 'Granular role permissions'],
    prerequisites: ['Cryptography basics', 'Web security fundamentals'],
    concepts: ['TLS/SSL termination', 'AES-256 encryption at rest', 'Role-Based Access Control (RBAC) middleware', 'Principle of least privilege', 'HIPAA/GDPR compliance headers'],
    alternatives: ['Attribute-Based Access Control (ABAC)', 'OAuth2 Scopes'],
    advantages: ['Essential defense-in-depth security model', 'Protects against data leakage and injection'],
    limitations: ['Requires strict key management and certificate renewal'],
    integration_requirements: ['Certbot / TLS Certificate', 'Auth Middleware'],
    deployment_options: ['Reverse Proxy / Nginx / Cloud Gateway'],
    complexity: 'medium',
    learning_difficulty: 'intermediate',
    typical_project_types: ['Healthcare Management', 'Fintech Banking', 'Secure Enterprise App']
  },
  {
    technology: 'OpenAPI / Swagger',
    category: 'infrastructure',
    domain: ['swe', 'healthcare', 'ecommerce', 'fintech', 'enterprise'],
    capabilities: ['api_documentation'],
    use_cases: ['Interactive endpoint documentation', 'Client SDK generation', 'API contract testing'],
    prerequisites: ['REST API fundamentals', 'JSON Schema'],
    concepts: ['OpenAPI 3.1 specification', 'Swagger UI interactive playground', 'Pydantic/TypeScript schema reflection', 'Request/Response contract validation'],
    alternatives: ['Postman Collection', 'Redoc', 'Stoplight'],
    advantages: ['Automatically generated from code annotations in FastAPI / Express', 'Simplifies frontend-backend integration and viva defense'],
    limitations: ['Requires maintaining accurate docstrings and parameter types'],
    integration_requirements: ['Built-in (FastAPI) or swagger-ui-express'],
    deployment_options: ['Embedded within backend API router'],
    complexity: 'low',
    learning_difficulty: 'beginner',
    typical_project_types: ['Every RESTful API service']
  }
];

export const PREREQUISITE_DEPENDENCY_GRAPH = {
  // Foundations
  'Programming Fundamentals': [],
  'Git & Version Control': ['Programming Fundamentals'],
  'Linux CLI & Bash': ['Programming Fundamentals'],
  
  // Web Foundations
  'HTML5 & Modern CSS': ['Programming Fundamentals'],
  'JavaScript (ES6+)': ['Programming Fundamentals'],
  'TypeScript': ['JavaScript (ES6+)'],
  'React': ['JavaScript (ES6+)', 'HTML5 & Modern CSS'],
  'React Native': ['React'],
  'Next.js': ['React', 'TypeScript'],
  
  // Backend Foundations
  'HTTP Protocol & REST Basics': ['Programming Fundamentals'],
  'Express.js': ['JavaScript (ES6+)', 'HTTP Protocol & REST Basics'],
  'FastAPI': ['Python 3.11', 'HTTP Protocol & REST Basics'],
  'Go & Gin': ['Go (Golang)', 'HTTP Protocol & REST Basics'],
  'JWT & Password Security': ['HTTP Protocol & REST Basics'],
  
  // Real-Time & WebRTC
  'WebSocket Protocol': ['HTTP Protocol & REST Basics'],
  'Socket.io': ['WebSocket Protocol', 'Express.js'],
  'Browser MediaDevices API': ['JavaScript (ES6+)'],
  'WebRTC Fundamentals': ['Browser MediaDevices API', 'WebSocket Protocol'],
  'STUN / TURN & NAT Traversal': ['WebRTC Fundamentals'],
  
  // Databases
  'Relational Database Concepts': ['Programming Fundamentals'],
  'SQL Syntax & Joins': ['Relational Database Concepts'],
  'PostgreSQL': ['SQL Syntax & Joins'],
  'MongoDB & Document Stores': ['JavaScript (ES6+)'],
  'Redis In-Memory Caching': ['HTTP Protocol & REST Basics'],
  
  // AI, ML, Data Science
  'Linear Algebra & Statistics': ['Programming Fundamentals'],
  'Python Data Science (NumPy & Pandas)': ['Python 3.11', 'Linear Algebra & Statistics'],
  'Scikit-Learn Machine Learning': ['Python Data Science (NumPy & Pandas)'],
  'Deep Learning & Neural Networks': ['Scikit-Learn Machine Learning'],
  'Computer Vision (OpenCV)': ['Python 3.11', 'Linear Algebra & Statistics'],
  'YOLO Object Detection': ['Computer Vision (OpenCV)', 'Deep Learning & Neural Networks'],
  'NLP Text Preprocessing': ['Python 3.11'],
  'Embeddings & Vector Spaces': ['Python Data Science (NumPy & Pandas)', 'Linear Algebra & Statistics'],
  'FAISS Vector Search': ['Embeddings & Vector Spaces'],
  'LangChain & RAG Architecture': ['FAISS Vector Search', 'FastAPI'],
  
  // IoT & Robotics
  'Microcontroller Basics': ['Programming Fundamentals'],
  'MQTT Messaging': ['Microcontroller Basics', 'HTTP Protocol & REST Basics'],
  'ROS2 Robotics Middleware': ['C++ / ROS2', 'Linux CLI & Bash'],
  
  // Security & Blockchain
  'Cryptography & Hashing': ['Programming Fundamentals'],
  'Network Packets (TCP/IP)': ['Linux CLI & Bash', 'HTTP Protocol & REST Basics'],
  'Snort Intrusion Detection': ['Network Packets (TCP/IP)'],
  'Smart Contract Architecture': ['Cryptography & Hashing', 'Solidity'],
  
  // Infrastructure
  'Docker Containers': ['Linux CLI & Bash'],
  'Docker Compose Orchestration': ['Docker Containers']
};
