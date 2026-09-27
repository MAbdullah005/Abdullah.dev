import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://myportfolio.vercel.app"),
  title: "Abdullah Ali | AI/ML Engineer",
  description:
    "Abdullah Ali is an AI/ML Engineer building intelligent systems with LLMs, RAG, Agentic AI, machine learning, and modern cloud infrastructure.",
  keywords: [
    "Abdullah Ali",
    "AI/ML Engineer",
    "Agentic AI",
    "RAG",
    "LangGraph",
    "LangChain",
    "Machine Learning",
    "MLOps",
    "FastAPI",
    "AWS",
  ],
  authors: [{ name: "Abdullah Ali", url: "https://github.com/MAbdullah005" }],
  creator: "Abdullah Ali",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://myportfolio.vercel.app",
    siteName: "Abdullah Ali | AI/ML Engineer",
    title: "Abdullah Ali | AI/ML Engineer",
    description:
      "AI/ML Engineer building intelligent systems with LLMs, RAG, Agentic AI, machine learning, and modern cloud infrastructure.",
    images: [
      {
        url: "/abdullahimage.jpeg",
        width: 1200,
        height: 630,
        alt: "Abdullah Ali — AI/ML Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Ali | AI/ML Engineer",
    description:
      "AI/ML Engineer building intelligent systems with LLMs, RAG, Agentic AI, machine learning, and modern cloud infrastructure.",
    images: ["/abdullahimage.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"){document.documentElement.classList.add("dark")}}catch(e){document.documentElement.classList.add("dark")}})();`,
          }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
