import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { BotpressWidget } from "@/components/botpress-widget"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

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
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d12" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark bg-background ${geistSans.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <BotpressWidget
          injectUrl="https://cdn.botpress.cloud/webchat/v5.0/inject.js"
          configUrl="https://files.bpcontent.cloud/2026/08/14/00/20260814001647-NYKRVX7V.js"
        />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
