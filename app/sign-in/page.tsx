import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SignInPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-20">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#5d4c42] transition-colors hover:text-[#1d1915]">
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[2rem] border border-[#1d1915]/10 bg-[#fffdfb] p-6 shadow-[0_20px_60px_rgba(31,22,18,0.04)] sm:p-8">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#5d4c42]">Client access</p>
          <h1 className="display-font mt-4 text-5xl leading-none text-[#1d1915] sm:text-6xl">Welcome back.</h1>
          <p className="mt-4 text-base leading-7 text-[#5d4c42]">
            Sign in to review your project brief, chat history, or onboarding status. This is the secure area for active clients and partner teams.
          </p>
        </section>

        <section className="rounded-[2rem] border border-[#1d1915]/10 bg-[#f4efe9] p-6 shadow-[0_20px_60px_rgba(31,22,18,0.04)] sm:p-8">
          <form className="space-y-5">
            <label className="block text-sm">
              <span className="mb-2 block text-[#4b3b35]">Email address</span>
              <input type="email" className="w-full rounded-[1rem] border border-[#1d1915]/10 bg-white px-3 py-3 text-[#1d1915] outline-none transition focus:border-[#ef6d53]/40" placeholder="you@company.com" />
            </label>

            <label className="block text-sm">
              <span className="mb-2 block text-[#4b3b35]">Password</span>
              <input type="password" className="w-full rounded-[1rem] border border-[#1d1915]/10 bg-white px-3 py-3 text-[#1d1915] outline-none transition focus:border-[#ef6d53]/40" placeholder="Enter your password" />
            </label>

            <div className="flex items-center justify-between gap-4 text-sm text-[#5d4c42]">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 accent-[#ef6d53]" />
                Keep me signed in
              </label>
              <Link href="/contact" className="hover:text-[#1d1915]">Need help?</Link>
            </div>

            <Button asChild size="lg" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1d1915] px-6 text-[#f8f4ef] hover:bg-[#2d251f]">
              <Link href="/configure" className="inline-flex items-center justify-center gap-2">
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </form>
        </section>
      </div>
    </main>
  )
}
