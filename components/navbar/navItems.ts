export interface NavItemData {
  id: string;
  label: string;
  title: string;
  href: string;
}

export const NAV_ITEMS: NavItemData[] = [
  { id: "01", label: "HOME", title: "Home", href: "#home" },
  { id: "02", label: "ABOUT ME", title: "About Me", href: "#about" },
  { id: "03", label: "EXPERTISE", title: "Expertise", href: "#expertise" },
  { id: "04", label: "PROJECTS", title: "Projects", href: "#projects" },
  { id: "05", label: "SKILLS", title: "Skills", href: "#skills" },
  { id: "06", label: "EXPERIENCE", title: "Experience", href: "#experience" },
  { id: "07", label: "CONTACT", title: "Contact", href: "#contact" },
];

export const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));
