import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-20">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#5d4c42] transition-colors hover:text-[#1d1915]">
        <ArrowLeft className="h-4 w-4" />
        Back to main menu
      </Link>

      <article className="mt-10 rounded-[2rem] border border-[#1d1915]/10 bg-[#fffdfb] p-6 shadow-[0_20px_60px_rgba(31,22,18,0.04)] sm:p-8">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#5d4c42]">Terms</p>
        <h1 className="display-font mt-4 text-5xl leading-none text-[#1d1915] sm:text-6xl">Terms of service</h1>
        <div className="mt-6 space-y-5 text-sm leading-7 text-[#5d4c42]">
          <p>These terms govern the services provided by Swift Agencies, including custom chatbot design, setup, configuration, and strategic support. By engaging with Swift Agencies, the client agrees to the scope, timeline, and pricing outlined in the project brief.</p>
          <p>Clients are responsible for supplying accurate information about their business, goals, and brand requirements. Swift Agencies will use that information to shape the assistant and may suggest adjustments to improve fit and conversion outcomes.</p>
          <p>Project delivery depends on timely feedback from the client, including content review and approval milestones. Delays caused by missing assets or approval bottlenecks may extend timelines.</p>
          <p>Swift Agencies delivers a custom website assistant based on the agreed scope. Ongoing updates, integrations, and maintenance outside the project brief may be quoted separately.</p>
          <p>The client retains ownership of their brand materials, content, and business context used in the build. Swift Agencies retains ownership of its proprietary process, code patterns, and strategic design frameworks used to develop the solution.</p>
        </div>
      </article>
    </main>
  )
}
