import { db } from "@/lib/db"
import { settings } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export async function getSetting<T>(key: string, fallback: T): Promise<T> {
  try {
    const rows = await db.select().from(settings).where(eq(settings.key, key)).limit(1)
    if (rows.length === 0) return fallback
    return rows[0].value as T
  } catch {
    return fallback
  }
}

export async function setSetting(key: string, value: unknown) {
  const existing = await db.select().from(settings).where(eq(settings.key, key)).limit(1)
  if (existing.length > 0) {
    await db.update(settings).set({ value, updatedAt: new Date() }).where(eq(settings.key, key))
  } else {
    await db.insert(settings).values({ key, value })
  }
}
