import type { NicheId } from "./data";

/**
 * Real customer accounts for "The growth, up close". The counts are copied
 * exactly as Instagram showed them in the before and after screenshots stored
 * in public/Before&After/<niche>/ (Instagram rounds anything over 10,000).
 */
export interface CustomerResult {
  handle: string;
  verified: boolean;
  before: string;
  after: string;
}

export const RESULTS: Record<NicheId, CustomerResult[]> = {
  creatives: [
    {
      handle: "james_bosley_studio",
      verified: false,
      before: "5,784",
      after: "14.8K",
    },
    { handle: "tracy.merano", verified: true, before: "28.4K", after: "35.6K" },
    {
      handle: "bardadim.studios",
      verified: false,
      before: "20.1K",
      after: "25.2K",
    },
  ],
  coaches: [
    { handle: "coach.b_chro", verified: true, before: "2,725", after: "7,441" },
    { handle: "savfit__", verified: true, before: "14.8K", after: "19.3K" },
    { handle: "prestonwoody", verified: true, before: "12.7K", after: "16.3K" },
  ],
  local: [
    {
      handle: "drakeabshirerealtor",
      verified: true,
      before: "18.9K",
      after: "24.4K",
    },
    {
      handle: "majesticpoolsbarrie",
      verified: false,
      before: "4,112",
      after: "8,040",
    },
    {
      handle: "mrhudsonexplores",
      verified: true,
      before: "47.4K",
      after: "53.2K",
    },
  ],
  creators: [
    {
      handle: "gosia_yogini",
      verified: false,
      before: "11.9K",
      after: "16.4K",
    },
    { handle: "madsteex", verified: true, before: "10.7K", after: "16K" },
    {
      handle: "iambergababy",
      verified: false,
      before: "3,270",
      after: "8,216",
    },
  ],
  products: [
    { handle: "beardoctane", verified: true, before: "23.7K", after: "26.9K" },
    {
      handle: "favoritebikesofficial",
      verified: false,
      before: "5,767",
      after: "13.2K",
    },
    { handle: "toddbracher", verified: true, before: "7,783", after: "16.1K" },
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
 * Followers gained, shown no more precisely than the screenshots allow. If
 * either count is rounded by Instagram, the difference is rounded too.
 */
export function growth({ before, after }: CustomerResult) {
  const from = toNumber(before);
  const to = toNumber(after);
  const gained = to - from;
  const rounded = before.endsWith("K") || after.endsWith("K");
  const percent = Math.round((gained / from) * 100);
  return { label: formatGain(gained, rounded), gained, percent, rounded };
}

/** Same rounding rule as `growth`, so a count-up can show in-between values. */
export const formatGain = (value: number, rounded: boolean) =>
  rounded
    ? `+${(value / 1000).toFixed(1).replace(/\.0$/, "")}K`
    : `+${Math.round(value).toLocaleString("en-US")}`;
