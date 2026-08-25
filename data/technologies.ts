export interface Technology {
  id: string;
  name: string;
  category: string;
  description: string;
  useCases: string[];
  related: string[];
}

export const aiTechnologies: Technology[] = [
  {
    id: "rag",
    name: "RAG",
    category: "AI / LLM Engineering",
    description: "Retrieval-Augmented Generation. Combines information retrieval with LLM generation to ground models in factual, private data.",
    useCases: ["Enterprise knowledge systems", "Document intelligence", "AI assistants"],
    related: ["embeddings", "vector-retrieval", "llm-orchestration"]
  },
  {
    id: "agents",
    name: "Agents",
    category: "AI / LLM Engineering",
    description: "Autonomous AI systems capable of reasoning, planning, and executing multi-step tasks using tools and APIs.",
    useCases: ["Automated research", "Coding assistants", "Customer support"],
    related: ["tool-calling", "langgraph", "llm-orchestration"]
  },
  {
    id: "embeddings",
    name: "Embeddings",
    category: "AI / LLM Engineering",
    description: "High-dimensional vector representations of text, images, or audio used for semantic search and similarity matching.",
    useCases: ["Semantic search", "Clustering", "Recommendation engines"],
    related: ["rag", "vector-retrieval"]
  },
  {
    id: "vector-retrieval",
    name: "Vector Retrieval",
    category: "AI / LLM Engineering",
    description: "Algorithms for efficiently searching massive vector spaces, such as HNSW or IVF-PQ.",
    useCases: ["Vector databases", "Real-time search", "Memory for agents"],
    related: ["rag", "embeddings"]
  },
  {
    id: "llm-orchestration",
    name: "LLM Orchestration",
    category: "AI / LLM Engineering",
    description: "Managing the flow of data between language models, prompts, tools, and memory to build complex AI applications.",
    useCases: ["Multi-agent systems", "Chained reasoning", "Production pipelines"],
    related: ["langchain", "langgraph", "rag"]
  },
  {
    id: "prompt-engineering",
    name: "Prompt Engineering",
    category: "AI / LLM Engineering",
    description: "Designing and optimizing inputs to language models to elicit highly accurate, specific, or creative outputs.",
    useCases: ["System prompts", "Few-shot learning", "Instruction tuning"],
    related: ["llm-orchestration"]
  },
  {
    id: "langgraph",
    name: "LangGraph",
    category: "AI / LLM Engineering",
    description: "A library for building stateful, multi-actor applications with LLMs, modeling agent workflows as graphs.",
    useCases: ["Cyclic agent workflows", "Human-in-the-loop systems"],
    related: ["agents", "langchain"]
  },
  {
    id: "langchain",
    name: "LangChain",
    category: "AI / LLM Engineering",
    description: "A framework for developing applications powered by language models with standardized interfaces for memory and tools.",
    useCases: ["Rapid prototyping", "Tool integration", "LLM agnostic pipelines"],
    related: ["llm-orchestration", "rag"]
  },
  {
    id: "tool-calling",
    name: "Tool Calling",
    category: "AI / LLM Engineering",
    description: "Enabling LLMs to execute deterministic external functions, query databases, or call APIs via structured JSON outputs.",
    useCases: ["API integration", "Database queries", "Code execution"],
    related: ["agents", "prompt-engineering"]
  },
  {
    id: "voice-ai",
    name: "Voice AI",
    category: "AI / LLM Engineering",
    description: "Systems that process, understand, and generate human speech using deep learning models.",
    useCases: ["Voice assistants", "Audio analysis", "Real-time translation"],
    related: ["asr", "tts"]
  },
  {
    id: "asr",
    name: "ASR",
    category: "AI / LLM Engineering",
    description: "Automatic Speech Recognition. Converting spoken language into text using acoustic and language models.",
    useCases: ["Transcription", "Voice commands", "Meeting notes"],
    related: ["voice-ai"]
  },
  {
    id: "tts",
    name: "TTS",
    category: "AI / LLM Engineering",
    description: "Text-to-Speech. Generating natural-sounding human speech from text using neural vocoders and synthesis models.",
    useCases: ["Audiobooks", "Interactive voice response", "Accessibility"],
    related: ["voice-ai"]
  }
];

