// Brand Manager card: the manager shown, and the "Today's workflow" copy.
//
// The manager stays fixed. Each day the card holds 6 workflows: one SPECIAL
// (written to "you") shown first, then 5 from the POOL that next / previous
// step through. A new set is picked every day at 12:00 PM IST, everyone sees
// the same set that day, and recent days' picks aren't repeated.

export interface Manager {
  name: string;
  role: string;
  photo: string;
  accounts: string; // e.g. "50+"
  experience: string; // e.g. "3+ yrs"
}

export interface Task {
  text: string;
  time: string;
}

export interface Workflow {
  completed: Task[];
  later: Task[];
}

// Edit the manager here.
export const MANAGER: Manager = {
  name: "Shambhavi Shukhla",
  role: "Personal Brand Manager",
  photo: "/stock/avatar-2.jpg",
  accounts: "50+",
  experience: "3+ yrs",
};

// [text, time] pairs keep the copy below easy to scan against the doc.
type Row = [string, string];
const wf = (completed: Row[], later: Row[]): Workflow => ({
  completed: completed.map(([text, time]) => ({ text, time })),
  later: later.map(([text, time]) => ({ text, time })),
});

export const SPECIAL_WORKFLOWS: Workflow[] = [
  wf(
    [
      ["Engaged with 63 accounts in your niche", "9:14 AM"],
      ["Reviewed your recent posts", "10:02 AM"],
      ["Followed 28 users matching your location filter", "11:11 AM"],
    ],
    [["Walk you through your content plan", "2:30 PM"]],
  ),
  wf(
    [
      ["Prepared your content plan", "9:26 AM"],
      ["Commented on 18 posts in your niche", "10:48 AM"],
      ["Followed 46 people in your niche", "12:05 PM"],
    ],
    [["Brainstorm Reel ideas and hook strategies", "3:00 PM"]],
  ),
  wf(
    [
      ["Liked 57 posts from people in your niche", "8:52 AM"],
      ["Followed 34 people who liked your competitor’s post", "10:16 AM"],
      ["Reviewed your growth and follower quality", "11:31 AM"],
    ],
    [["Refine your audience targeting", "2:15 PM"]],
  ),
  wf(
    [
      ["Commented on 22 posts in your niche", "9:08 AM"],
      ["Reviewed your offer and landing page", "10:37 AM"],
      ["Followed 41 users matching your location filter", "12:18 PM"],
    ],
    [["Discuss your content calendar for next month", "3:45 PM"]],
  ),
  wf(
    [
      ["Engaged with 52 accounts in your niche", "9:22 AM"],
      ["Shared feedback on your Reel’s hook", "11:06 AM"],
    ],
    [
      ["Review your bio and booking funnel", "1:30 PM"],
      ["Discuss your content plan", "4:00 PM"],
    ],
  ),
  wf(
    [
      ["Engaged with 68 accounts who followed your competitor", "9:05 AM"],
      ["Commented on 16 posts in your niche", "10:12 AM"],
      ["Followed 37 users matching your location filter", "11:11 AM"],
    ],
    [["Review your growth and follower quality", "2:45 PM"]],
  ),
];

