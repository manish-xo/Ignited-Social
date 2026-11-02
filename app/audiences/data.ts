// Copy and records for the audiences page, taken word-for-word from the
// owner's "Ignited Sections 5 & 6" interactive preview.

export type AudienceId =
  | "creatives"
  | "coaches"
  | "local"
  | "creators"
  | "products";

export interface Audience {
  id: AudienceId;
  label: string;
  headline: string;
  copy: string;
  benefits: [string, string, string];
  person: string;
  type: string;
  story: string;
  short: string;
  photo: { src: string; alt: string; real: boolean };
}

export interface Account {
  displayName: string;
  username: string;
  niche: string;
  /** Short label shown on result cards. */
  tag: string;
  category: AudienceId;
  featured?: boolean;
  totalGrowth: number;
  savedMonths: number;
  quote?: string;
}

export const AUDIENCES: Audience[] = [
  {
    id: "creatives",
    label: "Creatives",
    headline: "Keep making work that’s yours.",
    copy: "Your time goes into the photographs, the music, the next piece. We help more people discover it, with ideas for sharing your work that fit how you like to create.",
    benefits: [
      "Reach people who care about your work",
      "Get practical ideas for sharing it",
      "Keep your own voice",
    ],
    person: "Ivo Mostert",
    type: "Landscape photographer",
    story: "Read Ivo’s story",
    short: "creative",
    photo: {
      src: "/audiences/creatives.webp",
      alt: "Illustrative mountain photograph, not the customer’s work",
      real: false,
    },
  },
  {
    id: "coaches",
    label: "Coaches & educators",
    headline: "Make your expertise easier to discover.",
    copy: "Whether you teach, coach or run a programme, people need to understand your approach. We help you reach a relevant audience and show what working with you could look like.",
    benefits: [
      "Reach people who could learn from you",
      "Show how you can help",
      "Make the next step clear",
    ],
    person: "Sav Hill",
    type: "Strength and movement coach",
    story: "Read Sav’s story",
    short: "coaching",
    photo: {
      src: "/audiences/coaches.webp",
      alt: "Illustrative gym photograph, not the customer’s gym",
      real: false,
    },
  },
  {
    id: "local",
    label: "Local businesses",
    headline: "Get known where you do business.",
    copy: "We focus the outreach on people in the areas you serve. And help you show what makes your business worth a visit, an enquiry or a booking.",
    benefits: [
      "Reach people in the areas you serve",
      "Show what makes you worth choosing",
      "Make it easy to enquire or book",
    ],
    person: "The Denver Stylist",
    type: "Salon owner and hairstylist",
    story: "Read the story",
    short: "local business",
    photo: {
      src: "/audiences/local.webp",
      alt: "Illustrative salon interior, not the customer’s salon",
      real: false,
    },
  },
  {
    id: "creators",
    label: "Creators",
    headline: "Build an audience for your take on things.",
    copy: "Recipes, reviews, travel tips or something entirely your own. We help people with those interests discover you, and work with you on ideas that give them a reason to come back.",
    benefits: [
      "Find people who share your interests",
      "Give them a reason to come back",
      "Keep creating in your own style",
    ],
    person: "The Station Chef",
    type: "Food creator",
    story: "Read the story",
    short: "creator",
    photo: {
      src: "/audiences/creators.webp",
      alt: "Illustrative food photograph, not the customer’s recipe",
      real: false,
    },
  },
  {
    id: "products",
    label: "Product brands",
    headline: "Help people picture your product in their lives.",
    copy: "From handmade pieces to specialist equipment, people need to understand what you sell and why it’s for them. We help likely buyers discover your brand and make your products easier to explore.",
    benefits: [
      "Reach people your products are for",
      "Show what makes your products different",
      "Make your offer easier to explore",
    ],
    person: "BlueMag Airsoft",
    type: "Specialist product brand",
    story: "Read BlueMag’s story",
    short: "product brand",
    photo: {
      src: "/audiences/products.webp",
      alt: "BlueMag Airsoft branded bottle of .20g bio BBs",
      real: true,
    },
  },
];

