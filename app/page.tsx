"use client"

import Link from "next/link"
import { useState } from "react"
import { SiteHeader } from "@/components/marketing/site-header"
import { SiteFooter } from "@/components/marketing/site-footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  ArrowRight,
  MessageSquare,
  Sparkles,
  Clock,
  TrendingUp,
  Plug,
  ShieldCheck,
  Wand2,
  Rocket,
  Check,
  ArrowUpRight,
  Bot,
} from "lucide-react"

const STEPS = [
  {
    icon: Wand2,
    title: "Tell us about your business",
    desc: "Answer a short guided questionnaire about your company, goals, and the conversations you want your bot to handle.",
  },
  {
    icon: Sparkles,
    title: "We build & train your bot",
    desc: "Our team configures your voice, knowledge base, and workflows so the assistant actually reflects the way you sell and serve.",
  },
  {
    icon: Rocket,
    title: "Go live in days",
    desc: "We drop the bot onto your site and tune the first conversations before you ever have to chase a missed lead again.",
  },
]

const BENEFITS = [
  { icon: Clock, title: "Always on", desc: "Answer every customer instantly, day or night — no missed leads after hours." },
  { icon: TrendingUp, title: "Captures & qualifies leads", desc: "Collect contact details and route qualified prospects straight to your team." },
  { icon: MessageSquare, title: "Handles repetitive support", desc: "Deflect the FAQs and booking questions that eat up your team's day." },
  { icon: Plug, title: "Connects to your tools", desc: "Calendars, CRMs, and custom APIs so the bot actually does work, not just chat." },
  { icon: Sparkles, title: "Trained on your business", desc: "Your services, hours, policies, and voice — not a generic template." },
  { icon: ShieldCheck, title: "Done-for-you setup", desc: "We build, test, and deploy it. You approve. No engineering required." },
]

const FAQS = [
  { q: "How long until my chatbot is live?", a: "Most Starter and Growth builds go live within a few business days of your questionnaire and approval. Pro and Enterprise scopes vary depending on integrations and custom logic." },
  { q: "Do I need any technical skills?", a: "No. You answer the guided questions, we handle the build, and we manage the deployment for you." },
  { q: "What does the chatbot actually do?", a: "It answers customer questions from your knowledge base, captures qualified leads, books appointments, escalates to a human when needed, and can connect to your CRM or calendar." },
  { q: "Is this a monthly subscription?", a: "The main build is a one-time custom investment. Optional maintenance and tuning is available if you want ongoing optimization after launch." },
  { q: "Can it match my brand?", a: "Yes. You control the bot's name, personality, tone, colors, and welcome message during configuration, and our team shapes the final experience around your business." },
  { q: "What if I need something custom?", a: "That is exactly where we work best. Choose the Pro or Enterprise package, or add a custom workflow or API build, and we shape the system to your operations." },
]

const BOT_OPTIONS = {
  objective: ["Lead Generation", "Customer Support", "Appointment Booking"],
  tone: ["Professional", "Casual", "Playful"],
  intelligence: ["Sophisticated AI", "AI-to-AI workflows", "Managed knowledge base"],
} as const

// Maps a builder selection to the matching checkbox on /configure's "needs"
// list, so picking preferences here actually carries forward instead of
// being a dead end ("configuration saved locally" with nothing to do next).
const NEED_FOR_OPTION: Record<string, string> = {
  "Lead Generation": "Lead generation",
  "Customer Support": "Customer support",
  "Appointment Booking": "Appointment booking",
  "Sophisticated AI": "Sophisticated AI behavior",
  "AI-to-AI workflows": "AI-to-AI workflows",
}

const ADD_ONS = [
  { id: "voice", name: "Voice Calling Integration", setup: 25, monthly: 10 },
  { id: "language", name: "Multi-Language Support", setup: 25, monthly: 10 },
  { id: "crm", name: "Advanced CRM Sync", setup: 25, monthly: 10 },
]

const CONFIGURE_URL = "/configure"

