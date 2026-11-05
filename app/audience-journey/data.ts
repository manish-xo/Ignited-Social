// Copy comes from Ignited_Sections_5_6_Option_2.html. Every person and account
// shown inside the phone is an illustrative example, not a real Instagram user.

export type NicheId = "creatives" | "coaches" | "local" | "creators" | "products";

export interface Niche {
  id: NicheId;
  label: string;
  headline: string;
  body: string;
  bullets: string[];
  /** Caption for the first step, e.g. "For a Denver hair salon". */
  example: string;
  /** What gets typed into the Instagram search bar. */
  search: string;
  interests: [string, string, string];
  place: string;
  accounts: [string, string, string];
  person: string;
  personPlace: string;
  /** Placeholder handle that stands in for the customer's own account. */
  handle: string;
  profileName: string;
  profileBio: string;
}

export const NICHES: Niche[] = [
  {
    id: "creatives",
    label: "Artists & creatives",
    headline: "Build an audience around what you make.",
    body: "Your style and subject matter give us a starting point. We look at artists, publications and communities with related audiences, then help more of those people discover your work.",
    bullets: [
      "Reach people drawn to your subject matter",
      "Put your work in front of new people",
      "Keep your time for creating",
    ],
    example: "For a landscape photographer",
    search: "landscape photography",
    interests: ["Landscape photography", "Nature", "Photographic art"],
    place: "Worldwide",
    accounts: [
      "Landscape photographers",
      "Outdoor publications",
      "Photography galleries",
    ],
    person: "Alex",
    personPlace: "London",
    handle: "youraccount",
    profileName: "Landscape photography",
    profileBio: "Prints & stories from the outdoors",
  },
  {
    id: "coaches",
    label: "Coaches & educators",
    headline: "Reach more people who want to learn what you teach.",
    body: "The people you help have questions, goals and interests in common. We look at the topics and educators they already follow to find a starting point for your outreach.",
    bullets: [
      "Reach people interested in what you teach",
      "Shape the outreach around who you help",
      "Keep your time for your clients",
    ],
    example: "For an online strength coach",
    search: "strength coach",
    interests: ["Strength training", "Mobility", "Fitness"],
    place: "US · UK · Canada",
    accounts: ["Strength coaches", "Movement educators", "Fitness communities"],
    person: "Jordan",
    personPlace: "Austin",
    handle: "youraccount",
    profileName: "Online strength coaching",
    profileBio: "Strength · Mobility · Consistency",
  },
  {
    id: "local",
    label: "Local businesses",
    headline: "Be discovered by more people nearby.",
    body: "Your business serves a particular place. Your audience should reflect that. We focus the outreach on your area and interests connected to what you offer.",
    bullets: [
      "Focus on people in your area",
      "Connect through interests that fit your business",
      "Keep your time for your customers",
    ],
    example: "For a Denver hair salon",
    search: "hair colour denver",
    interests: ["Hair colour", "Styling", "Local beauty services"],
    place: "Denver & nearby",
    accounts: ["Local salons", "Denver lifestyle accounts", "Local beauty creators"],
    person: "Maya",
    personPlace: "Denver",
    handle: "yoursalon",
    profileName: "Hair colour & styling",
    profileBio: "Denver",
  },
  {
    id: "creators",
    label: "Content creators",
    headline: "Find more people who’ll enjoy your take on things.",
    body: "Whether you share recipes, style tips or life on the road, we look for people already interested in that world. Then help them discover what you bring to it.",
    bullets: [
      "Reach people interested in your topics",
      "Help new people discover your perspective",
      "Keep your time for making content",
    ],
    example: "For a high-protein recipe creator",
    search: "high protein recipes",
    interests: ["High-protein meals", "Quick recipes", "Meal prep"],
    place: "Worldwide",
    accounts: ["Recipe creators", "Food communities", "Fitness creators"],
    person: "Sam",
    personPlace: "Manchester",
    handle: "youraccount",
    profileName: "High-protein recipes",
    profileBio: "Simple meals for busy days",
  },
  {
    id: "products",
    label: "Product brands",
    headline: "Help more people discover what you sell.",
    body: "What you sell, who it’s for and where you ship guide the search. We look for relevant interests, brands and communities to introduce more people to your products.",
    bullets: [
      "Focus on countries you ship to",
      "Reach people interested in products like yours",
      "Keep your time for your business",
    ],
    example: "For a handmade lighting brand",
    search: "ceramic lighting",
    interests: ["Interior design", "Ceramics", "Home renovation"],
    place: "US & Canada",
    accounts: [
      "Interior designers",
      "Home renovation accounts",
      "Independent homeware brands",
    ],
    person: "Emma",
    personPlace: "Toronto",
    handle: "yourbrand",
    profileName: "Handmade ceramic lighting",
    profileBio: "Ships to the US & Canada",
  },
];

export const DEFAULT_NICHE = NICHES.findIndex((n) => n.id === "local");

export type NichePhoto =
  | "portrait"
  | "a1"
  | "a2"
  | "a3"
  | "main"
  | "more1"
  | "more2";

export const photo = (id: NicheId, name: NichePhoto) =>
  `/audiences/journey/${id}/${name}.webp`;
