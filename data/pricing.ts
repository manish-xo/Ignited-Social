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
  /** Shown as a tinted, bold row so it stands out from the other features. */
  highlight?: boolean;
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
  /** Instagram handle without the @. */
  handle: string;
  /** Profile picture path under /public. Initials are shown until it is set. */
  photo?: string;
  quote: string;
  rating: number;
  followersGained: string;
}
export interface Accordion {
  value: string;
  question: string;
  answer: string;
}

export interface ComparisonFeature {
  label: string;
  grow: string | boolean;
  scale: string | boolean;
}

export const badges: Badge[] = [
  {
    icon: "ri-add-line",
    value: "25M",
    label: "Followers grown",
  },
  {
    icon: "ri-add-line",
    value: "110",
    label: "Countries served",
  },
  {
    icon: "ri-add-line",
    value: "20K",
    label: "Accounts managed",
  },
];

export const plans: Plan[] = [
  {
    title: "Grow",
    price: 97,
    description: "For accounts ready to build steady, sustainable momentum.",
    features: [
      { text: "Consistent, organic follower growth" },
      { text: "Estimated 150–500+ followers per month", highlight: true },
      {
        text: "A dedicated Brand Manager",
      },
      { text: "Core audience targeting" },
      { text: "Tailored content plan" },
    ],
    cta: "Start with Grow",
  },
  {
    title: "Scale",
    price: 147,
    description: "For brands ready to move faster and dominate their niche.",
    features: [
      { text: "Accelerated, higher-volume growth" },
      { text: "Estimated 250–800+ followers per month", highlight: true },
      {
        text: "A dedicated Senior Brand Manager",
      },
      { text: "Advanced audience targeting" },
      { text: "Tailored content plan + weekly review" },
      { text: "Offer, landing page and monetization funnel review" },
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
    // title: "30-day money-back guarantee",
    // description:
    //   "Not seeing real growth? Get a full refund, no questions asked.",
    title: "Hassle Free",
    description: "Cancel and your last payment is refunded. No claim to file.",
  },
  {
    icon: XCircle,
    title: "Cancel anytime",
    description:
      //   "No contracts, no lock-in. Leave whenever you want, hassle-free.",
      "No contracts, no lock-in, no minimum term",
  },
  {
    icon: RotateCcw,
    // title: "No risk, just results",
    title: "Keep your followers",
    description:
      // "You only stay because it's working — not because you're stuck.",
      "Everything you’ve gained stays yours after you leave",
  },
];

export const stats: Stat[] = [
  { value: "20k", suffix: "ri-add-line", label: "Account managed" },
  {
    value: "300-500",
    // suffix: "ri-percent-line",
    label: "average new followers per month",
    highlight: true,
  },
  { value: "2-3", label: "days to first signs of growth" },
];

/**
 * Customers from Ignited_Case_Studies_Batch_01. Followers gained are the
 * recorded totals from each case study. Add `photo` (a path under /public)
 * once the profile pictures are in; until then the card shows initials.
 */
export const testimonials: Testimonial[] = [
  {
    name: "James Bosley",
    role: "Fashion and creative direction",
    handle: "james_bosley_studio",
    photo: "/stock/james_bosley_studio.jpg",
    quote:
      "The ideas fitted my work: the studio, the design process, and how the clothes look on a model. I already had footage I could start using.",
    rating: 5,
    followersGained: "+9,016",
  },
  {
    name: "Tracy Merano",
    role: "Singer and songwriter",
    handle: "tracy.merano",
    quote:
      "I wanted real people to connect with me through my music. Sushmita gave me ideas for the songs, the stories behind them, and the person listeners would meet.",
    rating: 5,
    followersGained: "+7,175",
  },
  {
    name: "Djivan Schapira",
    role: "Collectible design artist",
    handle: "djivan_schapira",
    quote:
      "The feedback got specific: show the table sooner, explain the process, and bring more of me into the posts. That was the kind of help I’d been looking for.",
    rating: 5,
    followersGained: "+8,890",
  },
  {
    name: "Rick Strooper",
    role: "Photographer",
    handle: "rickstrooper",
    photo: "/stock/rickstrooper.jpg",
    quote:
      "I wanted my black-and-white nature photographs to reach more people. Rahul’s ideas for the bio, photo collections and behind-the-camera videos gave me a practical place to start.",
    rating: 5,
    followersGained: "+12,463",
  },
  {
    name: "Sav Hill",
    role: "Strength and mobility coach",
    handle: "savfit__",
    quote:
      "I wanted to stay consistent without posting all day. Tulsi showed me which fitness audiences were responding and suggested kettlebell videos I could make without changing my style.",
    rating: 5,
    followersGained: "+4,407",
  },
  {
    name: "Bethany Chrobak",
    role: "Nutrition and fitness coach",
    handle: "coach.b_chro",
    quote:
      "The examples gave me something concrete to work from: motherhood stories, nutrition tips and ways to make my Reels easier to follow. That was really helpful for planning my content.",
    rating: 5,
    followersGained: "+4,716",
  },
  {
    name: "Keisha Miles",
    role: "Jamaican cooking coach",
    handle: "iambergababy",
    quote:
      "The feedback was specific to my cooking videos: lower the music, move the subtitles and make the dish clear on the cover. I knew what to work on next.",
    rating: 5,
    followersGained: "+4,946",
  },
  {
    name: "Param",
    role: "Munch N Sip Café, Melbourne",
    handle: "munchnsip_cafe",
    quote:
      "Shama gave us clear pointers on our food photos and café videos. I made the profile changes after the audit—it gave me something useful to work with.",
    rating: 5,
    followersGained: "+1,946",
  },
  {
    name: "Karl",
    role: "L’Artiste Coiffeur, Brisbane",
    handle: "lartistecoiffeurhairdressers",
    quote:
      "Aditi’s ideas fitted the way we work—showing the consultation, the colour and the finished result. They gave me more ways to share what makes our salon different.",
    rating: 5,
    followersGained: "+1,302",
  },
  {
    name: "Shannon Sizmur",
    role: "Medical aesthetician",
    handle: "medical_aesthetician_shannon",
    photo: "/stock/medical_aesthetician_shannon.jpg",
    quote:
      "Tulsi helped me work through the bio and get my Highlights started. I’m loving what’s happening with the page and the new followers.",
    rating: 5,
    followersGained: "+4,997",
  },
];

export const accordionData: Accordion[] = [
  {
    value: "item-1",
    // question: "How fast will I see results?",
    question: "What happens during the trial period?",
    answer:
      "Fill in a short onboarding form and your growth manager sets up your targeting within 24–48 hours — Monday if you sign up over the weekend. You also get a full audit of your account: audience, offer, content, positioning, and where you can improve. It's yours to keep either way. Most accounts see their first followers within 2–3 days.",
  },
  {
    value: "item-2",
    // question: "Are the followers real people?",
    question: "What if it doesn't work?",
    answer:
      "Two options. Cancel and your last payment is refunded, no questions asked. Or talk to your growth manager first — they'll usually retarget your audience or take another look at your content. Not clicking with your manager? Ask for a different one. We don't leave anyone stuck.",
  },
  {
    value: "item-3",
    // question: "Is this safe for my account? Will I get banned or shadowbanned?",
    question: "How many followers will I actually get?",
    answer:
      "Between 150 and 800+ a month, depending on your plan. If we ever cost you more than $1 per follower, you're overpaying — and we'd rather refund you than let that happen.",
  },
  {
    value: "item-4",
    // question: "What's the difference between Grow and Scale?",
    question: "Is my account safe?",
    answer:
      "Yes. 20,000 accounts, zero bans. We grow inside Instagram's limits, which is the boring answer, but it's why you'll never get a warning because of us.",
  },
  {
    value: "item-5",
    // question: "Can I cancel anytime?",
    question: "Do you need my password?",
    answer:
      "Yes — we log in to work on your account. You enter it through an encrypted wizard, so nobody here ever sees it, and we don't store it. Same for your 2FA code.",
  },
  {
    value: "item-6",
    // question: "How is my growth targeted to the right audience?",
    question: "Are the followers real people? Will they actually engage?",
    answer:
      "Yes, real accounts. They engage because of how they're picked — people already following accounts like yours, in your niche, in your area. A person already following three photographers will care about the fourth. Someone random won't.",
  },
  {
    value: "item-7",
    question: "Do I keep my followers if I cancel?",
    answer:
      "Yes. Every follower is a real person who chose to follow you. They don't know we exist, and they don't leave when you do.",
  },
  {
    value: "item-8",
    question: "Can I keep posting and using my account normally?",
    answer:
      "Yes — and you should. Your posts are what convert a profile visit into a follow. We bring people to your profile; your content is what makes them stay.",
  },
  {
    value: "item-9",
    question:
      "I've been burned by a service like this before — why are you different?",
    answer:
      "Fair. So don't trust us — test us. You get the audit in week one, and if you cancel, your last payment comes back. The only thing you're risking is the time it takes to fill in a form.",
  },
  {
    value: "item-10",
    question: "Couldn't I just do this myself?",
    answer:
      "Sure. It's 2–3 hours a day, every day. Call it 75 hours a month. If an hour of your time is worth more than $1.29, you're already losing money doing it yourself.",
  },
  {
    value: "item-11",
    question: "Will you turn followers into actual customers?",
    answer:
      "We get the right people to your profile. Whether they buy comes down to your offer and your content — the audit covers both in week one, and on Scale your manager keeps working on them with you. Nobody converts an audience they never had, though. That's the part we solve first.",
  },
  {
    value: "item-12",
    question: "What do you need from me to start?",
    answer:
      "A short form about your brand and who you want to reach, plus your login. Takes about ten minutes. Your growth manager takes it from there — targeting built within 48 hours, first followers usually inside 2–3 days.",
  },
];

export const comparisonFeatures: ComparisonFeature[] = [
  { label: "Monthly follower growth", grow: "150–500+", scale: "250–800+" },
  {
    label: "Growth manager",
    grow: "Dedicated Growth Manager",
    scale: "Dedicated Senior Growth Manager",
  },
  {
    label: "Support channels",
    grow: "Email, phone, video call",
    scale: "Email, phone, video call",
  },
  {
    label: "Audience targeting",
    grow: "Core targeting",
    scale: "Advanced targeting",
  },
  { label: "Content strategy review", grow: false, scale: true },
  { label: "Real-time reporting dashboard", grow: true, scale: true },
  { label: "30-day money-back guarantee", grow: true, scale: true },
  { label: "Cancel anytime", grow: true, scale: true },
];
