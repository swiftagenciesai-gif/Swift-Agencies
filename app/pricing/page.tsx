import Link from "next/link"
import { ArrowLeft, ArrowRight, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PLANS } from "@/lib/pricing"

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#5d4c42] transition-colors hover:text-[#1d1915]">
        <ArrowLeft className="h-4 w-4" />
        Back to main menu
      </Link>

      <div className="max-w-2xl mt-10">
        <Badge variant="outline" className="mb-4">Investment</Badge>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Pick the package that matches how customers reach you.</h1>
        <p className="mt-5 text-lg text-muted-foreground">Every package is built for website chatbots, with setup, training, deployment, and ongoing support included at the right level.</p>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((plan) => (
          <article key={plan.id} className={`flex flex-col rounded-2xl border bg-card p-6 ${plan.popular ? "border-primary shadow-lg shadow-primary/10" : "border-border"}`}>
            {plan.popular && <Badge className="mb-5 w-fit">Most popular</Badge>}
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{plan.tagline}</p>
            <div className="mt-7 border-t border-border pt-5">
              <p className="text-3xl font-semibold tracking-tight">{plan.custom ? "Custom" : `$${plan.price.toLocaleString()}`}</p>
              <p className="mt-1 text-sm text-muted-foreground">{plan.custom ? "Designed around your operation" : `+ $${plan.monthlyPrice.toLocaleString()}/month maintenance`}</p>
              <p className="mt-3 text-xs font-medium text-primary">{plan.botCount}</p>
            </div>
            <ul className="mt-7 flex-1 space-y-3">{plan.features.slice(0, 8).map((feature) => <li key={feature} className="flex gap-2 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span className="text-muted-foreground">{feature}</span></li>)}</ul>
            <Button asChild className="mt-8 w-full gap-2" variant={plan.popular ? "default" : "outline"}><Link href={`/configure?plan=${plan.id}`}>{plan.custom ? "Plan your system" : "Build this package"}<ArrowRight className="h-4 w-4" /></Link></Button>
          </article>
        ))}
      </div>
    </main>
  )
}
