export interface NavItemData {
  id: string;
  key: string;
  label: string;
  title: string;
  href: string;
}

export const NAV_ITEMS: NavItemData[] = [
  { id: "01", key: "home", label: "Home", title: "01 Home", href: "#home" },
  { id: "02", key: "about", label: "About", title: "02 About", href: "#about" },
  { id: "03", key: "tech", label: "Tech", title: "03 Tech", href: "#tech" },
  { id: "04", key: "projects", label: "Projects", title: "04 Projects", href: "#projects" },
  { id: "05", key: "experience", label: "Experience", title: "05 Experience", href: "#experience" },
  { id: "06", key: "contact", label: "Contact", title: "06 Contact", href: "#contact" },
];

export const SECTION_KEYS = NAV_ITEMS.map((item) => item.key);
export const SECTION_IDS = NAV_ITEMS.map((item) => item.key);