export const systemTechnologies: Technology[] = [
  // Backend & APIs
  {
    id: "python",
    name: "Python",
    category: "Backend & APIs",
    description: "Primary language for AI/ML engineering, data processing, and rapid backend development.",
    useCases: ["AI models", "Data pipelines", "Backend services"],
    related: ["fastapi", "rest-apis"]
  },
  {
    id: "fastapi",
    name: "FastAPI",
    category: "Backend & APIs",
    description: "Modern, high-performance web framework for building APIs with Python based on standard type hints.",
    useCases: ["Microservices", "Model serving", "Async APIs"],
    related: ["python", "rest-apis", "websockets"]
  },
  {
    id: "rest-apis",
    name: "REST APIs",
    category: "Backend & APIs",
    description: "Representational State Transfer architecture for scalable, stateless communication between systems.",
    useCases: ["System integration", "Client-server communication"],
    related: ["fastapi"]
  },
  {
    id: "websockets",
    name: "WebSockets",
    category: "Backend & APIs",
    description: "Full-duplex communication channels over a single TCP connection for real-time applications.",
    useCases: ["Live updates", "Chat systems", "Streaming AI responses"],
    related: ["fastapi"]
  },

  // Data & Cloud Infra
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Data & Cloud Infra",
    description: "Advanced, enterprise-class open-source relational database supporting SQL and JSON querying.",
    useCases: ["Relational data", "User state", "Transactional systems"],
    related: ["aws", "gcp"]
  },
  {
    id: "vector-dbs",
    name: "Vector DBs",
    category: "Data & Cloud Infra",
    description: "Databases optimized for storing and querying high-dimensional vectors for similarity search.",
    useCases: ["RAG systems", "Semantic search", "Recommendation"],
    related: ["qdrant", "pinecone"]
  },
  {
    id: "qdrant",
    name: "Qdrant",
    category: "Data & Cloud Infra",
    description: "High-performance vector search engine written in Rust, optimized for massive scale.",
    useCases: ["Local development", "Self-hosted vector search"],
    related: ["vector-dbs", "docker"]
  },
  {
    id: "pinecone",
    name: "Pinecone",
    category: "Data & Cloud Infra",
    description: "Managed, cloud-native vector database designed for high-performance AI applications.",
    useCases: ["Serverless vector search", "Production AI"],
    related: ["vector-dbs", "aws"]
  },
  {
    id: "docker",
    name: "Docker",
    category: "Data & Cloud Infra",
    description: "Platform for developing, shipping, and running applications in isolated containers.",
    useCases: ["Reproducible environments", "Microservices architecture"],
    related: ["aws", "gcp"]
  },
  {
    id: "aws",
    name: "AWS",
    category: "Data & Cloud Infra",
    description: "Amazon Web Services. Comprehensive cloud platform providing compute, storage, and networking.",
    useCases: ["Cloud deployment", "Managed services", "Scalable infra"],
    related: ["docker", "postgresql"]
  },
  {
    id: "gcp",
    name: "GCP",
    category: "Data & Cloud Infra",
    description: "Google Cloud Platform. Cloud services with highly optimized infrastructure for AI and data analytics.",
    useCases: ["Kubernetes", "Data warehousing", "Vertex AI"],
    related: ["docker", "postgresql"]
  },

  // Full-Stack
  {
    id: "react",
    name: "React",
    category: "Full-Stack",
    description: "JavaScript library for building dynamic, interactive, and highly responsive user interfaces.",
    useCases: ["SPAs", "Interactive dashboards", "Component design"],
    related: ["nextjs", "typescript"]
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "Full-Stack",
    description: "React framework providing server-side rendering, static site generation, and optimal performance.",
    useCases: ["Production web apps", "SEO-optimized sites", "Full-stack apps"],
    related: ["react", "typescript"]
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Full-Stack",
    description: "Strongly typed programming language that builds on JavaScript, enabling robust large-scale applications.",
    useCases: ["Type safety", "Refactoring", "Enterprise codebases"],
    related: ["react", "nextjs"]
  }
];
