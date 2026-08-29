"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/industries", label: "Industries" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground text-background shadow-[0_10px_30px_rgba(28,26,23,0.12)]">
            <Bot className="h-5 w-5" />
          </span>
          <span className="display-font text-2xl leading-none text-foreground">Swift</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm" className="rounded-full">
            <Link href="/sign-in">Client login</Link>
          </Button>
          <Button asChild size="sm" className="rounded-full bg-[#1c1a17] text-[#f8f4ef] hover:bg-[#2a241e]">
            <Link href="/configure">Build your bot</Link>
          </Button>
        </div>

        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/10 bg-card text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={cn("border-t border-border/60 md:hidden", open ? "block" : "hidden")}>
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-2">
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link href="/sign-in">Client login</Link>
            </Button>
            <Button asChild size="sm" className="rounded-full bg-[#1c1a17] text-[#f8f4ef] hover:bg-[#2a241e]">
              <Link href="/configure">Build your bot</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
