(function () {
  const script = document.currentScript || document.querySelector('script[src$="/widget.js"]');
  if (!script) return;

  const widgetId = "swift-agencies-chat-widget";
  if (document.getElementById(widgetId)) return;

  const companyName = script.getAttribute("data-company") || "Swift Agencies";
  const accentColor = script.getAttribute("data-color") || "#ffc4ab";
  const botId = script.getAttribute("data-bot-id") || "swift-agencies-chat";

  const style = document.createElement("style");
  style.textContent = `
    #${widgetId} {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 9999;
      font-family: Arial, Helvetica, sans-serif;
    }

    #${widgetId} * {
      box-sizing: border-box;
    }

    #${widgetId} .widget-toggle {
      width: 64px;
      height: 64px;
      border: none;
      border-radius: 999px;
      background: ${accentColor};
      color: #111827;
      font-size: 28px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 0 20px 45px rgba(17, 24, 39, 0.22);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    #${widgetId} .widget-toggle:hover {
      transform: translateY(-2px);
      box-shadow: 0 24px 55px rgba(17, 24, 39, 0.28);
    }

    #${widgetId} .widget-panel {
      position: absolute;
      right: 0;
      bottom: 82px;
      width: min(360px, calc(100vw - 28px));
      background: rgba(15, 23, 42, 0.96);
      border: 1px solid rgba(148, 163, 184, 0.25);
      border-radius: 22px;
      overflow: hidden;
      box-shadow: 0 22px 50px rgba(15, 23, 42, 0.32);
      display: none;
      backdrop-filter: blur(12px);
    }

    #${widgetId}.open .widget-panel {
      display: block;
    }

    #${widgetId} .widget-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 18px;
      background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
      border-bottom: 1px solid rgba(148, 163, 184, 0.18);
    }

    #${widgetId} .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #f8fafc;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.02em;
    }

    #${widgetId} .brand-dot {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: ${accentColor};
      box-shadow: 0 0 0 5px rgba(255, 196, 171, 0.16);
    }

    #${widgetId} .window-close {
      background: transparent;
      border: none;
      color: #cbd5e1;
      font-size: 20px;
      cursor: pointer;
      line-height: 1;
    }

    #${widgetId} .widget-body {
      height: 360px;
      background: #0f172a;
      overflow-y: auto;
      padding: 16px;
    }

    #${widgetId} .message {
      display: flex;
      margin-bottom: 12px;
    }

    #${widgetId} .message.user {
      justify-content: flex-end;
    }

    #${widgetId} .bubble {
      max-width: 84%;
      padding: 10px 12px;
      border-radius: 16px;
      font-size: 14px;
      line-height: 1.55;
      color: #e2e8f0;
      background: rgba(148, 163, 184, 0.11);
      border: 1px solid rgba(148, 163, 184, 0.18);
    }

    #${widgetId} .message.user .bubble {
      background: ${accentColor};
      color: #111827;
      border-color: transparent;
    }

    #${widgetId} .widget-form {
      display: flex;
      gap: 8px;
      padding: 12px 14px 14px;
      border-top: 1px solid rgba(148, 163, 184, 0.18);
      background: rgba(15, 23, 42, 0.98);
    }

    #${widgetId} .widget-form input {
      flex: 1;
      height: 42px;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      background: rgba(15, 23, 42, 0.9);
      color: #f8fafc;
      padding: 0 14px;
      font-size: 14px;
      outline: none;
    }

    #${widgetId} .widget-form input:focus {
      border-color: ${accentColor};
      box-shadow: 0 0 0 3px rgba(255, 196, 171, 0.15);
    }

    #${widgetId} .widget-form button {
      height: 42px;
      min-width: 48px;
      border: none;
      border-radius: 999px;
      background: ${accentColor};
      color: #111827;
      font-weight: 700;
      cursor: pointer;
    }

    @media (max-width: 540px) {
      #${widgetId} {
        right: 12px;
        bottom: 12px;
      }
    }
  `;
  document.head.appendChild(style);

  const host = document.createElement("div");
  host.id = widgetId;
  host.innerHTML = `
    <div class="widget-panel" aria-live="polite">
      <div class="widget-header">
        <div class="brand"><span class="brand-dot"></span> ${companyName}</div>
        <button class="window-close" type="button" aria-label="Close chat">×</button>
      </div>
      <div class="widget-body"></div>
      <form class="widget-form">
        <input type="text" aria-label="Message" placeholder="Ask about pricing, services, or onboarding..." />
        <button type="submit" aria-label="Send message">➤</button>
      </form>
    </div>
    <button class="widget-toggle" type="button" aria-label="Open chat">✦</button>
  `;
  document.body.appendChild(host);

  const panel = host.querySelector(".widget-panel");
  const toggle = host.querySelector(".widget-toggle");
  const close = host.querySelector(".window-close");
  const body = host.querySelector(".widget-body");
  const form = host.querySelector(".widget-form");
  const input = host.querySelector("input");

  const addMessage = (text, isUser) => {
    const row = document.createElement("div");
    row.className = `message ${isUser ? "user" : "bot"}`;
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.textContent = text;
    row.appendChild(bubble);
    body.appendChild(row);
    body.scrollTop = body.scrollHeight;
  };

  const getReply = (message) => {
    const lower = message.toLowerCase();

    if (lower.includes("price") || lower.includes("pricing") || lower.includes("cost")) {
      return "Our starter plans begin with a custom chatbot build, setup, and deployment. We can scope the exact package around your goals, integrations, and volume."
    }
    if (lower.includes("lead") || lower.includes("capture") || lower.includes("book") || lower.includes("appointment")) {
      return "We can design the bot to qualify leads, capture contact details, book calls, and route warm prospects to your team automatically."
    }
    if (lower.includes("support") || lower.includes("faq") || lower.includes("help")) {
      return "Yes — we build chatbots for FAQs, support flows, and escalation paths that hand off to a person when the issue needs a human touch."
    }
    if (lower.includes("install") || lower.includes("website") || lower.includes("widget")) {
      return "We can deploy a website widget, connect it to your knowledge base, and tune the bot to sound like your brand while keeping conversations useful."
    }
    if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
      return "Hi! I’m the Swift Agencies assistant. I can tell you about pricing, setup, website chatbots, and onboarding."
    }

    return "Thanks for reaching out. A Swift strategist can help map your use case, whether it’s lead capture, customer support, or an AI experience tailored to your brand."
  };

  const openChat = () => host.classList.add("open");
  const closeChat = () => host.classList.remove("open");

  toggle.addEventListener("click", () => {
    host.classList.contains("open") ? closeChat() : openChat();
  });

  close.addEventListener("click", closeChat);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = input.value.trim();
    if (!value) return;

    addMessage(value, true);
    input.value = "";
    setTimeout(() => addMessage(getReply(value), false), 220);
  });

  addMessage(`Hi! I’m ${companyName}'s assistant. Ask about pricing, onboarding, or how a custom chatbot could work for your site.`, false);
  addMessage(`Bot ID: ${botId}`, false);
})();
