import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "farmlens",
    number: "01",
    title: "FarmLens",
    description: "AI-powered crop disease detection platform with real-time analysis and confidence scoring through a FastAPI inference pipeline.",
    categoryBadge: "AI / ML SYSTEM",
    iconName: "leaf",
    problem: "Smallholder farmers often identify crop disease too late, when treatment costs are highest and yield has already been affected.",
    outcome: "Built an end-to-end pipeline for leaf upload → image preprocessing → disease classification → confidence scoring → prediction history, with results persisted for later querying.",
    architecture: "Flutter/mobile and web clients → FastAPI inference service → SQL records for predictions. Image preprocessing and model inference run server-side with structured response payloads.",
    whatIBuilt: [
      "Leaf Upload Pipeline",
      "AI Model Inference",
      "Disease Detection Classification",
      "Confidence Scoring Engine (91.4%)",
      "Treatment Recommendations & History"
    ],
    engineeringFocus: [
      "Balancing model accuracy with inference time on consumer hardware",
      "Designing a clear upload → result flow for non-technical users",
      "Keeping prediction history consistent across API and database layers"
    ],
    flows: [
      { title: "01 · Leaf Upload", description: "Image → Preprocess → Infer" },
      { title: "02 · Prediction Record", description: "Tomato — Early Blight (91.4% confidence)" }
    ],
    category: "AI",
    technologies: ["Python", "FastAPI", "Flutter", "OpenCV", "ML"],
    githubUrl: "private"
  },
  {
    id: "humanoid",
    number: "02",
    title: "Humanoid",
    description: "Developing a humanoid robot with integrated robotics, programming, and intelligent systems to interact and respond autonomously.",
    categoryBadge: "ROBOTICS / AI",
    iconName: "bot",
    imageUrl: "/humanoid-head.jpg",
    problem: "Building a humanoid system requires coordinating mechanical components, sensors, software, and intelligent decision-making into one reliable autonomous platform.",
    outcome: "Developing an integrated humanoid robotics platform that combines perception, control, programming, and intelligent systems into a unified autonomous workflow.",
    architecture: "Sensors and perception → processing and decision-making → control logic → robotic actuation. Software components communicate through structured interfaces for coordinated system behavior.",
    whatIBuilt: [
      "Robot Architecture & Mechanics",
      "Autonomous Control Logic",
      "Sensor & Perception Pipeline",
      "Computer Vision Integration",
      "Real-Time Decision Engine"
    ],
    engineeringFocus: [
      "Integrating robotics, programming, and intelligent systems into a unified platform",
      "Building reliable perception and control workflows for autonomous behavior",
      "Designing the system to support future intelligent and autonomous capabilities"
    ],
    flows: [
      { title: "01 · Robot Development", description: "Robotics → Programming → Intelligent Systems" },
      { title: "02 · Autonomous System", description: "Perception + Control + Intelligent Decision Making" }
    ],
    category: "AI",
    technologies: ["Python", "Robotics", "C++", "Computer Vision", "Autonomous Systems"],
    githubUrl: "https://github.com/dheesh-m"
  },
  {
    id: "apt",
    number: "03",
    title: "APT (Autonomous Personal Transit)",
    description: "Building an autonomous personal transit system focused on safe navigation, object detection, and real-time decision making.",
    categoryBadge: "AUTONOMOUS SYSTEM",
    iconName: "zap",
    imageUrl: "/apt-transit.jpg",
    problem: "Personal transportation can be improved through autonomous systems that can perceive their surroundings, make navigation decisions, and safely move through changing environments.",
    outcome: "Developing an autonomous personal transit platform that combines perception, intelligent decision-making, navigation, and robotic control into a unified mobility system.",
    architecture: "Environmental sensing → perception → path planning → decision-making → motion control. Modular autonomous components coordinate navigation and movement.",
    whatIBuilt: [
      "Autonomous Navigation Stack",
      "LiDAR & SLAM Mapping",
      "Obstacle & Object Detection",
      "Path Planning Algorithms",
      "Hardware-Software Telemetry"
    ],
    engineeringFocus: [
      "Developing reliable perception and navigation for autonomous movement",
      "Connecting sensing, planning, and control into a coordinated system",
      "Designing a modular architecture that evolves with future autonomous capabilities"
    ],
    flows: [
      { title: "01 · Autonomous Transit", description: "Sense → Plan → Navigate" },
      { title: "02 · Personal Mobility", description: "Perception → Decision → Autonomous Movement" }
    ],
    category: "Full Stack",
    technologies: ["Python", "ROS", "LiDAR", "SLAM", "AI"],
    githubUrl: "https://github.com/dheesh-m",
    liveUrl: "https://apt-2.vercel.app"
  },
  {
    id: "ai-experiments",
    number: "04",
    title: "AI Experiments",
    description: "Exploring cutting-edge AI models, local inference, multimodal systems, and synthetic data generation through ongoing experiments.",
    categoryBadge: "EXPERIMENTAL AI",
    iconName: "flask",
    imageUrl: "/ai-experiments.jpg",
    problem: "Rapid advancements in foundation models require continuous experimentation across local inference optimization, latency, and multimodal workflows.",
    outcome: "Created experimental testbeds for testing small language models, vision-language architectures, and diffusion models under constrained hardware budgets.",
    architecture: "Local runtime environments → PyTorch & Transformers pipelines → quantization layers → structured output evaluation.",
    whatIBuilt: [
      "Local LLM Inference Engine",
      "Multimodal Vision-Language Flows",
      "Diffusion & Generation Pipelines",
      "Synthetic Dataset Curation",
      "Quantization & Latency Tuning"
    ],
    engineeringFocus: [
      "Benchmarking local inference performance and quantization loss",
      "Creating reproducible evaluation scripts for prompt chaining",
      "Testing state-of-the-art architectures in real-time pipelines"
    ],
    flows: [
      { title: "01 · Local Inference", description: "Quantize → Load Weights → Stream Response" },
      { title: "02 · Multimodal Evaluation", description: "Vision + Text → Embeddings → Generation" }
    ],
    category: "Experiments",
    technologies: ["PyTorch", "Transformers", "LLM", "Diffusion", "LangChain"],
    githubUrl: "https://github.com/dheesh-m"
  }
];
