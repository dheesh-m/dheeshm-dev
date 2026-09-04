import type { Metadata, Viewport } from "next";
import { Inter, Josefin_Sans, Roboto } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/providers/MotionProvider";
import { siteMetadataBase, SITE_URL } from "@/lib/siteUrl";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from "@/lib/utils";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
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
    <html
      lang="en"
      className={cn(
        "dark",
        inter.variable,
        josefinSans.variable,
        roboto.variable
      )}
      data-scroll-behavior="smooth"
    >
      <body
        className={`${inter.className} ${inter.variable} ${josefinSans.variable} ${roboto.variable} font-sans antialiased bg-[#05060B] text-[#F4F6FA] selection:bg-red-500/20 w-full min-w-full min-h-screen min-h-[100dvh] m-0 p-0 overflow-x-hidden`}
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
