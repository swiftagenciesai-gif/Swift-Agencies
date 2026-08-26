// Central pricing configuration. These values are the defaults; the admin
// settings table can override them at runtime (see lib/settings.ts).

export type Plan = {
  id: string
  name: string
  price: number // one-time setup price in USD, 0 = custom
  tagline: string
  popular?: boolean
  custom?: boolean
  features: string[]
}

export const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 499,
    tagline: "Everything you need to launch a smart AI chatbot.",
    features: [
      "Custom AI chatbot",
      "Website widget",
      "FAQ answering",
      "Basic knowledge base",
      "Lead capture",
      "Custom personality",
      "Basic customization",
      "Mobile support",
      "Installation assistance",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 999,
    popular: true,
    tagline: "Advanced AI behavior and automation for growing teams.",
    features: [
      "Everything in Starter",
      "Advanced AI behavior",
      "Advanced knowledge base",
      "Lead qualification",
      "Appointment booking",
      "Human escalation",
      "Analytics",
      "Custom workflows",
      "Integrations",
      "Priority support",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 1999,
    tagline: "Deep integrations and custom development for scale.",
    features: [
      "Everything in Growth",
      "Multiple workflows",
      "Advanced integrations",
      "CRM integration",
      "Custom API integrations",
      "Advanced analytics",
      "Multiple knowledge sources",
      "Advanced automation",
      "Custom development",
      "Priority implementation",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 0,
    custom: true,
    tagline: "Custom AI systems for multiple chatbots and websites.",
    features: [
      "Multiple chatbots",
      "Multiple websites",
      "Custom integrations",
      "API access",
      "Advanced automation",
      "Dedicated support",
      "Custom AI systems",
    ],
  },
]

export type AddOn = {
  id: string
  name: string
  price: number
  description: string
}

export const ADD_ONS: AddOn[] = [
  { id: "additional-chatbot", name: "Additional chatbot", price: 399, description: "Add another custom chatbot." },
  { id: "additional-website", name: "Additional website", price: 199, description: "Deploy on another domain." },
  { id: "crm-integration", name: "CRM integration", price: 250, description: "Sync leads to your CRM." },
  { id: "calendar-integration", name: "Calendar integration", price: 150, description: "Let customers book time." },
  { id: "custom-api", name: "Custom API", price: 500, description: "Connect to your systems." },
  { id: "advanced-analytics", name: "Advanced analytics", price: 200, description: "Deeper insight dashboards." },
  { id: "custom-workflow", name: "Custom workflow", price: 300, description: "Bespoke conversation flows." },
  { id: "multilingual", name: "Multilingual support", price: 250, description: "Speak to global customers." },
  { id: "priority-development", name: "Priority development", price: 400, description: "Jump the build queue." },
  { id: "monthly-maintenance", name: "Monthly maintenance", price: 99, description: "Ongoing tuning & updates." },
  { id: "advanced-knowledge", name: "Advanced knowledge base", price: 200, description: "More sources & documents." },
]

// Features shown in the wizard. Some carry a price impact.
export type FeatureOption = {
  id: string
  name: string
  price: number
}

export const FEATURES: FeatureOption[] = [
  { id: "faq", name: "FAQ answering", price: 0 },
  { id: "lead-capture", name: "Lead capture", price: 0 },
  { id: "lead-qualification", name: "Lead qualification", price: 100 },
  { id: "appointment-booking", name: "Appointment booking", price: 150 },
  { id: "calendar-integration", name: "Calendar integration", price: 150 },
  { id: "email-notifications", name: "Email notifications", price: 0 },
  { id: "crm-integration", name: "CRM integration", price: 250 },
  { id: "quote-requests", name: "Quote requests", price: 100 },
  { id: "product-recommendations", name: "Product recommendations", price: 100 },
  { id: "order-tracking", name: "Order tracking", price: 150 },
  { id: "human-handoff", name: "Human handoff", price: 0 },
  { id: "human-escalation", name: "Human escalation", price: 0 },
  { id: "customer-feedback", name: "Customer feedback", price: 0 },
  { id: "review-collection", name: "Review collection", price: 50 },
  { id: "multilingual", name: "Multilingual support", price: 250 },
  { id: "analytics", name: "Analytics", price: 100 },
  { id: "conversation-history", name: "Conversation history", price: 0 },
  { id: "custom-workflows", name: "Custom workflows", price: 300 },
  { id: "api-integrations", name: "API integrations", price: 500 },
  { id: "webhooks", name: "Webhooks", price: 100 },
  { id: "custom-forms", name: "Custom forms", price: 50 },
  { id: "file-uploads", name: "File uploads", price: 50 },
  { id: "knowledge-base", name: "Knowledge base", price: 0 },
  { id: "website-knowledge", name: "Website knowledge", price: 0 },
  { id: "automated-follow-ups", name: "Automated follow-ups", price: 100 },
  { id: "business-hours", name: "Business-hours behavior", price: 0 },
  { id: "emergency-escalation", name: "Emergency escalation", price: 50 },
  { id: "custom-integrations", name: "Custom integrations", price: 500 },
]

export const GOALS = [
  "Customer support",
  "FAQ",
  "Lead generation",
  "Sales",
  "Appointment booking",
  "Lead qualification",
  "Product recommendations",
  "Service recommendations",
  "Order tracking",
  "Quote generation",
  "Contact collection",
  "Technical support",
  "Employee support",
  "Website navigation",
  "Review collection",
  "Feedback",
  "Customer onboarding",
  "Custom",
]

export type Integration = {
  id: string
  name: string
  available: boolean
}

export const INTEGRATIONS: Integration[] = [
  { id: "google-calendar", name: "Google Calendar", available: false },
  { id: "calendly", name: "Calendly", available: false },
  { id: "hubspot", name: "HubSpot", available: false },
  { id: "salesforce", name: "Salesforce", available: false },
  { id: "slack", name: "Slack", available: false },
  { id: "gmail", name: "Gmail", available: false },
  { id: "outlook", name: "Outlook", available: false },
  { id: "zapier", name: "Zapier", available: false },
  { id: "make", name: "Make", available: false },
  { id: "stripe", name: "Stripe", available: false },
  { id: "shopify", name: "Shopify", available: false },
  { id: "wordpress", name: "WordPress", available: false },
  { id: "webflow", name: "Webflow", available: false },
  { id: "wix", name: "Wix", available: false },
  { id: "gohighlevel", name: "GoHighLevel", available: false },
  { id: "custom-api", name: "Custom API", available: false },
  { id: "webhooks", name: "Webhooks", available: false },
]

export const INDUSTRIES = [
  "Restaurants",
  "Real Estate",
  "Dental",
  "Law",
  "Home Services",
  "E-commerce",
  "SaaS",
  "Automotive",
  "Hotels",
  "Marketing Agencies",
  "Professional Services",
  "Local Businesses",
  "Other",
]

export const COMPANY_STATUSES = [
  "lead",
  "consultation",
  "configuring",
  "awaiting-payment",
  "paid",
  "building",
  "testing",
  "client-review",
  "delivered",
  "live",
  "paused",
  "cancelled",
]

export function calcTotal(opts: {
  basePrice: number
  featureIds?: string[]
  addOnIds?: string[]
}): { base: number; addOns: number; total: number } {
  const base = opts.basePrice
  const featureTotal = (opts.featureIds ?? []).reduce((sum, id) => {
    const f = FEATURES.find((x) => x.id === id)
    return sum + (f?.price ?? 0)
  }, 0)
  const addOnTotal = (opts.addOnIds ?? []).reduce((sum, id) => {
    const a = ADD_ONS.find((x) => x.id === id)
    return sum + (a?.price ?? 0)
  }, 0)
  const addOns = featureTotal + addOnTotal
  return { base, addOns, total: base + addOns }
}

export function planById(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id)
}
