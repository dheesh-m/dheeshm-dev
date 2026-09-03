import type { Metadata, Viewport } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/providers/MotionProvider";
import { siteMetadataBase, SITE_URL } from "@/lib/siteUrl";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from "@/lib/utils";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

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
  themeColor: "#05060B",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", workSans.variable, workSans.className)} data-scroll-behavior="smooth">
      <body
        className={`${workSans.className} ${workSans.variable} font-sans antialiased bg-[#05060B] text-[#F4F6FA] selection:bg-red-500/20 w-full min-w-full min-h-screen min-h-[100dvh] m-0 p-0 overflow-x-hidden`}
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
