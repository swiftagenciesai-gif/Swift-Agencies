import { db } from "@/lib/db"
import { activityLog } from "@/lib/db/schema"
import { newId } from "@/lib/ids"

export async function logActivity(opts: {
  action: string
  detail?: string
  companyId?: string | null
  userId?: string | null
}) {
  try {
    await db.insert(activityLog).values({
      id: newId("act"),
      action: opts.action,
      detail: opts.detail ?? null,
      companyId: opts.companyId ?? null,
      userId: opts.userId ?? null,
    })
  } catch (err) {
    console.log("[v0] failed to log activity:", (err as Error).message)
  }
}
