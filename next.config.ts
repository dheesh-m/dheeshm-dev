import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy.
 *
 * `'unsafe-inline'` is used for scripts and styles rather than a nonce:
 * nonces must be generated per request, which would opt this page out of
 * static prerendering. The trade-off is acceptable here because the site ships
 * no third-party scripts, takes no user input, and has no auth or cookies.
 *
 * `style-src 'unsafe-inline'` is load-bearing: framer-motion and the custom
 * cursor write inline style attributes on every frame, and CSP3 falls back to
 * style-src for style-src-attr. Removing it stops all animation.
 *
 * next/font self-hosts the Google fonts at build time, so `font-src 'self'`
 * is sufficient - there is no fonts.gstatic.com request to allow.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  // 'unsafe-eval' is only needed by the dev-mode React Refresh runtime.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data: blob:",
  // Dev needs websockets for HMR.
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Redundant with frame-ancestors, but still honoured by older browsers.
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  // Skipped in dev so localhost is not pinned to HTTPS in the browser's
  // HSTS store.
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
];

const nextConfig: NextConfig = {
  // Stable (top-level, not experimental) as of Next 16. Auto-memoizes the
  // component tree; this app is almost entirely client components, so it
  // removes a lot of re-render waste. Costs build time.
  reactCompiler: true,

  // Don't advertise the framework version.
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // Required from v16 onward: unlisted qualities are rejected.
    qualities: [75, 90],
  },

  compiler: {
    styledComponents: true,
    removeConsole: isDev ? false : { exclude: ["error"] },
  },

  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "lenis", "ogl"],
  },

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/:all*(svg|jpg|png|webp|avif|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
