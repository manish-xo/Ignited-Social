import ComparisonTable from "@/components/ui/ComparisonTable";
import {
  BarChart3,
  FileText,
  ShieldCheck,
  Target,
  Undo2,
  UserCheck,
  XCircle,
  FileX,
  Zap,
  RotateCcw,
} from "lucide-react";

export interface PlanFeature {
  text: string;
  note?: string;
}

export interface Badge {
  icon: string;
  value: string | number;
  label: string;
  highlight?: boolean;
}
export interface Plan {
  title: string;
  price: number;
  description: string;
  features: PlanFeature[];
  cta: string;
  popular?: boolean;
}

export interface TrustBadge {
  icon: React.ElementType;
  label: string;
}

export interface Feature {
  tag: string;
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface ComparisonRow {
  feature: string;
  us: string;
  others: string;
}

export interface ComparisonCard {
  tag: string;
  title: string;
  description: string[];
  recommendation?: boolean;
}

export interface RiskPoint {
  icon: React.ElementType;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  suffix?: string;
  label: string;
  highlight?: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
}
export interface Accordion {
  value: string;
  question: string;
  answer: string;
}

export const badges: Badge[] = [
  {
    icon: "ri-star-s-fill",
    value: "4.8/5",
    label: "Customer Rating",
    highlight: true,
  },
  {
    icon: "ri-add-line",
    value: "51M",
    label: "Followers",
  },
  {
    icon: "ri-add-line",
    value: "140",
    label: "Countries Served",
  },
  {
    icon: "ri-add-line",
    value: "20K",
    label: "Total Accounts",
  },
  {
    icon: "ri-add-line",
    value: "1.5K",
    label: "Active User",
  },
];

export const plans: Plan[] = [
  {
    title: "Grow",
    price: 139,
    description: "For accounts ready to build steady, sustainable momentum.",
    features: [
      { text: "Consistent, organic follower growth" },
      { text: "Estimated 150–500+ followers per month" },
      {
        text: "Dedicated Growth Manager",
        note: "Support via email, phone, or video call",
      },
      { text: "Core audience targeting" },
      { text: "30-day money-back guarantee" },
    ],
    cta: "Start with Grow",
  },
  {
    title: "Scale",
    price: 199,
    description: "For brands ready to move faster and dominate their niche.",
    features: [
      { text: "Accelerated, higher-volume growth" },
      { text: "Estimated 250–800+ followers per month" },
      {
        text: "Dedicated Senior Growth Manager",
        note: "Support via email, phone, or video call",
      },
      { text: "Advanced audience targeting" },
      { text: "Strategic content review" },
      { text: "30-day money-back guarantee" },
    ],
    cta: "Start with Scale",
    popular: true,
  },
];

export const trustBadges: TrustBadge[] = [
  { icon: ShieldCheck, label: "Money-back guarantee" },
  { icon: XCircle, label: "Cancel anytime" },
  { icon: FileX, label: "No long-term contracts" },
  { icon: Zap, label: "First results in 2–3 days" },
];

export const features: Feature[] = [
  {
    tag: "TARGET",
    icon: Target,
    title: "Real, active followers",
    description:
      "Every new follower is someone likely to engage, buy, or convert — not a bot padding your count.",
  },
  {
    tag: "MANAGER",
    icon: UserCheck,
    title: "A dedicated growth manager",
    description:
      "You get strategy that adapts to your brand, not a generic playbook running on autopilot.",
  },
  {
    tag: "SAFETY",
    icon: ShieldCheck,
    title: "Safe, compliant growth",
    description:
      "Your account stays protected — no shadowbans, no risky automation, no surprises.",
  },
  {
    tag: "REPORT",
    icon: BarChart3,
    title: "Transparent reporting",
    description:
      "You always know exactly what you're paying for — no guesswork, no vague monthly PDFs.",
  },
  {
    tag: "STRATEGY",
    icon: FileText,
    title: "Content strategy support",
    description:
      "Growth doesn't stall because your content and your strategy are finally working together.",
  },
  {
    tag: "GUARANTEE",
    icon: Undo2,
    title: "Risk-free commitment",
    description:
      "Try it without the fear of getting locked into something that doesn't deliver.",
  },
];

export const pricingComparisonData = [
  {
    feature: "Organic Growth",
    us: "Real, targeted audience",
    others: "Fake or purchased followers",
  },
  {
    feature: "Account Safety",
    us: "Fully compliant, no bans",
    others: "Risky automation, shadowban risk",
  },
  {
    feature: "Support",
    us: "Dedicated growth manager",
    others: "Generic ticket queue",
  },
  {
    feature: "Reporting",
    us: "Transparent, real-time dashboard",
    others: "Vague or no reporting",
  },
  {
    feature: "Commitment",
    us: "Cancel anytime, no contracts",
    others: "Locked into long contracts",
  },
];

export const ComparisonBento: ComparisonCard[] = [
  {
    tag: "IN-HOUSE TEAM",
    title: "Hiring In-House",
    description: [
      "High salary & hiring costs",
      "Time-consuming recruitment",
      "Training and management required",
      "Employee turnover risks",
      "Expensive long-term commitment",
    ],
  },
  {
    tag: "FREELANCE AGENCY",
    title: "Hiring an Agency",
    description: [
      "Multiple clients, divided attention",
      "Generic growth strategies",
      "Slow communication",
      "Expensive monthly retainers",
      "Limited accountability",
    ],
  },
  {
    tag: "DEDICATED GROWTH MANAGER",
    title: "Your Dedicated GM",
    description: [
      "Personalized growth strategy",
      "Daily execution & optimization",
      "One dedicated point of contact",
      "Transparent reporting",
      "Sustainable business growth",
    ],
    recommendation: true,
  },
  {
    tag: "GROWTH TOOLS",
    title: "Automation Tools",
    description: [
      "One-size-fits-all solutions",
      "No strategic guidance",
      "Limited customization",
      "Requires constant monitoring",
      "Tools don't replace expertise",
    ],
  },
  {
    tag: "PAID ADS",
    title: "Facebook Ads",
    description: [
      "Rising advertising costs",
      "Results stop when spending stops",
      "Constant optimization needed",
      "High competition",
      "No long-term organic growth",
    ],
  },
];

export const riskPoints: RiskPoint[] = [
  {
    icon: ShieldCheck,
    title: "30-day money-back guarantee",
    description:
      "Not seeing real growth? Get a full refund, no questions asked.",
  },
  {
    icon: XCircle,
    title: "Cancel anytime",
    description:
      "No contracts, no lock-in. Leave whenever you want, hassle-free.",
  },
  {
    icon: RotateCcw,
    title: "No risk, just results",
    description:
      "You only stay because it's working — not because you're stuck.",
  },
];

export const stats: Stat[] = [
  { value: "1,600", suffix: "ri-add-line", label: "Account managed" },
  {
    value: "98",
    suffix: "ri-percent-line",
    label: "Real, active followers",
    highlight: true,
  },
  { value: "0", label: "Bans or shadowbans reported" },
];

export const testimonials: Testimonial[] = [
  {
    name: "Renee Castillo",
    role: "Boutique Owner",
    quote: "It doesn't feel automated — it feels like someone on my team.",
    rating: 5,
  },
  {
    name: "Ibrahim Khalid",
    role: "Podcast Host",
    quote: "Every single new follower was a real, active account in my niche.",
    rating: 5,
  },
  {
    name: "Sofia Almeida",
    role: "Fitness Creator",
    quote:
      "I can see exactly where my growth is coming from with the dashboard.",
    rating: 5,
  },
];

export const accordionData: Accordion[] = [
  {
    value: "item-1",
    question: "How fast will I see results?",
    answer:
      "Most clients start seeing new followers within 2–3 days. Meaningful, sustained growth typically builds over the first 3–4 weeks as your growth manager fine-tunes targeting.",
  },
  {
    value: "item-2",
    question: "Are the followers real people?",
    answer:
      "Yes. We never use bots or purchased followers. Every follower comes from targeted, organic outreach to real, active accounts in your niche.",
  },
  {
    value: "item-3",
    question: "Is this safe for my account? Will I get banned or shadowbanned?",
    answer:
      "Yes, it's safe. We follow platform guidelines closely and use manual, compliant growth methods — no automation tools that put your account at risk.",
  },
  {
    value: "item-4",
    question: "What's the difference between Grow and Scale?",
    answer:
      "Grow is built for steady, sustainable growth (150–500+ followers/month). Scale is for faster results with a Senior Growth Manager, advanced targeting, and strategic content review (250–800+ followers/month).",
  },
  {
    value: "item-5",
    question: "Can I cancel anytime?",
    answer:
      "Yes — there are no contracts or long-term commitments. Cancel whenever you'd like, no questions asked.",
  },
  {
    value: "item-6",
    question: "How is my growth targeted to the right audience?",
    answer:
      "Your growth manager builds a targeting profile based on your niche, industry, and ideal customer — so new followers are people actually likely to engage, not random accounts.",
  },
];
