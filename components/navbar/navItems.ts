export interface NavItemData {
  id: string;
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItemData[] = [
  { id: "01", label: "HOME", href: "#home" },
  { id: "02", label: "ABOUT", href: "#about" },
  { id: "03", label: "EXPERTISE", href: "#enterprise" },
  { id: "04", label: "PROJECTS", href: "#projects" },
  { id: "05", label: "SKILLS", href: "#skills" },
  { id: "06", label: "EXPERIENCE", href: "#experience" },
  { id: "07", label: "CONTACT", href: "#contact" },
];

export const SECTION_IDS = NAV_ITEMS.map((item) => item.href.slice(1));
