export interface EnterpriseSection {
  id: string;
  title: string;
  description: string;
  frontDescription: string;
  backHeading: string;
  highlights: string[];
  iconName: "brain" | "layers" | "zap" | "flask";
  accentColor: string;
  glowColor: string;
  borderGlow: string;
  badgeBorder: string;
  badgeBg: string;
  technologies: string[];
  code: string[];
}

export const enterpriseData: EnterpriseSection[] = [
  {
    id: "01",
    title: "PRODUCTION AI SYSTEMS",
    description: "Enterprise-grade LLM orchestration, RAG pipelines, and agentic workflows built for scale.",
    frontDescription: "Enterprise-grade LLM orchestration, RAG pipelines, and agentic workflows built for scale.",
    backHeading: "What I Build",
    highlights: [
      "LLM orchestration",
      "RAG pipelines",
      "AI agents",
      "Tool calling",
      "Vector retrieval",
    ],
    iconName: "brain",
    accentColor: "#a855f7",
    glowColor: "rgba(168, 85, 247, 0.35)",
    borderGlow: "rgba(168, 85, 247, 0.5)",
    badgeBorder: "rgba(168, 85, 247, 0.3)",
    badgeBg: "rgba(168, 85, 247, 0.12)",
    technologies: ["RAG", "Agents", "Vector retrieval", "Tool calling"],
    code: [
      "<AI_SYSTEM>",
      "    <RAG_PIPELINE>",
      "        retrieve(context)",
      "        rerank(documents)",
      "        generate(response)",
      "    </RAG_PIPELINE>",
      "",
      "    <AGENT>",
      "        reason()",
      "        tool_call()",
      "        observe()",
      "    </AGENT>",
      "</AI_SYSTEM>"
    ]
  },
  {
    id: "02",
    title: "FULL-STACK PRODUCTS",
    description: "End-to-end web applications with modern frameworks, polished UI/UX, and robust backends.",
    frontDescription: "End-to-end web applications with modern frameworks, polished UI/UX, and robust backends.",
    backHeading: "What I Build",
    highlights: [
      "React / Next.js",
      "TypeScript",
      "REST APIs",
      "PostgreSQL",
      "Production systems",
    ],
    iconName: "layers",
    accentColor: "#3b82f6",
    glowColor: "rgba(59, 130, 246, 0.35)",
    borderGlow: "rgba(59, 130, 246, 0.5)",
    badgeBorder: "rgba(59, 130, 246, 0.3)",
    badgeBg: "rgba(59, 130, 246, 0.12)",
    technologies: ["React", "Next.js", "TypeScript", "FastAPI"],
    code: [
      "import { Server } from 'application';",
      "",
      "const app = new FullStackApp({",
      "    frontend: 'Next.js',",
      "    backend: 'FastAPI',",
      "    database: 'PostgreSQL',",
      "    auth: true",
      "});",
      "",
      "app.deploy();"
    ]
  },
  {
    id: "03",
    title: "REAL-TIME APPLICATIONS",
    description: "High-performance systems using WebSockets, WebRTC, and low-latency data streams.",
    frontDescription: "High-performance systems using WebSockets, WebRTC, and low-latency data streams.",
    backHeading: "What I Build",
    highlights: [
      "WebSockets",
      "WebRTC",
      "Live data",
      "Event-driven systems",
      "Low-latency architecture",
    ],
    iconName: "zap",
    accentColor: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.35)",
    borderGlow: "rgba(6, 182, 212, 0.5)",
    badgeBorder: "rgba(6, 182, 212, 0.3)",
    badgeBg: "rgba(6, 182, 212, 0.12)",
    technologies: ["WebSockets", "events", "state", "real-time communication"],
    code: [
      "class RealTimeManager {",
      "    constructor() {",
      "        this.ws = new WebSocketServer();",
      "    }",
      "",
      "    onConnect(client) {",
      "        client.sync(globalState);",
      "        client.subscribe('events');",
      "    }",
      "",
      "    broadcast(event) {",
      "        this.ws.emit(event);",
      "    }",
      "}"
    ]
  },
  {
    id: "04",
    title: "AI EXPERIMENTS",
    description: "Exploring the cutting edge of multi-modal models, local inference, and synthetic data.",
    frontDescription: "Exploring the cutting edge of multi-modal models, local inference, and synthetic data.",
    backHeading: "What I Explore",
    highlights: [
      "Multimodal AI",
      "Local inference",
      "AI agents",
      "Synthetic data",
      "Experimental models",
    ],
    iconName: "flask",
    accentColor: "#818cf8",
    glowColor: "rgba(129, 140, 248, 0.35)",
    borderGlow: "rgba(129, 140, 248, 0.5)",
    badgeBorder: "rgba(129, 140, 248, 0.3)",
    badgeBg: "rgba(129, 140, 248, 0.12)",
    technologies: ["LLM", "multimodal", "ASR", "TTS"],
    code: [
      "def run_experiment(model='multimodal-v1'):",
      "    audio_input = listen()",
      "    text = ASR.transcribe(audio_input)",
      "    ",
      "    response = LLM.generate(",
      "        prompt=text,",
      "        tools=[vision, search]",
      "    )",
      "    ",
      "    TTS.speak(response)",
      "    return True"
    ]
  }
];
