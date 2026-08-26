import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "farmlens",
    title: "FarmLens",
    description: "AI-powered crop disease detection platform where farmers upload leaf images and receive real-time diagnoses with confidence scoring through a FastAPI inference pipeline.",
    problem: "Smallholder farmers often identify crop disease too late, when treatment costs are highest and yield has already been affected.",
    outcome: "Built an end-to-end pipeline for leaf upload → image preprocessing → disease classification → confidence scoring → prediction history, with results persisted for later querying.",
    architecture: "Flutter/mobile and web clients → FastAPI inference service → SQL records for predictions. Image preprocessing and model inference run server-side with structured response payloads.",
    engineeringFocus: [
      "Balancing model accuracy with inference time on consumer hardware",
      "Designing a clear upload → result flow for non-technical users",
      "Keeping prediction history consistent across API and database layers"
    ],
    category: "AI",
    technologies: ["Python", "FastAPI", "Flutter", "Node.js", "SQL", "Computer Vision", "ML"],
    githubUrl: "private"
  },
  {
    id: "humanoid",
    title: "Humanoid",
    description: "I'm currently developing a humanoid robot by integrating robotics, programming, and intelligent systems to create an autonomous machine capable of interacting with and responding to its environment.",
    problem: "Building a humanoid system requires coordinating mechanical components, sensors, software, and intelligent decision-making into one reliable autonomous platform.",
    outcome: "Developing an integrated humanoid robotics platform that combines perception, control, programming, and intelligent systems into a unified autonomous workflow.",
    architecture: "Sensors and perception → processing and decision-making → control logic → robotic actuation. Software components are designed to communicate through structured interfaces for coordinated system behavior.",
    engineeringFocus: [
      "Integrating robotics, programming, and intelligent systems into a unified platform",
      "Building reliable perception and control workflows for autonomous behavior",
      "Designing the system to support future intelligent and autonomous capabilities"
    ],
    flows: [
      { title: "01 · Robot Development", description: "Robotics → Programming → Intelligent Systems" },
      { title: "02 · Autonomous System", description: "Perception + Control + Intelligent Decision Making" }
    ],
    technologies: ["Python", "Robotics", "Programming", "Computer Vision", "Intelligent Systems", "Autonomous Systems"],
    githubUrl: "https://github.com/dheesh-m",
    // liveUrl intentionally omitted: meetaura.me does not currently resolve
    // (NXDOMAIN), and the card renders "View Live" only when this is set.
    // Restore it once the domain is live.
  },
  {
    id: "apt-demo",
    title: "AI-Powered Movie Ticket Booking Website",
    description: "A demo movie ticket booking platform that provides a modern interface for discovering movies, selecting showtimes, choosing seats, and completing the booking flow with an AI-enhanced experience.",
    problem: "Movie booking experiences can become unnecessarily complicated when users have to navigate multiple steps to discover movies, select showtimes, choose seats, and complete a reservation.",
    outcome: "Built an end-to-end movie booking experience covering movie discovery, showtime selection, seat selection, booking workflows, and structured booking information.",
    architecture: "Frontend interface → API layer → movie and booking data → database. AI-assisted functionality and backend services communicate through structured API responses to provide a seamless booking workflow.",
    engineeringFocus: [
      "Designing a simple and intuitive movie discovery and booking experience",
      "Connecting frontend interactions with backend APIs and structured data",
      "Maintaining a smooth booking flow across movie, showtime, seat, and confirmation stages"
    ],
    flows: [
      { title: "01 · Movie Discovery", description: "Browse → Select Movie → Choose Showtime" },
      { title: "02 · Ticket Booking", description: "Seats → Booking → Confirmation" }
    ],
    technologies: ["React", "Next.js", "Node.js", "AI", "REST APIs", "SQL"],
    githubUrl: "https://github.com/dheesh-m",
    liveUrl: "https://awp101.vercel.app/",
  },
  {
    id: "apt",
    title: "APT — Autonomous Personal Transit",
    description: "An autonomous personal transportation concept focused on combining intelligent navigation, robotics, and autonomous systems to create a compact mobility platform capable of navigating its environment.",
    problem: "Personal transportation can be improved through autonomous systems that can perceive their surroundings, make navigation decisions, and safely move through changing environments.",
    outcome: "Developing an autonomous personal transit platform that combines perception, intelligent decision-making, navigation, and robotic control into a unified mobility system.",
    architecture: "Environmental sensing → perception → path planning → decision-making → motion control. The system is designed around modular autonomous components that can communicate to coordinate navigation and movement.",
    engineeringFocus: [
      "Developing reliable perception and navigation for autonomous movement",
      "Connecting sensing, planning, and control into a coordinated system",
      "Designing a modular architecture that can evolve with future autonomous capabilities"
    ],
    flows: [
      { title: "01 · Autonomous Transit", description: "Sense → Plan → Navigate" },
      { title: "02 · Personal Mobility", description: "Perception → Decision → Autonomous Movement" }
    ],
    technologies: ["Python", "Robotics", "Computer Vision", "AI", "Autonomous Systems", "Navigation"],
    githubUrl: "https://github.com/dheesh-m",
    liveUrl: "https://apt-2.vercel.app",
  }
];
