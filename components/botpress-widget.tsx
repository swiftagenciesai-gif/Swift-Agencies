"use client"

import { useEffect } from "react"

type Props = {
  /** Botpress webchat inject script, e.g. https://cdn.botpress.cloud/webchat/v2.2/inject.js */
  injectUrl?: string
  /** The bot-specific config script, e.g. https://files.bpcontent.cloud/.../config.js */
  configUrl?: string
}

/**
 * Injects the Botpress webchat scripts when URLs are provided.
 * Until the demo bot is configured in Botpress, nothing is rendered — the site
 * works without it and the live widget appears the moment the URLs are set.
 */
export function BotpressWidget({ injectUrl, configUrl }: Props) {
  useEffect(() => {
    if (!injectUrl || !configUrl) return
    if (document.getElementById("bp-inject")) return

    const inject = document.createElement("script")
    inject.id = "bp-inject"
    inject.src = injectUrl
    inject.async = true

    const config = document.createElement("script")
    config.id = "bp-config"
    config.src = configUrl
    config.async = true

    const captureMessage = (event: MessageEvent) => {
      if (event.origin && !event.origin.endsWith("botpress.cloud") && event.origin !== window.location.origin) return
      const data = event.data
      const message = data?.message?.text ?? data?.message
      if (typeof message !== "string" || !message.trim()) return
      void fetch("/api/chatbot/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          direction: data?.direction === "outbound" ? "outbound" : "inbound",
          botId: data?.botId,
          conversationId: data?.conversationId,
          metadata: { source: "botpress", eventType: data?.type ?? "message" },
        }),
      }).catch(() => undefined)
    }

    inject.onload = () => document.body.appendChild(config)
    window.addEventListener("message", captureMessage)
    document.body.appendChild(inject)

    return () => {
      window.removeEventListener("message", captureMessage)
      inject.remove()
      config.remove()
    }
  }, [injectUrl, configUrl])

  return null
}
