"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PLANS } from "@/lib/pricing"

// Setup/monthly cost scales with how much work each capability actually is
// to build and maintain - a simple lead-capture form and a full AI-to-AI
// workflow integration are not the same lift, so they should not cost the
// same amount. `includedFrom` is the lowest plan tier that has this
// capability as a standard, bundled feature (see PLANS in lib/pricing.ts) -
// it's informational only, since every capability still costs its listed
// price on any plan; picking one from a higher tier than you've chosen just
// moves your recommended package up to match.
const NEEDS = [
  { label: "Lead generation", setup: 20, monthly: 5, includedFrom: "starter" },
  { label: "Rapid customer support", setup: 20, monthly: 5, includedFrom: "starter" },
  { label: "Appointment booking", setup: 40, monthly: 10, includedFrom: "growth" },
  { label: "Ongoing support and optimization", setup: 30, monthly: 10, includedFrom: "growth" },
  { label: "Sophisticated AI behavior", setup: 60, monthly: 15, includedFrom: "pro" },
  { label: "AI-to-AI workflows", setup: 100, monthly: 25, includedFrom: "pro" },
  { label: "Advanced chatbot management", setup: 45, monthly: 12, includedFrom: "pro" },
]

const TIER_ORDER = ["starter", "growth", "pro", "enterprise"]

