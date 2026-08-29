import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Manrope } from "next/font/google"
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
    "Swift Agencies builds custom AI chatbot widgets that handle customer questions, capture leads, and reduce customer-service overflow 24/7.",
  generator: "v0.app",
  metadataBase: new URL("https://swiftagencies.ai"),
  openGraph: {
    title: "Swift Agencies — Custom AI Chatbots for Businesses",
    description:
      "Custom AI chatbot widgets that answer customers, capture leads, and handle repetitive support 24/7.",
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
        <script
          src="https://swiftagencies-gilt.vercel.app/widget.js"
          data-bot-id="bot_ui0idnak"
          data-company="Swift Agencies"
          data-color="#ffc4ab"
          defer
        />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
