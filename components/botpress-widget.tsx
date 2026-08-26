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

    inject.onload = () => document.body.appendChild(config)
    document.body.appendChild(inject)

    return () => {
      inject.remove()
      config.remove()
    }
  }, [injectUrl, configUrl])

  return null
}
