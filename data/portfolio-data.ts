export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  github?: string;
  liveUrl?: string;
  featured?: boolean;
  metric?: string;
  metricLabel?: string;
  diagram?: "agentic-rag";
  problem: string;
  solution: string;
  architecture: string;
  keyFeatures: string[];
  engineeringChallenges: string[];
  results: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  caption: string;
  skills: string[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ExperienceEntry {
  company: string;
  role: string;
  type: string;
  points: string[];
  stack: string[];
}

export interface PipelineStage {
  label: string;
  detail: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  credential: string;
  file: string;
  media: "pdf" | "image";
}

export const PERSONAL_INFO = {
  name: "Abdullah Ali",
  role: "AI/ML Engineer",
  location: "Lahore, Pakistan",
  shortPositioning:
    "AI Engineer designing and deploying AI Agents and Agentic RAG systems with advanced LLM frameworks. Deep learning with Transformers, CNNs, and NLP in TensorFlow. Production-ready services built with Python, FastAPI, and Docker, backed by MLOps, MLflow, CI/CD, and AWS.",
  summary:
    "AI Engineer with experience designing and deploying AI Agents and Agentic RAG systems, and intelligent applications using advanced LLM frameworks. Skilled in deep learning with Transformers, CNNs, NLP, and TensorFlow, building scalable production-ready solutions with Python, FastAPI, and Docker. Proficient in MLOps, MLflow, CI/CD, and AWS cloud infrastructure, with a focus on developing multimodal AI systems that solve real-world problems.",
  github: "https://github.com/MAbdullah005",
  linkedin: "https://www.linkedin.com/in/abdullah-ali-584186301/",
  email: "abdullahaliofc@gmail.com",
  phone: "+92 313-4039492",
  resumeUrl: "/Abdullah_resume_AI_ENG.pdf",
  profileImage: "/abdullahimage.jpeg",
} as const;

export const ABOUT = {
  heading: "About",
  label: "Profile",
  paragraphs: [
    "I build AI systems that run outside the notebook. My work sits at the intersection of retrieval, agent orchestration, and the deployment tooling that turns a working prototype into a service someone can actually rely on.",
    "Most of what I build starts with a language model and ends with the unglamorous parts: retrieval quality, tool routing, container images, experiment tracking, and AWS infrastructure. I care about the full path from data to a deployed, observable endpoint.",
    "I work primarily with Python, PyTorch-era deep learning tooling, LangChain and LangGraph, FAISS, FastAPI, Docker, MLflow, and AWS. I am currently deepening my work in agentic AI and MLOps.",
  ],
  toolbelt: [
    "Python",
    "Machine Learning",
    "Deep Learning",
    "LLMs",
    "RAG",
    "AI Agents",
    "LangChain",
    "LangGraph",
    "TensorFlow",
    "FastAPI",
    "Docker",
    "MLflow",
    "AWS",
  ],
} as const;

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "ai-llm",
    name: "AI / LLM",
    caption: "Retrieval, orchestration, and model behaviour",
    skills: [
      "LLMs",
      "RAG",
      "Agentic AI",
      "AI Agents",
      "LangChain",
      "LangGraph",
      "Transformers",
      "Fine-Tuning",
      "NLP",
      "Computer Vision",
    ],
  },
  {
    id: "machine-learning",
    name: "Machine Learning",
    caption: "From raw features to evaluated models",
    skills: [
      "Scikit-learn",
      "TensorFlow",
      "Supervised Learning",
      "Unsupervised Learning",
      "Feature Engineering",
      "Hyperparameter Optimization",
      "Model Evaluation",
      "Optuna",
    ],
  },
  {
    id: "data",
    name: "Data",
    caption: "Wrangling and analysis",
    skills: [
      "Python",
      "SQL",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "MySQL",
      "MongoDB Atlas",
      "PostgreSQL",
      "MongoDB",
      "SQLite",
    ],
  },
  {
    id: "production-mlops",
    name: "Production / MLOps",
    caption: "Shipping and operating models",
    skills: [
      "FastAPI",
      "Docker",
      "MLflow",
      "DVC",
      "Apache Airflow",
      "CI/CD",
      "GitHub Actions",
      "Pydantic",
      "Streamlit",
    ],
  },
  {
    id: "aws",
    name: "AWS",
    caption: "Cloud infrastructure and services",
    skills: [
      "EC2",
      "S3",
      "RDS",
      "DynamoDB",
      "Lambda",
      "ECS",
      "EKS",
      "IAM",
      "CloudWatch",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "nexusai",
    title: "NexusAI",
    tagline: "Agentic RAG Assistant",
    description:
      "A production-oriented agentic RAG assistant that combines multi-source retrieval, intelligent routing, tool calling, and persistent conversations.",
    tech: [
      "Python",
      "LangGraph",
      "LangChain",
      "FastAPI",
      "Streamlit",
      "FAISS",
      "BM25",
      "SQLite",
      "Gemini",
      "Ollama",
      "Docker",
      "AWS EC2",
      "JWT",
    ],
    github: "https://github.com/MAbdullah005/CortexAI",
    featured: true,
    metric: "Hybrid",
    metricLabel: "FAISS + BM25 retrieval",
    diagram: "agentic-rag",
    problem:
      "A single-shot RAG pipeline answers a question against whatever chunks happen to be retrieved, regardless of whether the user actually needs document lookup, a web search, or a multi-step investigation. When retrieval misses, the model either guesses or answers from nothing.",
    solution:
      "An agentic graph that first classifies intent, then routes the request to the right tool: hybrid document retrieval, YouTube transcript ingestion, web/blog ingestion, or live web search. Retrieval confidence is graded before generation, and low-confidence results trigger a web-search fallback instead of a confident wrong answer.",
    architecture:
      "User request → intent router (LangGraph) → hybrid retriever (FAISS dense + BM25 sparse) → CRAG-style relevance grader → web-search fallback → tool calling / LLM generation → cited response. LangGraph checkpoints persist every step to SQLite so a conversation can be resumed with its full tool history, and documents, threads, and vectors are isolated per authenticated user via JWT.",
    keyFeatures: [
      "Agentic RAG with autonomous intent detection and tool selection",
      "Hybrid retrieval combining FAISS dense vectors with BM25 keyword search",
      "PDF RAG, YouTube RAG, and web/blog RAG ingestion paths",
      "CRAG-style relevance grading before generation",
      "Web-search fallback when retrieval confidence is low",
      "Human-in-the-loop workflow for ambiguous or sensitive steps",
      "Persistent conversation and thread memory via LangGraph checkpointing",
      "User-isolated documents, vectors, and threads with JWT authentication",
      "Content-hash based document deduplication on upload",
      "Multiple LLM provider fallback across Gemini, OpenAI, and Ollama",
    ],
    engineeringChallenges: [
      "Merging dense and sparse retrieval scores without one modality drowning out the other",
      "Deciding when retrieval is good enough, and defining a grading step that is strict enough to trigger fallback but not so strict it loops",
      "Keeping per-user vector and thread state isolated while sharing a single service and index infrastructure",
      "Serialising tool calls and checkpoints so an interrupted conversation resumes with intact state",
      "Running a locally hosted model and hosted APIs behind one provider interface so the graph does not care which one answers",
    ],
    results: [
      "Answers are grounded in retrieved source material rather than generated from parametric memory alone",
      "Retrieval failures degrade into an honest web-search attempt instead of a fabricated answer",
      "Multiple users can share one deployment with fully separated documents, threads, and vectors",
      "Containerised with Docker and deployable on AWS EC2 with JWT-protected API services",
    ],
  },
  {
    slug: "ai-medical-assistant",
    title: "AI Medical Assistant",
    tagline: "Multimodal Report Understanding",
    description:
      "A multimodal AI assistant that works with medical reports across text, voice, image, and PDF inputs, combining LLM reasoning with retrieval and perception.",
    tech: [
      "Python",
      "LLMs",
      "Groq",
      "FastAPI",
      "Streamlit",
      "Gradio",
      "SQLite",
      "Docker",
      "AWS",
    ],
    github: "https://github.com/MAbdullah005/AI-Medical-Chatbot",
    problem:
      "Medical reports are rarely plain text. They arrive as scanned PDFs, photographs of printed pages, or dictated notes, and a text-only assistant cannot read any of it without the user retyping everything by hand.",
    solution:
      "A modular pipeline where each modality has a dedicated processing stage: OCR and document parsing for PDFs, a vision model for images, speech-to-text and text-to-speech for voice, and a retrieval layer that indexes the parsed report content so questions are answered from the actual report text.",
    architecture:
      "Input (text / image / PDF / voice) → modality-specific processor (vision model, OCR, STT) → normalised text → report RAG index (chunk + embed) → semantic retrieval → LLM reasoning via Groq → response. FastAPI exposes the inference service, Streamlit and Gradio provide two front ends, and SQLite persists sessions. The whole stack is containerised and runs on AWS EC2.",
    keyFeatures: [
      "Multimodal input handling across text, voice, images, and PDFs",
      "Medical report RAG with semantic retrieval over parsed report content",
      "Image understanding for photographed or scanned report pages",
      "Voice interaction through speech-to-text and text-to-speech",
      "FastAPI inference backend with Streamlit and Gradio interfaces",
      "Docker containerisation and AWS EC2 deployment",
    ],
    engineeringChallenges: [
      "Getting structured, queryable text out of PDFs and photographs where layout and tables carry meaning",
      "Keeping one conversational layer coherent across four very different input modalities",
      "Serving a multimodal stack inside a single container without bloating the image",
      "Grounding responses in report content so the model does not drift into unsupported clinical claims",
    ],
    results: [
      "A user can upload a report in any supported format and query it conversationally",
      "Responses are grounded in the uploaded report through semantic retrieval",
      "Runs as a containerised inference service on AWS rather than a local script",
    ],
  },
  {
    slug: "network-security-detection",
    title: "Network Security Detection",
    tagline: "Phishing Detection with ML",
    description:
      "An end-to-end machine learning system for detecting phishing websites using 30+ engineered features and a production-oriented ML pipeline.",
    tech: [
      "Python",
      "Scikit-learn",
      "Random Forest",
      "MLflow",
      "DVC",
      "FastAPI",
      "Streamlit",
      "MongoDB Atlas",
      "Docker",
      "AWS EC2",
    ],
    metric: "98%",
    metricLabel: "Accuracy with tuned Random Forest",
    problem:
      "Phishing classifiers are easy to build badly. Trained on a snapshot of URLs, they drift as attacker patterns change, and without versioned data and tracked experiments there is no way to tell whether a new model is actually better than the one in production.",
    solution:
      "A modular pipeline — ingestion, validation, transformation, training — with 30+ engineered URL and content features, several classifiers benchmarked against each other, and full experiment and artifact tracking so every model version is reproducible.",
    architecture:
      "Dataset ingestion → schema validation → feature transformation (30+ engineered features) → model training and comparison (Random Forest, Decision Tree, Logistic Regression, Boosting) → MLflow experiment tracking and DVC dataset versioning → model artifact → FastAPI inference API and Streamlit interface → Docker container on AWS EC2, with CI/CD through GitHub Actions and metadata in MongoDB Atlas.",
    keyFeatures: [
      "30+ engineered features derived from URL structure and page content",
      "Multiple classifiers benchmarked before selecting the tuned Random Forest",
      "MLflow tracking for parameters, metrics, and model artifacts",
      "DVC for dataset and pipeline versioning",
      "GitHub Actions CI/CD for retraining and redeployment",
      "FastAPI inference service and Streamlit interface",
      "Docker containerisation with AWS EC2 deployment",
    ],
    engineeringChallenges: [
      "Extracting features that generalise instead of memorising the specific URLs in the training set",
      "Comparing classifiers on a consistent split and metric rather than eyeballing outputs",
      "Keeping the training pipeline reproducible so a model artifact can always be traced back to its data version",
      "Serving the trained artifact behind an API without retraining at inference time",
    ],
    results: [
      "Reached 98% accuracy with a tuned Random Forest, benchmarked against Decision Tree, Logistic Regression, and Boosting models",
      "Every experiment is tracked in MLflow and every dataset version in DVC, so results are reproducible",
      "The model is served through a FastAPI endpoint and a Streamlit UI from a Docker image on AWS EC2",
    ],
  },
  {
    slug: "movie-recommender",
    title: "Movie Recommender System",
    tagline: "Content-Based Recommendations",
    description:
      "A content-based movie recommendation system that generates personalised suggestions from user preference and item metadata.",
    tech: [
      "Python",
      "Machine Learning",
      "Scikit-learn",
      "Pandas",
      "MLflow",
    ],
    github: "https://github.com/MAbdullah005/Movie-Recommender-System",
    problem:
      "Recommendation is usually treated as a collaborative-filtering problem, which needs a large amount of interaction data. With a cold catalogue and sparse ratings, there is not enough signal to learn from.",
    solution:
      "A content-based approach that represents each film as a feature vector from its metadata — genres, cast, crew, keywords, overview — and recommends titles whose vectors are closest to what a user already likes.",
    architecture:
      "Movie metadata → cleaning and feature extraction with Pandas → vectorised feature matrix (genres, keywords, cast, crew, overview) → similarity computation with Scikit-learn → ranked top-N recommendations for a target title or preference profile → experiment runs tracked in MLflow.",
    keyFeatures: [
      "Content-based feature representation built from movie metadata",
      "Vectorised similarity scoring with Scikit-learn",
      "Recommendations derived from a target title or a preference profile",
      "Experiment runs tracked in MLflow",
    ],
    engineeringChallenges: [
      "Turning heterogeneous text and categorical metadata into a comparable feature space",
      "Weighting features so a strong genre signal is not drowned out by a long cast list",
      "Handling missing and noisy metadata without silently dropping titles",
    ],
    results: [
      "Produces personalised, explainable recommendations that trace back to specific movie attributes",
      "Runs without any user interaction history, so it works on a cold catalogue",
      "Experiment runs and parameters are tracked in MLflow",
    ],
  },
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "NETSOL TECHNOLOGIES Inc.",
    role: "AI/ML Trainee",
    type: "Onsite",
    points: [
      "Engineered and deployed advanced machine learning and agentic AI workflows, integrating data preprocessing, feature engineering, and containerized model monitoring within a cloud-native architecture.",
      "Analyzed and transformed datasets with Python, Pandas, NumPy, and SQL, then built ML and GenAI/RAG pipelines with Docker and Kubernetes.",
      "Designed reproducible, version-controlled (Git) data and LLM pipelines in production, delivering analytical insights through Matplotlib and Seaborn visualisations — full lifecycle from raw data ingestion to scalable, containerized deployment of intelligent, agent-driven systems.",
    ],
    stack: [
      "Python",
      "Pandas",
      "NumPy",
      "SQL",
      "Matplotlib",
      "Seaborn",
      "Docker",
      "Kubernetes",
      "RAG",
      "Agentic AI",
      "Git",
      "MLOps",
    ],
  },
];

