import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:py-20">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#5d4c42] transition-colors hover:text-[#1d1915]">
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <article className="mt-10 rounded-[2rem] border border-[#1d1915]/10 bg-[#fffdfb] p-6 shadow-[0_20px_60px_rgba(31,22,18,0.04)] sm:p-8">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#5d4c42]">Privacy</p>
        <h1 className="display-font mt-4 text-5xl leading-none text-[#1d1915] sm:text-6xl">Privacy policy</h1>
        <div className="mt-6 space-y-5 text-sm leading-7 text-[#5d4c42]">
          <p>Swift Agencies respects the privacy of the people and businesses we work with. We collect only the information needed to design, deliver, and maintain the chatbot systems we build.</p>
          <p>We use contact details, website information, and service preferences to scope the project, build the bot, and keep communication moving. This information is never sold or rented to third parties.</p>
          <p>We may store conversation data, lead-capture details, and operational notes in secure systems as needed to support training and customer support workflows. Access is limited to the team members who need it to perform work for your project.</p>
          <p>Our clients can request access to, correction of, or deletion of the personal data we hold by contacting hello@swiftagencies.ai.</p>
          <p>We review this policy periodically and may update it as our services evolve. Material changes will be communicated through the website or direct email.</p>
        </div>
      </article>
    </main>
  )
}