export default function ConfigurePage() {
  const [planId, setPlanId] = useState(PLANS[0].id)
  const [needs, setNeeds] = useState<string[]>([])
  const [companyName, setCompanyName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const selectedPlan = PLANS.find((plan) => plan.id === planId) ?? PLANS[0]
  // The recommended package is whichever is higher: what you picked, or the
  // lowest tier that bundles every capability you selected.
  const requiredTierId = needs.reduce((highestTier, label) => {
    const need = NEEDS.find((candidate) => candidate.label === label)
    if (!need) return highestTier
    return TIER_ORDER.indexOf(need.includedFrom) > TIER_ORDER.indexOf(highestTier) ? need.includedFrom : highestTier
  }, "starter")
  const requiredTierIndex = TIER_ORDER.indexOf(requiredTierId)
  const selectedPlanIndex = PLANS.findIndex((plan) => plan.id === selectedPlan.id)
  const wasUpgraded = requiredTierIndex > selectedPlanIndex
  const effectivePlan = wasUpgraded ? PLANS[requiredTierIndex] : selectedPlan
  const needsSetupTotal = needs.reduce((sum, label) => sum + (NEEDS.find((need) => need.label === label)?.setup ?? 0), 0)
  const needsMonthlyTotal = needs.reduce((sum, label) => sum + (NEEDS.find((need) => need.label === label)?.monthly ?? 0), 0)
  const setupTotal = effectivePlan.custom ? null : effectivePlan.price + needsSetupTotal
  const monthlyTotal = effectivePlan.custom ? null : effectivePlan.monthlyPrice + needsMonthlyTotal

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const plan = params.get("plan")
    if (PLANS.some((candidate) => candidate.id === plan)) setPlanId(plan as string)
    const needsParam = params.get("needs")
    if (needsParam) {
      const requested = needsParam.split(",")
      const matched = NEEDS.filter((need) => requested.includes(need.label)).map((need) => need.label)
      if (matched.length > 0) setNeeds(matched)
    }
  }, [])

  const toggleNeed = (need: string) => setNeeds((current) => current.includes(need) ? current.filter((item) => item !== need) : [...current, need])

  async function saveConfiguration(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("saving")
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, contactEmail, website, tier: effectivePlan.id, estimatePrice: setupTotal, needs }),
      })
      if (!response.ok) throw new Error("Unable to save")
      setStatus("saved")
    } catch {
      setStatus("error")
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-20">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Back to Swift Agencies</Link>
      <div className="mt-12 max-w-2xl"><Badge variant="outline" className="mb-4">Build your website chatbot</Badge><h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">Tell us what your AI should handle.</h1><p className="mt-5 text-lg text-muted-foreground">Choose a package and the capabilities that matter. We will turn this brief into a tailored proposal and onboarding plan.</p></div>
      <div className="mt-12 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8"><h2 className="text-xl font-semibold">Package</h2><div className="mt-5 space-y-3">{PLANS.map((plan) => <button type="button" key={plan.id} onClick={() => setPlanId(plan.id)} className={`w-full rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 ${plan.id === effectivePlan.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}><span className="flex items-center justify-between gap-3 font-medium"><span>{plan.name}{plan.id === effectivePlan.id && effectivePlan.id !== planId ? " (recommended)" : ""}</span><span className="text-sm text-primary">{plan.custom ? "Custom" : `$${plan.price.toLocaleString()} + $${plan.monthlyPrice}/mo`}</span></span><span className="mt-1 block text-xs text-muted-foreground">{plan.botCount}</span></button>)}</div>{wasUpgraded && <p className="mt-4 text-xs text-primary">One or more of your selected capabilities are standard on {effectivePlan.name} or higher, so we moved your recommended package there automatically.</p>}</section>
        <form onSubmit={saveConfiguration} className="rounded-2xl border border-border bg-card p-6 sm:p-8"><h2 className="text-xl font-semibold">Which of these should your chatbot handle?</h2><p className="mt-2 text-sm text-muted-foreground">Each capability has its own setup and monthly cost based on how complex it is to build — a heavier lift like AI-to-AI workflows costs more than a simple add like lead generation. Each one is also standard starting at a certain package tier; picking one from a higher tier than you chose automatically moves your recommended package up to match.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{NEEDS.map((need) => <label key={need.label} className={`flex cursor-pointer items-start justify-between gap-3 rounded-xl border p-3 text-sm transition-colors ${needs.includes(need.label) ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}><span className="flex items-start gap-3"><input type="checkbox" checked={needs.includes(need.label)} onChange={() => toggleNeed(need.label)} className="mt-0.5 h-4 w-4 accent-primary" /><span><span className="block">{need.label}</span><span className="block text-[11px] text-muted-foreground">Standard on {PLANS.find((plan) => plan.id === need.includedFrom)?.name}+</span></span></span><span className="shrink-0 text-xs text-muted-foreground">+${need.setup} / +${need.monthly}/mo</span></label>)}</div><div className="mt-8 grid gap-3 sm:grid-cols-3"><input required value={companyName} onChange={(event) => setCompanyName(event.target.value)} placeholder="Company name" className="h-10 rounded-md border border-input bg-background px-3 text-sm" /><input required type="email" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} placeholder="Contact email" className="h-10 rounded-md border border-input bg-background px-3 text-sm" /><input value={website} onChange={(event) => setWebsite(event.target.value)} placeholder="Website URL" className="h-10 rounded-md border border-input bg-background px-3 text-sm" /></div><div className="mt-8 rounded-xl bg-muted/50 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your current estimate</p><p className="mt-2 text-xl font-semibold">{effectivePlan.name}</p><p className="mt-1 text-sm text-muted-foreground">{effectivePlan.custom ? "We will scope a custom investment." : `$${setupTotal?.toLocaleString()} setup + $${monthlyTotal?.toLocaleString()}/month maintenance`}</p><p className="mt-2 text-xs text-muted-foreground">{needs.length} additions selected · Payment status starts as unpaid until confirmed.</p></div><Button type="submit" size="lg" disabled={status === "saving"} className="mt-6 w-full gap-2">{status === "saving" ? "Saving your brief..." : status === "saved" ? "Brief saved" : "Save brief and continue"} {status !== "saving" && <ArrowRight className="h-4 w-4" />}</Button>{status === "error" && <p className="mt-3 text-sm text-destructive">We could not save your brief. Please try again.</p>}{status === "saved" && <p className="mt-3 text-sm text-primary">Saved to our client system. We will follow up at {contactEmail}.</p>}</form>
      </div>
    </main>
  )
}
