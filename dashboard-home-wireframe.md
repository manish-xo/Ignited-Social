# Dashboard Home Page — Wireframe

Post-login home page for logged-in users to track their Instagram growth activity.

---

## Layout Overview

```
┌──────────────────────────────────────────────────────────────────┐
│  TOP BAR                                                          │
│  [Avatar] @handle        [Plan Badge: Scale]   [GM: Sarah — 💬]   │
├──────────────────────────────────────────────────────────────────┤
│  STAT CARDS (4 across, responsive to 2x2 on mobile)               │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐     │
│  │ Followers  │ │ Growth %   │ │ Engagement │ │ New (7d)   │     │
│  │ 12,480     │ │ +6.2%      │ │ 4.8%       │ │ +312       │     │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘     │
├──────────────────────────────────────────────────────────────────┤
│  MAIN CHART — Follower Growth Over Time                           │
│  [7D] [30D] [90D] [All]                                           │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │                                                    ╱╲       │  │
│  │                                        ╱╲        ╱   ╲      │  │
│  │                            ╱╲        ╱   ╲     ╱      ╲     │  │
│  │              ╱╲          ╱   ╲    ╱       ╲  ╱          ╲  │  │
│  │      ╱╲    ╱   ╲       ╱      ╲ ╱                          │  │
│  │  __ ╱  ╲__╱     ╲_____╱                                    │  │
│  └────────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────┬───────────────────────────┤
│  AUDIENCE BREAKDOWN                  │  RECENT ACTIVITY           │
│  ┌─────────────────────────────────┐ │  ┌────────────────────┐   │
│  │      Donut / Bar Chart          │ │  │ Jul 30 — Reviewed   │   │
│  │   By location / age / interest  │ │  │ content strategy    │   │
│  │                                  │ │  ├────────────────────┤   │
│  │                                  │ │  │ Jul 28 — Added 3    │   │
│  │                                  │ │  │ new interest tags   │   │
│  │                                  │ │  ├────────────────────┤   │
│  │                                  │ │  │ Jul 24 — +142       │   │
│  │                                  │ │  │ followers this week │   │
│  └─────────────────────────────────┘ │  └────────────────────┘   │
├──────────────────────────────────────┴───────────────────────────┤
│  GROWTH MANAGER NOTE                                               │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │ "Hey! This month we focused on refining your audience       │  │
│  │  targeting around lifestyle content. Engagement is up 18%   │  │
│  │  — let's keep this momentum into August."                   │  │
│  │  — Sarah, your Growth Manager      [Download full report →] │  │
│  └────────────────────────────────────────────────────────────┘  │
├──────────────────────────────────────────────────────────────────┤
│  ACCOUNT HEALTH                              UPGRADE NUDGE        │
│  ✅ Account Status: Healthy                  Scale clients grow   │
│     No flags, fully compliant                2x faster → Upgrade │
└──────────────────────────────────────────────────────────────────┘
```

---

## Section Breakdown

### 1. Top Bar

- Avatar + connected Instagram handle
- Current plan badge (Grow / Scale)
- Growth manager name + quick "Message" action
- Purpose: reinforce the "dedicated manager" promise immediately on login

### 2. Stat Cards (top row, 4 across)

| Card            | Content                                 |
| --------------- | --------------------------------------- |
| Total Followers | Current count + delta since last period |
| Growth Rate     | % change over selected period           |
| Engagement Rate | Likes/comments per follower             |
| New This Week   | Net new followers, most recent 7 days   |

### 3. Main Line Chart

- Primary metric: follower count over time
- Time range toggle: 7D / 30D / 90D / All-time
- Optional secondary line: engagement or unfollow rate, to visually prove growth is "real," not just a rising vanity number
- Color: `action` for primary line

### 4. Audience Breakdown (left column)

- Donut or bar chart
- Segmented by location, age range, or interest category
- Ties back to "Core/Advanced Targeting" pricing tier feature — visual proof it's working

### 5. Recent Activity Feed (right column)

- Chronological log of growth manager actions
- Makes "dedicated growth manager" feel tangible instead of just a marketing claim
- Examples: strategy reviews, targeting adjustments, weekly follower summaries

### 6. Growth Manager Note (full width)

- Short, personal written update from the actual assigned growth manager
- Link to download a full monthly PDF report
- Differentiator vs. bot/automation competitors — human touch

### 7. Account Health Indicator

- Simple badge: "Account Status: Healthy" with checkmark
- Ties to "Safe, compliant growth" feature promise — reassurance, no shadowban risk

### 8. Upgrade Nudge (conditional)

- Only shown to Grow-tier users
- Soft comparison stat (e.g. "Scale clients grow 2x faster")
- Should not appear if user is already on Scale, or if recently dismissed

---

## Design Notes

- Reuse existing color tokens: `canvas` (background), `ink` (primary text), `action` (charts/CTAs/highlights), `secondary`/`muted` (supporting text), `success`/`danger`/`warning` (health status, deltas)
- Stat card deltas: green (`success`) for positive, red (`danger`) for negative — do not use `action` for deltas, reserve that for primary brand/CTA elements
- Chart library: `recharts` (already available in current stack)
- Mobile: stat cards collapse to 2x2 grid; Audience Breakdown and Recent Activity stack vertically instead of side-by-side