export const ACCOUNTS: Account[] = [
  // Creatives
  {
    displayName: "Ivo Mostert",
    username: "originalmostertphotography",
    niche: "Fine-art landscape photographer",
    tag: "Landscape photography",
    category: "creatives",
    featured: true,
    totalGrowth: 6052,
    savedMonths: 9,
    quote:
      "Reaching 10,000 followers meant a lot. Esha understood that I can’t always get out and shoot, and helped me plan around it. I learned a lot working with her. I feel much more confident doing this myself now.",
  },
  {
    displayName: "Nancy",
    username: "nancyg.psd",
    niche: "Visual branding and web designer",
    tag: "Branding & design",
    category: "creatives",
    totalGrowth: 2187,
    savedMonths: 5,
  },
  {
    displayName: "Heikki Hallanoro",
    username: "pianoballadist",
    niche: "Pianist blending music and nature",
    tag: "Music",
    category: "creatives",
    totalGrowth: 7580,
    savedMonths: 15,
  },
  {
    displayName: "Alia Luria",
    username: "alialuria",
    niche: "Speculative-fiction author and essayist",
    tag: "Books & writing",
    category: "creatives",
    totalGrowth: 4033,
    savedMonths: 16,
  },
  {
    displayName: "Casey McKee",
    username: "caseymckeeart",
    niche: "Contemporary oil painter",
    tag: "Fine art",
    category: "creatives",
    totalGrowth: 1463,
    savedMonths: 3,
  },
  {
    displayName: "Tracy Tang",
    username: "ttstudio.studio",
    niche: "Wedding stationery illustrator and designer",
    tag: "Wedding stationery",
    category: "creatives",
    totalGrowth: 3660,
    savedMonths: 9,
  },

  // Coaches & educators
  {
    displayName: "Sav Hill",
    username: "savfit__",
    niche: "Strength and movement coach",
    tag: "Strength & movement",
    category: "coaches",
    featured: true,
    totalGrowth: 4407,
    savedMonths: 11,
    quote:
      "My work was changing, and Jay was on the money about where to take the page next. He listened, helped me rethink the audience and adjusted the pace when I needed him to.",
  },
  {
    displayName: "Parents Have Feelings Too",
    username: "parentshavefeelingstoo",
    niche: "Parenting educators and psychotherapists",
    tag: "Parenting education",
    category: "coaches",
    totalGrowth: 5885,
    savedMonths: 14,
  },
  {
    displayName: "Will Baldwin",
    username: "runbaldwin",
    niche: "Running coach",
    tag: "Running coach",
    category: "coaches",
    totalGrowth: 5658,
    savedMonths: 11,
  },
  {
    displayName: "Ana Paula Loures-Elias",
    username: "anapaula.loureselias",
    niche: "Personalized English learning and neuro-inclusive education",
    tag: "English education",
    category: "coaches",
    totalGrowth: 1165,
    savedMonths: 3,
  },
  {
    displayName: "Keisha Miles",
    username: "iambergababy",
    niche: "Jamaican cooking coach and food educator",
    tag: "Cooking education",
    category: "coaches",
    totalGrowth: 4946,
    savedMonths: 15,
  },
  {
    displayName: "Gemma Pedrós",
    username: "gemmaopal_oficial",
    niche: "Vocal coach and singer",
    tag: "Vocal coaching",
    category: "coaches",
    totalGrowth: 1427,
    savedMonths: 4,
  },

  // Local businesses
  {
    displayName: "Sam Bernstein",
    username: "thedenverstylist",
    niche: "Salon owner and hairstylist in Denver",
    tag: "Salon & hairstyling",
    category: "local",
    featured: true,
    totalGrowth: 7728,
    savedMonths: 15,
    quote:
      "Unreal growth on my salon account. I’ve loved working with you guys. I added another account, and someone on my salon team has asked about signing up too.",
  },
  {
    displayName: "Jackson Harris",
    username: "harrishomesaz",
    niche: "Arizona real-estate agent",
    tag: "Real estate",
    category: "local",
    totalGrowth: 4737,
    savedMonths: 17,
  },
  {
    displayName: "Ramsays",
    username: "ramsays.uk",
    niche: "Gym, reformer Pilates and sauna business",
    tag: "Fitness & wellness",
    category: "local",
    totalGrowth: 6614,
    savedMonths: 14,
  },
  {
    displayName: "Papa Mia",
    username: "restaurant_papamia",
    niche: "Restaurant serving fresh pasta and Pinsa Romana",
    tag: "Restaurant",
    category: "local",
    totalGrowth: 2202,
    savedMonths: 7,
  },
  {
    displayName: "Andreea Leu",
    username: "andreealeu.realtor",
    niche: "Residential real-estate agent",
    tag: "Real estate",
    category: "local",
    totalGrowth: 6909,
    savedMonths: 13,
  },
  {
    displayName: "Bright Smiles Dental Studio",
    username: "brightsmilesdentalstudio",
    niche: "Cosmetic, implant and family dental studio",
    tag: "Dentistry",
    category: "local",
    totalGrowth: 4376,
    savedMonths: 13,
  },

  // Creators
  {
    displayName: "The Station Chef",
    username: "thestationchef_",
    niche: "High-protein recipe creator; firefighter and chef",
    tag: "Food & recipes",
    category: "creators",
    featured: true,
    totalGrowth: 7268,
    savedMonths: 10,
    quote:
      "Really happy with the growth. The content feedback was specific to our recipes, even where to put the subtitles so they wouldn’t cover the food. Useful stuff.",
  },
  {
    displayName: "Ree",
    username: "thecraftybrewbelle",
    niche: "Craft-beer and independent-business content creator",
    tag: "Craft beer",
    category: "creators",
    totalGrowth: 8997,
    savedMonths: 14,
  },
  {
    displayName: "Lawson",
    username: "lawson_cl",
    niche: "Fashion and lifestyle creator",
    tag: "Fashion & lifestyle",
    category: "creators",
    totalGrowth: 3271,
    savedMonths: 10,
  },
  {
    displayName: "Olha Failla",
    username: "olha_lifestyle_ca",
    niche: "Beauty, fashion and lifestyle UGC creator",
    tag: "Lifestyle & UGC",
    category: "creators",
    totalGrowth: 4101,
    savedMonths: 11,
  },
  {
    displayName: "Idaly",
    username: "naturallyidaly",
    niche: "Beauty creator: skincare and makeup tips",
    tag: "Beauty",
    category: "creators",
    totalGrowth: 3645,
    savedMonths: 9,
  },
  {
    displayName: "Katie Estes",
    username: "katieestes.ge",
    niche: "Style and travel creator",
    tag: "Style & travel",
    category: "creators",
    totalGrowth: 3892,
    savedMonths: 11,
  },

  // Product brands
  {
    displayName: "BlueMag Airsoft",
    username: "bluemagairsoft",
    niche:
      "E-commerce manufacturer of biodegradable airsoft BBs and components",
    tag: "Airsoft equipment",
    category: "products",
    featured: true,
    totalGrowth: 2046,
    savedMonths: 5,
    quote:
      "We’d been stuck at roughly 4,000 followers for a long time. Seeing the audience grow was great. Seeing more people come through to the website was even better.",
  },
  {
    displayName: "No Crowd",
    username: "nocrowdclothing",
    niche: "Apparel brand for introverts",
    tag: "Apparel",
    category: "products",
    totalGrowth: 6597,
    savedMonths: 17,
  },
  {
    displayName: "Huckle Bee Farms",
    username: "hucklebeefarms",
    niche: "Small-batch honey brand",
    tag: "Food & honey",
    category: "products",
    totalGrowth: 4728,
    savedMonths: 14,
  },
  {
    displayName: "Wood Performance",
    username: "woodperformancecamshafts",
    niche: "Motorcycle performance parts",
    tag: "Motorcycle parts",
    category: "products",
    totalGrowth: 5413,
    savedMonths: 10,
  },
  {
    displayName: "INVO Aesthetics",
    username: "invoaesthetics",
    niche: "Skincare and hair-restoration product brand",
    tag: "Skincare",
    category: "products",
    totalGrowth: 4302,
    savedMonths: 13,
  },
  {
    displayName: "Candere Clay",
    username: "candereclay",
    niche: "One-person handmade ceramic lighting and home-decor studio",
    tag: "Ceramics & lighting",
    category: "products",
    totalGrowth: 1608,
    savedMonths: 5,
  },
];

export const fmt = (n: number) => n.toLocaleString("en-US");

export const audienceById = (id: AudienceId) =>
  AUDIENCES.find((a) => a.id === id)!;

/** Featured account first, then the gallery — six per audience. */
export const accountsFor = (id: AudienceId) =>
  ACCOUNTS.filter((a) => a.category === id).sort(
    (a, b) => Number(!!b.featured) - Number(!!a.featured),
  );
