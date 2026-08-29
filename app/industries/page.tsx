import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const INDUSTRY_SECTORS = [
  {
    title: "Professional services",
    description: "Let your bot answer intake questions, qualify interest, and capture follow-up information before your team ever picks up the phone.",
  },
  {
    title: "Healthcare & clinics",
    description: "Handle appointment questions, insurance FAQs, and patient routing with a tone that is calm, clear, and highly reassuring.",
  },
  {
    title: "Home services",
    description: "Answer urgency, estimate requests, and service-area questions while collecting promising leads while you are in the field.",
  },
  {
    title: "Real estate",
    description: "Guide prospects through neighborhoods, listings, and first-step questions without forcing them into a generic lead form.",
  },
  {
    title: "E-commerce",
    description: "Support returns, shipping questions, product recommendations, and hero-page conversion flows that keep people moving forward.",
  },
  {
    title: "Agencies & studios",
    description: "Turn the most common sales questions into a smooth self-serve discovery path that feels polished and brand-aligned.",
  },
]

export default function IndustriesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-20">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#5d4c42] transition-colors hover:text-[#1d1915]">
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <div className="mt-10 max-w-3xl">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#5d4c42]">Industry fit</p>
        <h1 className="display-font mt-4 text-5xl leading-none text-[#1d1915] sm:text-6xl">The right bot for the kind of work you do.</h1>
        <p className="mt-4 text-base leading-7 text-[#5d4c42]">
          We design every assistant around the way your customers actually ask questions. That means the system sounds like your brand, behaves like your team, and fits the shape of the business you run.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {INDUSTRY_SECTORS.map((industry) => (
          <article key={industry.title} className="rounded-[1.8rem] border border-[#1d1915]/10 bg-[#fffdfb] p-6 shadow-[0_20px_45px_rgba(31,22,18,0.03)] transition-transform duration-500 hover:-translate-y-1">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#af4a33]">Focus</p>
            <h2 className="mt-3 text-2xl font-medium text-[#1d1915]">{industry.title}</h2>
            <p className="mt-3 text-sm leading-6 text-[#5d4c42]">{industry.description}</p>
          </article>
        ))}
      </div>

      <div className="mt-12 rounded-[2rem] border border-[#1d1915]/10 bg-[#f4efe9] p-8 text-center">
        <h2 className="display-font text-4xl leading-none text-[#1d1915] sm:text-5xl">Need a tailored mix of workflows and automation?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-base text-[#5d4c42]">
          Every engagement starts with a conversation about your customer journey, not a prebuilt template.
        </p>
        <Button asChild size="lg" className="mt-6 rounded-full bg-[#1d1915] px-6 text-[#f8f4ef] hover:bg-[#2d251f]">
          <Link href="/configure">
            Plan your build <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </main>
  )
}
