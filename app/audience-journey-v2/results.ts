import type { NicheId } from "./data";

/**
 * Real customer accounts for "The growth, up close". The counts are copied
 * exactly as Instagram showed them in the before and after screenshots stored
 * in public/Before&After/<niche>/ (Instagram rounds anything over 10,000).
 * The first account in each niche is the one featured in
 * Ignited_Sections_5_6_Option_2; the others follow it.
 */
export interface CustomerResult {
  handle: string;
  verified: boolean;
  before: string;
  after: string;
  /**
   * Exact followers gained, from the case studies, where we have it. Without
   * it the gain is worked out from the screenshot counts.
   */
  gained?: number;
  quote: string;
}

export const RESULTS: Record<NicheId, CustomerResult[]> = {
  creatives: [
    {
      handle: "originalmostertphotography",
      gained: 6052,
      verified: true,
      before: "8,848",
      after: "14.9K",
      quote:
        "Reaching 10,000 followers meant a lot. Esha understood that I can’t always get out and shoot, and helped me plan around it.",
    },
    {
      handle: "james_bosley_studio",
      gained: 9016,
      verified: false,
      before: "5,784",
      after: "14.8K",
      quote:
        "The ideas fitted my work: the studio, the design process, and how the clothes look on a model. I already had footage I could start using.",
    },
    {
      handle: "tracy.merano",
      gained: 7175,
      verified: true,
      before: "28.4K",
      after: "35.6K",
      quote:
        "I wanted real people to connect with me through my music. Sushmita gave me ideas for the songs, the stories behind them, and the person listeners would meet.",
    },
    {
      handle: "bardadim.studios",
      verified: false,
      before: "20.1K",
      after: "25.2K",
      quote:
        "We had plenty of material, but I kept putting it in Stories. Aditi gave me ideas for showing the tattoo process and encouraged me to share more of it.",
    },
  ],
  coaches: [
    {
      handle: "savfit__",
      gained: 4407,
      verified: true,
      before: "14.8K",
      after: "19.3K",
      quote:
        "I wanted to stay consistent without posting all day. Tulsi showed me which fitness audiences were responding and suggested kettlebell videos I could make without changing my style.",
    },
    {
      handle: "coach.b_chro",
      verified: true,
      before: "2,725",
      after: "7,441",
      quote:
        "The examples gave me something concrete to work from: motherhood stories, nutrition tips and ways to make my Reels easier to follow. That was really helpful for planning my content.",
    },
    {
      handle: "prestonwoody",
      verified: true,
      before: "12.7K",
      after: "16.3K",
      quote:
        "I appreciated how specific Shama’s feedback was: a clearer next step in my bio, more personal moments, and new ways to present quotes. She was responsive when I had questions.",
    },
    {
      handle: "its_fitbrit",
      verified: false,
      before: "8,677",
      after: "14.2K",
      quote:
        "The November review gave me a confidence boost. Sushmita pointed to the gym videos and conversations already on my page and gave me specific ideas I wanted to try next.",
    },
  ],
  local: [
    {
      handle: "thedenverstylist",
      gained: 7728,
      verified: true,
      before: "9,072",
      after: "16.8K",
      quote:
        "Unreal growth on my salon account. I’ve loved working with you guys. I added another account.",
    },
    {
      handle: "drakeabshirerealtor",
      verified: true,
      before: "18.9K",
      after: "24.4K",
      quote:
        "Rahul’s reviews gave me specific ideas for my property videos—buyer questions, clearer text and room for my sense of humour. I had useful things to work on.",
    },
    {
      handle: "majesticpoolsbarrie",
      verified: false,
      before: "4,112",
      after: "8,040",
      quote:
        "I appreciated having the outreach managed for me. I could focus the brief on Ontario builders and landscapers, and get practical feedback on how we showed our projects.",
    },
    {
      handle: "mrhudsonexplores",
      verified: true,
      before: "47.4K",
      after: "53.2K",
      quote:
        "The itinerary ideas fitted the kind of trips we sell. I could start with hotel-partner videos and build towards filming more of our own trips.",
    },
  ],
  creators: [
    {
      handle: "thestationchef_",
      gained: 7268,
      verified: false,
      before: "3,932",
      after: "11.2K",
      quote:
        "Really happy with the growth. The content feedback was specific to our recipes, even where to put the subtitles so they wouldn’t cover the food.",
    },
    {
      handle: "gosia_yogini",
      verified: false,
      before: "11.9K",
      after: "16.4K",
      quote:
        "I updated my name and bio after the review. The suggestions helped me introduce yoga and fitness for women over 40 while keeping the page personal.",
    },
    {
      handle: "madsteex",
      verified: true,
      before: "10.7K",
      after: "16K",
      quote:
        "I wanted people who were interested in guitar and studio gear. Most of the new followers felt like the right audience, and I was happy with that.",
    },
    {
      handle: "iambergababy",
      verified: false,
      before: "3,270",
      after: "8,216",
      quote:
        "The feedback was specific to my cooking videos: lower the music, move the subtitles and make the dish clear on the cover. I knew what to work on next.",
    },
  ],
  products: [
    {
      handle: "bluemagairsoft",
      verified: false,
      before: "6,958",
      after: "9,004",
      quote:
        "We’d been stuck at roughly 4,000 followers for a long time. Seeing the audience grow was great. Seeing more people come through to the website was even better.",
    },
    {
      handle: "beardoctane",
      verified: true,
      before: "23.7K",
      after: "26.9K",
      quote:
        "The feedback gave us practical ideas beyond product shots: beard-care routines, styling tips and how to start our videos. We could see more ways to show the products.",
    },
    {
      handle: "favoritebikesofficial",
      verified: false,
      before: "5,767",
      after: "13.2K",
      quote:
        "We wanted people already interested in e-bikes. Tulsi worked with competitor audiences and suggested showing the features, assembly and riding experience, giving us more to explain than a product photo.",
    },
    {
      handle: "toddbracher",
      verified: true,
      before: "7,783",
      after: "16.1K",
      quote:
        "I wanted people to understand how I see design, without making the page feel like a sales pitch. Rahul’s suggestions gave me ways to introduce the work and my perspective.",
    },
  ],
};

export const resultImage = (
  niche: NicheId,
  handle: string,
  kind: "before" | "after" | "avatar",
) => `/audiences/journey-v2/results/${niche}/${handle}-${kind}.png`;

/** "14.8K" -> 14800, "5,784" -> 5784. */
const toNumber = (count: string) =>
  count.endsWith("K")
    ? Math.round(parseFloat(count) * 1000)
    : Number(count.replace(/,/g, ""));

/**
 * Followers gained, always written out in full (no "K"). Uses the exact figure
 * when there is one; otherwise the difference between the screenshot counts,
 * which is approximate if Instagram rounded either of them.
 */
export function growth(result: CustomerResult) {
  const from = toNumber(result.before);
  const to = toNumber(result.after);
  const gained = result.gained ?? to - from;
  const rounded = result.before.endsWith("K") || result.after.endsWith("K");
  const approximate = result.gained === undefined && rounded;
  const percent = Math.round((gained / from) * 100);
  return {
    label: `+${gained.toLocaleString("en-US")}`,
    gained,
    percent,
    rounded,
    approximate,
  };
}