export const WHAT_I_BUILD = [
  {
    num: "01",
    title: "AI Agents",
    subtitle: "LangGraph · Tool Calling",
    description:
      "Autonomous systems that reason, use tools, and execute multi-step workflows.",
    focusAreas: ["Intent routing", "Checkpointing", "Human-in-the-loop"],
  },
  {
    num: "02",
    title: "RAG Systems",
    subtitle: "FAISS · BM25 · Chunking",
    description:
      "Grounded AI applications that retrieve relevant information before generating responses.",
    focusAreas: ["Hybrid retrieval", "Relevance grading", "Source citations"],
  },
  {
    num: "03",
    title: "Machine Learning",
    subtitle: "Scikit-learn · TensorFlow",
    description:
      "Practical ML systems from data preprocessing to model deployment.",
    focusAreas: ["Feature engineering", "Model evaluation", "Experiment tracking"],
  },
  {
    num: "04",
    title: "Production AI",
    subtitle: "FastAPI · Docker · AWS",
    description:
      "Deployable AI services using APIs, containers, MLOps, and cloud infrastructure.",
    focusAreas: ["API design", "Containerisation", "CI/CD"],
  },
];

export const JOURNEY: TimelineEntry[] = [
  {
    period: "Foundation",
    title: "Computer Science",
    description:
      "Bachelor in Computer Science at Virtual University of Pakistan, building the core in programming, data structures, databases, and linear algebra.",
    tags: ["Computer Science", "Algorithms", "Databases"],
  },
  {
    period: "Data & Analysis",
    title: "Data Wrangling & Feature Engineering",
    description:
      "Worked through the full data pipeline — cleaning messy real-world datasets, engineering features, and building analytical foundations with NumPy, Pandas, SQL, and relational databases before feeding anything into a model.",
    tags: ["NumPy", "Pandas", "SQL", "MySQL", "PostgreSQL", "SQLite", "Feature Engineering", "EDA", "Matplotlib"],
  },
  {
    period: "Machine Learning",
    title: "Classical ML & Deep Learning",
    description:
      "Moved from theory into practice with supervised and unsupervised learning, feature engineering, and neural networks in TensorFlow — plus the Machine Learning A-Z program for breadth.",
    tags: ["Scikit-learn", "TensorFlow", "Transformers", "NLP"],
  },
  {
    period: "Applied AI",
    title: "LLM Applications & RAG",
    description:
      "Took language models from API calls to real applications: chunking strategies, embeddings, vector search, and retrieval pipelines that keep answers grounded in source material.",
    tags: ["LLMs", "RAG", "FAISS", "Embeddings"],
  },
  {
    period: "Agentic AI",
    title: "Agents & Multi-Step Reasoning",
    description:
      "Built agents that decide which tool to use, run multi-step workflows, and recover when retrieval is not confident enough — completed the Agentic AI bootcamp along the way.",
    tags: ["LangChain", "LangGraph", "Tool Calling", "Agentic AI Bootcamp"],
  },
  {
    period: "Production",
    title: "MLOps & Deployment",
    description:
      "Wrapped everything in the infrastructure it needs to survive contact with users: FastAPI services, Docker images, MLflow and DVC tracking, CI/CD pipelines, and AWS deployments. Completed the MLOps bootcamp.",
    tags: ["FastAPI", "Docker", "MLflow", "DVC", "AWS", "MLOps Bootcamp"],
  },
];

