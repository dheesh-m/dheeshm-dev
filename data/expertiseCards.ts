export interface ExpertiseCardItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
}

export const EXPERTISE_CARDS: ExpertiseCardItem[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Modern responsive interfaces and interaction systems.",
    technologies: ["React", "Next.js", "JavaScript", "Tailwind CSS", "Responsive UI", "Framer Motion"],
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    description: "Computer vision workflows and ML integration pipelines.",
    technologies: ["Computer Vision", "Image Classification", "ML Pipelines", "Model Integration"],
  },
  {
    id: "iot",
    title: "IoT Systems",
    description: "Sensor-driven monitoring systems and hardware integrations.",
    technologies: ["Raspberry Pi", "Sensor Integration", "Real-time Monitoring", "Edge Scripts"],
  },
  {
    id: "backend-apis",
    title: "Backend & APIs",
    description: "APIs, backend services, and application logic.",
    technologies: ["Node.js", "FastAPI", "Flask", "REST APIs", "Python"],
  },
  {
    id: "databases",
    title: "Databases",
    description: "Structured and document-based data storage systems.",
    technologies: ["MongoDB", "MySQL", "SQL"],
  },
  {
    id: "tools-platforms",
    title: "Tools & Platforms",
    description: "Development tooling and deployment environment utilities.",
    technologies: ["Git", "Docker", "C++", "Java", "Linux"],
  },
];
