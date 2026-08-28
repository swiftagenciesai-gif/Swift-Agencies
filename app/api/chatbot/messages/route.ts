import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { chatbotMessages } from "@/lib/db/schema"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const message = typeof body.message === "string" ? body.message.trim() : ""
    if (!message || message.length > 10000) {
      return NextResponse.json({ error: "A message between 1 and 10,000 characters is required." }, { status: 400 })
    }

    const [record] = await db.insert(chatbotMessages).values({
      id: crypto.randomUUID(),
      companyId: typeof body.companyId === "string" ? body.companyId : null,
      botId: typeof body.botId === "string" ? body.botId : null,
      conversationId: typeof body.conversationId === "string" ? body.conversationId : null,
      direction: body.direction === "outbound" ? "outbound" : "inbound",
      message,
      metadata: body.metadata && typeof body.metadata === "object" ? body.metadata : null,
    }).returning({ id: chatbotMessages.id })

    return NextResponse.json({ id: record.id }, { status: 201 })
  } catch (error) {
    console.error("Failed to store chatbot message", error)
    return NextResponse.json({ error: "Unable to store chatbot message." }, { status: 500 })
  }
}
