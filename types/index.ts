export type SocialLink = {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "email";
};

export type Project = {
  id: string;
  title: string;
  description: string;
  problem?: string;
  solution?: string;
  category?: "AI" | "Full Stack" | "Backend" | "Real-Time" | "Experiments";
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
};

export type SkillCategory = {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
};

export type Skill = {
  name: string;
  related: string[];
  description?: string;
};

export type GlossaryItem = {
  id: string;
  term: string;
  definition: string;
  relatedTerms?: string[];
  technologies?: string[];
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
  type: "work" | "internship" | "freelance" | "open-source";
};
