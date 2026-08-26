export type Project = {
  id: string;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  outcome?: string;
  architecture?: string;
  engineeringFocus?: string[];
  flows?: { title: string; description: string }[];
  category?: "AI" | "Full Stack" | "Backend" | "Real-Time" | "Experiments";
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  customLiveText?: string;
  imageUrl?: string;
  featured?: boolean;
};
