# Fleety - Next-Gen Fleet Management & Smart Logistics

Fleety is a premium, high-performance SaaS platform built to automate live vehicle dispatch, aggregate real-time CAN-bus diagnostics, and optimize freight logistics routes using advanced telemetry and heuristic neural networks.

## 🚀 Key Features

- **Dynamic Homepage Demos**: Includes 4 customized, premium landing page layouts:
  1. **AI Dispatch Hub**: Automated routing, telematics mappings, and predictive dispatch alerts.
  2. **Enterprise Telematics**: Direct vehicle CAN-bus diagnostics and vehicle security.
  3. **Logistics Operations**: Interactive shift schedules, dispatcher queues, and cost metrics.
  4. **Driver Safety & Compliance**: Active driver fatigue indexes, deceleration triggers, and gamified compliance scorecards.
- **Admin Control Dashboard**: A premium master control panel including resource ingestion metrics, active websocket gateway maps, live PGN diagnostic logs, system variables configurations, and a comprehensive Billing & Subscriptions portal.
- **Platform Documentation (`/docs`)**: Structured guides for WebSocket API integration, OBD-II setups, and auto-routing REST guides.
- **Complete Journal Blog (`/blog`)**: Complete dynamic blog engine containing multiple articles covering real-world routing mathematics, J1939 CAN-bus signal parsing, driver gamification, and deadhead mileage reductions.
- **Next-Gen UX Features**:
  - Global concentric orbiting ring route load screen (`loading.tsx`).
  - Slide-in glassmorphic GDPR Cookie Consent banner with local browser persistence.
  - Custom glowing spotlights 404 error page.
  - Fully responsive, mobile-first layouts with locked scroll overlays.
  - Lenis smooth scrolling engine optimized for fluid scroll performance.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router layout)
- **Library**: [React 19](https://react.dev/)
- **Styles**: [Tailwind CSS v4](https://tailwindcss.com/) with CSS-variable themes
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Scroll**: [Lenis](https://lenis.darkroom.engineering/) Smooth Scroll
- **PWA**: PWA integration configured (`sw.js`)

---

## 🏁 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Run Locally
Launch the dev server:
```bash
npm run dev
```
Open `http://localhost:3000` to inspect the application.

### 3. Build & Test Production
Compile the project to verify TypeScript types and static page generation output:
```bash
npm run build
```
Start the compiled production bundle:
```bash
npm run start
```
