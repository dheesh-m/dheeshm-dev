import type { Metadata, Viewport } from "next";
import { Inter, Manrope, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/providers/MotionProvider";
import { siteMetadataBase, SITE_URL } from "@/lib/siteUrl";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from "@/lib/utils";

// Variable fonts: intentionally no `weight` list. Narrowing weights on a Google
// variable font makes next/font fetch static instances instead of the single
// variable file, which is the slower option here.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const TITLE = "Dheesh Medekar — AI / Software Engineer";
const DESCRIPTION =
  "Personal portfolio of Dheesh Medekar. I build intelligent systems, real-time applications and full-stack products.";

export const metadata: Metadata = {
  metadataBase: siteMetadataBase,
  title: {
    default: TITLE,
    template: "%s — Dheesh Medekar",
  },
  description: DESCRIPTION,
  applicationName: "Dheesh Medekar",
  authors: [{ name: "Dheesh Medekar", url: SITE_URL }],
  creator: "Dheesh Medekar",
  keywords: [
    "Dheesh Medekar",
    "AI engineer",
    "LLM engineering",
    "RAG",
    "full-stack developer",
    "Next.js",
    "TypeScript",
    "Python",
    "FastAPI",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Dheesh Medekar",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // No maximumScale: capping it blocks pinch-zoom (WCAG 1.4.4).
  themeColor: "#050505",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-scroll-behavior is the documented Next 16 opt-in; the framework no
    // longer applies `scroll-behavior: smooth` on its own.
    <html lang="en" className={cn("dark", "font-sans", geist.variable)} data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#050505] text-[#F5F5F5] selection:bg-white/20 w-full min-w-full min-h-screen min-h-[100dvh] m-0 p-0 overflow-x-hidden`}
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            <MotionProvider>
              {children}
              <SpeedInsights />
            </MotionProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
