import Link from "next/link"
import { Bot } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Bot className="h-5 w-5" />
              </span>
              Swift Agencies
            </Link>
            <p className="mt-3 text-sm text-muted-foreground text-pretty">
              Custom AI chatbots that answer customers and capture leads around the clock.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
              <li><Link href="/configure" className="hover:text-foreground">Build your bot</Link></li>
              <li><Link href="/industries" className="hover:text-foreground">Industries</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-foreground">How it works</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              <li><Link href="/#faq" className="hover:text-foreground">FAQ</Link></li>
              <li><Link href="/sign-in" className="hover:text-foreground">Client login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium">Legal</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/legal/privacy" className="hover:text-foreground">Privacy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-foreground">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Swift Agencies. All rights reserved.</p>
          <p>Built for businesses that never want to miss a customer.</p>
        </div>
      </div>
    </footer>
  )
}
