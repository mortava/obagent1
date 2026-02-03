# G1 Broker Agent - Project Memory

## Project Overview
- **Name:** g1brokerAgent
- **Description:** AI-powered mortgage assistant chat application
- **Live URL:** https://g1broker-agent.vercel.app
- **GitHub:** https://github.com/mortava/g1brokerAgent

## Tech Stack
- **Frontend:** Vanilla HTML/CSS/JavaScript (single `index.html` file)
- **Backend:** Node.js/Express proxy server (Vercel serverless functions)
- **Hosting:** Vercel
- **API Endpoint:** Proxies to `https://grow.g1wins.com/api/pricing-engine/ai/chat?public=true`

## Project Structure
```
mortgage-chat/
├── index.html          # Main UI (all frontend code)
├── server.js           # Local development server
├── package.json        # Dependencies (express, cors, node-fetch)
├── vercel.json         # Vercel serverless config
├── api/
│   ├── chat.js         # Serverless function for chat API proxy
│   └── health.js       # Health check endpoint
├── .gitignore
└── CLAUDE_MEMORY.md    # This file
```

## UI Features

### Header
- Left: "AGENT G1" (Space Grotesk font, bold)
- Right: "Powered by PMF"

### Welcome Screen (Landing State)
- Home icon with blue gradient
- Rotating mortgage-themed greetings (random on load)
- Subtitle: "Your AI-powered mortgage assistant"
- 4 Quick Action Cards:
  - "Help me qualify"
  - "Get a rate quote"
  - "Today's rates"
  - "Refinance options"

### Chat Interface
- **User Messages:** Right-aligned, dark background (#2E3440), no avatar
- **Assistant Messages:** Left-aligned, light background (#F5F5F5), home icon avatar
- **Thinking Stages Animation:**
  1. Analyzing your question
  2. Searching program matrices
  3. Calculating eligibility
  4. Preparing response
  - Shows elapsed time per stage
  - Checkmark animation on completion

### Input Area
- Plus icon button (for future file upload)
- Textarea with auto-grow
- Circular send button with arrow icon
- Placeholder: "Ask me anything about your mortgage..."

## Styling
- **Fonts:** Inter (body), Space Grotesk (logo)
- **Colors:**
  - Primary text: #111827
  - Secondary text: #6B7280
  - User bubble: #2E3440
  - Assistant bubble: #F5F5F5
  - Accent: #3B82F6 (blue)
  - Border: #E5E7EB
- **Border Radius:** 8px (buttons), 12px (cards), 16px (bubbles)
- **Shadows:** Subtle (0 1px 3px rgba(0,0,0,0.1))

## Markdown Formatting (Response Rendering)
The `formatResponse()` function converts markdown to HTML:
- `## Header` → `<h3>`
- `### Header` → `<h4>`
- `**bold**` → `<strong>`
- `*italic*` → `<em>`
- `- item` → `<ul><li>`
- Markdown tables → HTML `<table>`
- Line breaks preserved

**Important:** Tables process bold text inside cells using `formatCellContent()` to avoid escaping issues.

## API Integration
```javascript
// Request format
{
  message: "user question",
  conversationHistory: [...],
  lastFormValues: {},
  enableCaching: true
}

// Response format
{
  response: "assistant message with markdown"
}
```

## Deployment Commands
```bash
# Deploy to Vercel
cd "C:\Users\beach\mortgage-chat"
vercel --prod --yes

# Update alias
vercel alias set mortgage-chat.vercel.app g1broker-agent.vercel.app

# Push to GitHub
git add . && git commit -m "message" && git push origin master
```

## Key Files Content Summary

### vercel.json
```json
{
  "version": 2,
  "builds": [
    { "src": "api/*.js", "use": "@vercel/node" },
    { "src": "index.html", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/api/chat", "dest": "/api/chat.js" },
    { "src": "/api/health", "dest": "/api/health.js" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### api/chat.js
- Proxies POST requests to the mortgage pricing API
- Adds CORS headers
- User-Agent: "g1brokerAgent/1.0"

## Greetings Array (Rotating Welcome Messages)
```javascript
const greetings = [
  "Let's find your perfect rate.",
  "Ready to unlock your dream home?",
  "Your mortgage journey starts here.",
  "Let's make homeownership happen.",
  "What can I help you with today?",
  "Let's explore your options together.",
  "Ready to save on your mortgage?",
  "Your path to homeownership awaits."
];
```

## Version History
- **v1.0** - Initial build with basic chat UI
- **v2.0** - Modern ChatGPT/Claude-style redesign
  - Thin header with Space Grotesk font
  - Quick action cards
  - Thinking stages animation
  - Fixed markdown table rendering
  - User/Assistant message styling

---
*Last Updated: January 31, 2026*
*Build maintained by Claude Code*
