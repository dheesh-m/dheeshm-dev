export interface EnterpriseSection {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  code: string[];
}

export const enterpriseData: EnterpriseSection[] = [
  {
    id: "01",
    title: "PRODUCTION AI SYSTEMS",
    description: "Build intelligent production systems involving LLM orchestration, RAG, Agents, Vector retrieval, Tool calling, and AI workflows.",
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
    description: "End-to-end products using React, Next.js, TypeScript, Python, FastAPI, and PostgreSQL.",
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
    description: "Systems involving WebSockets, real-time communication, live state, event-driven workflows, and collaborative systems.",
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
    title: "AI EXPERIMENTS / PROJECTS",
    description: "Experimental work involving LLMs, multimodal AI, voice AI, ASR / TTS, local inference, and AI agents.",
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
