import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { activityLog, chatbotConfiguration, company, orders } from "@/lib/db/schema"
import { planById } from "@/lib/pricing"

const ADDITION_SETUP = 25
const ADDITION_MONTHLY = 10

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const companyName = typeof body.companyName === "string" ? body.companyName.trim() : ""
    const contactEmail = typeof body.contactEmail === "string" ? body.contactEmail.trim().toLowerCase() : ""
    const website = typeof body.website === "string" ? body.website.trim() : ""
    const plan = typeof body.planId === "string" ? planById(body.planId) : undefined
    const needs = Array.isArray(body.needs) ? body.needs.filter((need): need is string => typeof need === "string").slice(0, 30) : []

    if (!companyName || !contactEmail || !plan || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
      return NextResponse.json({ error: "Company, valid email, and package are required." }, { status: 400 })
    }

    const companyId = crypto.randomUUID()
    const orderId = crypto.randomUUID()
    const configurationId = crypto.randomUUID()
    const setupPrice = plan.custom ? 0 : plan.price + needs.length * ADDITION_SETUP
    const monthlyPrice = plan.custom ? 0 : plan.monthlyPrice + needs.length * ADDITION_MONTHLY
    const details = JSON.stringify({ needs, additionSetup: ADDITION_SETUP, additionMonthly: ADDITION_MONTHLY })

    await db.transaction(async (transaction) => {
      await transaction.insert(company).values({ id: companyId, companyName, contactEmail, website: website || null, status: "lead", notes: details })
      await transaction.insert(orders).values({ id: orderId, companyId, plan: plan.id, basePrice: plan.price, monthlyPrice, addOnPrice: setupPrice - plan.price, totalPrice: setupPrice, paymentStatus: "unpaid", orderStatus: "lead", notes: details })
      await transaction.insert(chatbotConfiguration).values({ id: configurationId, companyId, orderId, botPurpose: { needs }, requirements: { needs }, widgetSettings: { platform: "website-widget" }, botpressStatus: "Not Started" })
      await transaction.insert(activityLog).values({ id: crypto.randomUUID(), companyId, action: "onboarding_submitted", detail: details })
    })

    return NextResponse.json({ companyId, orderId, setupPrice, monthlyPrice }, { status: 201 })
  } catch (error) {
    console.error("Failed to save onboarding brief", error)
    return NextResponse.json({ error: "Unable to save onboarding brief." }, { status: 500 })
  }
}
