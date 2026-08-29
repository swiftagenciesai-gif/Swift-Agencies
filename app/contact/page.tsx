import Link from "next/link"
import { ArrowLeft, ArrowRight, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-20">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#5d4c42] transition-colors hover:text-[#1d1915]">
        <ArrowLeft className="h-4 w-4" />
        Back to main menu
      </Link>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[2rem] border border-[#1d1915]/10 bg-[#fffdfb] p-6 shadow-[0_20px_60px_rgba(31,22,18,0.04)] sm:p-8">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#5d4c42]">Contact</p>
          <h1 className="display-font mt-4 text-5xl leading-none text-[#1d1915] sm:text-6xl">Let&apos;s talk about the right AI system.</h1>
          <p className="mt-4 text-base leading-7 text-[#5d4c42]">
            Tell us what you sell, where customers get stuck, and what kind of experience you want your bot to deliver. We&apos;ll map the right setup from there.
          </p>

          <div className="mt-8 space-y-4 text-sm text-[#1d1915]">
            <div className="flex gap-3 rounded-[1.2rem] border border-[#1d1915]/10 bg-[#f9f5f1] p-4">
              <Mail className="mt-0.5 h-4 w-4 text-[#af4a33]" />
              <div>
                <p className="font-medium">Email</p>
                <a href="mailto:hello@swiftagencies.ai" className="text-[#5d4c42] hover:text-[#1d1915]">hello@swiftagencies.ai</a>
              </div>
            </div>
            <div className="flex gap-3 rounded-[1.2rem] border border-[#1d1915]/10 bg-[#f9f5f1] p-4">
              <Phone className="mt-0.5 h-4 w-4 text-[#af4a33]" />
              <div>
                <p className="font-medium">Phone</p>
                <a href="tel:+15551234567" className="text-[#5d4c42] hover:text-[#1d1915]">+1 (555) 123-4567</a>
              </div>
            </div>
            <div className="flex gap-3 rounded-[1.2rem] border border-[#1d1915]/10 bg-[#f9f5f1] p-4">
              <MapPin className="mt-0.5 h-4 w-4 text-[#af4a33]" />
              <div>
                <p className="font-medium">Studio</p>
                <p className="text-[#5d4c42]">Remote-first, working with businesses across North America.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[#1d1915]/10 bg-[#f4efe9] p-6 shadow-[0_20px_60px_rgba(31,22,18,0.04)] sm:p-8">
          <form className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-2 block text-[#4b3b35]">Your name</span>
                <input className="w-full rounded-[1rem] border border-[#1d1915]/10 bg-white px-3 py-3 text-[#1d1915] outline-none transition focus:border-[#ef6d53]/40" placeholder="Jordan Smith" />
              </label>
              <label className="block text-sm">
                <span className="mb-2 block text-[#4b3b35]">Company</span>
                <input className="w-full rounded-[1rem] border border-[#1d1915]/10 bg-white px-3 py-3 text-[#1d1915] outline-none transition focus:border-[#ef6d53]/40" placeholder="Northline Studio" />
              </label>
            </div>

            <label className="block text-sm">
              <span className="mb-2 block text-[#4b3b35]">Email</span>
              <input type="email" className="w-full rounded-[1rem] border border-[#1d1915]/10 bg-white px-3 py-3 text-[#1d1915] outline-none transition focus:border-[#ef6d53]/40" placeholder="hello@company.com" />
            </label>

            <label className="block text-sm">
              <span className="mb-2 block text-[#4b3b35]">What are you hoping the bot handles?</span>
              <textarea rows={5} className="w-full rounded-[1rem] border border-[#1d1915]/10 bg-white px-3 py-3 text-[#1d1915] outline-none transition focus:border-[#ef6d53]/40" placeholder="We need a bot that answers FAQs, captures leads, and books consultations without sounding robotic." />
            </label>

            <Button asChild size="lg" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1d1915] px-6 text-[#f8f4ef] hover:bg-[#2d251f]">
              <Link href="/configure" className="inline-flex items-center justify-center gap-2">
                <span>Send brief</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </form>
        </section>
      </div>
    </main>
  )
}
