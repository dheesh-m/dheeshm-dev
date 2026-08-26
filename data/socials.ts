/**
 * Single source of truth for contact + social links.
 *
 * Hero, the contact section, and the JSON-LD `sameAs` all read from here so
 * they cannot drift apart. Hero previously pointed at placeholder
 * `https://github.com` / `https://linkedin.com` URLs.
 */
export const EMAIL = "dheeshm@gmail.com";

export const SOCIALS = {
  email: `mailto:${EMAIL}`,
  linkedin: "https://www.linkedin.com/in/dheesh-medekar-019a8a291/",
  github: "https://github.com/dheesh-m",
} as const;

/** Absolute profile URLs, for structured data. */
export const SAME_AS = [SOCIALS.linkedin, SOCIALS.github];