export default function HomePage() {
  const [botPreferences, setBotPreferences] = useState({
    objective: "Lead Generation",
    tone: "Professional",
    intelligence: "Sophisticated AI",
  })
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const setupTotal = 1500 + selectedAddOns.reduce((total, id) => total + (ADD_ONS.find((addon) => addon.id === id)?.setup ?? 0), 0)
  const monthlyTotal = 350 + selectedAddOns.reduce((total, id) => total + (ADD_ONS.find((addon) => addon.id === id)?.monthly ?? 0), 0)

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  const builderNeeds = [botPreferences.objective, botPreferences.intelligence]
    .map((option) => NEED_FOR_OPTION[option])
    .filter(Boolean)
  const builderHref = `/configure?needs=${encodeURIComponent(builderNeeds.join(","))}`

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[540px] opacity-100">
            <div className="absolute left-1/2 top-0 h-[420px] w-[60%] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(239,109,83,0.22),transparent_60%)] blur-3xl" />
            <div className="absolute right-[10%] top-12 h-52 w-52 rounded-full bg-[radial-gradient(circle,_rgba(110,168,255,0.18),transparent_60%)] blur-3xl" />
          </div>

          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
            <div className="relative">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1c1a17]/10 bg-[#f8f3ed] px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#4b3b35] shadow-[0_10px_30px_rgba(31,22,18,0.05)]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ef6d53] text-[#fffaf5]">
                  <Sparkles className="h-2.5 w-2.5" />
                </span>
                Built for real business conversations
              </div>

              <h1 className="display-font max-w-xl text-[3.6rem] leading-[0.82] text-[#1d1915] sm:text-[4.5rem] lg:text-[6rem]">
                A website bot that feels like your best operator.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-[#5d4c42]">
                We design custom AI chatbots that answer questions with nuance, capture demand, and keep your shop running smoothly after hours without feeling like a generic prototype.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1d1915] px-6 text-[#f9f5f0] shadow-[0_18px_35px_rgba(29,25,21,0.16)] transition-all duration-500 hover:-translate-y-1 hover:rounded-[1.2rem] hover:bg-[#2c241f]">
                  <Link href="/configure" className="inline-flex items-center justify-center gap-2">
                    <span>Start your project</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="inline-flex items-center justify-center gap-2 rounded-full border-[#1d1915]/15 bg-white/60 px-6 text-[#1d1915] transition-all duration-500 hover:-translate-y-1 hover:border-[#ef6d53]/40 hover:bg-[#fff7f3]">
                  <Link href="/pricing" className="inline-flex items-center justify-center gap-2">See investment</Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-[#5d4c42]">
                {[
                  "24/7 coverage",
                  "Lead capture",
                  "Custom brand voice",
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-[#1c1a17]/10 bg-[#f6f1eb] px-3 py-1.5">
                    <Check className="h-3.5 w-3.5 text-[#ef6d53]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="soft-shell relative w-full max-w-[560px] rounded-[2.2rem] border border-[#1d1915]/10 bg-[#f7f1ea]/80 p-3 sm:p-4">
                <div className="editorial-grid absolute inset-0 rounded-[2.2rem] opacity-60" />

                <div className="relative overflow-hidden rounded-[1.8rem] border border-[#1d1915]/10 bg-[#1b1714] p-4 shadow-[0_30px_80px_rgba(20,15,12,0.22)]">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 text-[0.65rem] uppercase tracking-[0.2em] text-white/60">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2.5 w-2.5 rounded-full bg-[#89f0b0]" />
                      Live concierge
                    </div>
                    <span>now answering</span>
                  </div>

                  <div className="mt-5 space-y-4 text-sm text-white/85">
                    <div className="max-w-[84%] rounded-[1.2rem] rounded-bl-md bg-white/6 px-4 py-3">
                      Hi! I'm here to help — are you looking for pricing, or do you want to book a quick call?
                    </div>
                    <div className="ml-auto max-w-[78%] rounded-[1.2rem] rounded-br-md bg-[#ef6d53] px-4 py-3 text-[#fffaf5]">
                      We run a home services business and need something that handles quote requests after hours.
                    </div>
                    <div className="max-w-[88%] rounded-[1.2rem] rounded-bl-md bg-white/6 px-4 py-3">
                      That's exactly what our Growth plan is built for — I can capture the request, qualify the lead, and hand it to your team in the morning. Want the pricing breakdown?
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3 text-left">
                    <div className="rounded-[1rem] border border-white/10 bg-white/4 p-3">
                      <p className="text-[0.58rem] uppercase tracking-[0.18em] text-white/55">Resolution rate</p>
                      <p className="mt-2 text-2xl font-semibold text-white">92%</p>
                    </div>
                    <div className="rounded-[1rem] border border-white/10 bg-white/4 p-3">
                      <p className="text-[0.58rem] uppercase tracking-[0.18em] text-white/55">Leads this week</p>
                      <p className="mt-2 text-2xl font-semibold text-white">41</p>
                    </div>
                    <div className="rounded-[1rem] border border-white/10 bg-white/4 p-3">
                      <p className="text-[0.58rem] uppercase tracking-[0.18em] text-white/55">Avg. reply time</p>
                      <p className="mt-2 text-2xl font-semibold text-white">6s</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -left-4 bottom-7 rotate-[-7deg] rounded-full border border-[#1d1915]/10 bg-[#fffaf5] px-4 py-2 text-xs font-medium text-[#2d241f] shadow-[0_16px_30px_rgba(29,25,21,0.08)]">
                  96% FAQ coverage
                </div>

                <div className="absolute -right-4 top-7 rotate-[8deg] rounded-full border border-[#ef6d53]/30 bg-[#fff4f0] px-4 py-2 text-xs font-medium text-[#af4a33] shadow-[0_16px_30px_rgba(239,109,83,0.12)]">
                  customized for your workflow
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="builder" className="border-t border-[#1d1915]/10 bg-[#f6f0ea]/70">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="max-w-2xl">
              <Badge variant="outline" className="mb-4 rounded-full border-[#1d1915]/10 bg-white/70 text-[#4b3b35]">
                01 / Configure
              </Badge>
              <h2 className="display-font text-5xl leading-none text-[#1d1915] sm:text-6xl">
                Shape the voice, scope, and purpose.
              </h2>
              <p className="mt-3 text-base text-[#5d4c42]">
                Pick the way the bot behaves, what it handles, and how much intelligence it brings to a conversation.
              </p>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-[2rem] border border-[#1d1915]/10 bg-[#fffdfb] p-6 shadow-[0_25px_60px_rgba(31,22,18,0.04)] sm:p-8">
                {(Object.entries(BOT_OPTIONS) as [keyof typeof BOT_OPTIONS, readonly string[]][]).map(([category, options]) => (
                  <div key={category} className="not-first:mt-8">
                    <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#5d4c42]">{category}</p>
                    <div className="flex flex-wrap gap-2">
                      {options.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setBotPreferences((current) => ({ ...current, [category]: option }))}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                            botPreferences[category] === option
                              ? "border-[#1d1915] bg-[#1d1915] text-[#f8f4ef] shadow-[0_10px_25px_rgba(29,25,21,0.15)]"
                              : "border-[#1d1915]/10 bg-[#fffaf6] text-[#4b3b35] hover:border-[#ef6d53]/40 hover:text-[#1d1915]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[2rem] border border-[#ef6d53]/30 bg-[linear-gradient(135deg,_rgba(239,109,83,0.12),_rgba(255,255,255,0.7)_55%,_rgba(120,158,255,0.14))] p-6 sm:p-8">
                <div>
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1d1915] text-[#f8f4ef]">
                    <Bot className="h-5 w-5" />
                  </div>
                  <h3 className="display-font text-4xl leading-none text-[#1d1915]">
                    Your {botPreferences.tone.toLowerCase()} {botPreferences.objective.toLowerCase()} agent.
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-[#4b3b35]">
                    A {botPreferences.intelligence.toLowerCase()} website bot, designed to sound human and behave with clarity on the moments that matter most.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#4b3b35]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#6ad7a6] shadow-[0_0_18px_rgba(106,215,166,0.8)]" />
                    configuration saved locally
                  </div>
                  <Button asChild size="sm" className="gap-2 rounded-full bg-[#1d1915] text-[#f8f4ef] hover:bg-[#2d251f]">
                    <Link href={builderHref} className="inline-flex items-center gap-2">
                      Build this bot
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-t border-[#1d1915]/10 bg-[#f9f5f1]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="max-w-2xl">
              <h2 className="display-font text-5xl leading-none text-[#1d1915] sm:text-6xl">
                A simple process with a thoughtful finish.
              </h2>
              <p className="mt-4 text-base text-[#5d4c42]">
                You describe your business. We handle the build. Your customers get a more human, helpful first response.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {STEPS.map((step, index) => (
                <div key={step.title} className="relative rounded-[1.8rem] border border-[#1d1915]/10 bg-white/70 p-6 shadow-[0_20px_50px_rgba(31,22,18,0.03)] transition-transform duration-500 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ef6d53]/10 text-[#af4a33]">
                      <step.icon className="h-5 w-5" />
                    </span>
                    <span className="text-[0.7rem] uppercase tracking-[0.22em] text-[#5d4c42]">Step {index + 1}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-medium text-[#1d1915]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#5d4c42]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="max-w-2xl">
            <h2 className="display-font text-5xl leading-none text-[#1d1915] sm:text-6xl">
              Everything your business needs from a chatbot.
            </h2>
            <p className="mt-4 text-base text-[#5d4c42]">
              Not a generic widget — a custom assistant trained on your business and connected to your real tools.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="rounded-[1.7rem] border border-[#1d1915]/10 bg-white/70 p-6 shadow-[0_18px_45px_rgba(31,22,18,0.03)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(31,22,18,0.06)]">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#e8e1d7] text-[#1d1915]">
                  <benefit.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-medium text-[#1d1915]">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5d4c42]">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="border-t border-[#1d1915]/10 bg-[#f4efe9]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="max-w-2xl">
              <h2 className="display-font text-5xl leading-none text-[#1d1915] sm:text-6xl">
                A system that earns its keep.
              </h2>
              <p className="mt-4 text-base text-[#5d4c42]">
                Every build starts from our Starter package and grows with exactly what your operation needs — see the{" "}
                <Link href="/pricing" className="underline decoration-[#ef6d53]/50 underline-offset-4 hover:text-[#1d1915]">
                  full package comparison
                </Link>{" "}
                if you need more bots or advanced workflows.
              </p>
            </div>

            <div id="calculator" className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-[2rem] border border-[#1d1915]/10 bg-[#fffdfb] p-6 shadow-[0_20px_50px_rgba(31,22,18,0.04)] sm:p-8">
                <h3 className="text-2xl font-medium text-[#1d1915]">Add-on features</h3>
                <p className="mt-2 text-sm text-[#5d4c42]">Tailor the build without paying for a generic platform you do not need.</p>
                <div className="mt-6 space-y-0">
                  {ADD_ONS.map((addon) => (
                    <label key={addon.id} className="flex cursor-pointer items-start gap-3 border-t border-[#1d1915]/10 py-4 first:border-t-0">
                      <input type="checkbox" checked={selectedAddOns.includes(addon.id)} onChange={() => toggleAddOn(addon.id)} className="mt-1 h-4 w-4 accent-[#ef6d53]" />
                      <span className="flex flex-1 justify-between gap-3 text-sm text-[#1d1915]">
                        <span>{addon.name}</span>
                        <span className="whitespace-nowrap text-xs font-medium text-[#af4a33]">+${addon.setup} / +${addon.monthly}mo</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#ef6d53]/30 bg-[linear-gradient(135deg,_rgba(239,109,83,0.1),_rgba(255,255,255,0.4),_rgba(120,158,255,0.12))] p-6 shadow-[0_28px_70px_rgba(239,109,83,0.08)] sm:p-8">
                <div>
                  <Badge className="mb-5 rounded-full border-[#1d1915]/10 bg-white/80 text-[#2f2723]">Starter package, your way</Badge>
                  <h3 className="display-font text-4xl leading-none text-[#1d1915]">The Swift Partnership</h3>
                  <p className="mt-3 max-w-lg text-sm leading-6 text-[#4b3b35]">
                    A high-touch AI growth system built around your goals, your voice, and the actual moments your customers need help.
                  </p>
                </div>

                <div className="my-10 grid grid-cols-2 gap-4">
                  <div className="border-t border-[#1d1915]/10 pt-4">
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#5d4c42]">Setup fee</p>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-[#1d1915]">${setupTotal.toLocaleString()}</p>
                  </div>
                  <div className="border-t border-[#1d1915]/10 pt-4">
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.2em] text-[#5d4c42]">Monthly</p>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-[#1d1915]">${monthlyTotal.toLocaleString()}<span className="text-base font-normal text-[#af4a33]">/mo</span></p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Button asChild size="lg" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1d1915] px-6 text-[#f8f4ef] hover:bg-[#2d251f]">
                    <Link href={CONFIGURE_URL} className="inline-flex items-center justify-center gap-2">
                      <span>Start your onboarding</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Link href="/pricing" className="text-sm font-medium text-[#af4a33] underline decoration-[#af4a33]/40 underline-offset-4 hover:text-[#1d1915]">
                    Compare all packages
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
          <h2 className="display-font text-center text-5xl leading-none text-[#1d1915] sm:text-6xl">
            A few clarifying answers.
          </h2>
          <Accordion type="single" collapsible className="mt-10">
            {FAQS.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="rounded-[1.4rem] border border-[#1d1915]/10 bg-white/70 px-4 shadow-[0_18px_35px_rgba(31,22,18,0.02)]">
                <AccordionTrigger className="text-left text-base font-medium text-[#1d1915]">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm leading-6 text-[#5d4c42]">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[#1d1915]/10 bg-[#1d1915] px-6 py-14 text-center text-[#f9f5f0] sm:px-12">
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-90 bg-[radial-gradient(circle_at_center,_rgba(239,109,83,0.3),transparent_42%)]" />
            <h2 className="display-font text-5xl leading-none sm:text-6xl">
              Ready for a quieter, smarter customer experience?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#e7ddd4]">
              We build calm, capable AI systems that feel like part of the business — not a bolted-on demo experience.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f9f5f0] px-6 text-[#1d1915] hover:bg-[#fffaf5]">
                <Link href="/configure" className="inline-flex items-center justify-center gap-2">
                  <span>Start building</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="inline-flex items-center justify-center gap-2 rounded-full border-white/20 bg-transparent px-6 text-[#f9f5f0] hover:bg-white/5">
                <Link href="/contact" className="inline-flex items-center justify-center gap-2">Talk to us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
