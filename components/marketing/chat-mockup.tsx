import { Bot, User } from "lucide-react"

export function ChatMockup() {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-border bg-card shadow-2xl shadow-primary/5">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">Riverside Dental Assistant</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-chart-3" />
            Online now
          </p>
        </div>
      </div>

      <div className="space-y-3 px-4 py-4">
        <Bubble role="bot">Hi! I&apos;m here 24/7. Looking to book a cleaning or ask about insurance?</Bubble>
        <Bubble role="user">Do you take Delta Dental?</Bubble>
        <Bubble role="bot">
          Yes, we&apos;re in-network with Delta Dental PPO. Want me to check the next available appointment for you?
        </Bubble>
        <Bubble role="user">Yes please, Thursday if possible</Bubble>
        <Bubble role="bot">Thursday at 10:30am is open. Can I grab your name and number to lock it in?</Bubble>
      </div>

      <div className="flex items-center gap-2 border-t border-border px-4 py-3">
        <div className="h-9 flex-1 rounded-full border border-border bg-muted/50 px-4 text-sm leading-9 text-muted-foreground">
          Type a message…
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2 11 13" strokeLinecap="round" strokeLinejoin="round" />
            <path d="m22 2-7 20-4-9-9-4 20-7Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  )
}

function Bubble({ role, children }: { role: "bot" | "user"; children: React.ReactNode }) {
  if (role === "user") {
    return (
      <div className="flex items-end justify-end gap-2">
        <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground">
          {children}
        </p>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <User className="h-3.5 w-3.5" />
        </span>
      </div>
    )
  }
  return (
    <div className="flex items-end gap-2">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Bot className="h-3.5 w-3.5" />
      </span>
      <p className="max-w-[80%] rounded-2xl rounded-bl-sm bg-muted px-3.5 py-2 text-sm text-foreground">{children}</p>
    </div>
  )
}
