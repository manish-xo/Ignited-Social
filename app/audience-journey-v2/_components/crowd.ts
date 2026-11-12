import { NICHES, photo, type Niche } from "../data";

/** Which filter removes this person: 0 interests, 1 location, 2 accounts. */
export type DropPhase = 0 | 1 | 2;

export interface Person {
  key: string;
  name: string;
  /** null shows Instagram's default avatar, used for accounts with no photo. */
  src: string | null;
  drop: DropPhase | null;
}

// 14 slots in a fixed, shuffled-looking order. The letters say who sits where:
// k = kept (index into the kept list), p = dropped photo, s = default avatar.
const SLOTS: Array<[string, DropPhase | null, number]> = [
  ["s", 0, 0], ["k", null, 1], ["p", 1, 0], ["s", 2, 1], ["k", null, 0], ["s", 0, 2], ["p", 0, 1],
  ["s", 1, 3], ["k", null, 3], ["s", 2, 4], ["p", 2, 2], ["s", 0, 5], ["k", null, 2], ["s", 1, 6],
];

/**
 * Everyone shown in step 1. The four who stay are always real photos: the
 * niche's example person, two stock faces and one more example person.
 */
export function buildCrowd(niche: Niche): { people: Person[]; kept: Person[] } {
  const index = NICHES.findIndex((n) => n.id === niche.id);
  const other = NICHES[(index + 1) % NICHES.length];

  const kept: Person[] = [
    { key: "own", name: niche.person, src: photo(niche.id, "portrait"), drop: null },
    { key: "jaden", name: "Jaden", src: "/audiences/journey-v2/faces/jaden.webp", drop: null },
    { key: "mike", name: "Mike", src: "/audiences/journey-v2/faces/mike.webp", drop: null },
    { key: "other", name: other.person, src: photo(other.id, "portrait"), drop: null },
  ];

  const droppedPhotos = NICHES.filter((n) => n.id !== niche.id && n.id !== other.id);

  const people = SLOTS.map(([kind, drop, i]): Person => {
    if (kind === "k") return kept[i];
    if (kind === "p") {
      const n = droppedPhotos[i];
      return { key: `p-${n.id}`, name: n.person, src: photo(n.id, "portrait"), drop };
    }
    return { key: `s-${i}`, name: "", src: null, drop };
  });

  return { people, kept };
}

/** How many people are still in the running after each filter. */
export const REMAINING = [14, 10, 7, 4];
