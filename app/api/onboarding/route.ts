import { NextResponse } from "next/server"
import { Pool } from "@neondatabase/serverless"
import { planById } from "@/lib/pricing"

const ADDITION_SETUP = 25
let pool: Pool | undefined

function getPool() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) throw new Error("DATABASE_URL is not configured")
  pool ??= new Pool({ connectionString: databaseUrl })
  return pool
}

function isUniqueViolation(error: unknown) {
  return typeof error === "object" && error !== null && "code" in error && error.code === "23505"
}

export async function POST(request: Request) {
  try {
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 })
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Request body must be an object." }, { status: 400 })
    }

    const payload = body as Record<string, unknown>
    const companyName = typeof payload.companyName === "string" ? payload.companyName.trim() : ""
    const contactEmail = typeof payload.contactEmail === "string" ? payload.contactEmail.trim().toLowerCase() : ""
    const website = typeof payload.website === "string" ? payload.website.trim() : ""
    const tier = typeof payload.tier === "string" ? payload.tier : typeof payload.planId === "string" ? payload.planId : ""
    const plan = planById(tier)
    const needs = Array.isArray(payload.needs) ? payload.needs.filter((need: unknown): need is string => typeof need === "string").slice(0, 30) : []

    if (
      !companyName ||
      companyName.length > 200 ||
      !contactEmail ||
      contactEmail.length > 320 ||
      !plan ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail) ||
      (website && !/^https?:\/\//i.test(website))
    ) {
      return NextResponse.json({ error: "Company, valid email, and package are required." }, { status: 400 })
    }

    const setupPrice = plan.custom ? 0 : plan.price + needs.length * ADDITION_SETUP
    const monthlyPrice = plan.custom ? 0 : plan.monthlyPrice + needs.length * 10
    const addOnPrice = setupPrice - plan.price
    const details = JSON.stringify({ needs, additionSetup: ADDITION_SETUP, additionMonthly: 10 })
    const database = getPool()
    const companyId = crypto.randomUUID()
    const orderId = crypto.randomUUID()
    const client = await database.connect()

    try {
      await client.query("BEGIN")

      const duplicate = await client.query(
        `SELECT 1 FROM "company" WHERE lower("contactEmail") = $1 LIMIT 1`,
        [contactEmail],
      )
      if (duplicate.rowCount) {
        await client.query("ROLLBACK")
        return NextResponse.json({ error: "A brief has already been saved for this email address." }, { status: 400 })
      }

      await client.query(
        `INSERT INTO "company" ("id", "companyName", "contactEmail", "website", "status", "notes")
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [companyId, companyName, contactEmail, website || null, "lead", details],
      )
      await client.query(
        `INSERT INTO "orders" (
          "id", "companyId", "plan", "basePrice", "monthlyPrice", "addOnPrice", "totalPrice",
          "paymentStatus", "orderStatus", "notes"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [orderId, companyId, plan.id, plan.price, monthlyPrice, addOnPrice, setupPrice, "unpaid", "lead", details],
      )
      await client.query("COMMIT")
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    } finally {
      client.release()
    }

    return NextResponse.json({ companyId, orderId, setupPrice, monthlyPrice }, { status: 201 })
  } catch (error) {
    if (isUniqueViolation(error)) {
      return NextResponse.json({ error: "A brief has already been saved for this email address." }, { status: 400 })
    }
    console.error("Failed to save onboarding brief", error)
    return NextResponse.json({ error: "Unable to save onboarding brief." }, { status: 500 })
  }
}
