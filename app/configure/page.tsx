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
  const [companyName, setCompanyName] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle")
  const selectedPlan = PLANS.find((plan) => plan.id === planId) ?? PLANS[0]
  const featureUpgrade = needs.length > 6 ? "pro" : needs.length > 3 ? "growth" : null
  const featureUpgradeIndex = featureUpgrade ? PLANS.findIndex((plan) => plan.id === featureUpgrade) : 0
  const selectedPlanIndex = PLANS.findIndex((plan) => plan.id === selectedPlan.id)
  const effectivePlan = featureUpgrade && selectedPlanIndex < featureUpgradeIndex
    ? PLANS[featureUpgradeIndex]
    : selectedPlan
  const setupTotal = effectivePlan.custom ? null : effectivePlan.price + needs.length * 25
  const monthlyTotal = effectivePlan.custom ? null : effectivePlan.monthlyPrice + needs.length * 10

  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan")
    if (PLANS.some((candidate) => candidate.id === plan)) setPlanId(plan as string)
  }, [])

  const toggleNeed = (need: string) => setNeeds((current) => current.includes(need) ? current.filter((item) => item !== need) : [...current, need])

  async function saveConfiguration(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("saving")
    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, contactEmail, website, planId: effectivePlan.id, needs, setupTotal, monthlyTotal }),
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
        <section className="rounded-2xl border border-border bg-card p-6 sm:p-8"><h2 className="text-xl font-semibold">Package</h2><div className="mt-5 space-y-3">{PLANS.map((plan) => <button type="button" key={plan.id} onClick={() => setPlanId(plan.id)} className={`w-full rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 ${plan.id === effectivePlan.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}><span className="flex items-center justify-between gap-3 font-medium"><span>{plan.name}{plan.id === effectivePlan.id && effectivePlan.id !== planId ? " (recommended)" : ""}</span><span className="text-sm text-primary">{plan.custom ? "Custom" : `$${plan.price.toLocaleString()} + $${plan.monthlyPrice}/mo`}</span></span><span className="mt-1 block text-xs text-muted-foreground">{plan.botCount}</span></button>)}</div>{featureUpgrade && selectedPlanIndex < featureUpgradeIndex && <p className="mt-4 text-xs text-primary">Your {needs.length} selected additions automatically move this brief to {effectivePlan.name}.</p>}</section>
        <form onSubmit={saveConfiguration} className="rounded-2xl border border-border bg-card p-6 sm:p-8"><h2 className="text-xl font-semibold">What should it do?</h2><p className="mt-2 text-sm text-muted-foreground">Select everything you want included in your first proposal. Each addition is $25 setup and $10/month.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{NEEDS.map((need) => <label key={need} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition-colors ${needs.includes(need) ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}><input type="checkbox" checked={needs.includes(need)} onChange={() => toggleNeed(need)} className="h-4 w-4 accent-primary" />{need}</label>)}</div><div className="mt-8 grid gap-3 sm:grid-cols-3"><input required value={companyName} onChange={(event) => setCompanyName(event.target.value)} placeholder="Company name" className="h-10 rounded-md border border-input bg-background px-3 text-sm" /><input required type="email" value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} placeholder="Contact email" className="h-10 rounded-md border border-input bg-background px-3 text-sm" /><input value={website} onChange={(event) => setWebsite(event.target.value)} placeholder="Website URL" className="h-10 rounded-md border border-input bg-background px-3 text-sm" /></div><div className="mt-8 rounded-xl bg-muted/50 p-5"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your current estimate</p><p className="mt-2 text-xl font-semibold">{effectivePlan.name}</p><p className="mt-1 text-sm text-muted-foreground">{effectivePlan.custom ? "We will scope a custom investment." : `$${setupTotal?.toLocaleString()} setup + $${monthlyTotal?.toLocaleString()}/month maintenance`}</p><p className="mt-2 text-xs text-muted-foreground">{needs.length} additions selected · Payment status starts as unpaid until confirmed.</p></div><Button type="submit" size="lg" disabled={status === "saving"} className="mt-6 w-full gap-2">{status === "saving" ? "Saving your brief..." : status === "saved" ? "Brief saved" : "Save brief and continue"} {status !== "saving" && <ArrowRight className="h-4 w-4" />}</Button>{status === "error" && <p className="mt-3 text-sm text-destructive">We could not save your brief. Please try again.</p>}{status === "saved" && <p className="mt-3 text-sm text-primary">Saved to our client system. We will follow up at {contactEmail}.</p>}</form>
      </div>
    </main>
  )
}
