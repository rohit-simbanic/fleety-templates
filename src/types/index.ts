export interface PricingPlan {
  name: string;
  monthlyPrice: number | string;
  yearlyPrice: number | string;
  desc: string;
  features: string[];
  cta: string;
  popular: boolean;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface Article {
  title: string;
  category: string;
  readTime: string;
  date: string;
  desc: string;
  slug: string;
  author: string;
  authorRole: string;
}

export interface Gateway {
  id: string;
  hub: string;
  connections: number;
  load: string;
  status: string;
}

export interface SystemStats {
  cpu: number;
  mem: number;
  dbLatency: number;
  activeWs: number;
}

export interface NavLink {
  name: string;
  href: string;
  hasMega?: boolean;
}
