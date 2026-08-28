"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PLANS } from "@/lib/pricing"

const NEEDS = [
  "Lead generation",
  "Customer support",
  "Appointment booking",
  "Sophisticated AI behavior",
  "AI-to-AI workflows",
  "Advanced chatbot management",
  "Ongoing support and optimization",
  "Multiple website chatbots",
]

export default function ConfigurePage() {
  const [planId, setPlanId] = useState(PLANS[0].id)
  const [needs, setNeeds] = useState<string[]>([])
  const selectedPlan = PLANS.find((plan) => plan.id === planId) ?? PLANS[0]

  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan")
    if (PLANS.some((candidate) => candidate.id === plan)) setPlanId(plan as string)
  }, [])

  const toggleNeed = (need: string) => setNeeds((current) => current.includes(need) ? current.filter((item) => item !== need) : [...current, need])

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-20">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to Swift Agencies</Link>
      <div className="mt-12 max-w-2xl"><Badge variant="outline" className="mb-4">Build your website chatbot</Badge><h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Tell us what your AI should handle.</h1><p className="mt-5 text-lg text-muted-foreground">Choose a package and the capabilities that matter. We will turn this brief into a tailored proposal and onboarding plan.</p></div>
      <div className="mt-12 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8"><h2 className="text-xl font-semibold">Package</h2><div className="mt-5 space-y-3">{PLANS.map((plan) => <button type="button" key={plan.id} onClick={() => setPlanId(plan.id)} className={`w-full rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 ${plan.id === planId ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}><span className="flex items-center justify-between gap-3 font-medium"><span>{plan.name}</span><span className="text-sm text-primary">{plan.custom ? "Custom" : `$${plan.price.toLocaleString()} + $${plan.monthlyPrice}/mo`}</span></span><span className="mt-1 block text-xs text-muted-foreground">{plan.botCount}</span></button>)}</div></section>
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8"><h2 className="text-xl font-semibold">What should it do?</h2><p className="mt-2 text-sm text-muted-foreground">Select everything you want included in your first proposal.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{NEEDS.map((need) => <label key={need} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition-colors ${needs.includes(need) ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}><input type="checkbox" checked={needs.includes(need)} onChange={() => toggleNeed(need)} className="h-4 w-4 accent-primary" />{need}</label>)}</div><div className="mt-8 rounded-xl bg-muted/50 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your starting package</p><p className="mt-2 text-xl font-semibold">{selectedPlan.name}</p><p className="mt-1 text-sm text-muted-foreground">{selectedPlan.custom ? "We will scope a custom investment." : `$${selectedPlan.price.toLocaleString()} setup + $${selectedPlan.monthlyPrice.toLocaleString()}/month maintenance`}</p></div><Button asChild size="lg" className="mt-6 w-full gap-2"><a href="https://tally.so" target="_blank" rel="noreferrer">Continue to onboarding <ArrowRight className="h-4 w-4" /></a></Button></section>
      </div>
    </main>
  )
}
