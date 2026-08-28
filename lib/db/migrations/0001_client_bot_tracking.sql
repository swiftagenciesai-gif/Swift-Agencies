ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "monthlyPrice" integer NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS "chatbot_messages" (
  "id" text PRIMARY KEY NOT NULL,
  "companyId" text,
  "botId" text,
  "conversationId" text,
  "direction" text NOT NULL DEFAULT 'inbound',
  "message" text NOT NULL,
  "metadata" jsonb,
  "createdAt" timestamp NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "chatbot_messages_company_idx" ON "chatbot_messages" ("companyId");
CREATE INDEX IF NOT EXISTS "chatbot_messages_conversation_idx" ON "chatbot_messages" ("conversationId");
CREATE INDEX IF NOT EXISTS "chatbot_messages_created_idx" ON "chatbot_messages" ("createdAt");
