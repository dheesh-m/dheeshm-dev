export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  technologies: string[];
  companyUrl?: string;
  logo?: string;
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    role: "Full-Stack Developer, UI/UX",
    company: "Raftaar-Theme-Park",
    period: "2024 - ",
    location: "Pune, Maharashtra",
    description: "Developed a full-stack web application with a responsive, modern UI, implementing frontend features,  and seamless data handling. handled application workflows, document/data operations, and optimized the overall user experience and performance.Deployed the application using cloud hosting, configured the production environment and domain, and set up automated deployment through GitHub for reliable updates.",
    technologies: ["JS", "TS", "Dart", "React", "NextJS", "Flutter", "Figma", "shadcn"],
    companyUrl: "raftaar.win",
    logo: "/logos/raftaar.png"
  },
  {
    id: "exp-2",
    role: "Full-Stack Developer",
    location: "Jaipur, Rajasthan",
    company: "BhoomiTrace Analytics Private Limited",
    period: "2025 - ",
    description: "Developed and enhanced BhoomiTrace’s full-stack platform with a responsive UI, AI-powered property intelligence, intelligent recommendations, and production-ready frontend workflows. Designed, created, and integrated backend REST APIs for authentication, property data, reports, user profiles, feeds, and core platform functionality. Integrated AI-driven analysis to evaluate property and market data, generate personalized suggestions, identify key insights, and guide users on what actions to take based on the analysis. Connected frontend components with APIs, handled real-time data synchronization, and optimized end-to-end data flow to deliver a seamless, intelligent, and data-driven user experience.",
    technologies: ["JavaScript", "React", "Node.js", "TypeScript", "Redux", "Python", "REST API", "API Integration", "Authentication", "JWT", "OAuth 2.0", "KYC Integration", "Payment Gateway Integration", "LLM", "RAG", "Vector Retrieval", "Embeddings", "NLP", "NLU", "Generative AI", "Machine Learning", "AI Chatbot", "AI Assistant", "Vector Database", "LangGraph", "LangChain", "Tool Calling", "Prompt Engineering"],
    companyUrl: "bhoomitrace.com",
    logo: "/logos/bhoomitract.png"
  },
  //

];
