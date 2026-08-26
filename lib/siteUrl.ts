/**
 * Single source of truth for the canonical site origin.
 *
 * Next 16 hard-fails the build if a relative Open Graph URL is used without a
 * `metadataBase`, so this always resolves to something absolute.
 *
 * Resolution order:
 *  1. NEXT_PUBLIC_SITE_URL  - set this once a custom domain is live
 *  2. VERCEL_PROJECT_PRODUCTION_URL - the stable production deployment host
 *  3. localhost - development
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();
export const siteMetadataBase = new URL(SITE_URL);
