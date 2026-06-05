import { NavLink, PricingPlan, FAQItem, Article } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { name: "Demos", href: "#", hasMega: true },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
];

export const DEMO_LINKS = [
  {
    name: "AI Dispatch Hub",
    desc: "Automated routing, telematics mapping, and predictive alerts.",
    href: "/",
  },
  {
    name: "Enterprise Telematics",
    desc: "Deep CAN-bus diagnostics and vehicle security HUD.",
    href: "/demo-telematics",
  },
  {
    name: "Logistics Operations",
    desc: "Interactive shift schedules and route cost analytics.",
    href: "/demo-logistics",
  },
  {
    name: "Driver Safety & Compliance",
    desc: "Driver Fatigue scorecards and incident triggers.",
    href: "/demo-safety",
  },
];

export const FOOTER_LINKS = {
  product: [
    { name: "Live Dispatch", href: "/features" },
    { name: "Smart Routing", href: "/features" },
    { name: "Driver Safety", href: "/features" },
    { name: "SaaS Pricing", href: "/pricing" },
    { name: "Admin Dashboard", href: "/admin" },
  ],
  resources: [
    { name: "Fleet Blog", href: "/blog" },
    { name: "Telematics Guide", href: "/blog" },
    { name: "Developer APIs", href: "/docs" },
    { name: "Case Studies", href: "/" },
    { name: "FAQ", href: "/pricing" },
  ],
  company: [
    { name: "About Fleety", href: "/about" },
    { name: "Operations Crew", href: "/about" },
    { name: "Dispatch Center", href: "/contact" },
    { name: "Connect Sales", href: "/contact" },
    { name: "Careers Hub", href: "/about" },
  ],
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Starter Sandbox",
    monthlyPrice: 49,
    yearlyPrice: 39,
    desc: "Perfect for local couriers and small fleets testing smart routing capabilities.",
    features: [
      "Up to 5 vehicle gateways",
      "Basic AI route configuration",
      "48-hour telematics log history",
      "Standard email assistance",
    ],
    cta: "Start 14-Day Free Run",
    popular: false,
  },
  {
    name: "Pro Dispatcher",
    monthlyPrice: 99,
    yearlyPrice: 79,
    desc: "Ideal for growing logistics operators securing real-time telemetry analytics.",
    features: [
      "Up to 50 vehicle gateways",
      "Advanced deep-learning routing",
      "Unlimited historical logs",
      "Geofence security triggers",
      "Predictive maintenance analysis",
      "24/7 priority dispatch support",
    ],
    cta: "Get Started Pro",
    popular: true,
  },
  {
    name: "Enterprise Cloud",
    monthlyPrice: "Custom",
    yearlyPrice: "Custom",
    desc: "Built for global transport networks requesting maximum SLA configurations.",
    features: [
      "Unlimited vehicle gateways",
      "Dedicated cloud server nodes",
      "Custom telematics hardware API",
      "Dedicated dispatcher support",
      "Custom service-level agreement",
    ],
    cta: "Connect With Sales",
    popular: false,
  },
];

export const PRICING_FAQS: FAQItem[] = [
  {
    q: "Can I transition plans or cancel my subscription at any time?",
    a: "Yes. You can upgrade, downgrade, or cancel your active subscription immediately from the Account Portal. If you cancel, your access remains valid until the current billing cycle expires.",
  },
  {
    q: "Are there any hidden fees or hardware charges?",
    a: "None whatsoever. Fleety charges purely for cloud telemetry collection and auto-routing. We do not manufacture or charge for physical OBD hardware.",
  },
  {
    q: "What payment forms are supported?",
    a: "We accept all major global credit cards (Visa, Mastercard, American Express), automated bank ACH transfers, and corporate invoicing for Enterprise accounts.",
  },
];

export const HOME_FAQS: FAQItem[] = [
  {
    q: "How does the AI route optimization function?",
    a: "Fleety uses neural network paths and heuristic routing to calculate trillions of possible transit permutations. The system combines real-time traffic updates, weather signals, and historical route latency to optimize dispatch in under 12 milliseconds.",
  },
  {
    q: "Does Fleety integrate with existing telematics hardware?",
    a: "Absolutely. Fleety is hardware-agnostic and fully integrates with major OBD-II devices, J1939 CAN bus hardware, and popular logistics systems via our secure RESTful and WebSocket APIs.",
  },
  {
    q: "What sizes of fleets is Fleety designed for?",
    a: "Fleety scales fluidly from local courier systems running 10 mid-size vans up to multinational freight enterprises managing thousands of heavy-duty trucks on active intercontinental corridors.",
  },
  {
    q: "Is there a free test run of the platform?",
    a: "Yes. Our Starter plan offers a 14-day fully featured dispatch sandbox, allowing you to configure up to 5 vehicle gateways and test our routing algorithms with zero commitments.",
  },
];

export const BLOG_ARTICLES: Article[] = [
  {
    title: "Recurving Logic: The Future of AI Route Optimization",
    category: "routing",
    readTime: "6 min read",
    date: "May 24, 2026",
    desc: "An in-depth look at how neural networks calculate trillions of potential routes to bypass weather and traffic latency recursively.",
    slug: "recurving-logic",
    author: "Sophie Moore",
    authorRole: "Lead AI Architect",
  },
  {
    title: "Parsing CAN J1939 Telemetry Signals at Scale",
    category: "telematics",
    readTime: "8 min read",
    date: "May 18, 2026",
    desc: "How we collect, filter, and analyze OBD-II signals under 10 milliseconds without creating data pipeline bottlenecks.",
    slug: "parsing-can-telemetry",
    author: "David Chen",
    authorRole: "Telemetry Ingestion Eng",
  },
  {
    title: "Gamifying Driver Operations for Insurance Reductions",
    category: "security",
    readTime: "5 min read",
    date: "May 10, 2026",
    desc: "How logistics systems build safer transit cultures by tracking abrupt braking and rewarded driver compliance indices.",
    slug: "gamifying-driver-ops",
    author: "Sarah Jenkins",
    authorRole: "Safety Standards Director",
  },
  {
    title: "Reducing Deadhead Miles: Dispatch Operations Guide",
    category: "routing",
    readTime: "7 min read",
    date: "May 04, 2026",
    desc: "A hands-on blueprint detailing dispatcher scheduling configurations, staggered shifts, and load consolidation variables.",
    slug: "reducing-deadhead-miles",
    author: "Marcus Vance",
    authorRole: "Operations Product Manager",
  },
];

export const SOCIAL_LINKS = [
  { name: "Twitter", href: "https://twitter.com/fleety_saas" },
  { name: "LinkedIn", href: "https://linkedin.com/company/fleety" },
  { name: "Instagram", href: "https://instagram.com/fleety_saas" },
  { name: "Facebook", href: "https://facebook.com/fleety" },
];
