import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dheesh Medekar — AI / Software Engineer",
    short_name: "Dheesh Medekar",
    description:
      "Personal portfolio of Dheesh Medekar. I build intelligent systems, real-time applications and full-stack products.",
    start_url: "/",
    display: "standalone",
    background_color: "#050505",
    theme_color: "#050505",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