export const POOL_WORKFLOWS: Workflow[] = [
  wf(
    [
      ["Engaged with 54 relevant accounts", "9:12 AM"],
      ["Shared feedback on recent posts", "10:07 AM"],
      ["Followed 32 people in the selected location", "11:38 AM"],
    ],
    [["Discuss next month’s content calendar", "3:00 PM"]],
  ),
  wf(
    [
      ["Prepared a tailored content plan", "9:30 AM"],
      [
        "Followed 21 relevant people from competitor’s follower list",
        "10:42 AM",
      ],
      ["Liked 48 posts from relevant accounts", "12:14 PM"],
    ],
    [["Discuss ideas for next week’s Reels", "3:30 PM"]],
  ),
  wf(
    [
      ["Liked 59 posts from relevant accounts", "8:56 AM"],
      ["Followed 36 people interested in the niche", "10:20 AM"],
      ["Reviewed growth and follower quality", "11:47 AM"],
    ],
    [["Refine audience targeting", "2:40 PM"]],
  ),
  wf(
    [
      ["Commented on 24 relevant posts", "9:18 AM"],
      ["Reviewed an offer and landing page", "10:36 AM"],
      ["Followed 43 people in the selected location", "12:09 PM"],
    ],
    [["Discuss improvements to the booking process", "3:15 PM"]],
  ),
  wf(
    [
      ["Reviewed best-performing vs. recent posts", "9:04 AM"],
      ["Engaged with 67 relevant accounts", "10:28 AM"],
      ["Followed 38 people who liked competitor’s post", "11:53 AM"],
    ],
    [["Brainstorm new content topics", "2:20 PM"]],
  ),
  wf(
    [
      ["Followed 29 people who followed a relevant account", "9:37 AM"],
      [
        "Analysed competitors’ Reels. Found a relevant visual hook strategy",
        "10:51 AM",
      ],
      ["Commented on 19 relevant posts", "12:22 PM"],
    ],
    [["Review next month’s content calendar", "4:10 PM"]],
  ),
  wf(
    [
      ["Engaged with 61 relevant accounts", "9:20 AM"],
      ["Suggested new post formats", "10:24 AM"],
      ["Followed 47 people in the selected location", "11:56 AM"],
    ],
    [["Review audience growth", "2:35 PM"]],
  ),
  wf(
    [
      ["Reviewed the bio and booking link", "9:23 AM"],
      ["Commented on 27 relevant posts", "10:46 AM"],
      ["Liked 56 posts from relevant accounts", "12:08 PM"],
    ],
    [["Discuss content ideas for next month", "3:20 PM"]],
  ),
  wf(
    [
      ["Liked 44 posts from relevant accounts", "9:06 AM"],
      ["Followed 33 people interested in the niche", "10:31 AM"],
      ["Refined audience targeting", "11:49 AM"],
    ],
    [["Review recent Reels", "4:15 PM"]],
  ),
  wf(
    [
      ["Reviewed recent posts’ insights", "9:16 AM"],
      ["Engaged with 58 relevant accounts", "10:34 AM"],
      ["Suggested clearer wording for the bio", "12:06 PM"],
    ],
    [["Discuss next month’s content calendar", "3:10 PM"]],
  ),
  wf(
    [
      ["Commented on 23 relevant posts", "9:28 AM"],
      ["Reviewed an offer and landing page", "10:45 AM"],
      ["Shared ideas for upcoming Reels", "11:52 AM"],
    ],
    [["Review the booking process", "3:40 PM"]],
  ),
  wf(
    [
      ["Engaged with 64 relevant accounts", "9:13 AM"],
      ["Followed 31 people in the selected location", "10:58 AM"],
    ],
    [
      ["Prepare a content plan", "1:45 PM"],
      ["Discuss progress and next steps", "4:20 PM"],
    ],
  ),
  wf(
    [
      ["Followed 26 people who liked a relevant post", "9:21 AM"],
      ["Liked 53 posts from relevant accounts", "10:43 AM"],
    ],
    [
      ["Review recent posts", "1:30 PM"],
      ["Brainstorm new content ideas", "3:50 PM"],
    ],
  ),
  wf(
    [
      ["Followed 39 people in the selected location", "9:09 AM"],
      ["Engaged with 72 relevant accounts", "10:52 AM"],
    ],
    [
      ["Review an offer and landing page", "2:00 PM"],
      ["Refine audience targeting", "4:05 PM"],
    ],
  ),
  wf(
    [
      ["Engaged with 66 relevant accounts", "9:17 AM"],
      ["Commented on 20 relevant posts", "10:29 AM"],
      ["Followed 35 people interested in the niche", "11:54 AM"],
    ],
    [["Review growth and follower quality", "3:25 PM"]],
  ),
];

// ── Daily pick ────────────────────────────────────────────────────

const HOUR = 3_600_000;
const DAY = 24 * HOUR;
const IST_OFFSET = 5.5 * HOUR;
const SWITCH_HOUR = 12; // 12:00 PM IST

/** Day number that ticks over at 12:00 PM IST. */
export function cycleOf(ms: number) {
  return Math.floor((ms + IST_OFFSET - SWITCH_HOUR * HOUR) / DAY);
}

/** Milliseconds until the next 12:00 PM IST switch. */
export function msUntilNextCycle(ms: number) {
  const nextStart = (cycleOf(ms) + 1) * DAY - IST_OFFSET + SWITCH_HOUR * HOUR;
  return nextStart - ms;
}

// Seeded random (mulberry32): the same day always gives the same picks.
function seeded(seed: number) {
  let a = Math.imul(seed, 2654435761) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], rand: () => number) {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const POOL_PICKS = 5;
const SPECIAL_GAP = 3; // a special card can't come back within 3 days
// Days are replayed from here so each one knows what the days before showed.
const START_CYCLE = cycleOf(Date.UTC(2026, 0, 1, 12));

const picksCache = new Map<number, Workflow[]>();

/** Today's 6 workflows: the special one first, then 5 from the pool. */
export function workflowsFor(cycle: number): Workflow[] {
  const cached = picksCache.get(cycle);
  if (cached) return cached;

  const specials = SPECIAL_WORKFLOWS.map((_, i) => i);
  const poolIds = POOL_WORKFLOWS.map((_, i) => i);
  let recentSpecials: number[] = [];
  let lastPool: number[] = [];

  for (let day = Math.min(START_CYCLE, cycle); day <= cycle; day++) {
    const rand = seeded(day + 1);
    // Special: any of the 6 not shown in the last few days.
    const freeSpecials = specials.filter((i) => !recentSpecials.includes(i));
    const special = freeSpecials[Math.floor(rand() * freeSpecials.length)];
    recentSpecials = [special, ...recentSpecials].slice(0, SPECIAL_GAP);
    // Pool: 5 of the 10 that weren't shown yesterday.
    const freePool = poolIds.filter((i) => !lastPool.includes(i));
    lastPool = shuffle(freePool, rand).slice(0, POOL_PICKS);
  }

  const picks = [
    SPECIAL_WORKFLOWS[recentSpecials[0]],
    ...lastPool.map((i) => POOL_WORKFLOWS[i]),
  ];
  picksCache.set(cycle, picks);
  return picks;
}
