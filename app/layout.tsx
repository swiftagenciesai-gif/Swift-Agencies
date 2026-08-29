import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Manrope } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
})

const bodyFont = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "Swift Agencies — Custom AI Chatbots for Businesses",
  description:
    "Swift Agencies designs custom AI chatbot systems that answer questions, capture leads, and reduce service bottlenecks 24/7.",
  generator: "v0.app",
  metadataBase: new URL("https://swiftagencies.ai"),
  openGraph: {
    title: "Swift Agencies — Custom AI Chatbots for Businesses",
    description:
      "Custom AI chatbots that answer customers, capture leads, and handle repetitive support 24/7.",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3eee5" },
    { media: "(prefers-color-scheme: dark)", color: "#120f17" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} bg-background text-foreground`}
    >
      <body className="font-sans antialiased">
        {children}
        <Script
          src="https://16cac093-ce42-45bc-b1af-a2ce5aaf2a75-00-am1i63e6mg8n.reed.replit.dev/api/embed.js"
          data-bot-id="demo-bot"
          data-bot-token="3bd915bdc26b5d1c36b520cc15cea43fa32914aaa9bea274"
          strategy="afterInteractive"
          async
        />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