export const ARCHITECTURE_PIPELINE: PipelineStage[] = [
  { label: "Data", detail: "Documents, APIs, tabular sources" },
  { label: "Processing", detail: "Parsing, chunking, embeddings" },
  { label: "Model / LLM", detail: "Reasoning and generation" },
  { label: "RAG / Agent", detail: "Retrieval, routing, tools" },
  { label: "FastAPI", detail: "Typed inference endpoints" },
  { label: "Docker", detail: "Reproducible runtime image" },
  { label: "AWS", detail: "EC2, S3, managed services" },
  { label: "Monitoring", detail: "CloudWatch, logs, iteration" },
];

export const EDUCATION = [
  {
    title: "Bachelor in Computer Science",
    institution: "Virtual University of Pakistan",
    location: "Lahore, Pakistan",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "agentic-ai-bootcamp",
    title: "Agentic AI Bootcamp",
    issuer: "KRISHAI Technologies · Krish Naik",
    issued: "Nov 19, 2025",
    credential: "36 hours · LangGraph & LangChain",
    file: "/certificates/agentic-ai-bootcamp.pdf",
    media: "pdf",
  },
  {
    id: "mlops-bootcamp",
    title: "MLOps Bootcamp",
    issuer: "KRISHAI Technologies · Krish Naik",
    issued: "Jul 29, 2025",
    credential: "51 hours · 10+ end-to-end ML projects",
    file: "/certificates/mlops-bootcamp.jpeg",
    media: "image",
  },
  {
    id: "machine-learning-a-z",
    title: "Machine Learning A-Z",
    issuer: "SuperDataScience · Kirill Eremenko",
    issued: "Jun 28, 2025",
    credential: "43 hours · Python, R & ChatGPT",
    file: "/certificates/machine-learning-a-z.jpeg",
    media: "image",
  },
  {
    id: "deep-learning-specialization",
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI · Andrew Ng",
    issued: "Sep 5, 2025",
    credential: "5 courses · TensorFlow, CNNs, Sequences",
    file: "/certificates/deep-learning-specialization.jpeg",
    media: "image",
  },
];

export const GITHUB_CTA = {
  heading: "Open Source & Experiments",
  body: "Explore my experiments, AI systems, and machine learning projects. Most of what I learn ends up in a repository somewhere.",
  subline: "Repositories, notebooks, and deployed demos — mostly Python.",
} as const;
