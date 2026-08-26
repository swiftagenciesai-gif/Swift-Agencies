import Link from "next/link"
import { SiteHeader } from "@/components/marketing/site-header"
import { SiteFooter } from "@/components/marketing/site-footer"
import { ChatMockup } from "@/components/marketing/chat-mockup"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PLANS } from "@/lib/pricing"
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
} from "lucide-react"

const STEPS = [
  {
    icon: Wand2,
    title: "Tell us about your business",
    desc: "Answer a short guided questionnaire about your company, goals, and how you want your bot to behave.",
  },
  {
    icon: Sparkles,
    title: "We build & train your bot",
    desc: "Our team configures a custom AI chatbot on your knowledge, personality, and workflows — then tests it end to end.",
  },
  {
    icon: Rocket,
    title: "Go live in days",
    desc: "Drop one snippet on your site (or we install it for you) and your assistant starts answering customers 24/7.",
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
  { q: "How long until my chatbot is live?", a: "Most Starter and Growth bots go live within a few business days of you completing the questionnaire and approving the preview. Pro and Enterprise builds vary with scope." },
  { q: "Do I need any technical skills?", a: "No. You fill out a guided questionnaire, we build everything, and we either give you a one-line snippet or install it on your site for you." },
  { q: "What does the chatbot actually do?", a: "It answers customer questions from your knowledge base, captures and qualifies leads, books appointments, hands off to a human when needed, and can connect to your calendar or CRM." },
  { q: "Is this a monthly subscription?", a: "Our core offering is a one-time custom build. Optional add-ons like monthly maintenance are available if you want ongoing tuning and updates." },
  { q: "Can it match my brand?", a: "Yes. You control the bot's name, personality, tone, colors, and welcome message during configuration, and our team polishes the details." },
  { q: "What if I need something custom?", a: "That's what we do. Choose the Pro or Enterprise plan (or add-ons) and we'll build custom workflows, integrations, and multi-bot systems." },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] opacity-60"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.68 0.16 250 / 0.25), transparent 70%)",
            }}
          />
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge variant="secondary" className="mb-5 gap-1.5 rounded-full py-1 pl-1.5 pr-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Sparkles className="h-3 w-3" />
                </span>
                Custom AI chatbots, done for you
              </Badge>
              <h1 className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Never miss another customer.
              </h1>
              <p className="mt-5 max-w-md text-pretty text-lg text-muted-foreground">
                We build custom AI chatbots that answer your customers, capture leads, and handle
                repetitive support — working 24/7 on your website.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/configure">
                    Build your chatbot <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/pricing">See pricing</Link>
                </Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                One-time build from $499 · Live in days · No code required
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <ChatMockup />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="border-t border-border/60 bg-card/30">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                From questionnaire to live bot in three steps
              </h2>
              <p className="mt-3 text-muted-foreground">
                You describe your business. We handle the build. Your customers get instant answers.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <div key={s.title} className="relative rounded-2xl border border-border bg-card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-mono text-sm text-muted-foreground">Step {i + 1}</p>
                  <h3 className="mt-1 text-lg font-medium">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground text-pretty">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything your business needs from a chatbot
            </h2>
            <p className="mt-3 text-muted-foreground">
              Not a generic widget — a custom assistant trained on your business and wired into your tools.
            </p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-card p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <b.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-medium">{b.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground text-pretty">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing preview */}
        <section className="border-t border-border/60 bg-card/30">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <div className="max-w-2xl">
              <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Simple one-time pricing
              </h2>
              <p className="mt-3 text-muted-foreground">
                Pick a plan that fits, add exactly what you need. No surprise monthly fees.
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border bg-card p-6 ${
                    plan.popular ? "border-primary shadow-lg shadow-primary/10" : "border-border"
                  }`}
                >
                  {plan.popular && <Badge className="absolute -top-2.5 left-6">Most popular</Badge>}
                  <h3 className="font-medium">{plan.name}</h3>
                  <p className="mt-2 text-3xl font-semibold tracking-tight">
                    {plan.custom ? "Custom" : `$${plan.price}`}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground text-pretty">{plan.tagline}</p>
                  <ul className="mt-5 flex-1 space-y-2">
                    {plan.features.slice(0, 5).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={plan.popular ? "default" : "outline"}
                    className="mt-6 w-full"
                  >
                    <Link href={plan.custom ? "/contact" : `/configure?plan=${plan.id}`}>
                      {plan.custom ? "Contact us" : "Get started"}
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
          <h2 className="text-balance text-center text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <Accordion type="single" collapsible className="mt-10">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 text-center sm:px-12">
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 50% 120%, oklch(0.68 0.16 250 / 0.25), transparent 70%)",
              }}
            />
            <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to put your customer service on autopilot?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
              Build your custom AI chatbot in minutes. We&apos;ll handle the rest.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/configure">
                  Start building <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contact">Talk to us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
