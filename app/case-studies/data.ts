/**
 * Client case studies, taken from the batches in the "Case studies" folder
 * (Ignited_Case_Studies_Batch_01 to _11).
 *
 * Each story belongs to one niche (`niche` / `nicheSlug`). To add a story,
 * give it an existing niche if one fits; a new niche name shows up in the
 * sidebar automatically.
 */

export interface CaseStep {
  label: string;
  heading: string;
  paragraphs: string[];
  /** A small expandable extra under the step. */
  note?: { summary: string; body: string };
}

export interface CaseStudy {
  slug: string;
  /** Short niche name shown in the sidebar, e.g. "Photography". */
  niche: string;
  nicheSlug: string;
  /** What exactly they do, e.g. "Wedding photography · Film and digital". */
  specialty: string;
  title: string;
  intro: string;
  name: string;
  business?: string;
  /** Instagram handle without the @. */
  handle: string;
  /** Path under /public. Initials are shown without one. */
  photo?: string;
  gained: number;
  period: string;
  start: { heading: string; paragraphs: string[]; audience: string[] };
  approach: {
    heading: string;
    paragraphs: string[];
    /** First name, matching a manager in app/service/Components/managerCards.ts. */
    manager: string;
    managerFocus: string;
    steps: CaseStep[];
  };
  progress: {
    heading: string;
    paragraphs: string[];
    months: { dates: string; followers: number }[];
    update?: { heading: string; paragraphs: string[] };
  };
  quote: string;
  quoteBy: string;
  close: { heading: string; body: string };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "james-bosley",
    niche: "Fashion",
    nicheSlug: "fashion",
    specialty: "Fashion and textiles · London",
    title: "A bigger audience for James’s fashion and textile work.",
    intro:
      "James wanted his creative practice to be noticed by people in fashion. Tulsi helped shape the audience brief and suggested Reels built around his designs, studio and existing footage.",
    name: "James Bosley",
    business: "James Bosley Studio",
    handle: "james_bosley_studio",
    photo: "/stock/james_bosley_studio.jpg",
    gained: 9016,
    period: "25 Apr 2025 – 25 Feb 2026",
    start: {
      heading: "Recognition among the people who work in fashion.",
      paragraphs: [
        "James Bosley wanted fashion and textiles enthusiasts to discover his work. His priority was to become better known among industry peers and influential figures as he looked towards more senior roles.",
        "His account needed to show the thinking and work behind the finished designs. He had resumed posting and had moving images he could start using in Reels.",
      ],
      audience: [
        "Fashion industry peers",
        "Textiles enthusiasts",
        "Design and creative direction",
      ],
    },
    approach: {
      heading: "Show the practice behind the finished clothes.",
      paragraphs: [
        "We handled daily outreach with James’s audience brief in mind. Tulsi gave him concrete ways to show the designs taking shape and introduce the person and studio behind them.",
      ],
      manager: "Tulsi",
      managerFocus:
        "Fashion audiences and ideas for showing the design process",
      steps: [
        {
          label: "Getting discovered",
          heading: "Put fashion industry peers in the audience brief.",
          paragraphs: [
            "James’s priority was recognition within fashion, alongside a larger following. We used that distinction to shape the brief. When he and his business partner came up with more industry names, Tulsi invited him to share them for the outreach.",
          ],
        },
        {
          label: "What to post",
          heading: "Show the sketch beside the finished garment.",
          paragraphs: [
            "Tulsi suggested Reels comparing an initial sketch with the finished design on a model. Making-of clips and footage of the clothes being worn would give viewers more to see than a single finished photograph.",
          ],
        },
        {
          label: "Inside the studio",
          heading: "Let people see where the work happens.",
          paragraphs: [
            "Another idea was to show the studio: the tools, materials and space behind the designs. A day in the life of a creative director could bring James into the account and give his work more context.",
          ],
        },
      ],
    },
    progress: {
      heading: "9,016 followers gained through daily outreach.",
      paragraphs: [
        "From April 2025 to February 2026, daily outreach brought James 9,016 followers. The strongest recorded period added 1,193.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 543,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 668,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 916,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 1193,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 983,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 1105,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 979,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 822,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 903,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 904,
        },
      ],
      update: {
        heading: "Ideas he could start with existing footage.",
        paragraphs: [
          "After the August 2024 review, James said things were going well and thanked Tulsi for the advice. He already had moving images he could begin working into Reels, alongside new material he planned to create.",
        ],
      },
    },
    quote:
      "The ideas fitted my work: the studio, the design process, and how the clothes look on a model. I already had footage I could start using.",
    quoteBy: "James Bosley · Fashion and creative direction · August 2024",
    close: {
      heading: "Help the right people discover your creative practice.",
      body: "Work with a Brand Manager on reaching your audience and showing the work behind your designs.",
    },
  },
  {
    slug: "tracy-merano",
    niche: "Music & DJs",
    nicheSlug: "music-and-djs",
    specialty: "Singer and songwriter · Pop music",
    title: "7,175 followers for Tracy’s songs and stories.",
    intro:
      "Tracy wanted people to connect with her music and personality. Sushmita helped define the listeners to reach and suggested ways to share the stories behind the songs.",
    name: "Tracy Merano",
    handle: "tracy.merano",
    photo: "/audiences/journey-v2/results/creatives/tracy.merano-avatar.png",
    gained: 7175,
    period: "25 Jun 2025 – 25 Jun 2026",
    start: {
      heading: "Listeners who would connect with the songs—and Tracy.",
      paragraphs: [
        "Tracy sings, plays piano and writes pop songs about love and heartbreak. She also shares covers, and wanted people to connect with both her music and the person making it.",
        "Her brief named artists such as Billie Eilish, Ed Sheeran and Lewis Capaldi. Those references helped describe the kind of listener she wanted to reach.",
      ],
      audience: [
        "Pop listeners",
        "Piano and acoustic covers",
        "Singer-songwriters",
      ],
    },
    approach: {
      heading: "Find the listeners. Let them meet the songwriter.",
      paragraphs: [
        "Daily outreach worked alongside advice on how Tracy could introduce her music. Sushmita focused on the songs, the moments behind them and the way each Reel appeared on screen.",
      ],
      manager: "Sushmita",
      managerFocus: "Pop listeners, song stories and clearer Reels",
      steps: [
        {
          label: "Getting discovered",
          heading: "Start with the music Tracy makes.",
          paragraphs: [
            "Tracy described her pop songs, piano performances and covers, then shared the artists whose listeners might enjoy her work. We used that brief to guide the audience choices for daily outreach. The aim was to introduce her to people with an interest in the music she was making.",
          ],
        },
        {
          label: "Behind the songs",
          heading: "Tell listeners what inspired a song.",
          paragraphs: [
            "Sushmita suggested Reels about the feelings and stories behind Tracy’s songs. Behind-the-scenes clips from music-video shoots could also show her personality while she worked with the people making the video.",
          ],
        },
        {
          label: "On screen",
          heading: "Keep the words easy to read.",
          paragraphs: [
            "Sushmita recommended simpler subtitles that matched Tracy’s profile, along with captions that told more of the story. These were specific ways to help someone understand the song and the moment behind a performance.",
          ],
        },
      ],
    },
    progress: {
      heading: "7,175 followers gained through daily outreach.",
      paragraphs: [
        "Tracy gained 7,175 followers through daily outreach from June 2025 to June 2026. The strongest period added 964 followers.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 504,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 432,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 571,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 636,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 720,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 732,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 674,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 964,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 535,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 779,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 403,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 225,
        },
      ],
    },
    quote:
      "I wanted real people to connect with me through my music. Sushmita gave me ideas for the songs, the stories behind them, and the person listeners would meet.",
    quoteBy: "Tracy Merano · Singer and songwriter",
    close: {
      heading: "Help more listeners find your music.",
      body: "Get help reaching your audience and sharing the songs, performances and stories that make you recognisable.",
    },
  },
  {
    slug: "djivan-schapira",
    niche: "Design",
    nicheSlug: "design",
    specialty: "Collectible furniture and design",
    title: "8,890 followers for Djivan’s collectible furniture.",
    intro:
      "From gallery audiences to the first frame of a Reel, Aditi helped Djivan introduce his furniture and show the craft behind each piece, with suggestions grounded in his own posts.",
    name: "Djivan Schapira",
    handle: "djivan_schapira",
    gained: 8890,
    period: "25 Apr 2025 – 25 Sep 2026",
    start: {
      heading: "Furniture for people who notice the detail.",
      paragraphs: [
        "Djivan makes collectible furniture. He wanted a bigger audience of interior designers, other artists, gallery owners and people interested in design and architecture.",
        "His posts already showed the finished pieces. Alongside follower growth, he wanted help understanding why carefully produced posts were getting so little attention—and what he could change.",
      ],
      audience: [
        "Interior designers",
        "Gallery owners",
        "Furniture and design enthusiasts",
      ],
    },
    approach: {
      heading: "Find design audiences. Show the work taking shape.",
      paragraphs: [
        "We reviewed which design audiences were following Djivan and gave him specific feedback on his furniture Reels. Aditi later adapted the content advice to the time he could spare between studio work.",
      ],
      manager: "Aditi",
      managerFocus:
        "Design audiences, furniture Reels and content that fits studio life",
      steps: [
        {
          label: "Getting discovered",
          heading: "Reach people following design galleries and makers.",
          paragraphs: [
            "We tested design audiences and reviewed which ones brought new followers. A June 2025 update highlighted accounts including @twentyfirstgallery and @dragaandaurel. Djivan also shared galleries, designers and furniture accounts to help refine the brief.",
          ],
          note: {
            summary: "Examples from the audience review",
            body: "The June 2025 review also included @thesalonny, @amylaudesign and @maisoncharlesparis.",
          },
        },
        {
          label: "The first frame",
          heading: "Show the whole table before the close-up.",
          paragraphs: [
            "One Reel opened with a lingering overhead close-up of the side tables. Aditi recommended showing the full table immediately, so viewers could understand the piece before looking at its details. The feedback compared the opening with an earlier Reel from Djivan’s own account.",
          ],
        },
        {
          label: "A manageable next step",
          heading: "Add a few words to an existing process Reel.",
          paragraphs: [
            "With studio work filling Djivan’s schedule, Aditi suggested a small test: add a clear opening and brief on-screen text at key moments in a process Reel. The words could explain what he was doing and what viewers should notice.",
          ],
          note: {
            summary: "The test proposed in December 2025",
            body: "Set aside 30–35 minutes for one upcoming Reel. Add a short opening in the first two or three seconds, then simple text at key moments.",
          },
        },
      ],
    },
    progress: {
      heading: "8,890 followers gained through daily outreach.",
      paragraphs: [
        "From April 2025 to September 2026, daily outreach brought Djivan 8,890 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 449,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 588,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 530,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 447,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 536,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 591,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 496,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 620,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 565,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 593,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 510,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 455,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 569,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 562,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 514,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 543,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 322,
        },
      ],
      update: {
        heading: "Feedback he began putting into his posts.",
        paragraphs: [
          "In June 2025, Djivan confirmed that he had started turning photographs into Reels following the advice. He also said the detailed review was the kind of social media help he had been looking for.",
        ],
      },
    },
    quote:
      "The feedback got specific: show the table sooner, explain the process, and bring more of me into the posts. That was the kind of help I’d been looking for.",
    quoteBy: "Djivan Schapira · Collectible design artist · June 2025",
    close: {
      heading: "Show more people the craft behind your work.",
      body: "Work with a Brand Manager on reaching design audiences and making your pieces easier to understand.",
    },
  },
  {
    slug: "rick-strooper",
    niche: "Photography",
    nicheSlug: "photography",
    specialty: "Black-and-white nature photography · Netherlands",
    title: "12,463 followers for Rick’s black-and-white photography.",
    intro:
      "Rick wanted more people in Europe, the US and Japan to discover his nature photography. Rahul helped shape the audience brief and suggested ways to show more of his work.",
    name: "Rick Strooper",
    handle: "rickstrooper",
    photo: "/stock/rickstrooper.jpg",
    gained: 12463,
    period: "25 Apr 2025 – 25 Aug 2026",
    start: {
      heading: "A wider audience for nature in black and white.",
      paragraphs: [
        "Rick photographs trees, mountains, skylines and other scenes from nature in black and white. He wanted people interested in art—and art photography in particular—to discover his pictures.",
        "His audience brief included Europe, the US and Japan. Within Europe, he named Germany, France, Italy and England as places he wanted to reach.",
      ],
      audience: [
        "Art photography enthusiasts",
        "Nature in black and white",
        "Europe, the US and Japan",
      ],
    },
    approach: {
      heading: "Keep the photography at the centre.",
      paragraphs: [
        "We handled the daily outreach. Rahul worked with Rick’s description of his audience and suggested a clearer introduction to the account, along with ways to share more of the photographs and how they were made.",
      ],
      manager: "Rahul",
      managerFocus:
        "Art photography audiences, a clearer bio and stories behind the photographs",
      steps: [
        {
          label: "Getting discovered",
          heading: "Build the brief around art photography.",
          paragraphs: [
            "Rick’s interest was specific: people who would appreciate black-and-white photographs of nature. His audience brief combined that subject with the countries he wanted to reach, giving the daily outreach a starting point beyond photography in general.",
          ],
        },
        {
          label: "The profile",
          heading: "Say what makes the photographs distinctive.",
          paragraphs: [
            "Rahul proposed a bio beginning with “Capturing nature in monochrome,” followed by Rick’s location and photo credit. He also supplied highlight covers and ideas for organising photographs, camera equipment and features.",
          ],
          note: {
            summary: "The highlights Rahul suggested",
            body: "Frame could hold photographs of forests and nature Rick had not yet shared. Gear I use could show his camera equipment and tips. Featured could collect places where his photographs had appeared.",
          },
        },
        {
          label: "What to post",
          heading: "Show the photograph and how it came about.",
          paragraphs: [
            "Rahul suggested captions telling the story behind a photograph, Reels showing how Rick captured a shot, and short videos about his camera setup. Collections of nature photographs could become carousels grouped around a theme or mood.",
          ],
        },
      ],
    },
    progress: {
      heading: "12,463 followers gained through daily outreach.",
      paragraphs: [
        "From April 2025 to August 2026, Rick gained 12,463 followers through daily outreach. The strongest recorded period added 1,101 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 1039,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 994,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 1101,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 689,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 733,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 622,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 805,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 954,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 1021,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 859,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 643,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 658,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 611,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 598,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 558,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 578,
        },
      ],
    },
    quote:
      "I wanted my black-and-white nature photographs to reach more people. Rahul’s ideas for the bio, photo collections and behind-the-camera videos gave me a practical place to start.",
    quoteBy: "Rick Strooper · Photographer",
    close: {
      heading: "Help people discover the way you see the world.",
      body: "Get support with reaching photography audiences and showing the stories behind your pictures.",
    },
  },
  {
    slug: "sav-hill",
    niche: "Fitness",
    nicheSlug: "fitness",
    specialty: "Strength & mobility coaching",
    title: "Growing a fitness page without living on Instagram.",
    intro:
      "Sav wanted more people to discover her strength and mobility coaching. Tulsi reviewed the fitness audiences responding to outreach and suggested videos that fitted the way Sav liked to teach.",
    name: "Sav Hill",
    handle: "savfit__",
    photo: "/audiences/journey-v2/results/coaches/savfit__-avatar.png",
    gained: 4407,
    period: "25 Mar 2025 – 25 Feb 2026",
    start: {
      heading: "More time coaching. Less pressure to post all day.",
      paragraphs: [
        "Sav helps people move and perform better, in the gym and outside it. Her Instagram brings together strength training, mobility and kettlebell workouts.",
        "She wanted to build her reputation as a coach, while keeping her content true to her own style. She was willing to post consistently; she did not want Instagram to take over her day.",
      ],
      audience: [
        "Strength training",
        "Kettlebell workouts",
        "Everyday movement",
      ],
    },
    approach: {
      heading:
        "Find the fitness audiences that respond. Give Sav a plan she can use.",
      paragraphs: [
        "We handled daily outreach. Tulsi reviewed where new followers were coming from and gave Sav specific ways to share her coaching without filling every day with posts.",
      ],
      manager: "Tulsi",
      managerFocus:
        "Fitness audiences, kettlebell videos and a manageable posting plan",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep testing within strength and kettlebell training.",
          paragraphs: [
            "We reviewed the fitness accounts whose followers were responding to outreach, removed weaker performers and tested more kettlebell audiences. The September review included @kettlebellgains and @calihenrion, alongside other movement and strength accounts.",
          ],
        },
        {
          label: "What to film",
          heading: "Turn one kettlebell session into a useful lesson.",
          paragraphs: [
            "Tulsi suggested step-by-step kettlebell flows, speed and power combinations, and short tutorials with text explaining the movement. These were ideas Sav could build around the training she already shared.",
          ],
        },
        {
          label: "A workable rhythm",
          heading: "Give each post a different job.",
          paragraphs: [
            "Tulsi proposed two or three quality posts a week, with a simple mix: a tutorial, a power or challenge video, and a collaboration or community workout. The recommendation gave Sav options without asking her to post all day.",
          ],
          note: {
            summary: "One example week",
            body: "Teach a kettlebell flow. Demonstrate a power combination. Share a workout with another person.",
          },
        },
      ],
    },
    progress: {
      heading: "4,407 followers gained through daily outreach.",
      paragraphs: [
        "Sav gained 4,407 followers through daily outreach between March 2025 and February 2026.",
        "The periods ending 25 September, 25 October and 25 November 2025 recorded 324, 526 and 560 followers, respectively.",
      ],
      months: [
        {
          dates: "25 Mar 2025 – 24 Apr 2025",
          followers: 237,
        },
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 316,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 280,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 336,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 296,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 324,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 526,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 560,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 556,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 540,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 436,
        },
      ],
    },
    quote:
      "I wanted to stay consistent without posting all day. Tulsi showed me which fitness audiences were responding and suggested kettlebell videos I could make without changing my style.",
    quoteBy: "Sav Hill · Strength and mobility coach · September 2025",
    close: {
      heading: "Let more people discover the way you coach.",
      body: "Work with a Brand Manager on outreach, training content and a posting plan that fits your week.",
    },
  },
  {
    slug: "bethany-chrobak",
    niche: "Fitness",
    nicheSlug: "fitness",
    specialty: "Nutrition & fitness coaching for moms",
    title: "Making motherhood part of Bethany’s fitness story.",
    intro:
      "Bethany wanted her coaching to reach moms balancing their health with family life. Shama helped turn that focus into audience tests, specific post ideas and practical feedback on her Reels.",
    name: "Bethany Chrobak",
    handle: "coach.b_chro",
    photo: "/audiences/journey-v2/results/coaches/coach.b_chro-avatar.png",
    gained: 4716,
    period: "25 Apr 2025 – 25 Sep 2026",
    start: {
      heading: "A nurse and coach speaking to busy moms.",
      paragraphs: [
        "Bethany is a registered nurse and nutrition and fitness coach. She wanted to help women build strength, improve their nutrition and feel more confident while juggling work and family.",
        "As a new mom herself, she wanted her page to speak directly to other mothers. That meant thinking beyond exercise demonstrations: what would make a mom recognise her own day in Bethany’s content?",
      ],
      audience: ["Busy moms", "Women in healthcare", "Nutrition & strength"],
    },
    approach: {
      heading: "Build the page around the women Bethany wanted to coach.",
      paragraphs: [
        "Alongside daily outreach, Shama worked with Bethany on who to approach and what a mother should see when she opened the page.",
      ],
      manager: "Shama",
      managerFocus: "Parenting audiences, content ideas and clearer Reels",
      steps: [
        {
          label: "Getting discovered",
          heading: "Test parenting audiences as well as fitness audiences.",
          paragraphs: [
            "Bethany asked us to concentrate on moms who could use her coaching. We tested audiences around parenting accounts, including Taking Cara Babies and Dr. Becky at Good Inside, then reviewed how many followers each test brought in.",
          ],
        },
        {
          label: "What to post",
          heading: "Start with the realities of a mom’s day.",
          paragraphs: [
            "Shama suggested three areas to draw from: honest motherhood stories, nutrition and exercise tips for moms, and posts that helped mothers feel understood. Bethany said the examples were helpful and gave her ideas to work with.",
          ],
          note: {
            summary: "A more specific starting point",
            body: "Talk to the tired mom watching the Reel. Use the words she would use for her problem, then offer one useful tip.",
          },
        },
        {
          label: "The Reels",
          heading: "Let the viewer see the movement.",
          paragraphs: [
            "In a review of Bethany’s videos, Shama suggested quicker transitions and smaller text placed above or below the action. She also recommended keeping on-screen wording to a few key phrases so Bethany’s voice could lead.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,716 followers gained through daily outreach.",
      paragraphs: [
        "Bethany gained 4,716 followers through daily outreach between April 2025 and September 2026.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 69,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 73,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 122,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 115,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 145,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 391,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 599,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 403,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 348,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 205,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 121,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 60,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 477,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 383,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 566,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 405,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 234,
        },
      ],
      update: {
        heading: "A milestone Bethany was excited to reach.",
        paragraphs: [
          "In February 2026, Bethany shared that her account had reached 5,000 total followers. She was also testing Reels and tracking their performance as she worked towards her next goal.",
        ],
      },
    },
    quote:
      "The examples gave me something concrete to work from: motherhood stories, nutrition tips and ways to make my Reels easier to follow. That was really helpful for planning my content.",
    quoteBy: "Bethany Chrobak · Nutrition and fitness coach · November 2025",
    close: {
      heading: "Help people recognise themselves in your coaching.",
      body: "Work with a Brand Manager on finding your audience and turning your expertise into posts people can relate to.",
    },
  },
  {
    slug: "keisha-miles",
    niche: "Food & drink",
    nicheSlug: "food-and-drink",
    specialty: "Jamaican cooking education",
    title: "Helping home cooks discover Jamaican cooking.",
    intro:
      "Keisha teaches Jamaican flavours and cooking techniques. Srishti helped her think through who to reach, how to present her recipe videos and what visitors should understand about her page.",
    name: "Keisha Miles",
    handle: "iambergababy",
    photo: "/audiences/journey-v2/results/creators/iambergababy-avatar.png",
    gained: 4946,
    period: "25 Jun 2025 – 25 Sep 2026",
    start: {
      heading: "Bring a taste of Jamaica into more home kitchens.",
      paragraphs: [
        "Keisha is a Jamaican cooking coach and the founder of DineOutIn in Austin, Texas. She wants to help kitchen beginners become confident home cooks and introduce experienced cooks to Jamaican recipes.",
        "Her Instagram was part of that teaching mission. She wanted to build a community around her food and bring more attention to her business, with the United States becoming a priority for outreach.",
      ],
      audience: ["Home cooks", "Jamaican recipes", "US food enthusiasts"],
    },
    approach: {
      heading: "Make the food inviting and the instruction easy to follow.",
      paragraphs: [
        "We handled daily outreach. Srishti reviewed Keisha’s cooking videos and profile, with recommendations built around the recipes and explanations she was already sharing.",
      ],
      manager: "Srishti",
      managerFocus: "Home-cook audiences, recipe videos and a clearer profile",
      steps: [
        {
          label: "Getting discovered",
          heading: "Use Keisha’s home-cook brief to guide outreach.",
          paragraphs: [
            "Keisha described an audience of home cooks, food enthusiasts and people interested in Jamaican cuisine. She shared cooking publications and recipe creators as examples. When she asked us to prioritise the United States, we updated the targeting brief around that preference.",
          ],
        },
        {
          label: "The recipe videos",
          heading: "Let people hear the explanation and see the cook.",
          paragraphs: [
            "Srishti suggested lowering background music where it competed with Keisha’s voice, moving subtitles away from her face and tightening slower sections with quicker cuts. She also recommended covers that showed the finished dish and named the recipe.",
          ],
        },
        {
          label: "The profile",
          heading: "Tell visitors what they can learn from Keisha.",
          paragraphs: [
            "Srishti suggested using the bio to explain the benefit of following, rather than repeating Keisha’s name and title. She recommended an invitation to follow for recipes and updates, with highlights for quick recipes and favourites.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,946 followers gained through daily outreach.",
      paragraphs: [
        "Keisha gained 4,946 followers through daily outreach between June 2025 and September 2026.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 195,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 182,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 118,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 403,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 401,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 425,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 393,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 363,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 344,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 497,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 320,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 415,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 335,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 332,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 223,
        },
      ],
    },
    quote:
      "The feedback was specific to my cooking videos: lower the music, move the subtitles and make the dish clear on the cover. I knew what to work on next.",
    quoteBy: "Keisha Miles · Jamaican cooking coach · September 2024",
    close: {
      heading: "Help more people discover what you teach.",
      body: "Work with a Brand Manager on outreach and practical ways to present your lessons, recipes or tutorials.",
    },
  },
  {
    slug: "munch-n-sip",
    niche: "Food & drink",
    nicheSlug: "food-and-drink",
    specialty: "Café · Melbourne",
    title: "Helping coffee lovers discover Munch N Sip.",
    intro:
      "Param inherited an Instagram account when he bought the café. Shama paired daily outreach with specific advice on showing the food, coffee and atmosphere to people nearby.",
    name: "Param",
    business: "Munch N Sip Café",
    handle: "munchnsip_cafe",
    gained: 1946,
    period: "25 Apr 2025 – 25 Dec 2025",
    start: {
      heading: "A new owner, an inherited Instagram account.",
      paragraphs: [
        "When Param bought Munch N Sip, the Instagram account came with the business. In June 2024, he described an account with little engagement and no previous growth strategy of his own.",
        "He wanted adults in Williamstown, Newport and Altona who were interested in coffee and local brunch spots to discover the café.",
      ],
      audience: [
        "Melbourne coffee lovers",
        "Williamstown, Newport & Altona",
        "Local brunch spots",
      ],
    },
    approach: {
      heading: "Find local coffee lovers. Show them the café.",
      paragraphs: [
        "We handled daily outreach while Shama reviewed how Munch N Sip presented its food and space. The brief connected both parts of the work: reach people nearby, then give them a reason to take a closer look.",
      ],
      manager: "Shama",
      managerFocus: "Melbourne café audiences, food photos and video ideas",
      steps: [
        {
          label: "Getting discovered",
          heading: "Reach people who already follow Melbourne cafés.",
          paragraphs: [
            "We introduced Munch N Sip through daily following activity. A September 2024 review found new followers coming from audiences of cafés such as @bobsyourunclecafe, @peoplescoffeecbd and @bezirkcafe.",
          ],
          note: {
            summary: "The audiences we explored",
            body: "The review also listed @pier71altona, @birdcagecafe and Melbourne food accounts among the audiences being explored. Param’s brief kept the focus on people interested in coffee and brunch around the café’s suburbs.",
          },
        },
        {
          label: "Food photos and videos",
          heading: "Make the food look worth stopping for.",
          paragraphs: [
            "Shama compared existing posts to show where framing and composition could improve. For the café’s Reels, she recommended better lighting and a mix of camera angles, so the food could be seen from more than one view.",
          ],
        },
        {
          label: "What to post",
          heading: "Let people picture a visit.",
          paragraphs: [
            "Shama suggested short videos that combined shots of the café’s atmosphere with items from the menu. When longer gaps appeared between posts, she recommended a manageable starting rhythm of two posts a week.",
          ],
          note: {
            summary: "Two ideas from the review",
            body: "Stitch together several shots of the café to show the space. Make a short food-transition video featuring menu items. Both ideas gave Param something concrete to film.",
          },
        },
      ],
    },
    progress: {
      heading: "1,946 followers gained through daily outreach.",
      paragraphs: [
        "Munch N Sip gained 1,946 followers from 25 April to 25 December 2025. The strongest period added 399 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 133,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 167,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 206,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 221,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 399,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 274,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 215,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 331,
        },
      ],
      update: {
        heading: "Param put the profile review into practice.",
        paragraphs: [
          "In August 2024, after receiving a profile audit, Param confirmed that he had made the recommended changes. He had also welcomed the earlier food and video suggestions and planned to use them in his next upload.",
        ],
      },
    },
    quote:
      "Shama gave us clear pointers on our food photos and café videos. I made the profile changes after the audit—it gave me something useful to work with.",
    quoteBy: "Param · Munch N Sip Café · August 2024",
    close: {
      heading: "Help nearby people discover your café.",
      body: "Work with a Brand Manager on reaching local audiences and showing what makes a visit worthwhile.",
    },
  },
  {
    slug: "lartiste-coiffeur",
    niche: "Hair & beauty",
    nicheSlug: "hair-and-beauty",
    specialty: "Hair salon · Brisbane",
    title: "More people discovering L’Artiste’s approach to hair colour.",
    intro:
      "Karl wanted his salon’s Instagram to show how personal its colour work is. Aditi helped shape the audience brief, simplify the profile and turn the consultation process into content ideas.",
    name: "Karl",
    business: "L’Artiste Coiffeur",
    handle: "lartistecoiffeurhairdressers",
    gained: 1302,
    period: "25 Apr 2025 – 25 Oct 2025",
    start: {
      heading: "Colour made for the person in the chair.",
      paragraphs: [
        "At L’Artiste Coiffeur in Brisbane, Karl described a salon that creates individual colours around each client’s features and skin tone. He wanted people interested in balayage, grey-hair transitions and new ideas for brunette hair to see the work.",
        "He had already tried following accounts, commenting and boosted posts. He wanted Instagram to bring his work to the attention of people who might book an appointment.",
      ],
      audience: ["Balayage", "Grey-hair transitions", "Brunette colour ideas"],
    },
    approach: {
      heading: "Show the thought behind each transformation.",
      paragraphs: [
        "Daily outreach brought attention to the salon’s work. Aditi helped Karl decide whom to reach and how to explain the care behind each colour when people arrived on the profile.",
      ],
      manager: "Aditi",
      managerFocus:
        "Hair and beauty audiences, the profile and client transformation videos",
      steps: [
        {
          label: "Getting discovered",
          heading: "Find people interested in hair colour.",
          paragraphs: [
            "Daily outreach was guided by Karl’s brief: people interested in balayage, grey-hair transitions and colour ideas for brunettes. Aditi reviewed hair and beauty account examples with him, and Karl added more hairdressing accounts to the strategy.",
          ],
        },
        {
          label: "The profile",
          heading: "Give visitors a simpler introduction to the salon.",
          paragraphs: [
            "Aditi suggested shortening the profile name, explaining the salon’s service clearly in the bio and adding a next step for visitors. She also recommended reducing the Highlights to four categories with matching covers.",
          ],
        },
        {
          label: "What to post",
          heading: "Show the consultation behind the colour.",
          paragraphs: [
            "Aditi suggested filming clients describing the look they wanted, then showing the finished colour. “Inspiration versus result” videos could make Karl’s individual approach visible. She also recommended bringing subtitles back to Reels so viewers could follow without sound.",
          ],
          note: {
            summary: "Another way to show the work",
            body: "A day-in-the-life Reel could show the preparation, conversations and everyday work of a hairdresser—not only the finished hairstyle.",
          },
        },
      ],
    },
    progress: {
      heading: "1,302 followers gained through daily outreach.",
      paragraphs: [
        "L’Artiste gained 1,302 followers from 25 April to 25 October 2025. The final period added 339 followers, compared with 207 in the previous one.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 207,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 238,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 174,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 137,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 207,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 339,
        },
      ],
    },
    quote:
      "Aditi’s ideas fitted the way we work—showing the consultation, the colour and the finished result. They gave me more ways to share what makes our salon different.",
    quoteBy: "Karl · L’Artiste Coiffeur · September 2024",
    close: {
      heading: "Let more people see the care behind your work.",
      body: "Get help reaching hair and beauty audiences and showing what clients can expect from your salon.",
    },
  },
  {
    slug: "shannon-sizmur",
    niche: "Skincare",
    nicheSlug: "skincare",
    specialty: "Skincare consultations · USA",
    title: "Helping Shannon’s skincare expertise reach a wider audience.",
    intro:
      "Shannon moved from in-person treatments to virtual consultations. Tulsi helped her rethink whom to reach, explain her experience and make it easier for new visitors to get in touch.",
    name: "Shannon Sizmur",
    handle: "medical_aesthetician_shannon",
    photo: "/stock/medical_aesthetician_shannon.jpg",
    gained: 4997,
    period: "26 Sep 2025 – 25 Sep 2026",
    start: {
      heading: "An experienced aesthetician with a changing business.",
      paragraphs: [
        "Shannon had 31 years of experience as a medical aesthetician. When she joined in October 2025, she wanted more followers who were interested in skincare, along with people who might become patients.",
        "In January 2026, she stepped out of the treatment room to offer virtual ZO skincare consultations across the United States. Her Instagram brief needed to reflect that wider audience.",
      ],
      audience: [
        "Skincare audiences",
        "Virtual consultations",
        "United States",
      ],
    },
    approach: {
      heading: "Keep the outreach and profile close to her work.",
      paragraphs: [
        "We handled the daily outreach while Tulsi worked with Shannon on the profile. When Shannon changed how she served clients, they revisited the audience brief together.",
      ],
      manager: "Tulsi",
      managerFocus:
        "Skincare audiences, a clearer bio and the move to virtual consultations",
      steps: [
        {
          label: "Getting discovered",
          heading: "Broaden the brief for virtual consultations.",
          paragraphs: [
            "In January 2026, Tulsi agreed to review the targeting for Shannon’s US-wide consultations. They discussed audiences following skincare educators, skin clinics and ZO providers. Shannon then shared examples of accounts to guide that work.",
          ],
          note: {
            summary: "How the brief became more specific",
            body: "Shannon named her skincare specialisms and suggested accounts including @the_melasma_clinic for the review. The discussion focused on people interested in the skincare advice she could offer through consultations.",
          },
        },
        {
          label: "The profile",
          heading: "Keep the important bio details in view.",
          paragraphs: [
            "Tulsi helped Shannon explain her experience and add a clear invitation to get in touch. When the bio hid information behind “See more,” she suggested moving the phone number to Contact and “Medical Aesthetician” to the name field, leaving more room for the message.",
          ],
        },
        {
          label: "Highlights",
          heading: "Give visitors somewhere to explore her work.",
          paragraphs: [
            "Tulsi suggested Highlights for treatments, products, results and an introduction to Shannon. In November 2025, Shannon confirmed that she had started a couple of Highlights. The categories gave her a way to organise information beyond the bio.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,997 followers gained through daily outreach.",
      paragraphs: [
        "Shannon gained 4,997 followers from 26 September 2025 to 25 September 2026.",
      ],
      months: [
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 145,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 445,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 531,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 443,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 414,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 473,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 543,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 452,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 531,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 511,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 435,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 74,
        },
      ],
      update: {
        heading: "Profile changes she worked through with Tulsi.",
        paragraphs: [
          "Shannon started her Highlights in November 2025 and confirmed bio edits in December. Tulsi reviewed those changes and offered further ways to keep the contact invitation visible. In March 2026, Shannon said she was loving the work on her page and followers.",
        ],
      },
    },
    quote:
      "Tulsi helped me work through the bio and get my Highlights started. I’m loving what’s happening with the page and the new followers.",
    quoteBy: "Shannon Sizmur · Medical aesthetician · March 2026",
    close: {
      heading: "Help more people discover your expertise.",
      body: "Work with a Brand Manager on reaching your audience and making your services easier to understand.",
    },
  },
  {
    slug: "bardadim-studios",
    niche: "Tattoo",
    nicheSlug: "tattoo",
    specialty: "Japanese tattooing",
    title: "5,077 followers for Bardadim’s Japanese tattoo work.",
    intro:
      "Yana wanted more people to discover the studio’s tattooing. Aditi helped define the audience and suggested ways to turn the tattoo process, finished pieces and everyday studio material into posts.",
    name: "Yana",
    business: "Bardadim Studios",
    handle: "bardadim.studios",
    photo:
      "/audiences/journey-v2/results/creatives/bardadim.studios-avatar.png",
    gained: 5077,
    period: "25 Apr 2025 – 25 Jan 2026",
    start: {
      heading: "More people discovering the work behind each tattoo.",
      paragraphs: [
        "Bardadim Studios specialises in Japanese tattoos. Yana’s brief was to promote that work to an English-speaking audience, mostly in the US, with men aged 25–55 at its centre.",
        "There was plenty to share. But Yana often kept material in Stories because she felt it was not good enough for a permanent post.",
      ],
      audience: [
        "Japanese tattoo enthusiasts",
        "English-speaking audiences",
        "Men aged 25–55",
      ],
    },
    approach: {
      heading: "Reach tattoo audiences. Show more of the process.",
      paragraphs: [
        "We handled daily outreach with the studio’s audience brief in mind. Aditi suggested simple ways to show the tattooing, explain the work and make use of material Yana already had.",
      ],
      manager: "Aditi",
      managerFocus: "Tattoo audiences and more ways to show the studio’s work",
      steps: [
        {
          label: "Getting discovered",
          heading: "Reach US audiences for Japanese tattooing.",
          paragraphs: [
            "Yana described an audience of professionals, primarily men aged 25–55, mostly in the US. We used that brief to guide the outreach, with the aim of bringing attention to the studio’s tattoo work.",
          ],
        },
        {
          label: "Showing the work",
          heading: "Let people watch a tattoo take shape.",
          paragraphs: [
            "Aditi suggested time-lapse videos of the tattoo process, short transitions revealing finished pieces, and Reels showing several tattoos together. These gave Yana different ways to present the work beyond a single finished photograph.",
          ],
        },
        {
          label: "What to post",
          heading: "Bring some of the Stories into the feed.",
          paragraphs: [
            "When Yana explained that she had plenty of material but hesitated to post it, Aditi encouraged her to use some of those everyday moments in the feed. She also proposed posts explaining tattoos and a manageable starting rhythm of two posts a week.",
          ],
        },
      ],
    },
    progress: {
      heading: "5,077 followers gained through daily outreach.",
      paragraphs: [
        "Bardadim gained 5,077 followers through daily outreach from April 2025 to January 2026. The strongest period, ending 25 September 2025, added 716 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 399,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 418,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 570,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 526,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 716,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 623,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 698,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 609,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 518,
        },
      ],
    },
    quote:
      "We had plenty of material, but I kept putting it in Stories. Aditi gave me ideas for showing the tattoo process and encouraged me to share more of it.",
    quoteBy: "Yana · Bardadim Studios · August 2024",
    close: {
      heading: "Help more people discover your tattoo work.",
      body: "Get support with reaching your audience and showing the skill behind each piece.",
    },
  },
  {
    slug: "your-urban-canvas",
    niche: "Art",
    nicheSlug: "art",
    specialty: "Cityscape art and personalised prints",
    title: "2,516 followers for Sarah’s cityscape art.",
    intro:
      "Sarah was building an audience for prints of the cities people love. Srishti refined the outreach and helped her plan posts around the artwork, with ideas she could use without speaking to camera.",
    name: "Sarah Noonan",
    business: "Your Urban Canvas",
    handle: "yoururbancanvas.art",
    gained: 2516,
    period: "25 Apr 2025 – 25 Nov 2025",
    start: {
      heading: "City prints for travellers, expats and their homes.",
      paragraphs: [
        "Sarah creates cityscape art and personalised prints. As she prepared her online store, she wanted to reach people who love travel and art, including expats buying for themselves or choosing a gift.",
        "She was building the website alongside Instagram. Making videos of her art took time, and she wanted variety without having to talk to the camera in every post.",
      ],
      audience: [
        "Travellers and city lovers",
        "Expats buying prints and gifts",
        "Home décor audiences",
      ],
    },
    approach: {
      heading: "Find the audience. Make the art easier to share.",
      paragraphs: [
        "We handled daily outreach and refined the audience brief as Sarah’s print business developed. Srishti worked through her profile, the store launch and ways to show the art without making every post a large production.",
      ],
      manager: "Srishti",
      managerFocus:
        "Art-print audiences, the profile and practical content ideas",
      steps: [
        {
          label: "Getting discovered",
          heading: "Add home décor and city audiences to the brief.",
          paragraphs: [
            "Sarah wanted to reach people who might buy her prints as well as other artists. In May 2025, we began researching audiences around interior designers, home décor pages, travel bloggers and city accounts, with the UK, Ireland, Australia, Europe and the UAE in view.",
          ],
        },
        {
          label: "The profile",
          heading: "Give visitors a next step before the store opened.",
          paragraphs: [
            "Sarah already had a coming-soon page where visitors could leave their email address. Srishti recommended keeping the link and inviting people to sign up for early access. She also suggested a bio that named the city artwork and introduced Sarah as its artist.",
          ],
        },
        {
          label: "What to post",
          heading: "Make the drawing the first thing people see.",
          paragraphs: [
            "For process Reels, Srishti recommended keeping the drawing tablet in the centre of the frame. For carousels, she suggested opening with a close-up of the actual artwork instead of an AI-generated image, then showing how the piece developed.",
          ],
          note: {
            summary: "More ideas that fitted Sarah’s time and style",
            body: "Mix short process clips with finished-piece carousels, drawing tips and glimpses of the creative space. The plan allowed Sarah to introduce herself gradually, without needing to speak to camera.",
          },
        },
      ],
    },
    progress: {
      heading: "2,516 followers gained through daily outreach.",
      paragraphs: [
        "Sarah gained 2,516 followers through daily outreach between April and November 2025. The strongest period, ending 25 July 2025, added 556 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 405,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 315,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 556,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 459,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 435,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 346,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 0,
        },
      ],
      update: {
        heading: "A profile update before the store launch.",
        paragraphs: [
          "In January 2025, Sarah confirmed that she had updated her profile following Srishti’s suggestions, while the online store was still being built.",
        ],
      },
    },
    quote:
      "Creating videos around my art takes time. Srishti gave me ways to mix process clips, finished pieces and drawing tips, without pushing me straight into talking to the camera.",
    quoteBy: "Sarah Noonan · Your Urban Canvas · May 2025",
    close: {
      heading: "Help more people find art they want to live with.",
      body: "Work with a Brand Manager on reaching your audience and showing what makes your artwork yours.",
    },
  },
  {
    slug: "sheru-arora",
    niche: "Film & acting",
    nicheSlug: "film-and-acting",
    specialty: "Filmmaking and writing",
    title: "6,768 followers for Sheru’s filmmaking.",
    intro:
      "Sheru wanted filmmakers, writers and film enthusiasts to discover his work. Rahul helped shape that audience brief and suggested a clearer rhythm for sharing tutorials, projects and life behind the camera.",
    name: "Sheru Arora",
    handle: "kokasingh",
    gained: 6768,
    period: "25 Jun 2025 – 25 May 2026",
    start: {
      heading: "An audience for the films—and how they are made.",
      paragraphs: [
        "Sheru writes and directs films, and shares filmmaking tips on Instagram. He wanted to reach fellow filmmakers, avid moviegoers, writers and people learning the craft.",
        "He was already posting regularly and showing his projects. The next step was to give those posts a clearer pattern and show more of the work that goes into a film.",
      ],
      audience: [
        "Filmmakers",
        "Film enthusiasts",
        "Writers and aspiring filmmakers",
      ],
    },
    approach: {
      heading: "Introduce the filmmaker and the craft behind the films.",
      paragraphs: [
        "We handled daily outreach around Sheru’s film audience. Rahul reviewed the tutorials and project posts already on the account, then gave him a practical structure for what to share next.",
      ],
      manager: "Rahul",
      managerFocus: "Film audiences, project posts and filmmaking tutorials",
      steps: [
        {
          label: "Getting discovered",
          heading: "Build the brief around people who make and watch films.",
          paragraphs: [
            "Sheru named filmmakers, film enthusiasts, avid moviegoers and writers as the people he wanted to reach. We used that description to guide the audience choices for daily outreach.",
          ],
        },
        {
          label: "A posting rhythm",
          heading:
            "Balance tutorials with projects and behind-the-scenes posts.",
          paragraphs: [
            "Rahul suggested a repeating sequence: two filmmaking tips, then one project showcase and one behind-the-scenes post. He also recommended using more consistent colours and fonts on Reel covers, so the different kinds of posts felt connected.",
          ],
        },
        {
          label: "What to teach",
          heading: "Turn the filmmaking process into short lessons.",
          paragraphs: [
            "Set design, costumes and special effects could become glimpses behind the camera. Rahul also proposed a “Filmmaking Concepts You Need to Know 101” series, with short lessons on lighting, sound editing and scriptwriting.",
          ],
        },
      ],
    },
    progress: {
      heading: "6,768 followers gained through daily outreach.",
      paragraphs: [
        "Sheru gained 6,768 followers through daily outreach from June 2025 to May 2026. In the period ending 25 January 2026, the account gained 711 followers.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 483,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 445,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 628,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 661,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 702,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 685,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 711,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 631,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 543,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 675,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 604,
        },
      ],
      update: {
        heading: "A profile that named the work.",
        paragraphs: [
          "In June 2024, after the profile guidance, Sheru confirmed that he had changed his picture and bio, added his occupation to the name field and used the bio to introduce his new project.",
        ],
      },
    },
    quote:
      "I wanted filmmakers, writers and film fans to find my work. Rahul gave me a structure for mixing filmmaking tips, project posts and the work that happens behind the camera.",
    quoteBy: "Sheru Arora · Writer and director · June 2024",
    close: {
      heading: "Help more people discover the films you make.",
      body: "Get support with reaching film audiences and sharing your projects, ideas and process.",
    },
  },
  {
    slug: "holden-williams",
    niche: "Authors",
    nicheSlug: "authors",
    specialty: "Author · Magical realism",
    title: "6,956 followers for Holden’s stories.",
    intro:
      "As Holden prepared to publish his novel GIFTS, Sushmita helped refine the reader audience and turn his writing process into Instagram posts that fitted his quiet, visual style.",
    name: "Holden Williams",
    handle: "authorholdenwilliams",
    gained: 6956,
    period: "25 Apr 2025 – 25 Aug 2026",
    start: {
      heading: "Introduce the author behind the novel.",
      paragraphs: [
        "Holden writes magical realism, blending ordinary life with the fantastical. As he prepared GIFTS for publication, he wanted more readers to discover his stories and follow the journey towards the book.",
        "He had built an account around images, poetry and story excerpts. He wanted to share more of the writing process, but felt uncomfortable speaking to camera and wanted to take it one step at a time.",
      ],
      audience: [
        "Magical realism readers",
        "Literary fiction readers",
        "People drawn to family, loss and identity stories",
      ],
    },
    approach: {
      heading: "Reach readers. Bring them into the writing process.",
      paragraphs: [
        "We tested book audiences for daily outreach and refined the brief with Holden. Sushmita worked alongside him on the posts themselves, from the first slide of a story to a new “Journey to the Book” series.",
      ],
      manager: "Sushmita",
      managerFocus: "Reader audiences and a content plan for the book launch",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep refining the reader brief.",
          paragraphs: [
            "We reviewed audiences following book accounts such as @abooktocallhome and @realmsofmagicreads. When Holden wanted fewer fellow authors and more readers, we refined the outreach to focus more closely on readers and shared a sample for him to review.",
          ],
          note: {
            summary: "How the audience work continued",
            body: "Holden later suggested audiences around journaling, emotional wellbeing and the themes of his novel. We tested several of those accounts, reviewed the response with him, and began looking for further alternatives in January 2026.",
          },
        },
        {
          label: "A plan he could use",
          heading: "Tell the book’s story without speaking to camera.",
          paragraphs: [
            "Sushmita adapted the “Journey to the Book” idea to voiceovers, manuscript pages, desk footage and short text-led Reels. Holden could share why he wrote the book and what happened during editing while keeping the visual style he had already built.",
          ],
        },
        {
          label: "The details",
          heading: "Give people time to read the words.",
          paragraphs: [
            "Feedback on Holden’s own posts focused on the first slide and the pace of a Reel. Sushmita suggested a short line that introduced the story, and keeping text on screen long enough to read. The aim was to help viewers follow the writing as well as enjoy the image.",
          ],
        },
      ],
    },
    progress: {
      heading: "6,956 followers gained through daily outreach.",
      paragraphs: [
        "Holden gained 6,956 followers through daily outreach from April 2025 to August 2026. The period ending 25 July 2026 added 743 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 373,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 497,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 457,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 478,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 647,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 312,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 529,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 442,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 194,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 478,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 443,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 504,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 452,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 302,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 743,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 105,
        },
      ],
      update: {
        heading: "The first “Journey to the Book” Reel went live.",
        paragraphs: [
          "In May 2025, Holden confirmed that he had posted the first Reel: a black-and-white animated image with a quiet voiceover. He said the approach felt true to how GIFTS came together and thanked Sushmita for the guidance.",
        ],
      },
    },
    quote:
      "I wasn’t comfortable speaking to camera. Sushmita helped me find another way: a quiet voiceover and a black-and-white image. I posted my first “Journey to the Book” Reel.",
    quoteBy: "Holden Williams · Author · May 2025",
    close: {
      heading: "Help more readers find your writing.",
      body: "Work with a Brand Manager on reaching readers and sharing the stories behind your books.",
    },
  },
  {
    slug: "yajamahe-yoga",
    niche: "Yoga",
    nicheSlug: "yoga",
    specialty: "Classical yoga school",
    title: "Helping more people discover classical yoga.",
    intro:
      "Yvonne wanted her school to be known for the way it teaches yoga. Aditi worked with her on local yoga audiences, practical lesson ideas and a profile that explained what made the school different.",
    name: "Yvonne",
    business: "Yajamahe Yoga",
    handle: "yajamaheyoga",
    gained: 2260,
    period: "25 Jun 2025 – 25 Dec 2025",
    start: {
      heading: "Let people see what they can learn on the mat.",
      paragraphs: [
        "Yajamahe Yoga teaches classical yoga and offers yoga teacher training. Yvonne wanted visitors to understand that students learn and hold the poses. The school also sells Crystal Tones singing bowls.",
        "She wanted more people nearby to discover the school, while keeping the Instagram page useful and manageable. She brought local yoga teachers and studios into the conversation as examples of the audiences she wanted to reach.",
      ],
      audience: [
        "Local yoga students",
        "Yoga teacher training",
        "Singing bowls",
      ],
    },
    approach: {
      heading: "Find yoga audiences. Show them what the school teaches.",
      paragraphs: [
        "Alongside daily outreach, Aditi helped Yvonne choose what to show on the page: the teaching, the studio, the singing bowls and the events students could attend.",
      ],
      manager: "Aditi",
      managerFocus:
        "Local yoga audiences, teaching videos and a clearer profile",
      steps: [
        {
          label: "Getting discovered",
          heading: "Build on Yvonne’s knowledge of local yoga.",
          paragraphs: [
            "Yvonne shared yoga teachers and fitness studios whose followers she wanted to reach. Aditi agreed to include those suggestions in the outreach plan and test the audiences following @yogasix_elwood and @energyfitness_.",
          ],
          note: {
            summary: "Earlier additions to the brief",
            body: "In April 2025, Yvonne suggested @xvishankax and @yogawithgene. In June, she added Anna Vidya. Aditi confirmed that these suggestions would be included.",
          },
        },
        {
          label: "The profile",
          heading: "Keep the words that made the school different.",
          paragraphs: [
            "Yvonne wanted to keep “Authentic Classical Yoga School” in her bio. Aditi supported that choice and suggested making the singing-bowl offering clear too. She also explained how to combine past and upcoming events into one Events highlight.",
          ],
        },
        {
          label: "What to film",
          heading: "Give viewers a small lesson before they visit.",
          paragraphs: [
            "Aditi suggested short pose demonstrations, beginner modifications and alignment tips. She also proposed videos in which instructors explained what they had taught that week, alongside glimpses of the studio and its instruments.",
          ],
        },
      ],
    },
    progress: {
      heading: "2,260 followers gained through daily outreach.",
      paragraphs: [
        "Yajamahe Yoga gained 2,260 followers through daily outreach between June and December 2025.",
        "The final period, ending 25 December 2025, added 478 followers—the strongest of the six recorded periods.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 227,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 286,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 422,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 426,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 421,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 478,
        },
      ],
    },
    quote:
      "You helped us reach more followers and gave me practical help with the page. I could keep what made our school different, with advice on the bio, events and teaching videos.",
    quoteBy: "Yvonne · Yajamahe Yoga · December 2025",
    close: {
      heading: "Help more people discover what you teach.",
      body: "Work with a Brand Manager on finding your audience and showing what students can learn from you.",
    },
  },
  {
    slug: "luke-williford",
    niche: "Business",
    nicheSlug: "business",
    specialty: "Laundromat & business coaching",
    title: "Making Luke’s coaching easier to discover.",
    intro:
      "Luke’s page brought together faith, family, fitness and laundromats. Rahul helped choose who to reach and suggested ways to make the coaching offer easier to find within that personal story.",
    name: "Luke Williford",
    handle: "lukefwilliford",
    gained: 4286,
    period: "26 Sep 2025 – 25 Sep 2026",
    start: {
      heading: "A personal brand with a specific business audience.",
      paragraphs: [
        "Luke is an entrepreneur and coach whose Instagram spans his business, family, faith and fitness. He wanted to reach men building businesses while raising families.",
        "When Rahul asked him to get more specific, Luke named men who owned laundromats or real estate, and business owners interested in doing so. That gave the outreach a more useful starting point than a broad interest in entrepreneurship.",
      ],
      audience: [
        "Laundromat owners",
        "Real estate investors",
        "Business owners with families",
      ],
    },
    approach: {
      heading: "Connect the audience brief with the coaching offer.",
      paragraphs: [
        "We handled daily outreach. Rahul worked through Luke’s audience brief, then reviewed how a new visitor would recognise him, understand his coaching and find the parts of the page that mattered to them.",
      ],
      manager: "Rahul",
      managerFocus:
        "Business-owner audiences, coaching bio and focused highlights",
      steps: [
        {
          label: "Getting discovered",
          heading: "Define the business owner Luke wanted to reach.",
          paragraphs: [
            "Rahul asked Luke to narrow “men with businesses and families” into a more specific audience. Luke identified laundromat owners, real estate owners and men considering those businesses. We used that brief to guide the outreach.",
          ],
        },
        {
          label: "The bio",
          heading: "Put the coaching offer into words.",
          paragraphs: [
            "Rahul suggested a name line that included laundromat coaching and a bio that connected Luke’s values with the help he offered. The proposed wording pointed visitors towards life and laundromat coaching, with an invitation to join.",
          ],
        },
        {
          label: "The highlights",
          heading: "Turn a long collection into a short introduction.",
          paragraphs: [
            "Luke’s profile review counted around 98 highlights. Rahul recommended reducing them to five to seven clear sections so a visitor could find Luke’s story, coaching and laundromat work without opening dozens of collections.",
          ],
          note: {
            summary: "The suggested highlight sections",
            body: "About Me · Coaching · Laundromats · Faith & Family · Fitness · Testimonials. Each section had a distinct job, from introducing Luke to explaining his coaching.",
          },
        },
      ],
    },
    progress: {
      heading: "4,286 followers gained through daily outreach.",
      paragraphs: [
        "Luke gained 4,286 followers through daily outreach between September 2025 and September 2026.",
        "The strongest period, ending 25 May 2026, added 638 followers.",
      ],
      months: [
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 367,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 330,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 480,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 70,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 409,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 214,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 523,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 638,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 388,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 416,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 330,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 121,
        },
      ],
    },
    quote:
      "My page covers faith, family, fitness and laundromats. Rahul gave me specific ways to bring those together around my coaching, from the bio to the highlights visitors would see first.",
    quoteBy: "Luke Williford · Coach and entrepreneur · December 2025",
    close: {
      heading: "Give more people a clear introduction to your coaching.",
      body: "Work with a Brand Manager on reaching your audience and helping visitors understand what you offer.",
    },
  },
  {
    slug: "la-b-davila",
    niche: "Art",
    nicheSlug: "art",
    specialty: "Art & English educator · Spain and USA",
    title: "Building an audience around teaching, art and everyday life.",
    intro:
      "Berta wanted to connect with educators, parents and people who make art. Sushmita refined the outreach across Spain and the US, then suggested ways to connect her teaching, photography and everyday stories.",
    name: "Berta",
    business: "La B. Davila",
    handle: "la.b888",
    gained: 4390,
    period: "25 Jun 2025 – 25 Jul 2026",
    start: {
      heading: "Connect the classroom, the camera and life between countries.",
      paragraphs: [
        "Berta is a special education, art and English teacher from Texas, living in Catalunya. Her interests include photography and filmmaking, and she wanted to build a community where those interests could meet her teaching work.",
        "She wanted to reach educators, parents, musicians, artists, filmmakers and photographers. Both Spain and the US mattered to her: she wanted the audience to reflect her life in Spain and her ties to home.",
      ],
      audience: [
        "Educators & parents",
        "Artists & photographers",
        "Spain & USA",
      ],
    },
    approach: {
      heading: "Bring the outreach and the page closer to Berta’s interests.",
      paragraphs: [
        "We handled daily outreach and reviewed Berta’s feedback on the people being approached. Sushmita also gave her a way to organise the teaching, art and everyday moments she wanted to share.",
      ],
      manager: "Sushmita",
      managerFocus:
        "Spain and US audiences, teaching and art content, profile structure",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep both Spain and the US in the plan.",
          paragraphs: [
            "Berta wanted a balance between the two countries, with closer attention to education and creative interests. In February 2026, we moved to a balanced Spain–US approach and began prioritising female-led accounts connected to her niche.",
          ],
        },
        {
          label: "The profile",
          heading: "Introduce the educator and the artist together.",
          paragraphs: [
            "Sushmita suggested a name line such as “Berta Davila | Educator & Creative” and a bio that connected Texas, Catalunya and her teaching. She recommended highlights for About Me, Teaching, Art, Life and Travel so visitors could explore those interests.",
          ],
        },
        {
          label: "What to post",
          heading: "Give the different parts of her life a place.",
          paragraphs: [
            "Sushmita suggested four recurring themes: art, teaching, life between cultures and everyday stories. She encouraged Berta to experiment with Reels and recommended trying a Spain–US posting window, then watching how each audience responded.",
          ],
          note: {
            summary: "An example that fitted her style",
            body: "Berta had begun experimenting with sunrise Reels. Sushmita encouraged that reflective storytelling style, while also making room for teaching and art.",
          },
        },
      ],
    },
    progress: {
      heading: "4,390 followers gained through daily outreach.",
      paragraphs: [
        "Berta gained 4,390 followers through daily outreach between June 2025 and July 2026.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 322,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 339,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 373,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 474,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 291,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 304,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 368,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 493,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 208,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 186,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 362,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 331,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 339,
        },
      ],
      update: {
        heading: "Berta began experimenting more seriously with Reels.",
        paragraphs: [
          "In May 2026, Berta said the feedback felt aligned with her direction. She was experimenting with Reels and looking more closely at the analytics, while keeping the artistic storytelling that mattered to her.",
        ],
      },
    },
    quote:
      "The feedback felt aligned with where I was heading. I started taking Reels more seriously, and the profile suggestions helped me see how my teaching, art and everyday stories could fit together.",
    quoteBy: "Berta Davila · Educator and creative · May 2026",
    close: {
      heading: "Build an audience around the things you bring together.",
      body: "Work with a Brand Manager on outreach and a page that connects your expertise with your own story.",
    },
  },
  {
    slug: "drake-abshire",
    niche: "Real estate",
    nicheSlug: "real-estate",
    specialty: "Real estate · Lafayette, Louisiana",
    title: "A bigger audience for Louisiana property advice.",
    intro:
      "Drake wanted to educate home buyers and sellers without losing his sense of humour. Rahul paired daily outreach with specific feedback on his property videos and ideas drawn from questions buyers ask.",
    name: "Drake Abshire",
    handle: "drakeabshirerealtor",
    photo: "/audiences/journey-v2/results/local/drakeabshirerealtor-avatar.png",
    gained: 5466,
    period: "25 Apr 2025 – 25 Jun 2026",
    start: {
      heading: "Property expertise with Southern hospitality.",
      paragraphs: [
        "Drake’s real estate brand combines advice for home buyers and sellers with an approachable, down-to-earth style. He wanted to reach young professionals and homeowners in Lafayette, Youngsville and Broussard, Louisiana.",
        "He was already sharing educational posts, property videos and funny Reels. The brief was to build the audience while keeping the mix of useful advice and humour that felt like him.",
      ],
      audience: [
        "Lafayette, Youngsville & Broussard",
        "Home buyers & sellers",
        "Young professionals & homeowners",
      ],
    },
    approach: {
      heading: "Reach property audiences. Give them a reason to watch.",
      paragraphs: [
        "We handled daily outreach using Drake’s audience brief. Rahul reviewed the property videos themselves, from text that was hard to read to questions that could get viewers talking.",
      ],
      manager: "Rahul",
      managerFocus:
        "Louisiana home buyers, property videos and buyer questions",
      steps: [
        {
          label: "Getting discovered",
          heading: "Use three Louisiana towns to guide the outreach.",
          paragraphs: [
            "Drake named Lafayette, Youngsville and Broussard as his focus. We used that information to guide the outreach and reviewed new real estate audiences to test. In October 2024, we shared the accounts being explored so he could help refine the choices.",
          ],
          note: {
            summary: "A closer look at the audience review",
            body: "The October review included accounts such as @k.jonestherealtor, @ashleyboudoin and @graumanrosenfeld. Drake was invited to suggest other real estate accounts that fitted his brand.",
          },
        },
        {
          label: "The videos",
          heading: "Make the words easy to read.",
          paragraphs: [
            "Rahul spotted text disappearing into a busy background and suggested adding an outline. He also flagged Reel covers with words cut off in the profile grid, and recommended adjusting the cover alignment or keeping Drake in frame without the text.",
          ],
        },
        {
          label: "What to post",
          heading: "Answer the questions buyers actually ask.",
          paragraphs: [
            "Rahul suggested videos on local housing inventory, home prices and upcoming developments, alongside answers to common client questions. He encouraged Drake to keep the humour and personality in his property tours and advice.",
          ],
        },
      ],
    },
    progress: {
      heading: "5,466 followers gained through daily outreach.",
      paragraphs: [
        "Drake gained 5,466 followers from 25 April 2025 to 25 June 2026. The strongest period added 596 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 211,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 188,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 436,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 355,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 389,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 509,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 534,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 481,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 490,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 417,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 596,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 257,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 197,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 406,
        },
      ],
      update: {
        heading: "A property-price question got people talking.",
        paragraphs: [
          "In October 2024, Rahul’s review highlighted a Reel asking viewers to guess a property’s price. People were already answering in the comments. He recommended using more questions like it, including polls about the features buyers want in a home.",
        ],
      },
    },
    quote:
      "Rahul’s reviews gave me specific ideas for my property videos—buyer questions, clearer text and room for my sense of humour. I had useful things to work on.",
    quoteBy: "Drake Abshire · Realtor · November 2025",
    close: {
      heading: "Help more people discover your property expertise.",
      body: "Work with a Brand Manager on reaching your audience and turning everyday buyer questions into useful content.",
    },
  },
  {
    slug: "nathan-cassar",
    niche: "Events",
    nicheSlug: "events",
    specialty: "Wedding & corporate MC · Sydney",
    title: "2,511 followers for a Sydney event host.",
    intro:
      "Nathan hosts weddings and corporate events. We handled daily outreach while Aditi helped him make his role clear on the profile and suggested ways to show more of his work in front of a room.",
    name: "Nathan Cassar",
    handle: "nathancassar_mc",
    gained: 2511,
    period: "26 Sep 2025 – 25 Sep 2026",
    start: {
      heading: "Make the person and the profession easy to recognise.",
      paragraphs: [
        "Nathan’s Instagram introduces him as a Sydney master of ceremonies and presenter. His work spans weddings and corporate events, so a new visitor needs to understand both who he is and what he can host.",
        "His name and “mc” username already did part of that job. The profile review focused on making the rest of the introduction shorter and easier to read.",
      ],
      audience: ["Sydney weddings", "Corporate events", "Event hosting"],
    },
    approach: {
      heading: "Daily outreach, with a clearer introduction to Nathan.",
      paragraphs: [
        "We began daily outreach from Nathan’s audience brief. Aditi then worked through his profile wording and videos, helping him explain the job and show what hosting an event looks like.",
      ],
      manager: "Aditi",
      managerFocus:
        "Daily outreach, profile wording and live-event video ideas",
      steps: [
        {
          label: "The profile",
          heading: "Put the job and the city in plain sight.",
          paragraphs: [
            "Aditi recommended “Nathan Cassar | Sydney Wedding & Corporate MC” for the name field and a shorter bio with fewer hashtags. She put the job and the city at the front of the introduction, so visitors could quickly understand what Nathan hosts and where he works.",
          ],
        },
        {
          label: "What to post",
          heading: "Bring live-event moments into the feed.",
          paragraphs: [
            "In December 2025, Aditi recommended adding live wedding moments alongside Nathan’s podcast clips and talking videos. She also suggested testing 15–20 second clips, with a simple opening line and fewer stickers, so each video could be easier to follow.",
          ],
        },
      ],
    },
    progress: {
      heading: "2,511 followers gained through daily outreach.",
      paragraphs: [
        "Nathan gained 2,511 followers through daily outreach from 26 September 2025 to 25 September 2026. The strongest period added 290 followers.",
      ],
      months: [
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 119,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 242,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 265,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 228,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 279,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 203,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 202,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 290,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 155,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 210,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 180,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 138,
        },
      ],
      update: {
        heading: "Nathan acted on the profile feedback.",
        paragraphs: [
          "On 28 October 2025, Nathan confirmed that he had implemented the profile suggestions.",
        ],
      },
    },
    quote:
      "Aditi picked up on details I could improve straight away. I made the profile changes, and we worked through the bio wording so it sounded right for my business.",
    quoteBy: "Nathan Cassar · Wedding & corporate MC · October 2025",
    close: {
      heading: "Let more people discover the person behind the microphone.",
      body: "Get help growing your audience and showing the work you do at weddings, conferences and events.",
    },
  },
  {
    slug: "enclave-architects",
    niche: "Home & building",
    nicheSlug: "home-and-building",
    specialty: "Residential architecture · Melbourne & beyond",
    title: "5,770 followers for Enclave’s residential designs.",
    intro:
      "Enclave wanted more people to discover its architecture, with Melbourne and regional Victoria a priority. Srishti helped shape the outreach brief and suggested ways to show the thinking and people behind the finished homes.",
    name: "Madhusha",
    business: "Enclave Architects",
    handle: "enclave_architects",
    gained: 5770,
    period: "25 Jun 2025 – 25 May 2026",
    start: {
      heading: "Residential projects, and the people behind them.",
      paragraphs: [
        "Enclave’s Instagram showcased residential architecture and interiors. Madhusha wanted to attract more work through Instagram, especially in Melbourne and regional Victoria, while welcoming people elsewhere who enjoyed the designs.",
        "The account already had strong project images and videos. Srishti’s review focused on helping visitors understand the practice and get closer to the people and choices behind each home.",
      ],
      audience: [
        "Melbourne & regional Victoria",
        "Residential architecture",
        "People interested in home design",
      ],
    },
    approach: {
      heading: "Bring people to the work. Show them the thinking behind it.",
      paragraphs: [
        "We handled daily outreach and used Madhusha’s location priorities to refine the brief. Srishti reviewed the profile and project posts, then gave Enclave specific ways to explain its designs and invite a response.",
      ],
      manager: "Srishti",
      managerFocus:
        "Melbourne and Victoria audiences, profile clarity and design stories",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep Melbourne and Victoria in the audience brief.",
          paragraphs: [
            "Madhusha made the priority clear: more people in Melbourne and regional Victoria, without excluding design enthusiasts elsewhere. We took that preference into the targeting review and continued daily outreach around the account’s brief.",
          ],
        },
        {
          label: "The profile",
          heading: "Explain what Enclave designs and where it works.",
          paragraphs: [
            "Srishti suggested a bio that named the homes and locations, including Melbourne, Kuwait and Vienna. She also recommended clearer Story highlight titles and matching covers so visitors could find their way through the profile.",
          ],
        },
        {
          label: "What to post",
          heading: "Put an architect’s voice behind the project pictures.",
          paragraphs: [
            "Srishti suggested short videos explaining a project’s details, process and inspiration in a voiceover. She also proposed showing the architects themselves, project handovers and design choices that viewers could weigh in on.",
          ],
          note: {
            summary: "Two ideas from the review",
            body: "Invite viewers to “Pick your interior design style” in a Reel. Talk through a finished project with a voiceover explaining the choices behind it. Both ideas start with work Enclave already has to show.",
          },
        },
      ],
    },
    progress: {
      heading: "5,770 followers gained through daily outreach.",
      paragraphs: [
        "Enclave gained 5,770 followers from 25 June 2025 to 25 May 2026. The strongest period added 641 followers.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 534,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 628,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 573,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 310,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 478,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 442,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 450,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 641,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 584,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 575,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 555,
        },
      ],
      update: {
        heading: "Madhusha made the feed more focused.",
        paragraphs: [
          "In August 2024, Madhusha confirmed removing content that did not fit the account, following Srishti’s recommendation. Madhusha said it was nice to see the account taking shape and planned to use more of the content advice.",
        ],
      },
    },
    quote:
      "Srishti gave us ideas for showing the people and design decisions behind our projects. I removed the unrelated content and could see the account taking shape.",
    quoteBy: "Madhusha · Enclave Architects · August 2024",
    close: {
      heading: "Help more people discover the homes you design.",
      body: "Work with a Brand Manager on reaching your audience and telling the stories behind your projects.",
    },
  },
  {
    slug: "aki-jacobson",
    niche: "Art",
    nicheSlug: "art",
    specialty: "Doll hair design",
    title: "3,893 followers for Aki’s doll hair design.",
    intro:
      "Aki wanted doll collectors and designers to see the craft behind familiar characters. Srishti helped shape the audience brief and a profile that made room for both the portfolio and the person.",
    name: "Aki Jacobson",
    handle: "aki_jacobson",
    gained: 3893,
    period: "26 Dec 2025 – 25 Sep 2026",
    start: {
      heading: "Let collectors meet the designer behind the dolls.",
      paragraphs: [
        "Aki designs hair for Mattel dolls, with work spanning Barbie, Monster High and other characters. The aim was to connect with doll collectors, artists and hairstylists, and share how the hairstyles are created.",
        "This was a personal account. Aki wanted a place for the doll design portfolio alongside family travel, creative life and professional milestones.",
      ],
      audience: [
        "Doll collectors",
        "Doll designers and hairstylists",
        "Barbie and Monster High fans",
      ],
    },
    approach: {
      heading: "Make the craft—and the designer—easy to find.",
      paragraphs: [
        "We handled daily outreach around the doll community. Srishti worked with Aki on the countries to reach, how to introduce the design work and how visitors could explore the portfolio.",
      ],
      manager: "Srishti",
      managerFocus:
        "Doll audiences, a clearer introduction and a portfolio in Highlights",
      steps: [
        {
          label: "Getting discovered",
          heading: "Focus the brief on doll audiences in the US and Japan.",
          paragraphs: [
            "Aki named doll collectors, designers, artists and hairstylists as people to reach. In March 2026, Aki asked to focus on the US and Japan. Alongside the existing US-focused outreach, Srishti planned tests of accounts based in Japan.",
          ],
        },
        {
          label: "The introduction",
          heading: "Make doll hair design clear in the name and bio.",
          paragraphs: [
            "Srishti recommended adding the profession to the name field and making the Mattel doll hair work easy to spot in the bio. Aki chose “Barbie hair designer” for the name and wanted to retain a personal-account disclaimer.",
          ],
        },
        {
          label: "The portfolio",
          heading: "Give the dolls their own place in Highlights.",
          paragraphs: [
            "Aki and Srishti worked through three groups: Travel & Family, Doll Design Portfolio, and Features & Wins. The portfolio could gather work across Barbie, Monster High, Disney Princess and one-of-a-kind dolls, while the other groups showed life outside the studio and professional milestones.",
          ],
        },
      ],
    },
    progress: {
      heading: "3,893 followers gained through daily outreach.",
      paragraphs: [
        "Aki gained 3,893 followers through daily outreach from December 2025 to September 2026. The period ending 25 February 2026 added 583 followers.",
      ],
      months: [
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 487,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 583,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 442,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 470,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 435,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 547,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 508,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 0,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 421,
        },
      ],
      update: {
        heading: "Aki added Highlights to the profile.",
        paragraphs: [
          "In April 2026, Aki confirmed the Highlights were live. Srishti reviewed them and suggested keeping six to eight key Highlights so visitors could explore the work more easily.",
        ],
      },
    },
    quote:
      "The suggestions felt like me: doll design, the portfolio, and room for family and travel. Srishti helped me think through how those parts could sit together on my profile.",
    quoteBy: "Aki Jacobson · Doll hair designer · January 2026",
    close: {
      heading: "Help people discover the craft behind your creations.",
      body: "Get support with reaching your audience and giving your portfolio a clear place on Instagram.",
    },
  },
  {
    slug: "parker-gillingham",
    niche: "Art",
    nicheSlug: "art",
    specialty: "Online art gallery",
    title: "4,534 followers for Parker + Gillingham’s art community.",
    intro:
      "Nikki was preparing an online gallery for female-identifying and non-binary artists. Shama helped shape the outreach brief and suggested ways to introduce the gallery while its artist roster was still taking shape.",
    name: "Nikki Gillingham",
    business: "Parker + Gillingham",
    handle: "parkerandgillingham",
    gained: 4534,
    period: "9 recorded periods · 25 Apr 2025 – 25 Jul 2026",
    start: {
      heading: "Reach the people who make art—and the people who buy it.",
      paragraphs: [
        "Nikki Gillingham and Mary-Louise Parker founded an online gallery to showcase female-identifying and non-binary artists. Nikki wanted Instagram to introduce the gallery to potential buyers and to artists who might exhibit their work.",
        "While artists were being signed, most of the work Nikki could post was her own. She needed ideas she could use straight away, along with a plan for announcing the gallery.",
      ],
      audience: [
        "Artists",
        "Art enthusiasts",
        "People buying art for their homes",
      ],
    },
    approach: {
      heading: "Show the art and explain what the gallery is building.",
      paragraphs: [
        "We handled daily outreach with both artists and art buyers in mind. Shama reviewed Nikki’s existing Reels and developed ideas for the artwork she could share before the wider gallery launch.",
      ],
      manager: "Shama",
      managerFocus:
        "Art audiences, readable Reels and the gallery announcement",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep artists and art buyers in the audience brief.",
          paragraphs: [
            "Nikki described people who make art, enjoy home décor and appreciate the details in a piece. She also wanted emerging and established artists from around the world to discover the gallery. That gave the outreach two clear audiences to work from.",
          ],
        },
        {
          label: "On screen",
          heading: "Make the artwork and the words easier to follow.",
          paragraphs: [
            "For a Reel showing a screenshot of the gallery, Shama recommended a simpler image with a short line of text. On other Reels, she suggested stronger text contrast, an opening that invited viewers to watch the making process, and music that began with the first frame.",
          ],
        },
        {
          label: "The launch",
          heading: "Give the gallery announcement a clear sequence.",
          paragraphs: [
            "Shama proposed a Reel that introduced the gallery, explained its purpose, showed a preview of the art and invited artists to submit their work. Nikki could begin with her own pieces while the wider roster was being signed.",
          ],
          note: {
            summary: "Ideas for the artwork already available",
            body: "Show a blank canvas transitioning into the finished piece, cut together the steps of making it, or place the original inspiration beside the final artwork. These ideas gave Nikki several ways to use her own art.",
          },
        },
      ],
    },
    progress: {
      heading: "4,534 followers gained through daily outreach.",
      paragraphs: [
        "Parker + Gillingham gained 4,534 followers through daily outreach across nine recorded periods between April 2025 and July 2026. The period ending 25 June 2026 added 664 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 508,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 435,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 618,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 431,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 130,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 564,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 590,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 664,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 594,
        },
      ],
    },
    quote:
      "While we were signing artists, I mostly had my own art to post. Shama gave me Reel ideas and a clear plan for introducing the gallery to people on Instagram.",
    quoteBy: "Nikki Gillingham · Parker + Gillingham · September 2024",
    close: {
      heading: "Help more people discover the art you bring together.",
      body: "Work with a Brand Manager on reaching art audiences and introducing your gallery, artists and exhibitions.",
    },
  },
  {
    slug: "roberto-garagarza",
    niche: "Photography",
    nicheSlug: "photography",
    specialty: "Motorcycle and car photography · London",
    title: "7,561 followers for Roberto’s motorcycle photography.",
    intro:
      "Roberto wanted riders, car enthusiasts and apparel brands to discover his photography. Rahul helped clarify the profile and suggested ways to show the shoot, the location and the person behind each image.",
    name: "Roberto Garagarza",
    handle: "roga______",
    gained: 7561,
    period: "25 Mar 2025 – 25 Apr 2026",
    start: {
      heading: "Photographs for people who love the road.",
      paragraphs: [
        "Roberto photographs motorcycles, cars and adventures. He wanted to reach riders, drivers, fellow photographers and small apparel brands, with people who enjoy road trips, camping and motorcycle culture at the centre.",
        "Brand interest was already part of the picture: Roberto said a couple of brands wanted to see a larger audience and more engagement. His goal was to build that audience while making his work easier to explore.",
      ],
      audience: [
        "Motorcycle riders",
        "Car enthusiasts",
        "Apparel and photography brands",
      ],
    },
    approach: {
      heading: "Find the audience. Put the photographer in the picture.",
      paragraphs: [
        "We used Roberto’s motorcycle and lifestyle brief to guide daily outreach. Rahul reviewed how the profile introduced him and suggested content that showed how he made the photographs.",
      ],
      manager: "Rahul",
      managerFocus:
        "Motorcycle audiences, the bio and the stories behind the photographs",
      steps: [
        {
          label: "Getting discovered",
          heading: "Use motorcycle culture to sharpen the audience brief.",
          paragraphs: [
            "The brief went beyond people who like bikes. Roberto named road trips, camping, riding apparel and city-based motorcycle owners. He pointed to @mallelondon as a clear example of the audience he wanted, alongside smaller apparel and motorcycle accounts.",
          ],
        },
        {
          label: "The profile",
          heading: "Put London, the subjects and the portfolio in three lines.",
          paragraphs: [
            "Rahul suggested a bio that stated Roberto’s location, listed motorcycles, cars, apparel and travel, and directed visitors to the portfolio. He also recommended reducing the number of Highlights so people had fewer places to choose from.",
          ],
        },
        {
          label: "Behind the camera",
          heading: "Show the setup, then reveal the photograph.",
          paragraphs: [
            "Rahul suggested starting a Reel with the camera setup or the moment of taking a picture, then cutting to the finished image. Other ideas included footage from shoot locations and Roberto appearing in the work, so people could get to know the photographer as well as the motorcycles.",
          ],
        },
      ],
    },
    progress: {
      heading: "7,561 followers gained through daily outreach.",
      paragraphs: [
        "Roberto gained 7,561 followers through daily outreach from March 2025 to April 2026. The period ending 25 November 2025 added 777 followers.",
      ],
      months: [
        {
          dates: "25 Mar 2025 – 24 Apr 2025",
          followers: 456,
        },
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 604,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 517,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 683,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 574,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 678,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 660,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 777,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 618,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 626,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 642,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 514,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 212,
        },
      ],
      update: {
        heading: "Roberto reworked the bio and trimmed the Highlights.",
        paragraphs: [
          "In October 2024, Roberto confirmed that he had restructured the bio as recommended and removed several Highlights. He thanked Rahul for the help with the profile.",
        ],
      },
    },
    quote:
      "Rahul helped me put London, motorcycles and the portfolio into a clearer bio. I restructured it and removed a few Highlights after the review. The suggestions were easy to act on.",
    quoteBy: "Roberto Garagarza · Photographer · October 2024",
    close: {
      heading: "Help the right people find your photography.",
      body: "Get support with reaching your audience and showing the work that happens behind the camera.",
    },
  },
  {
    slug: "flo-music",
    niche: "Music & DJs",
    nicheSlug: "music-and-djs",
    specialty: "Electronic music producer and DJ",
    title: "6,121 followers for FLØ’s electronic music.",
    intro:
      "Ishaan wanted listeners, DJs and producers to discover his sound. Tulsi kept testing music audiences and suggested ways to share the tracks, the production process and the work around a live set.",
    name: "Ishaan",
    business: "FLØ",
    handle: "_flomusic_",
    gained: 6121,
    period: "26 Sep 2025 – 25 Sep 2026",
    start: {
      heading: "A community around the tracks and the producer.",
      paragraphs: [
        "Ishaan makes electronic music as FLØ. He wanted listeners to discover new tracks, learn production tips and become familiar with his sound, alongside DJs, producers and people who attend live events.",
        "He was already promoting some Reels himself and had tried daily outreach. He joined to have that outreach handled at a larger scale, while continuing to work on his music and posts.",
      ],
      audience: [
        "Electronic music listeners",
        "DJs and music producers",
        "Live-event audiences",
      ],
    },
    approach: {
      heading: "Test music audiences. Show how the sound is made.",
      paragraphs: [
        "We reviewed which DJ and producer audiences brought new followers, then tested further accounts Ishaan suggested. Tulsi also gave him ideas for what a new listener would find on the profile.",
      ],
      manager: "Tulsi",
      managerFocus:
        "Electronic music audiences, listening links and production content",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep testing audiences around DJs and producers.",
          paragraphs: [
            "Our reviews included people following accounts such as @caseyclubofficial, @danklinical and @flocon. Ishaan later shared more artists to test. By May 2026, @officialsullymusic and @phrvabass were among the additions bringing followers.",
          ],
        },
        {
          label: "The next step",
          heading: "Point visitors towards the mixes and sets.",
          paragraphs: [
            "Tulsi suggested making the invitation to listen more prominent in the bio. She also proposed separate Highlights for releases, the story behind FLØ, and press features, so visitors could choose where to explore the music.",
          ],
        },
        {
          label: "What to post",
          heading: "Show the beat taking shape, layer by layer.",
          paragraphs: [
            "Tulsi suggested short clips of choosing sounds, layering drums and building the drop. Another idea followed a DJ’s day from preparing a set through travel, soundcheck and the performance. These gave Ishaan ways to show more than playing a finished track.",
          ],
        },
      ],
    },
    progress: {
      heading: "6,121 followers gained through daily outreach.",
      paragraphs: [
        "FLØ gained 6,121 followers through daily outreach from September 2025 to September 2026. The period ending 25 August 2026 added 1,016 followers.",
      ],
      months: [
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 395,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 532,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 491,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 550,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 242,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 546,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 553,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 573,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 501,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 394,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 1016,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 328,
        },
      ],
      update: {
        heading: "People were asking for the music.",
        paragraphs: [
          "In March 2026, Ishaan said he was receiving many DMs and comments asking for music links. He wanted a more manageable way to keep up with the replies.",
        ],
      },
    },
    quote:
      "People were asking for my music in DMs and comments. Tulsi kept testing audiences around DJs and producers, and gave me regular updates on what was working for the account.",
    quoteBy: "Ishaan · FLØ · March–May 2026",
    close: {
      heading: "Help more listeners find your sound.",
      body: "Work with a Brand Manager on reaching music audiences and showing what goes into your tracks and sets.",
    },
  },
  {
    slug: "josh-strongman",
    niche: "Fitness",
    nicheSlug: "fitness",
    specialty: "Strongman & strength coaching",
    title: "Helping more lifters discover Josh’s strength coaching.",
    intro:
      "Josh wanted to reach gymgoers who were serious about getting stronger. Rahul reviewed the outreach across strength and powerlifting audiences, and suggested ways to turn Josh’s training footage into useful lessons.",
    name: "Josh",
    handle: "josh_bourne__strong",
    gained: 3088,
    period: "26 Jul 2025 – 25 Dec 2025",
    start: {
      heading: "Show people what they could learn from a strongman coach.",
      paragraphs: [
        "Josh is a strongman coach and competitor. He had spent more than ten years training and coaching, and wanted to show people they could lift things they had never imagined lifting.",
        "His audience brief was specific: men and women in the gym who wanted to get stronger, with a particular focus on younger men. His posts already showed training sessions; the next step was to make more of his coaching knowledge visible.",
      ],
      audience: ["Strength training", "Powerlifting", "Young gymgoers"],
    },
    approach: {
      heading:
        "Find strength audiences. Give the training footage more to say.",
      paragraphs: [
        "We handled daily outreach. Rahul reviewed which strength audiences were responding and gave Josh practical ways to explain the lifts, share training tips and introduce himself as a coach.",
      ],
      manager: "Rahul",
      managerFocus:
        "Strength audiences, training videos and a clearer coaching profile",
      steps: [
        {
          label: "Getting discovered",
          heading: "Test strength audiences across three countries.",
          paragraphs: [
            "We began with strength and powerlifting audiences in Australia, then expanded the outreach to the UK and the US. Rahul reviewed the response and refined the weaker-performing audiences as the work continued.",
          ],
        },
        {
          label: "The profile",
          heading: "Put “Strongman Coach” where visitors would see it.",
          paragraphs: [
            "Rahul suggested moving Josh’s coaching and competitor description into the profile’s name field. He also recommended highlights for Coaching, Training Tips and Strongman Life, with space for personal moments alongside the lifting.",
          ],
        },
        {
          label: "What to post",
          heading: "Use the training clips to teach something.",
          paragraphs: [
            "Rahul suggested adding short explanations directly to Josh’s videos: a training myth, a quick tip or a point about the lift. He also encouraged solo gym footage and relatable captions so viewers could get to know the coach behind the training.",
          ],
          note: {
            summary: "Ways to use footage he already had",
            body: "Explain one training myth over a lifting clip. Add a short tip to a team-training video. Use a solo gym shot to share a moment from his own training.",
          },
        },
      ],
    },
    progress: {
      heading: "3,088 followers gained through daily outreach.",
      paragraphs: [
        "Josh gained 3,088 followers through daily outreach across five reporting periods between July and December 2025.",
        "The period ending 25 September 2025 added 946 followers.",
      ],
      months: [
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 179,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 946,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 685,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 675,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 603,
        },
      ],
      update: {
        heading: "Josh was getting more comments, too.",
        paragraphs: [
          "In November 2025, Josh said he had tried some of the content suggestions and was getting “heaps more comments”. He asked Rahul for more ideas to keep developing his posts.",
        ],
      },
    },
    quote:
      "The suggestions gave me ways to do more with my training videos. I tried a few things and was getting heaps more comments, so I came back for more ideas.",
    quoteBy: "Josh · Strongman coach · November 2025",
    close: {
      heading: "Help more lifters discover the way you coach.",
      body: "Work with a Brand Manager on finding your audience and turning your training knowledge into useful posts.",
    },
  },
  {
    slug: "surfhub-imsouane",
    niche: "Sports coaching",
    nicheSlug: "sports-coaching",
    specialty: "Surf school & coaching · Imsouane, Morocco",
    title: "Making SurfHub easier for surfers to discover.",
    intro:
      "SurfHub wanted more people to discover its coaching and board rentals in Imsouane. Shama worked through the audience brief and helped refine a bio that had to explain the services while making room for collaborators.",
    name: "Adrien",
    business: "SurfHub Imsouane",
    handle: "surfhub.imsouane",
    gained: 6950,
    period: "25 Apr 2025 – 25 Sep 2026",
    start: {
      heading: "Reach surfers at different stages of learning.",
      paragraphs: [
        "SurfHub Imsouane offers surf lessons, coaching and board rentals in Morocco. Adrien wanted to reach people learning to surf, surfers looking to improve, and experienced surfers who wanted to rent good boards.",
        "The page also needed to acknowledge two collaborators. That made the bio a practical writing challenge: explain the services and location, include the partner accounts, and keep it short enough for Instagram.",
      ],
      audience: [
        "Learning to surf",
        "Improving technique",
        "Surfboard rentals",
      ],
    },
    approach: {
      heading: "Use the surfing brief. Make the offer easy to understand.",
      paragraphs: [
        "We handled daily outreach around SurfHub’s surfing audience. Shama reviewed how the profile introduced the school, then worked with Adrien on the wording as he updated it.",
      ],
      manager: "Shama",
      managerFocus:
        "Surfing audiences, service wording and a practical bio revision",
      steps: [
        {
          label: "Getting discovered",
          heading: "Include learners and experienced surfers in the brief.",
          paragraphs: [
            "Adrien described people aged 20–50 who wanted to learn or improve, alongside experienced surfers interested in high-quality board rentals. We used that brief to guide the outreach, covering both the coaching and rental sides of the school.",
          ],
        },
        {
          label: "The profile",
          heading: "Lead with surf coaching, rentals and Imsouane.",
          paragraphs: [
            "Shama recommended a bio that put surf coaching and board rentals alongside Imsouane, with a short invitation to learn more. When Adrien needed to include collaborators, she revised the wording around both the services and the partner accounts.",
          ],
          note: {
            summary: "The names behind the suggestion",
            body: "Shama’s revised suggestion included @olosurfnature and @wavegomorocco. For the name field, Shama suggested “SurfHub Imsouane | Surf Coaching” so the business, location and service appeared together.",
          },
        },
      ],
    },
    progress: {
      heading: "6,950 followers gained through daily outreach.",
      paragraphs: [
        "SurfHub gained 6,950 followers through daily outreach between April 2025 and September 2026.",
        "The strongest period, ending 25 November 2025, added 684 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 156,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 153,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 199,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 270,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 530,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 416,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 684,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 498,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 398,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 448,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 387,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 424,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 509,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 511,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 525,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 516,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 326,
        },
      ],
      update: {
        heading: "A bio updated around the actual offer.",
        paragraphs: [
          "By June 2025, Adrien had updated the bio. The follow-up review confirmed that surf coaching and rentals now appeared clearly at the top.",
        ],
      },
    },
    quote:
      "We needed to explain coaching and board rentals while keeping our collaborators. Shama worked through the bio with us, and we updated it to make the offer clearer.",
    quoteBy: "Adrien · SurfHub Imsouane · June 2025",
    close: {
      heading: "Help more surfers discover your school.",
      body: "Work with a Brand Manager on outreach and a profile that explains your lessons, location and services.",
    },
  },
  {
    slug: "ontario-cricket",
    niche: "Sports coaching",
    nicheSlug: "sports-coaching",
    specialty: "Cricket coaching · Ontario, Canada",
    title: "Bringing Ontario Cricket’s training to a wider audience.",
    intro:
      "The academy wanted cricket players in Ontario to discover its programs. Srishti worked from that local audience brief and suggested clearer training videos, player stories and easier-to-find program information.",
    name: "Derek",
    business: "Ontario Cricket Academy",
    handle: "ontariocricket",
    gained: 3552,
    period: "25 Jun 2025 – 25 Jan 2026",
    start: {
      heading: "Reach the players who could join the programs.",
      paragraphs: [
        "Ontario Cricket Academy wanted to grow its Instagram audience among cricket and sports enthusiasts in Toronto, Mississauga and Brampton. More program sign-ups were part of the goal.",
        "The page already shared training tips, techniques, drills and student stories. Srishti’s review focused on helping someone understand a drill, picture the training and find out how to take part.",
      ],
      audience: [
        "Toronto cricket players",
        "Mississauga & Brampton",
        "Cricket training",
      ],
    },
    approach: {
      heading: "Connect local discovery with a clear view of the training.",
      paragraphs: [
        "We handled daily outreach using the academy’s Ontario audience brief. Srishti reviewed the videos and suggested ways to make the coaching easier to follow and the programs easier to explore.",
      ],
      manager: "Srishti",
      managerFocus:
        "Ontario cricket audiences, clearer drill videos and student stories",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep the academy’s Ontario audience in focus.",
          paragraphs: [
            "The academy identified cricket and sports enthusiasts in Ontario, particularly Toronto, Mississauga and Brampton. We used those interests and locations as the starting point for outreach, with the programs for local players in mind.",
          ],
        },
        {
          label: "The training videos",
          heading: "Make the drill easier to watch and understand.",
          paragraphs: [
            "Srishti recommended steadier filming and clearer text for drill names and key points. She suggested brighter, consistent text on the videos and readable Reel covers, so a viewer could understand the lesson while watching the action.",
          ],
        },
        {
          label: "What to show",
          heading: "Let people see the players and the progress.",
          paragraphs: [
            "Srishti suggested slow-motion shots from training or matches and short profiles of individual students: their journey, achievements and what they enjoyed about the academy. She also recommended making program details and sign-up links easy to find.",
          ],
          note: {
            summary: "An idea for involving current students",
            body: "Invite students to share their training experiences and tag the academy, then repost selected stories. The recommendation was to show prospective players what training there felt like.",
          },
        },
      ],
    },
    progress: {
      heading: "3,552 followers gained through daily outreach.",
      paragraphs: [
        "Ontario Cricket Academy gained 3,552 followers through daily outreach between June 2025 and January 2026.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 705,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 393,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 520,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 539,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 600,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 499,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 296,
        },
      ],
    },
    quote:
      "We wanted cricket players in Ontario to find our programs. The review gave us specific ideas for clearer drill videos, student stories and showing what training here looks like.",
    quoteBy: "Ontario Cricket Academy · November 2024",
    close: {
      heading: "Help more players discover your coaching.",
      body: "Work with a Brand Manager on reaching your audience and showing what people can learn at your academy.",
    },
  },
  {
    slug: "majestic-pools",
    niche: "Home & building",
    nicheSlug: "home-and-building",
    specialty: "Pools & backyard design · Barrie, Ontario",
    title: "A growing audience for custom pools and backyards.",
    intro:
      "Majestic wanted to reach homeowners around Barrie and people who love pool and garden design. Sushmita helped shape the outreach brief and suggested ways to make its project photos and videos more personal.",
    name: "Sean",
    business: "Majestic Pools",
    handle: "majesticpoolsbarrie",
    photo: "/audiences/journey-v2/results/local/majesticpoolsbarrie-avatar.png",
    gained: 3928,
    period: "25 Jun 2025 – 25 Jun 2026",
    start: {
      heading: "Custom backyards, with two audiences to reach.",
      paragraphs: [
        "Majestic Pools designs and builds swimming pools, spas and complete backyard makeovers. Its brief had two parts: reach homeowners within 100 kilometres of Barrie, Ontario, and attract people elsewhere who enjoyed pools, landscaping and outdoor design.",
        "Sean was already sharing project photos and videos regularly. He wanted more people to discover the business and take an interest in the work.",
      ],
      audience: [
        "Homeowners around Barrie",
        "Pool & landscape design",
        "Outdoor living",
      ],
    },
    approach: {
      heading:
        "Reach pool and landscape audiences. Bring the projects to life.",
      paragraphs: [
        "We handled daily outreach to pool and landscape audiences. Sushmita reviewed Majestic’s project photos and videos, and suggested ways to show more of the services, location and people behind the business.",
      ],
      manager: "Sushmita",
      managerFocus:
        "Ontario homeowners, pool and landscape audiences, project videos",
      steps: [
        {
          label: "Getting discovered",
          heading: "Find people already interested in pools and landscaping.",
          paragraphs: [
            "A December 2024 review showed new followers coming from audiences of accounts such as @bluediamondpools, @gibsan_pools and @landscapeontario. Sushmita shared these examples with Sean so he could help refine the choices.",
          ],
          note: {
            summary: "A more specific Ontario brief",
            body: "In February 2026, Sean asked to prioritise Ontario home builders, landscapers, deck builders and other businesses serving homeowners. Sushmita agreed to focus on those audiences, especially around Barrie.",
          },
        },
        {
          label: "The project posts",
          heading: "Show what Majestic offers and where it works.",
          paragraphs: [
            "Sushmita recommended adding a few written details about the services and location to project photos and carousels. She also pointed to posts featuring people from the business as a more personal way to introduce Majestic’s work.",
          ],
        },
        {
          label: "The videos",
          heading: "Talk people through a finished backyard.",
          paragraphs: [
            "Majestic already had walkthrough videos. Sushmita suggested adding voiceovers to explain what viewers were seeing, giving Sean a way to add more of the business’s own voice to those project tours.",
          ],
        },
      ],
    },
    progress: {
      heading: "3,928 followers gained through daily outreach.",
      paragraphs: [
        "Majestic Pools gained 3,928 followers from 25 June 2025 to 25 June 2026. Its strongest period added 429 followers.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 169,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 186,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 403,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 300,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 340,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 399,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 344,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 429,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 386,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 397,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 274,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 301,
        },
      ],
    },
    quote:
      "I appreciated having the outreach managed for me. I could focus the brief on Ontario builders and landscapers, and get practical feedback on how we showed our projects.",
    quoteBy: "Sean · Majestic Pools · February 2026",
    close: {
      heading: "Help more homeowners discover what you build.",
      body: "Work with a Brand Manager on reaching your audience and showing the details behind your projects.",
    },
  },
  {
    slug: "mr-hudson",
    niche: "Travel",
    nicheSlug: "travel",
    specialty: "Tailored luxury travel",
    title: "5,703 followers for Mr Hudson’s luxury trips.",
    intro:
      "Mr Hudson was moving from gay travel into luxury gay travel. Rahul helped sharpen the audience brief and suggested itinerary and hotel videos that could show people what a tailored trip might look like.",
    name: "Bastiaan",
    business: "Mr Hudson",
    handle: "mrhudsonexplores",
    photo: "/audiences/journey-v2/results/local/mrhudsonexplores-avatar.png",
    gained: 5703,
    period: "25 Apr 2025 – 25 May 2026",
    start: {
      heading: "A more specific kind of traveller.",
      paragraphs: [
        "Mr Hudson plans tailored vacations and helps travellers book luxury hotels and cruises. Bastiaan wanted an audience of people who might buy those experiences as the business focused more closely on luxury gay travel.",
        "The account already shared photographs from clients’ trips. The next opportunity was to give prospective travellers more to explore: itineraries, hotels and the experience of travelling with Mr Hudson.",
      ],
      audience: [
        "Luxury gay travel",
        "Tailored vacations",
        "Luxury hotels & cruises",
      ],
    },
    approach: {
      heading: "Sharpen the travel brief. Help people picture the trip.",
      paragraphs: [
        "We handled daily outreach while Rahul worked with Bastiaan on the audience and content. Their conversations made the brief more specific and turned travel-video ideas into a practical place to start.",
      ],
      manager: "Rahul",
      managerFocus:
        "Luxury travel audiences, itinerary videos and hotel content",
      steps: [
        {
          label: "Getting discovered",
          heading: "Focus the brief on people who book luxury travel.",
          paragraphs: [
            "Bastiaan wanted travellers interested in tailored vacations, hotels and cruises. When he pointed out that travel agents and advisers were competitors, Rahul agreed to use that distinction to refine the outreach.",
          ],
        },
        {
          label: "What to post",
          heading: "Turn a travel itinerary into something people can picture.",
          paragraphs: [
            "Rahul suggested Reels showing a past client itinerary or a sample trip. He also proposed destination hotel guides featuring rooms, amenities and services, plus videos about LGBTQ+ friendly destinations.",
          ],
          note: {
            summary: "Two ideas from the review",
            body: "Show the stops and experiences in a tailored itinerary. Introduce a destination through its best hotels, with a closer look at the rooms and amenities. Both formats help visitors explore the kind of trip Mr Hudson offers.",
          },
        },
        {
          label: "Making it practical",
          heading: "Start with the hotel footage already available.",
          paragraphs: [
            "Bastiaan liked the itinerary ideas but was not constantly travelling and filming. He had video from hotel partners and planned to begin there. Rahul supported that starting point, with original travel footage to follow when Bastiaan had it.",
          ],
        },
      ],
    },
    progress: {
      heading: "5,703 followers gained through daily outreach.",
      paragraphs: [
        "Mr Hudson gained 5,703 followers from 25 April 2025 to 25 May 2026. Its strongest period added 725 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 294,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 262,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 411,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 495,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 572,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 515,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 451,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 725,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 657,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 356,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 244,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 334,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 387,
        },
      ],
    },
    quote:
      "The itinerary ideas fitted the kind of trips we sell. I could start with hotel-partner videos and build towards filming more of our own trips.",
    quoteBy: "Bastiaan · Mr Hudson · June 2025",
    close: {
      heading: "Help more travellers discover the experiences you offer.",
      body: "Get help reaching your audience and turning your knowledge of places, hotels and trips into content worth exploring.",
    },
  },
  {
    slug: "jennifer-statler",
    niche: "Healthcare",
    nicheSlug: "healthcare",
    specialty: "Orthodontist · Boca Raton, Florida",
    title: "5,760 followers for Dr. Jennifer Statler.",
    intro:
      "We handled daily outreach for Jennifer’s orthodontic account. Tulsi reviewed her videos and suggested ways to answer common questions, show the people in the practice and make the content easier to watch.",
    name: "Dr. Jennifer Statler",
    handle: "statlerortho",
    gained: 5760,
    period: "25 Apr 2025 – 25 Sep 2026",
    start: {
      heading: "Introduce the orthodontist behind the practice.",
      paragraphs: [
        "Dr. Jennifer Statler is an orthodontist in Boca Raton, Florida. Her Instagram already included before-and-after posts and patient reviews, shared on a regular schedule.",
        "Tulsi’s review focused on the next layer: clearer videos, everyday questions about braces and aligners, and moments that introduced Jennifer and the people she works with.",
      ],
      audience: ["Boca Raton", "Braces & aligners", "Orthodontic care"],
    },
    approach: {
      heading: "Grow the audience. Make the practice easier to get to know.",
      paragraphs: [
        "We handled daily outreach alongside Tulsi’s content recommendations. When Jennifer asked about building on the growth in March 2026, Tulsi reviewed the account and increased the daily outreach.",
      ],
      manager: "Tulsi",
      managerFocus:
        "Daily outreach, clearer practice videos and patient questions",
      steps: [
        {
          label: "The videos",
          heading: "Make each video steadier and easier to watch.",
          paragraphs: [
            "Tulsi spotted shaky footage, distracting filters and empty borders around some Reels. She recommended using a tripod, keeping the frame clean and using carousels for still images rather than turning every image into a video.",
          ],
        },
        {
          label: "What to post",
          heading:
            "Answer common questions and show the people in the practice.",
          paragraphs: [
            "Tulsi suggested videos for people deciding between braces and aligners, alongside lighter moments from the office. One idea was a playful story about a lost aligner; another was a Reel showing the relationship between Jennifer and her colleagues.",
          ],
        },
      ],
    },
    progress: {
      heading: "5,760 followers gained through daily outreach.",
      paragraphs: [
        "Jennifer gained 5,760 followers from 25 April 2025 to 25 September 2026. Her strongest period added 585 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 194,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 303,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 439,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 585,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 537,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 523,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 512,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 451,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 367,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 291,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 268,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 265,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 90,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 303,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 281,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 213,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 138,
        },
      ],
    },
    quote:
      "I’ve been happy with the growth and wanted to keep building on it. Tulsi reviewed the account and increased the outreach when I asked about the next step.",
    quoteBy: "Dr. Jennifer Statler · Orthodontist · March 2026",
    close: {
      heading: "Help more people get to know your practice.",
      body: "Work with a Brand Manager on growing your audience and showing the expertise and people behind your work.",
    },
  },
  {
    slug: "luka-ljubas",
    niche: "Music & DJs",
    nicheSlug: "music-and-djs",
    specialty: "Classical violinist",
    title: "13,204 followers for Luka’s classical music.",
    intro:
      "Luka wanted music lovers, fellow musicians and concert organisers to discover his work. Sushmita helped shape the audience brief and suggested ways to show the preparation behind his performances.",
    name: "Luka Ljubas",
    handle: "lukaljubas",
    gained: 13204,
    period: "25 Apr 2025 – 25 Sep 2026",
    start: {
      heading: "Bring more listeners into the world of a violinist.",
      paragraphs: [
        "Luka plays solo concerts and chamber music alongside his work with the Vienna State Opera and Vienna Philharmonic. He wanted to build an audience for his concerts and attract interest from concert managements.",
        "His profile already introduced the musician clearly. The May 2024 review focused on what people could discover beyond the concert clips: rehearsals, practice routines and the stories behind a performance.",
      ],
      audience: [
        "Classical music listeners",
        "Musicians and music students",
        "Concert organisers",
      ],
    },
    approach: {
      heading: "Reach music audiences. Show the work behind the performance.",
      paragraphs: [
        "We handled daily outreach to people interested in classical music. In the May 2024 review, Sushmita suggested ways to present the performances and introduce the person preparing for them.",
      ],
      manager: "Sushmita",
      managerFocus:
        "Classical music audiences, performance clips and rehearsal stories",
      steps: [
        {
          label: "Getting discovered",
          heading:
            "Start with the people who listen, play and programme music.",
          paragraphs: [
            "Luka named music students, instrumentalists, singers, conductors, orchestras and concert managements as people he wanted to reach. He also asked to focus on Austria, Croatia and Japan. Those interests and countries gave the outreach a specific brief.",
          ],
        },
        {
          label: "On screen",
          heading: "Give the performance the full vertical frame.",
          paragraphs: [
            "Sushmita recommended presenting performance Reels in a vertical 9:16 format. She shared examples so Luka could see how a concert clip might fill the screen and keep the performance at the centre.",
          ],
        },
        {
          label: "Between concerts",
          heading: "Show what it takes to master a piece.",
          paragraphs: [
            "Sushmita suggested sharing rehearsal footage, practice routines and preparations for a concert. One idea paired a video of a challenging piece with a caption about the effort behind it, giving listeners more of the musician’s story.",
          ],
          note: {
            summary: "More from the music review",
            body: "Other ideas included memorable practice-session clips, personal reflections on music and live or recorded concerts for Instagram followers.",
          },
        },
      ],
    },
    progress: {
      heading: "13,204 followers gained through daily outreach.",
      paragraphs: [
        "Luka gained 13,204 followers through daily outreach from April 2025 to September 2026. The strongest recorded period, ending 25 September 2025, added 1,067 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 819,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 901,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 1035,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 1032,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 1067,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 836,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 1027,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 1012,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 825,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 757,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 0,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 471,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 567,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 977,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 700,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 718,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 460,
        },
      ],
    },
    quote:
      "The review gave me ideas beyond concert clips: rehearsals, practice routines and the story behind a piece. Sushmita helped me think about what a new listener could discover.",
    quoteBy: "Luka Ljubas · Violinist · May 2024",
    close: {
      heading: "Help more listeners discover your performances.",
      body: "Get support with reaching music audiences and showing the practice, preparation and personality behind your work.",
    },
  },
  {
    slug: "alia-luria",
    niche: "Authors",
    nicheSlug: "authors",
    specialty: "Science fiction, fantasy and essays",
    title: "4,033 followers for Alia’s writing.",
    intro:
      "Alia wanted readers and fellow writers to discover her work ahead of upcoming books. Aditi reviewed her profile and helped her think through shorter Reels, haikus and a launch countdown her publisher was sharing.",
    name: "Alia Luria",
    handle: "alialuria",
    gained: 4033,
    period: "25 Apr 2025 – 25 Aug 2026",
    start: {
      heading: "Build an audience before the next book arrives.",
      paragraphs: [
        "Alia writes science fiction, fantasy and essays. She wanted to reach writers interested in the craft and readers looking for book recommendations, while building an audience for upcoming releases.",
        "Her launch countdown used a curated series of photographs from Japan. Her publisher was sharing these posts, so keeping that sequence mattered. She was also making short haiku videos and returning to regular posting.",
      ],
      audience: [
        "Science fiction and fantasy readers",
        "Writers",
        "People looking for book recommendations",
      ],
    },
    approach: {
      heading: "Find readers. Make room for the writing and the launch.",
      paragraphs: [
        "We handled daily outreach to people interested in books and writing. Aditi reviewed the refreshed profile and suggested ways to use the writing, videos and launch material Alia already had.",
      ],
      manager: "Aditi",
      managerFocus:
        "Readers and writers, shorter Reels and the book-launch countdown",
      steps: [
        {
          label: "Getting discovered",
          heading: "Reach readers and fellow writers.",
          paragraphs: [
            "Alia described two reasons someone might follow: learning about being a writer and getting book recommendations from one. We used that brief for outreach while she prepared new books and the next instalment in her science-fiction and fantasy series.",
          ],
        },
        {
          label: "The videos",
          heading: "Turn the short haiku clips into Reels.",
          paragraphs: [
            "After reviewing longer videos, Aditi suggested shorter edits for Instagram. Alia already had short haiku videos in Stories, so Aditi recommended sharing those as Reels too. She also gave feedback on making the on-screen text easier to read.",
          ],
        },
        {
          label: "The book launch",
          heading: "Work with the countdown the publisher was already sharing.",
          paragraphs: [
            "Aditi initially suggested moving the countdown into Stories. Alia explained that her publisher was sharing the feed posts and she wanted to continue them. Aditi acknowledged that reason and supported adding haikus and other Reels alongside the countdown.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,033 followers gained through daily outreach.",
      paragraphs: [
        "Alia’s recorded total was 4,033 followers gained through daily outreach from April 2025 to August 2026. Those gains were recorded through January 2026; the seven later reporting periods recorded zero.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 425,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 401,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 597,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 468,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 372,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 455,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 607,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 601,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 107,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 0,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 0,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 0,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 0,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 0,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 0,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 0,
        },
      ],
      update: {
        heading: "Alia refreshed the name, bio and Highlights.",
        paragraphs: [
          "In February 2025, after receiving profile guidance, Alia confirmed that she had updated all three. Aditi’s follow-up review kept the author-focused bio and suggested personalised Highlight covers. Alia proposed covers that spelled out A L I A.",
        ],
      },
    },
    quote:
      "I wanted to keep the book countdown my publisher was sharing. Aditi worked with that, while suggesting shorter Reels and more of the haikus I was already making.",
    quoteBy: "Alia Luria · Author · February 2025",
    close: {
      heading: "Help more readers find your writing.",
      body: "Work with a Brand Manager on reaching your audience and sharing the books, ideas and process behind your work.",
    },
  },
  {
    slug: "ivan-mbakop",
    niche: "Film & acting",
    nicheSlug: "film-and-acting",
    specialty: "Actor, producer and filmmaking software creator",
    title: "3,771 followers for Ivan’s work in film.",
    intro:
      "Ivan wanted film fans, casting directors and filmmakers to discover his work. Rahul suggested content from his acting life, then helped him think through how software for filmmakers could fit the same story.",
    name: "Ivan Mbakop",
    handle: "imbakop",
    gained: 3771,
    period: "26 Jan 2026 – 25 Aug 2026",
    start: {
      heading: "Show the actor and the builder behind the filmmaking.",
      paragraphs: [
        "Ivan is an actor and producer. His audience brief included fans of his work, casting directors, filmmakers and other actors. He wanted people who cared about film to discover the account.",
        "By June 2026, he was also developing software for filmmakers. He was unsure how to talk about both parts of his work, particularly how AI-related software might be received by people in the film industry.",
      ],
      audience: ["Film fans", "Casting directors and filmmakers", "Actors"],
    },
    approach: {
      heading: "Reach film audiences. Give both sides of the work a place.",
      paragraphs: [
        "We handled daily outreach to people interested in film. Rahul offered ideas drawn from his acting life and later developed a direction that connected the film career with the software he was building.",
      ],
      manager: "Rahul",
      managerFocus:
        "Film audiences, acting content and the connection to filmmaking software",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep the audience rooted in film and acting.",
          paragraphs: [
            "Ivan was specific about who he wanted to reach: fans of his acting, casting directors, filmmakers and fellow actors. That gave the outreach a starting point connected to his professional work.",
          ],
        },
        {
          label: "The acting life",
          heading: "Give people a look beyond the finished role.",
          paragraphs: [
            "In the May 2024 review, Rahul suggested behind-the-scenes moments from sets, premieres and time with other actors. He also proposed day-in-the-life videos and a content calendar. Ivan said the review opened his eyes to more content types and wanted a sustainable way to make them.",
          ],
        },
        {
          label: "A wider story",
          heading: "Connect the acting and software through filmmaking.",
          paragraphs: [
            "In June 2026, Rahul suggested presenting both parts through Ivan’s experience as a storyteller. Acting posts could show role preparation and lessons from projects; software posts could explain why he was building the tools and which filmmaking problems he wanted to solve.",
          ],
        },
      ],
    },
    progress: {
      heading: "3,771 followers gained through daily outreach.",
      paragraphs: [
        "Ivan gained 3,771 followers through daily outreach across seven reporting periods from January to August 2026. The period ending 25 July 2026 added 672 followers.",
      ],
      months: [
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 363,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 622,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 496,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 575,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 501,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 672,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 542,
        },
      ],
    },
    quote:
      "Rahul took time to consider both parts of my work. His suggestions connected acting with software for filmmakers, giving me a way to think about what I could share.",
    quoteBy: "Ivan Mbakop · Actor and producer · June 2026",
    close: {
      heading: "Help people discover the work you want to be known for.",
      body: "Get support with reaching your audience and deciding how to present the different parts of your creative work.",
    },
  },
  {
    slug: "project-148",
    niche: "Art",
    nicheSlug: "art",
    specialty: "Fine art and custom jewellery · Los Angeles",
    title: "2,611 followers for David’s art and jewellery.",
    intro:
      "David wanted more people to discover the meaning behind his Jewish-inspired art and jewellery. Srishti worked with his audience suggestions, helped clarify the profile and proposed ways to tell the story behind each piece.",
    name: "David Fhima",
    business: "Project 148",
    handle: "project.148",
    gained: 2611,
    period: "26 Nov 2025 – 25 Jul 2026",
    start: {
      heading: "Let people discover the meaning behind the artwork.",
      paragraphs: [
        "David Fhima creates fine art, blessings and custom jewellery through Project 148. He wanted to build a community around modern Jewish art and the spiritual ideas behind his work.",
        "He was developing the business alongside other work, with a jewellery website still being prepared. His Instagram needed to introduce what he made and give people more of the story behind the finished pieces.",
      ],
      audience: [
        "Jewish art enthusiasts",
        "Calligraphy and spiritual art",
        "Custom jewellery",
      ],
    },
    approach: {
      heading: "Find art audiences. Explain the piece as well as showing it.",
      paragraphs: [
        "We handled daily outreach while Srishti worked with David on the art accounts to explore, the profile introduction and ways to explain his creative process.",
      ],
      manager: "Srishti",
      managerFocus: "Art audiences, the profile and stories behind the pieces",
      steps: [
        {
          label: "Getting discovered",
          heading: "Use David’s art references to refine the audience brief.",
          paragraphs: [
            "David suggested accounts connected to his work, including @thejerusalemscribe, @akivacalligraphy and @kameart.co. Srishti agreed to include the new accounts in audience tests. The brief stayed focused on people interested in the art and the ideas behind it.",
          ],
        },
        {
          label: "The profile",
          heading: "Name the art and jewellery clearly.",
          paragraphs: [
            "Srishti recommended adding “Fine Art & Custom Jewellery” beside David’s name. She also suggested a bio that explained the Jewish-inspired work and directed people towards the website, with the shop still being prepared.",
          ],
        },
        {
          label: "Behind the art",
          heading: "Follow the making process with the meaning.",
          paragraphs: [
            "In March 2026, Srishti proposed pairing a Reel of David making a piece with another explaining its inspiration, symbolism or message. She also suggested introducing the jewellery through its design process and the stories behind the collection.",
          ],
        },
      ],
    },
    progress: {
      heading: "2,611 followers gained through daily outreach.",
      paragraphs: [
        "Project 148 gained 2,611 followers through daily outreach from November 2025 to July 2026. Its strongest recorded period, ending 25 April 2026, added 527 followers.",
      ],
      months: [
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 183,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 190,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 363,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 468,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 527,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 127,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 402,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 351,
        },
      ],
      update: {
        heading: "David updated the name and bio.",
        paragraphs: [
          "In January 2026, David confirmed the changes were live. Srishti reviewed the updated profile before moving on to content ideas for the art and jewellery.",
        ],
      },
    },
    quote:
      "Srishti helped make the art and jewellery clearer in my profile. I updated the name and bio, then we worked on ways to explain the meaning behind each piece.",
    quoteBy: "David Fhima · Project 148 · January 2026",
    close: {
      heading: "Help people discover the story behind what you make.",
      body: "Work with a Brand Manager on reaching art audiences and presenting your craft, ideas and collections.",
    },
  },
  {
    slug: "coco-celeste",
    niche: "Fitness",
    nicheSlug: "fitness",
    specialty: "Running & strength coaching",
    title: "9,427 followers for Coco’s running and strength coaching.",
    intro:
      "Coco was sharing her Ironman training and life as an endurance athlete. Aditi helped her make the coaching offer easier to find and suggested posts that brought runners into the conversation.",
    name: "Coco Celeste",
    handle: "cococelestefit",
    gained: 9427,
    period: "25 Apr 2025 – 25 Sep 2026",
    start: {
      heading: "Show the coach behind the training.",
      paragraphs: [
        "Coco’s Instagram combined running, strength training and the preparation for an Ironman. Her Reels already showed workouts and training milestones, with personal stories alongside the sport.",
        "She wanted more people to see and interact with her posts. The review focused on making her role as an online running and strength coach more visible, while keeping the training journey that gave the page its personality.",
      ],
      audience: ["Runners", "Strength training", "Endurance sport"],
    },
    approach: {
      heading: "Keep the athlete’s story. Bring the coaching into view.",
      paragraphs: [
        "We handled daily outreach for Coco’s fitness account. Aditi reviewed the profile and content, then suggested ways to connect her training journey with the coaching she offered and give runners more reasons to take part.",
      ],
      manager: "Aditi",
      managerFocus:
        "A clearer coaching profile, training stories and ideas for runner participation",
      steps: [
        {
          label: "The profile",
          heading: "Make the coaching offer easy to spot.",
          paragraphs: [
            "Aditi recommended “Running & Strength Coach” in the name field and a bio that put online coaching, endurance training and the coaching link together. She also suggested organising Highlights around Coco’s story, training, coaching tips and race days.",
          ],
          note: {
            summary: "A place for the story and the service",
            body: "“Meet Coco” could introduce her fitness journey and why she coaches. Training and Tips & Coaching could hold useful lessons, while Wins & Races could collect the milestones.",
          },
        },
        {
          label: "What to post",
          heading: "Turn training updates into lessons and conversations.",
          paragraphs: [
            "Aditi suggested short coaching tips, form drills and behind-the-scenes Ironman diaries alongside Coco’s training clips. Questions such as “What’s your biggest running struggle?” and a shared 5K challenge gave her concrete ways to invite runners into the posts.",
          ],
          note: {
            summary: "Ideas to try between training sessions",
            body: "Explain one running-form point. Share a moment from Ironman preparation. Ask a training question in Stories or invite runners to tag Coco in their own 5K.",
          },
        },
      ],
    },
    progress: {
      heading: "9,427 followers gained through daily outreach.",
      paragraphs: [
        "Coco gained 9,427 followers through daily outreach from April 2025 to September 2026. The strongest recorded period, ending 25 July 2026, added 1,268 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 695,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 723,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 689,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 588,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 714,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 924,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 851,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 737,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 645,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 506,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 402,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 23,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 0,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 140,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 1268,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 513,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 9,
        },
      ],
    },
    quote:
      "I made some of the profile changes, and the content advice gave me more to work with: coaching tips, training diaries and ways to get runners involved.",
    quoteBy: "Coco Celeste · Running and strength coach · August 2025",
    close: {
      heading: "Help more runners discover the way you coach.",
      body: "Work with a Brand Manager on reaching new people and showing the knowledge behind your training.",
    },
  },
  {
    slug: "magda-kern",
    niche: "Business",
    nicheSlug: "business",
    specialty: "Public-speaking trainer",
    title: "1,406 followers for Magda’s public-speaking advice.",
    intro:
      "Magda wanted to grow an audience for her public-speaking advice. Tulsi worked with her on who to reach, suggested a tighter bio and gave her a way to compare the paid boosts she ran herself.",
    name: "Magda Kern",
    handle: "publicspeakingwizard",
    gained: 1406,
    period: "25 Mar 2025 – 25 Nov 2025",
    start: {
      heading: "Find people who could use her speaking advice.",
      paragraphs: [
        "Magda teaches public speaking and presentation skills. Her Instagram already had educational Reels, a clear professional identity and organised Highlights.",
        "She was also testing paid boosts herself, including campaigns aimed at women in Europe. For our outreach, she made a separate request: avoid other public-speaking, storytelling, communication and stress-management trainers.",
      ],
      audience: [
        "Public speaking",
        "Presentation skills",
        "Professional communication",
      ],
    },
    approach: {
      heading: "Clarify who to reach and how to judge the response.",
      paragraphs: [
        "We handled daily outreach while Tulsi reviewed the profile and discussed Magda’s audience choices. The work included her competitor exclusions and advice for comparing the paid campaigns she managed herself.",
      ],
      manager: "Tulsi",
      managerFocus:
        "Reaching potential learners, a clearer bio and advice on her paid boosts",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep competing trainers out of the outreach brief.",
          paragraphs: [
            "Magda named four groups she did not want us to follow: public-speaking, storytelling, communication and stress-management trainers. Tulsi acknowledged the request and agreed to use it when selecting people for outreach.",
          ],
        },
        {
          label: "The bio",
          heading: "Give visitors a shorter introduction to the training.",
          paragraphs: [
            "Tulsi proposed a concise bio around speaking with confidence, managing presentation stress and a clear next step. Magda made her own adjustments, keeping wording that better reflected the full scope of her work.",
          ],
        },
        {
          label: "Paid boosts",
          heading: "Compare the people reached, as well as the likes.",
          paragraphs: [
            "When Magda asked about different countries, Tulsi suggested comparing cost per new follower, the profiles arriving and engagement. Magda had launched a 27 CHF test aimed at women in several European countries; the advice gave her specific things to review when it finished.",
          ],
          note: {
            summary: "Three questions for the comparison",
            body: "What did each new follower cost? Were the new profiles people she wanted to reach? How did they interact with the posts? The campaigns were run by Magda; Ignited supplied the review advice.",
          },
        },
      ],
    },
    progress: {
      heading: "1,406 followers gained through daily outreach.",
      paragraphs: [
        "Magda gained 1,406 followers through daily outreach from March to November 2025. The period ending 25 July 2025 added 237 followers.",
      ],
      months: [
        {
          dates: "25 Mar 2025 – 24 Apr 2025",
          followers: 137,
        },
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 165,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 192,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 237,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 152,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 164,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 166,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 193,
        },
      ],
    },
    quote:
      "I was testing boosts myself. Tulsi helped me compare audiences beyond likes and work through who we should—and shouldn’t—include in the outreach for my public-speaking work.",
    quoteBy: "Magda Kern · Public-speaking trainer · May 2025",
    close: {
      heading: "Help more people discover what you can teach them.",
      body: "Get support with outreach, your profile and the choices you make as you grow.",
    },
  },
  {
    slug: "richie-norton",
    niche: "Wellness",
    nicheSlug: "wellness",
    specialty: "Movement, breathwork & mindset coaching",
    title: "4,150 followers for Richie’s coaching.",
    intro:
      "Richie wanted a wider audience for his movement, breathwork and mindset coaching. Rahul worked through the audience brief and used Richie’s own Reels to explain how different shots could show more of each session.",
    name: "Richie Norton",
    handle: "richienorton_",
    gained: 4150,
    period: "12 recorded periods · 11 Mar 2025 – 25 May 2026",
    start: {
      heading: "Build an audience around the way he coaches.",
      paragraphs: [
        "Richie is a former rugby player whose coaching combines yoga, breathing practices, mobility, movement and mindset work. He wanted to build his personal brand globally, with coaching, courses and other services as the business goal.",
        "He was already posting yoga sessions and other coaching content. Alongside reaching more people, he welcomed feedback on how to improve the profile and the videos he was making.",
      ],
      audience: [
        "Movement & fitness",
        "Breathwork & mindset",
        "Performance & leadership",
      ],
    },
    approach: {
      heading: "Refine the audience. Show more of each session.",
      paragraphs: [
        "We handled daily outreach while Rahul reviewed Richie’s content and worked through his audience preferences. That meant a more specific brief for prospective coaching clients and practical feedback on footage he already had.",
      ],
      manager: "Rahul",
      managerFocus:
        "A more specific coaching audience and video feedback using Richie’s own Reels",
      steps: [
        {
          label: "Getting discovered",
          heading: "Focus on men interested in sport, fitness and mindset.",
          paragraphs: [
            "In July 2025, Richie asked to focus on men interested in sports, mindset, breathwork, fitness and leadership. Rahul prepared a revised outreach list around those interests, with additional checks intended to exclude competing coaches and practitioners.",
          ],
        },
        {
          label: "The videos",
          heading: "Show a session through more than one shot.",
          paragraphs: [
            "Rahul compared a single-clip Reel with one where Richie had already combined several clips. He suggested mixing close-ups, wider views and different angles, using an example from Richie’s own page to show how a session could unfold on screen.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,150 followers gained through daily outreach.",
      paragraphs: [
        "Richie gained 4,150 followers through daily outreach across 12 recorded periods between March 2025 and May 2026. The strongest recorded period, ending 25 December 2025, added 476 followers.",
      ],
      months: [
        {
          dates: "11 Mar 2025 – 10 Apr 2025",
          followers: 240,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 225,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 185,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 330,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 396,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 464,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 476,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 438,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 421,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 308,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 305,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 362,
        },
      ],
    },
    quote:
      "I wanted to reach people interested in my coaching. Rahul helped work through that audience brief and gave me specific ideas using Reels I’d already made.",
    quoteBy: "Richie Norton · Coach · February–August 2025",
    close: {
      heading: "Help more people discover your coaching.",
      body: "Work with a Brand Manager on reaching your audience and making more of the content you already create.",
    },
  },
  {
    slug: "comfort-is-created",
    niche: "Real estate",
    nicheSlug: "real-estate",
    specialty: "Real estate & design · Fort Worth, Texas",
    title: "4,429 followers for Caroline’s homes and design ideas.",
    intro:
      "Caroline wanted to reach women buying and decorating homes in Texas. Aditi worked from that local brief and suggested ways to make her house tours, design advice and Fort Worth recommendations easier to enjoy.",
    name: "Caroline Parrish",
    handle: "comfortiscreated",
    gained: 4429,
    period: "25 Apr 2025 – 25 Aug 2026",
    start: {
      heading: "Reach women at the start of their homeowner journey.",
      paragraphs: [
        "Caroline combines real estate and design in Fort Worth. Her ideal follower was a woman buying a home, decorating a recent purchase or looking for insight into the Fort Worth–Dallas property market.",
        "Her posts already featured homes, neighbourhoods, shops, restaurants and artists. She wanted an audience that shared those interests, with Fort Worth–Dallas first and other Texas cities also in the brief.",
      ],
      audience: [
        "Fort Worth–Dallas homebuyers",
        "New Texas homeowners",
        "Interiors & local places",
      ],
    },
    approach: {
      heading: "Find the local audience. Give the homes room to be seen.",
      paragraphs: [
        "We handled daily outreach to people interested in Texas homes and design. Aditi reviewed her videos and suggested steadier tours, useful design tips and more ways to share the places she knew.",
      ],
      manager: "Aditi",
      managerFocus:
        "Texas home audiences, steadier tours and local design stories",
      steps: [
        {
          label: "Getting discovered",
          heading: "Start with the Texas homebuyer Caroline had in mind.",
          paragraphs: [
            "Caroline described women aged 25–35 buying or decorating homes, especially around Fort Worth and Dallas. She also named Austin, Houston and San Antonio. Aditi used those details to shape the outreach brief and agreed to add @candysdirt at Caroline’s request.",
          ],
        },
        {
          label: "The house tours",
          heading: "Slow the clips down and steady the camera.",
          paragraphs: [
            "In one Reel, the clips moved too quickly for viewers to take in what Caroline was showing. Aditi recommended steadier shots and better camera angles, with a video example to make the feedback easy to picture.",
          ],
        },
        {
          label: "What to share",
          heading: "Turn design knowledge and local visits into useful posts.",
          paragraphs: [
            "Aditi suggested interior-design tips, house tours and recommendations from restaurants Caroline visited. For local food videos, she recommended naming the place and location, sharing what to order and trying a voiceover with subtitles.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,429 followers gained through daily outreach.",
      paragraphs: [
        "Caroline gained 4,429 followers through daily outreach from 25 April 2025 to 25 August 2026. Her strongest recorded period added 523 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 198,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 188,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 126,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 159,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 338,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 261,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 385,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 290,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 241,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 307,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 214,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 195,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 208,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 336,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 523,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 460,
        },
      ],
    },
    quote:
      "The feedback was specific to my work: interiors, Fort Worth and the places I share. The examples made it easier to picture what I could post next.",
    quoteBy: "Caroline Parrish · Comfort Is Created · August 2024",
    close: {
      heading: "Help more local people discover your point of view.",
      body: "Get support with reaching your audience and sharing the homes, places and advice you know best.",
    },
  },
  {
    slug: "winston-studio",
    niche: "Hair & beauty",
    nicheSlug: "hair-and-beauty",
    specialty: "Barber & lifestyle brand · Scandinavia",
    title: "4,635 followers for Winston Studio’s barbering brand.",
    intro:
      "Winston Studio wanted to reach beyond Denmark as it planned studios in Sweden and Norway. Shama helped shape the outreach brief and suggested ways to show the consultations, cuts and experience behind the brand.",
    name: "Stephen",
    business: "Winston Studio",
    handle: "winstonstudiodk",
    gained: 4635,
    period: "15 recorded periods · 25 Apr 2025 – 25 Sep 2026",
    start: {
      heading: "Introduce the studios to people in the next markets.",
      paragraphs: [
        "Winston Studio is a Scandinavian barber and lifestyle brand. Stephen first asked about reaching more people in Aarhus, Denmark. In April 2025, he expanded the brief to Sweden and Norway alongside Denmark, with new studios planned in those countries.",
        "The page already had a strong visual style and a BARBERTALKS series. Shama’s advice built on that identity, with more ways to show the barbers at work and help visitors explore the studios.",
      ],
      audience: ["Denmark", "Sweden & Norway", "Men’s haircuts & grooming"],
    },
    approach: {
      heading: "Grow the audience around the places and the craft.",
      paragraphs: [
        "We managed daily outreach while Shama worked with Stephen on the locations to reach. Her recommendations connected that brief with videos of the barbering process and clearer information for someone considering a visit.",
      ],
      manager: "Shama",
      managerFocus:
        "Scandinavian audiences, barbering stories and studio information",
      steps: [
        {
          label: "Getting discovered",
          heading: "Build the brief around Denmark, Sweden and Norway.",
          paragraphs: [
            "When Stephen asked to reach Aarhus, Shama asked for accounts from the area to guide the outreach. As the expansion plans grew, she agreed to refine the brief for Sweden and Norway while keeping Denmark in focus.",
          ],
        },
        {
          label: "The barbering stories",
          heading: "Show the consultation, the cut and the reaction.",
          paragraphs: [
            "Building on the existing BARBERTALKS series, Shama suggested a transformation series: begin with the consultation, follow the haircut or beard grooming, then show the finished look and the client’s reaction. Earlier ideas included demonstrations of mullets and low fades.",
          ],
        },
        {
          label: "The profile",
          heading: "Give new visitors the details for a studio visit.",
          paragraphs: [
            "Shama suggested adding “Scandinavian Barber” to the name field and a booking invitation to the bio. For Highlights, she recommended gathering the studio addresses, opening hours and booking details in one place, alongside cuts, reviews and moments inside the studios.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,635 followers gained through daily outreach.",
      paragraphs: [
        "Winston Studio gained 4,635 followers through daily outreach across 15 recorded periods between 25 April 2025 and 25 September 2026. Its strongest recorded period added 525 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 191,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 311,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 479,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 332,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 130,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 297,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 171,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 436,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 221,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 130,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 259,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 525,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 523,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 251,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 379,
        },
      ],
    },
    quote:
      "We wanted to reach Denmark, Sweden and Norway as we planned new studios. Shama helped shape that brief and suggested ways to show the cuts, consultations and studio experience.",
    quoteBy: "Stephen · Winston Studio · April 2025",
    close: {
      heading: "Help more people discover the work behind your studio.",
      body: "Work with a Brand Manager on local outreach and content that shows your skills, spaces and style.",
    },
  },
  {
    slug: "beard-octane",
    niche: "Products",
    nicheSlug: "products",
    specialty: "Family-owned beard-care brand · USA",
    title: "3,194 followers for Beard Octane’s handcrafted products.",
    intro:
      "Beard Octane wanted more men who cared about beard grooming to discover its products. Rahul worked through the audience brief and suggested practical videos showing how the products fit into a daily routine.",
    name: "Joseph",
    business: "Beard Octane",
    handle: "beardoctane",
    photo: "/audiences/journey-v2/results/products/beardoctane-avatar.png",
    gained: 3194,
    period: "9 recorded periods · 11 Mar 2025 – 25 Feb 2026",
    start: {
      heading: "Reach the people who would use the products.",
      paragraphs: [
        "Beard Octane is a family-owned business that makes its beard-care products in-house. Joseph wanted to grow an audience of men with beards, with interests including barbecuing, woodworking and American-made products.",
        "The account already shared product photos, videos and glimpses behind the business. The next opportunity was to make more posts useful to someone caring for a beard, while keeping the brand’s personality.",
      ],
      audience: [
        "Men with beards in the USA",
        "Barbers & shop owners",
        "Beard care & grooming",
      ],
    },
    approach: {
      heading: "Reach beard-care audiences. Show the products in use.",
      paragraphs: [
        "We handled daily outreach while Rahul worked with Joseph on the audience and reviewed the content. His suggestions focused on clearer video openings and practical demonstrations that went beyond showing a product on its own.",
      ],
      manager: "Rahul",
      managerFocus:
        "US beard-care audiences, routine videos and clearer product posts",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep the brief focused on beards and barbering in the US.",
          paragraphs: [
            "Joseph’s brief started with bearded men aged 30–45 and interests such as barbecuing and woodworking. In July 2025, he clarified that the outreach should focus on men with beards, barbers and shop owners in the US, while avoiding competing beard-product brands. Rahul agreed to review and refine it.",
          ],
        },
        {
          label: "The videos",
          heading: "Put the reason to watch at the beginning.",
          paragraphs: [
            "In a product-unboxing Reel, the question “What’s in the box?” appeared near the end. Rahul suggested moving it to the opening so viewers knew what to look for. Later feedback returned to the same idea: make the subject clear in the first few seconds.",
          ],
        },
        {
          label: "What to demonstrate",
          heading: "Show how the products fit into a beard-care routine.",
          paragraphs: [
            "Rahul suggested step-by-step videos showing beard washing, applying oil and using a comb or brush. Other ideas included beard-care mistakes, styling tips and funny everyday beard moments, giving the brand more to share alongside products and events.",
          ],
        },
      ],
    },
    progress: {
      heading: "3,194 followers gained through daily outreach.",
      paragraphs: [
        "Beard Octane gained 3,194 followers through daily outreach across nine recorded periods between 11 March 2025 and 25 February 2026. Its strongest recorded period added 512 followers.",
      ],
      months: [
        {
          dates: "11 Mar 2025 – 10 Apr 2025",
          followers: 243,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 240,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 238,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 471,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 340,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 352,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 512,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 375,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 423,
        },
      ],
    },
    quote:
      "The feedback gave us practical ideas beyond product shots: beard-care routines, styling tips and how to start our videos. We could see more ways to show the products.",
    quoteBy: "Joseph · Beard Octane · June 2025",
    close: {
      heading: "Help more people discover and understand your products.",
      body: "Get support with reaching your audience and creating content that shows where your products fit in their day.",
    },
  },
  {
    slug: "sanjeev-poudel",
    niche: "Photography",
    nicheSlug: "photography",
    specialty: "Wildlife and nature photography",
    title: "10,790 followers for Sanjeev’s wildlife photography.",
    intro:
      "Sanjeev wanted nature lovers to discover his photographs while he worked towards making photography his profession. Rahul tested wildlife audiences and suggested ways to share the patience, preparation and moments behind each image.",
    name: "Sanjeev Poudel",
    handle: "shutteredbysanjeev",
    gained: 10790,
    period: "26 Jul 2025 – 25 Sep 2026",
    start: {
      heading: "Build an audience around the wildlife he loves to photograph.",
      paragraphs: [
        "Sanjeev photographs birds, animals and landscapes. Photography was still a hobby, but he wanted to build a following before a future move into professional work. His audience was people who enjoyed nature, birds and wildlife photography.",
        "He wanted to show animals and birds behaving naturally. The photographs came first; the opportunity was to help viewers see more of what happened before the shutter clicked.",
      ],
      audience: [
        "Nature lovers",
        "Bird and wildlife enthusiasts",
        "Wildlife photographers",
      ],
    },
    approach: {
      heading: "Find wildlife audiences. Share the story behind the shot.",
      paragraphs: [
        "We handled daily outreach to people interested in wildlife photography. Rahul reviewed which photography audiences brought followers and gave Sanjeev ideas that fitted his trips, photographs and pace of becoming a professional.",
      ],
      manager: "Rahul",
      managerFocus:
        "Wildlife audiences, captions and the moments behind the photographs",
      steps: [
        {
          label: "Getting discovered",
          heading: "Reach people already following wildlife photographers.",
          paragraphs: [
            "Our reviews included audiences following @wildlifebykishore, @mathiphotography and @ttswildframes. Sanjeev regularly suggested more photographers. Rahul used the responses to decide which audiences to keep reaching and which to test next.",
          ],
          note: {
            summary: "A closer look at the audience review",
            body: "By November 2025, Rahul had tested 66 photography accounts. He shared the accounts bringing the strongest response and explained that further suggestions would be tested gradually.",
          },
        },
        {
          label: "Behind the photograph",
          heading: "Show the waiting, the setup and the moment.",
          paragraphs: [
            "Rahul suggested captions about what it took to get a photograph, alongside clips of setting up the camera, tracking a bird or waiting for the right shot. Later feedback encouraged Sanjeev to turn raw moments he already shared in Stories into Reels.",
          ],
        },
        {
          label: "The profile",
          heading: "Keep the profile in step with the photographer’s plans.",
          paragraphs: [
            "Rahul suggested Highlights for wildlife, landscapes, gear and the photographer behind the work. When Sanjeev chose to postpone a more business-focused bio until his website and professional plans were ready, Rahul supported keeping the current bio for the time being.",
          ],
        },
      ],
    },
    progress: {
      heading: "10,790 followers gained through daily outreach.",
      paragraphs: [
        "Sanjeev gained 10,790 followers through daily outreach from July 2025 to September 2026. The strongest recorded period, ending 25 May 2026, added 969 followers.",
      ],
      months: [
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 577,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 880,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 850,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 908,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 731,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 717,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 776,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 577,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 948,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 969,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 861,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 744,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 677,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 575,
        },
      ],
      update: {
        heading: "More descriptive captions and footage from his trips.",
        paragraphs: [
          "In June 2025, Sanjeev confirmed that he had started writing more descriptive captions and filming during his trips for future Reels. By November, Rahul also confirmed that Sanjeev had added new Highlights.",
        ],
      },
    },
    quote:
      "I started writing more descriptive captions and filming on my trips. Rahul’s suggestions gave me ways to show the patience and moments behind the photographs, while keeping nature at the centre.",
    quoteBy: "Sanjeev Poudel · Photographer · June 2025",
    close: {
      heading: "Help more people discover your view of the natural world.",
      body: "Get support with reaching photography audiences and sharing the stories behind your images.",
    },
  },
  {
    slug: "petri-paronen",
    niche: "Tattoo",
    nicheSlug: "tattoo",
    specialty: "Realistic tattoo artist · Helsinki",
    title: "4,298 followers for Petri’s tattoo work.",
    intro:
      "Petri wanted more tattoo lovers and potential clients to discover his work. Shama helped clarify the Helsinki studio profile and suggested videos that showed the tattoo, the process and the person getting it.",
    name: "Petri Paronen",
    handle: "petri_paronen_tattoos",
    gained: 4298,
    period: "25 Jun 2025 – 25 Mar 2026",
    start: {
      heading: "Show the tattoo work and where to find the artist.",
      paragraphs: [
        "Petri creates realistic and black-and-grey tattoos at Pete’s Tattoo Studio in Helsinki. His main goal was to reach potential clients in Finland, with tattoo enthusiasts in Sweden and Norway also part of the audience he wanted to build.",
        "After moving from Hamina to Helsinki, the account needed to introduce the studio clearly. The review also looked at how a new visitor could explore the designs and picture the tattooing experience.",
      ],
      audience: [
        "Tattoo clients in Finland",
        "Tattoo enthusiasts in Sweden and Norway",
        "Realistic and black-and-grey tattoos",
      ],
    },
    approach: {
      heading:
        "Reach tattoo audiences. Make the studio and process easy to explore.",
      paragraphs: [
        "We handled daily outreach around Petri’s tattoo audience. Shama reviewed the name, bio and Highlights, then gave feedback on the way his Reels showed the work.",
      ],
      manager: "Shama",
      managerFocus:
        "Tattoo audiences, the Helsinki studio and videos of the work",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep potential clients in Finland at the centre.",
          paragraphs: [
            "Petri wanted a larger audience, with people who might visit the studio as his main focus. His request also included tattoo lovers in Sweden and Norway. Those priorities guided the outreach around his tattoo work.",
          ],
        },
        {
          label: "The profile",
          heading: "Put the tattoo style and Helsinki studio up front.",
          paragraphs: [
            "Shama suggested adding the tattoo speciality beside Petri’s name and keeping the studio, Helsinki location and booking route clear in the bio. For Highlights, she proposed tattoo stories, the studio, behind-the-scenes work and healed tattoos or client experiences.",
          ],
        },
        {
          label: "The videos",
          heading: "Open with the tattoo, then show it in motion.",
          paragraphs: [
            "One Reel began with a black screen; another used still images. Shama recommended a stronger first frame and video clips from different angles. She also suggested taking viewers from a client’s initial idea through moments of the tattooing process.",
          ],
          note: {
            summary: "An idea from the content review",
            body: "Begin with a short glimpse of the consultation, show how the idea takes shape, then add clips from the session. A short on-screen line can explain whose tattoo story the viewer is watching.",
          },
        },
      ],
    },
    progress: {
      heading: "4,298 followers gained through daily outreach.",
      paragraphs: [
        "Petri gained 4,298 followers through daily outreach from June 2025 to March 2026. The period ending 25 November 2025 added 671 followers.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 464,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 553,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 647,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 369,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 671,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 432,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 541,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 411,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 210,
        },
      ],
    },
    quote:
      "The review gave me specific changes for my tattoo profile—how to describe the work and what to put in Highlights. I made the changes after going through it.",
    quoteBy: "Petri Paronen · Tattoo artist · May 2025",
    close: {
      heading: "Help more tattoo lovers discover your work.",
      body: "Work with a Brand Manager on reaching your audience and showing your style, studio and process.",
    },
  },
  {
    slug: "xcluzive",
    niche: "Music & DJs",
    nicheSlug: "music-and-djs",
    specialty: "Music producer and beat maker",
    title: "3,855 followers for XcluZive’s beats.",
    intro:
      "Andre wanted people interested in his beats to find his music and website. Tulsi reviewed producer audiences, responded to his request to reach recording artists and suggested more ways to use his studio sessions.",
    name: "Andre",
    business: "XcluZive",
    handle: "xcluzive",
    gained: 3855,
    period: "25 Jun 2025 – 25 Jan 2026",
    start: {
      heading: "Reach the artists who could use his beats.",
      paragraphs: [
        "Andre makes music as XcluZive and sells beats through his website. He wanted Instagram to bring people who were interested in that work, with recording artists and later R&B artists becoming a more specific focus.",
        "He was already posting studio sessions, mixing and collaborations. The content review looked at how he could show more of his creativity using the studio he already had.",
      ],
      audience: [
        "Recording artists",
        "R&B artists",
        "People interested in beats and production",
      ],
    },
    approach: {
      heading:
        "Refine the music audience. Give the studio content more variety.",
      paragraphs: [
        "We handled daily outreach around music accounts. Tulsi reviewed the audiences bringing followers and gave Andre ideas for Reels he could make while working on music.",
      ],
      manager: "Tulsi",
      managerFocus:
        "Music audiences, recording artists and ideas from the studio",
      steps: [
        {
          label: "Getting discovered",
          heading: "Focus the plan on recording artists.",
          paragraphs: [
            "Early reviews included audiences following producers such as @gogrizzly and @beatsbymantra. Andre later asked to focus on recording artists rather than producers, then specifically R&B artists. Tulsi agreed to adjust the outreach and asked for examples of the accounts he wanted to reach.",
          ],
        },
        {
          label: "In the studio",
          heading: "Turn a studio session into more than one kind of post.",
          paragraphs: [
            "Tulsi suggested song or genre mashups, real-time beat-making challenges and short teasers for upcoming music. These were ideas Andre could film in his own studio alongside the sessions and collaborations he already shared.",
          ],
        },
        {
          label: "The Reel covers",
          heading: "Tell people what they are about to hear.",
          paragraphs: [
            "Tulsi recommended adding a short line of text to Reel covers so each video had a clearer introduction. The review also encouraged a manageable return to posting, beginning with two pieces of content a week.",
          ],
        },
      ],
    },
    progress: {
      heading: "3,855 followers gained through daily outreach.",
      paragraphs: [
        "XcluZive gained 3,855 followers through daily outreach from June 2025 to January 2026. The period ending 25 December 2025 added 735 followers.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 218,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 544,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 680,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 692,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 582,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 735,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 404,
        },
      ],
    },
    quote:
      "I was already sharing studio sessions. Tulsi gave me more to work with—mashups, beat-making challenges and teasers I could film in the studio. The ideas felt practical.",
    quoteBy: "Andre · XcluZive · September 2024",
    close: {
      heading: "Help more artists discover your sound.",
      body: "Get support with reaching music audiences and showing what you create in the studio.",
    },
  },
  {
    slug: "home-room-co",
    niche: "Art",
    nicheSlug: "art",
    specialty: "Educational artwork for children",
    title: "2,183 followers for Home Room Co.’s artwork.",
    intro:
      "Channing wanted parents to discover artwork made for children’s rooms and learning spaces. Aditi worked through the audience she wanted to reach and suggested simpler ways to show the art at home.",
    name: "Channing",
    business: "Home Room Co.",
    handle: "homeroomco_",
    gained: 2183,
    period: "25 Apr 2025 – 25 Sep 2026",
    start: {
      heading: "Help parents picture the artwork in their own homes.",
      paragraphs: [
        "Home Room Co. makes educational artwork for children. Channing wanted to reach mothers of babies and young children, including homeschooling parents and people planning playrooms or learning spaces.",
        "Creating posts was taking time, especially when she had no new product photos or videos. She asked for ideas she could make more easily while still showing how the artwork fitted into family life.",
      ],
      audience: [
        "Parents of babies and young children",
        "Homeschooling families",
        "Playroom and children’s room décor",
      ],
    },
    approach: {
      heading:
        "Reach parent audiences. Make more of the artwork already available.",
      paragraphs: [
        "We handled daily outreach while Aditi worked with Channing on the parenting audiences to reach. The content review focused on showing the artwork in real rooms and offering ideas that did not need a new product shoot every time.",
      ],
      manager: "Aditi",
      managerFocus:
        "Parent audiences, room transformations and simpler content ideas",
      steps: [
        {
          label: "Getting discovered",
          heading: "Use the parenting brands her audience already follows.",
          paragraphs: [
            "Channing named Lovevery, Babylist, Motherly, Lalo and Pottery Barn Kids as examples of where her audience spent time. She also described interests such as school preparation, playroom décor and educational art. These details gave Aditi a more specific direction for the outreach.",
          ],
        },
        {
          label: "The artwork at home",
          heading: "Show the change from a blank wall to a finished space.",
          paragraphs: [
            "Aditi suggested a simple before-and-after Reel: start with a plain wall or corner, then show it styled with the artwork. Other ideas showed the prints in real rooms and children using them, helping a parent picture the product in daily life.",
          ],
        },
        {
          label: "Between product shoots",
          heading:
            "Use simple carousels and graphics for the days without new photos.",
          paragraphs: [
            "Aditi proposed posts built around familiar parenting moments, such as choosing outdoor activities or asking about a child’s favourite show. She also suggested word-search graphics. These could use the brand’s colours and artwork without requiring a fresh product video.",
          ],
        },
      ],
    },
    progress: {
      heading: "2,183 followers gained through daily outreach.",
      paragraphs: [
        "Home Room Co. gained 2,183 followers through daily outreach from April 2025 to September 2026.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 115,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 93,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 95,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 109,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 167,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 146,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 107,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 208,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 212,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 166,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 137,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 135,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 142,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 115,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 99,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 112,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 25,
        },
      ],
    },
    quote:
      "I needed ideas I could make without a new product shoot. Aditi suggested room transformations, simple carousels and ways to show the artwork being used at home.",
    quoteBy: "Channing · Home Room Co. · July 2025",
    close: {
      heading: "Help more parents discover your artwork.",
      body: "Get support with reaching parents and showing how your products fit into family life.",
    },
  },
  {
    slug: "gosia-yogini",
    niche: "Yoga",
    nicheSlug: "yoga",
    specialty: "Yoga & fitness for women 40+",
    title: "4,469 followers for Gosia’s yoga and fitness.",
    intro:
      "Gosia wanted to encourage women to stay active at any age. Sushmita helped her introduce that purpose in the profile and suggested ways to share the person behind the yoga and bodyweight drills.",
    name: "Gosia W",
    handle: "gosia_yogini",
    photo: "/audiences/journey-v2/results/creators/gosia_yogini-avatar.png",
    gained: 4469,
    period: "25 Mar 2025 – 25 Sep 2026",
    start: {
      heading: "Make staying active feel possible at any age.",
      paragraphs: [
        "Gosia shares yoga, flexibility exercises and bodyweight drills she practises at home. In her fifties herself, she wanted to encourage women to begin or continue their fitness journey, with a particular focus on women over 40.",
        "Her page already showed the movements clearly and had organised Highlights. The opportunity was to make the intended audience easier to recognise and bring more of her own story into the posts.",
      ],
      audience: ["Women over 40", "Yoga", "Bodyweight exercise"],
    },
    approach: {
      heading: "Help women find the practice and the person behind it.",
      paragraphs: [
        "We handled daily outreach using Gosia’s yoga and fitness interests. Sushmita worked through the profile wording and suggested ways to add her voice and experience to the movement videos.",
      ],
      manager: "Sushmita",
      managerFocus:
        "Women interested in yoga, a clearer introduction and stories behind the practice",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep active women over 40 at the centre.",
          paragraphs: [
            "Gosia described women interested in yoga, physical activity, wellness and self-care. She especially wanted to reach women over 40 who wanted to stay active. Those interests gave us the starting point for outreach.",
          ],
        },
        {
          label: "The profile",
          heading: "Say who the yoga and fitness content is for.",
          paragraphs: [
            "Sushmita suggested adding yoga and fitness to the name field, then using the bio to introduce the focus on women over 40, yoga and bodyweight drills. Gosia updated both her name field and bio after the review.",
          ],
        },
        {
          label: "What to post",
          heading: "Tell the story behind the movements.",
          paragraphs: [
            "Sushmita suggested voiceovers, everyday moments and posts about why Gosia started yoga. The idea was to keep the practice videos while giving viewers more of her experiences and personality.",
          ],
          note: {
            summary: "Ways to build on the yoga videos",
            body: "Talk through a moment from her practice. Share why she began yoga or a challenge she worked through. Add a glimpse of an ordinary day alongside the movements.",
          },
        },
      ],
    },
    progress: {
      heading: "4,469 followers gained through daily outreach.",
      paragraphs: [
        "Gosia gained 4,469 followers through daily outreach across 18 recorded periods between March 2025 and September 2026. The period ending 25 July 2026 added 546 followers.",
      ],
      months: [
        {
          dates: "25 Mar 2025 – 24 Apr 2025",
          followers: 3,
        },
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 457,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 162,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 227,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 176,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 245,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 347,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 261,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 116,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 376,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 260,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 150,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 278,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 203,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 186,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 546,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 396,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 80,
        },
      ],
    },
    quote:
      "I updated my name and bio after the review. The suggestions helped me introduce yoga and fitness for women over 40 while keeping the page personal.",
    quoteBy: "Gosia W · Yoga and fitness creator · April 2025",
    close: {
      heading: "Help more people discover the way you stay active.",
      body: "Get support with reaching your audience and showing the person behind your practice.",
    },
  },
  {
    slug: "danielle-van-de-velde",
    niche: "Spirituality & faith",
    nicheSlug: "spirituality-and-faith",
    specialty: "Spirituality teacher & podcast host",
    title: "4,447 followers for Dani’s Spirited Living.",
    intro:
      "Dani was juggling her podcast, events and other work. Tulsi reviewed which spirituality audiences brought new followers and suggested turning existing podcast recordings into short videos she could share.",
    name: "Danielle Van de Velde",
    handle: "spiritedlivingbydani",
    gained: 4447,
    period: "26 Jul 2025 – 25 Sep 2026",
    start: {
      heading: "Give a busy teacher’s work more ways to be discovered.",
      paragraphs: [
        "Dani shares modern spirituality through her teaching, events and podcast. Her Instagram already carried event announcements planned several weeks ahead, and she was open to trying new formats.",
        "Time was the constraint. When a video style came up for discussion, Dani explained that she could not spend hours producing it. The next ideas needed to use material she already had.",
      ],
      audience: ["Modern spirituality", "Mindfulness", "Podcast listeners"],
    },
    approach: {
      heading:
        "Reach spirituality audiences. Reuse the conversations already recorded.",
      paragraphs: [
        "We handled daily outreach and reviewed how different spirituality audiences responded. Tulsi also worked around Dani’s schedule, suggesting ways to turn material from her podcast into shorter posts.",
      ],
      manager: "Tulsi",
      managerFocus:
        "Spirituality audiences and short videos from existing podcast recordings",
      steps: [
        {
          label: "Getting discovered",
          heading: "Review the audiences already bringing new followers.",
          paragraphs: [
            "Our outreach included people following accounts such as @reikilifestyleofficial, @energyhealingwithpd and @mindfulnesswithanabelle. Tulsi showed Dani which audiences were bringing followers and kept refining the choices.",
          ],
          note: {
            summary: "Room for the next projects",
            body: "Dani later asked to include established writers, publishers, literary agents and media covering modern spirituality. Tulsi agreed to adjust the audience choices around those directions.",
          },
        },
        {
          label: "Working with her time",
          heading: "Make short videos from the podcast material.",
          paragraphs: [
            "When Dani said she did not have time to produce elaborate videos, Tulsi suggested taking short clips from recordings already made. A clip carrying one clear idea could become a post, with another excerpt adding context, without a new filming session.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,447 followers gained through daily outreach.",
      paragraphs: [
        "Dani gained 4,447 followers through daily outreach from July 2025 to September 2026. The period ending 25 July 2026 added 508 followers.",
      ],
      months: [
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 296,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 346,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 351,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 303,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 337,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 361,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 250,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 182,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 194,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 188,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 441,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 508,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 468,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 222,
        },
      ],
    },
    quote:
      "The reports showed which spirituality audiences we were reaching, and I could see better engagement on my posts. I appreciated being kept up to date as the work continued.",
    quoteBy: "Danielle Van de Velde · Spirited Living · February 2026",
    close: {
      heading: "Help more people discover the ideas you share.",
      body: "Work with a Brand Manager on outreach and practical ways to make more of the content you already have.",
    },
  },
  {
    slug: "alex-malin",
    niche: "Therapy",
    nicheSlug: "therapy",
    specialty: "Therapist & podcast host",
    title: "2,767 followers for Alex’s mental health content.",
    intro:
      "Alex wanted more people in the US to discover his mental health and relationship content. Shama suggested adding short solo videos alongside the podcast, using footage his editing team already had.",
    name: "Alex Malin",
    handle: "alexxmalin",
    gained: 2767,
    period: "25 Jun 2025 – 25 Mar 2026",
    start: {
      heading: "Bring the conversations to more people who want to learn.",
      paragraphs: [
        "Alex is a therapist and podcast host who shares mental health and relationship topics. His audience goal centred on the US, especially men, with some attention to Orange County, where he is based.",
        "His podcast videos already had a consistent look. Many used the same two-person setup, so the content review focused on adding other ways for viewers to hear directly from Alex.",
      ],
      audience: [
        "US audiences",
        "Mental health education",
        "Relationship topics",
      ],
    },
    approach: {
      heading:
        "Reach the intended audience. Give Alex another way to speak to it.",
      paragraphs: [
        "We handled daily outreach for Alex’s mental health and relationship content. Shama reviewed the podcast content and suggested a practical addition to the formats he was already using.",
      ],
      manager: "Shama",
      managerFocus: "US audiences and short solo videos alongside the podcast",
      steps: [
        {
          label: "Getting discovered",
          heading: "Start with the US audience Alex wanted to reach.",
          paragraphs: [
            "Alex described people who wanted to understand themselves and their relationships. He asked for a US focus, with some attention to Orange County. Those topics and locations supplied the direction for outreach.",
          ],
        },
        {
          label: "The videos",
          heading: "Add short solo clips alongside the podcast.",
          paragraphs: [
            "Shama recommended direct-to-camera reflections, short tips and questions that invited a response. Alex liked the suggestion and said his editing team already had plenty of solo footage, which he planned to review for future posts.",
          ],
          note: {
            summary: "A practical starting point",
            body: "The podcast could stay central. A short reflection, a useful idea or an open question from Alex could give viewers another format between the two-person conversations.",
          },
        },
      ],
    },
    progress: {
      heading: "2,767 followers gained through daily outreach.",
      paragraphs: [
        "Alex gained 2,767 followers through daily outreach from June 2025 to March 2026. The period ending 25 November 2025 added 530 followers.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 249,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 204,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 354,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 395,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 530,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 341,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 395,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 171,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 128,
        },
      ],
    },
    quote:
      "The suggestion made sense: add short solo videos alongside the podcast. My editors already had plenty of that footage, so I had somewhere practical to start.",
    quoteBy: "Alex Malin · Therapist and podcast host · July 2025",
    close: {
      heading: "Help more people discover the knowledge you share.",
      body: "Get support with outreach and finding useful ways to bring your expertise into your posts.",
    },
  },
  {
    slug: "beat-the-broker",
    niche: "Business",
    nicheSlug: "business",
    specialty: "Mortgage broker · CrossFit & fitness",
    title: "1,983 followers for Joe’s mix of mortgages and fitness.",
    intro:
      "Joe wanted to turn his Instagram audience into business opportunities. Rahul helped connect the account with fitness audiences and gave him concrete ways to present his mortgage knowledge alongside his training.",
    name: "Joe",
    business: "Beat the Broker",
    handle: "beatthebroker_",
    gained: 1983,
    period: "26 Aug 2025 – 25 Jun 2026",
    start: {
      heading: "Make both sides of Joe’s account easy to understand.",
      paragraphs: [
        "Joe is a mortgage broker who shares his interest in CrossFit and Hyrox. He wanted to grow an audience that could generate leads for his business, while keeping the fitness side of his account.",
        "By December 2025, he was pleased with the follower growth but wanted more engagement. His videos covered workouts and mortgages; the review focused on helping viewers quickly recognise what each video was about.",
      ],
      audience: [
        "CrossFit & Hyrox",
        "UK fitness communities",
        "Mortgages & home buying",
      ],
    },
    approach: {
      heading: "Reach the fitness community. Make each video’s purpose clear.",
      paragraphs: [
        "We handled daily outreach around Joe’s fitness interests. Rahul reviewed which fitness audiences brought followers and suggested different settings and camera angles for his mortgage and workout videos.",
      ],
      manager: "Rahul",
      managerFocus:
        "Fitness audiences and videos that make room for mortgages and training",
      steps: [
        {
          label: "Getting discovered",
          heading: "Look to the fitness communities Joe already knew.",
          paragraphs: [
            "Joe supplied UK CrossFit, Hyrox and fitness-event accounts to guide the outreach. Rahul reviewed which audiences were responding and reported results from CrossFit accounts including @theboxbarnsley and @crossfitleamington. When Joe suggested more event accounts in January, Rahul agreed to test them.",
          ],
        },
        {
          label: "Two subjects, one account",
          heading: "Give mortgages and workouts their own setting.",
          paragraphs: [
            "Rahul suggested filming fitness tips in the gym or during training, and mortgage insights at a desk, in the car or in another everyday setting. Each video could have one clear subject, without forcing both interests into the same clip.",
          ],
        },
        {
          label: "The videos",
          heading: "Make the first few seconds clear and connect the clips.",
          paragraphs: [
            "The review recommended smoother transitions and changes of camera angle, with a clear reason to keep watching in the opening seconds. Rahul suggested starting with one Reel, then building on what Joe learned from making it.",
          ],
        },
      ],
    },
    progress: {
      heading: "1,983 followers gained through daily outreach.",
      paragraphs: [
        "Joe gained 1,983 followers through daily outreach across the recorded periods from 26 August 2025 to 25 June 2026. The strongest period added 299 followers.",
      ],
      months: [
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 238,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 299,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 265,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 247,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 204,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 239,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 95,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 143,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 145,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 108,
        },
      ],
      update: {
        heading: "Joe noticed a change in his content.",
        paragraphs: [
          "In January 2026, Joe said he had started making the suggested changes. In March, he reported that his content had changed and his views had improved, and asked for another review.",
        ],
      },
    },
    quote:
      "Rahul’s feedback helped me think about how to show both mortgages and fitness. By March, I felt my content had changed and my views had improved.",
    quoteBy: "Joe · Beat the Broker · March 2026",
    close: {
      heading: "Help more people discover the person behind your expertise.",
      body: "Get support with reaching your audience and making your professional knowledge and personal interests easy to follow.",
    },
  },
  {
    slug: "dr-geria",
    niche: "Skincare",
    nicheSlug: "skincare",
    specialty: "Dermatologist · Skincare education",
    title: "7,031 followers for Dr. Geria’s skincare education.",
    intro:
      "Dr. Geria wanted an audience interested in skincare and wellness. Sushmita supported that growth with practical content feedback and tested an outreach change he specifically requested: following public accounts only.",
    name: "Dr. Aanand Geria",
    handle: "drgeria",
    gained: 7031,
    period: "25 Jun 2025 – 25 Sep 2026",
    start: {
      heading: "Bring skincare explanations to a wider audience.",
      paragraphs: [
        "Dr. Aanand Geria uses Instagram to discuss skincare products, cosmetic procedures and common skincare myths. He wanted to reach women aged 18–35 interested in skincare and wellness, build an engaged following and attract skincare-brand sponsorships.",
        "His account already mixed explanations, direct-to-camera videos and lighter posts. Sushmita’s review gave him ways to make the topic of each video easier to recognise and invite viewers into the conversation.",
      ],
      audience: [
        "Skincare & wellness",
        "Women aged 18–35",
        "Skincare education",
      ],
    },
    approach: {
      heading: "Reach skincare audiences. Listen to how he wants to grow.",
      paragraphs: [
        "We managed daily outreach using Dr. Geria’s audience preferences. Alongside the content review, Sushmita tested his request to focus on public accounts and shared the results so he could decide how to continue.",
      ],
      manager: "Sushmita",
      managerFocus:
        "Skincare audiences, clear educational videos and public-account outreach",
      steps: [
        {
          label: "The explanations",
          heading: "Show viewers the topic before they scroll.",
          paragraphs: [
            "Sushmita recommended bold on-screen titles for skincare explanations, clear opening lines for direct-to-camera videos and close-ups with short summaries for product posts. She also suggested using questions in captions to invite comments.",
          ],
        },
        {
          label: "His preference",
          heading: "Test outreach to public accounts, then review it together.",
          paragraphs: [
            "In December 2025, Dr. Geria asked to avoid following private accounts. Sushmita ran a public-account test and shared the recorded response. After reviewing an updated report in January, he chose to continue with public accounts only.",
          ],
        },
      ],
    },
    progress: {
      heading: "7,031 followers gained through daily outreach.",
      paragraphs: [
        "Dr. Geria gained 7,031 followers through daily outreach from 25 June 2025 to 25 September 2026. His strongest recorded period added 678 followers.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 281,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 71,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 632,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 584,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 678,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 458,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 535,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 525,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 318,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 505,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 498,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 527,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 530,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 531,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 358,
        },
      ],
    },
    quote:
      "I wanted the outreach to focus on public accounts. Sushmita tested that change, shared the results, and I chose to keep going with that approach for my account.",
    quoteBy: "Dr. Aanand Geria · January 2026",
    close: {
      heading: "Help more people discover what you know.",
      body: "Work with a Brand Manager on audience outreach and content that makes your expertise easier to explore.",
    },
  },
  {
    slug: "the-biohacking-lawyer",
    niche: "Content creators",
    nicheSlug: "content-creators",
    specialty: "Attorney & biohacking creator",
    title: "1,928 followers for The Biohacking Lawyer.",
    intro:
      "Will Schuster was building a biohacking account alongside a busy legal career. Aditi gave him a weekly content mix and concrete ideas for short videos, while Ignited handled daily outreach.",
    name: "Will Schuster",
    business: "The Biohacking Lawyer",
    handle: "the_biohacking_lawyer",
    gained: 1928,
    period: "9 recorded periods · 26 Jul 2025 – 25 Aug 2026",
    start: {
      heading: "Keep sharing while court work fills the calendar.",
      paragraphs: [
        "Will Schuster is an attorney who shares biohacking, mindset and personal experiences on Instagram. Trials and court hearings left him with less time to post, and his uploads had become irregular.",
        "He wanted to share more when his work schedule eased. The content review focused on formats he could return to: short tips, personal stories and image or carousel posts alongside Reels.",
      ],
      audience: ["Biohacking", "Mindset", "Personal experiences"],
    },
    approach: {
      heading: "Support discovery and give the next post a starting point.",
      paragraphs: [
        "We handled daily outreach while Aditi reviewed Will’s content. Her recommendations gave him a weekly mix and specific ways to turn his experiences and ideas into posts.",
      ],
      manager: "Aditi",
      managerFocus:
        "Daily outreach, a weekly content mix and short personal stories",
      steps: [
        {
          label: "A weekly rhythm",
          heading: "Give Reels a place in a wider mix of posts.",
          paragraphs: [
            "Aditi recommended a regular mix of Reels and image or carousel posts. Quick tips, simple graphics and quotes could give Will more ways to share his ideas alongside video, rather than having every post depend on filming.",
          ],
        },
        {
          label: "Short videos",
          heading: "Keep one tip to one minute.",
          paragraphs: [
            "The review suggested one-minute videos with a clear title and concise visuals. Each could focus on a single idea, giving Will a defined format to work from.",
          ],
        },
        {
          label: "Personal stories",
          heading: "Connect an experience with the lesson behind it.",
          paragraphs: [
            "Building on a personal story Will had already shared, Aditi recommended more short anecdotes tied to the ideas he wanted to discuss. The suggestion was to use his own experience as the starting point for the message.",
          ],
        },
      ],
    },
    progress: {
      heading: "1,928 followers gained through daily outreach.",
      paragraphs: [
        "Will gained 1,928 followers through daily outreach across nine recorded periods between 26 July 2025 and 25 August 2026. The strongest recorded period added 348 followers.",
      ],
      months: [
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 61,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 200,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 190,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 271,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 228,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 59,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 324,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 348,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 247,
        },
      ],
      update: {
        heading: "A return to regular posting.",
        paragraphs: [
          "In May 2026, Will said he had filmed content in batches. Later that month, he reported posting a Reel every weekday since the previous week.",
        ],
      },
    },
    quote:
      "Court hearings had made it hard to post. The review gave me a weekly mix and ideas for sharing my story. I found the guidance valuable for my account.",
    quoteBy: "Will Schuster · The Biohacking Lawyer · September 2025",
    close: {
      heading: "Give your ideas more room to be discovered.",
      body: "Get support with audience outreach and practical content ideas that fit the subjects you want to share.",
    },
  },
  {
    slug: "sandor-otvos",
    niche: "Photography",
    nicheSlug: "photography",
    specialty: "Travel and landscape photography",
    title: "5,453 followers for Sándor’s landscape photography.",
    intro:
      "Sándor wanted more people to see his travel and landscape photographs. Rahul reviewed photography audiences with him and suggested Reels that used the photographs and editing work he already enjoyed making.",
    name: "Sándor Ötvös",
    handle: "sandor_otvos",
    gained: 5453,
    period: "25 Mar 2025 – 25 Nov 2025",
    start: {
      heading: "Share the photographs with more people who enjoy them.",
      paragraphs: [
        "Photography was a serious hobby for Sándor. He wanted to reach fellow photographers, travellers and people who enjoyed landscapes. Commercial enquiries were a possible future benefit, but sharing the work was his main reason for growing.",
        "He had tried handling outreach himself and found it too time-consuming. He also wanted to keep photographing the landscapes he loved, rather than changing his subjects to chase attention.",
      ],
      audience: [
        "Landscape photographers",
        "Travellers",
        "People who enjoy nature photography",
      ],
    },
    approach: {
      heading: "Reach photography audiences. Make more of each photograph.",
      paragraphs: [
        "We handled daily outreach while Rahul reviewed the photography audiences bringing followers. Alongside that work, he suggested ways for Sándor to turn his photographs into short videos.",
      ],
      manager: "Rahul",
      managerFocus: "Photography audiences and Reels made from the photographs",
      steps: [
        {
          label: "Getting discovered",
          heading: "Review the photographers whose audiences respond.",
          paragraphs: [
            "Audience reviews included @szerdahelyia, @mihopix and @matthiasperktoldphotography. Sándor recognised the quality of those photographers’ work and suggested more accounts. Rahul used those conversations to refine the outreach and reported when new suggestions were being incorporated.",
          ],
          note: {
            summary: "How Sándor helped refine the audience",
            body: "Sándor suggested photographers such as @zit_8_photography and @koszoandras_photography, then sent another group of accounts in June 2025. Rahul confirmed that he had begun incorporating the June suggestions.",
          },
        },
        {
          label: "The photographs",
          heading: "Show the scene, the edit and the finished image.",
          paragraphs: [
            "Rahul suggested three Reel formats: a collection of photographs around one theme, an original image followed by the edited version, and the camera’s view before revealing the final photograph. Each idea began with work Sándor already enjoyed making.",
          ],
        },
      ],
    },
    progress: {
      heading: "5,453 followers gained through daily outreach.",
      paragraphs: [
        "Sándor gained 5,453 followers through daily outreach from March to November 2025. The period ending 25 October added 956 followers.",
      ],
      months: [
        {
          dates: "25 Mar 2025 – 24 Apr 2025",
          followers: 516,
        },
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 421,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 592,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 782,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 656,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 662,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 956,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 868,
        },
      ],
    },
    quote:
      "I wanted more people to see my landscape photographs. I reached the audience size I was aiming for, and Rahul kept me involved in choosing the photography audiences we worked with.",
    quoteBy: "Sándor Ötvös · Photographer · November 2025",
    close: {
      heading: "Help more people discover the places you photograph.",
      body: "Work with a Brand Manager on reaching photography audiences and sharing more of the story behind each image.",
    },
  },
  {
    slug: "neumann",
    niche: "Music & DJs",
    nicheSlug: "music-and-djs",
    specialty: "Techno DJ and producer",
    title: "4,733 followers for NEUMANN’s music.",
    intro:
      "Thomas wanted to build an audience for his music beyond Denmark. Tulsi worked with his DJ and producer references, then suggested ways to share gigs and studio sessions without relying on talking to the camera.",
    name: "Thomas",
    business: "NEUMANN",
    handle: "neumann.dk",
    gained: 4733,
    period: "25 Apr 2025 – 25 Feb 2026",
    start: {
      heading: "Build an audience beyond the next release or gig.",
      paragraphs: [
        "Thomas performs and produces music as NEUMANN. His posts mainly covered releases and gigs. He wanted more people who enjoyed his style of music to discover him, including listeners, DJs and producers outside Denmark.",
        "He saw a larger Instagram audience as part of progressing in his music career. For content, he wanted ideas that felt comfortable to make in his bedroom studio and at gigs.",
      ],
      audience: [
        "Techno listeners",
        "DJs and producers",
        "Music audiences beyond Denmark",
      ],
    },
    approach: {
      heading: "Reach music audiences. Show what happens around the set.",
      paragraphs: [
        "We handled daily outreach around Thomas’s music audience. Tulsi used the DJs, producers and labels he shared as a starting point, while the content review focused on footage he could capture at gigs and in the studio.",
      ],
      manager: "Tulsi",
      managerFocus: "Music audiences, gig footage and the studio process",
      steps: [
        {
          label: "Getting discovered",
          heading: "Build the outreach around his style of music.",
          paragraphs: [
            "Thomas described an audience of fans, DJs and producers who liked his sound. He supplied music accounts and labels as references, with a focus beyond Denmark. Tulsi discussed testing the accounts he suggested and shifting part of the outreach towards the techno audiences he wanted to reach.",
          ],
        },
        {
          label: "At the gig",
          heading: "Tell the story from setup to the last track.",
          paragraphs: [
            "Tulsi suggested filming the setup, performance space and preparation before taking the stage. Another option was a short gig diary, combining clips from the event with a voiceover about the experience. That gave Thomas an alternative to speaking directly to the camera.",
          ],
        },
        {
          label: "In the studio",
          heading: "Let people see how the music comes together.",
          paragraphs: [
            "Tulsi proposed short clips of the equipment, studio setup and music-making process. Showing a beat transition while performing was one specific idea. These could sit alongside release announcements and gig posts, giving him more to share between them.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,733 followers gained through daily outreach.",
      paragraphs: [
        "NEUMANN gained 4,733 followers through daily outreach from April 2025 to February 2026. The period ending 25 December 2025 added 731 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 326,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 446,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 297,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 278,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 525,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 406,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 479,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 731,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 600,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 645,
        },
      ],
    },
    quote:
      "I mainly posted releases and gigs. Tulsi’s suggestions gave me ideas for the moments around a set and the work in the studio. I came away excited to start posting more.",
    quoteBy: "Thomas · NEUMANN · June 2024",
    close: {
      heading: "Help more listeners find your sound.",
      body: "Get support with reaching music audiences and turning your studio work and gigs into posts worth following.",
    },
  },
  {
    slug: "bonnie-cruickshank",
    niche: "Art",
    nicheSlug: "art",
    specialty: "Sculptural ceramics · Melbourne",
    title: "1,935 followers for Bonnie’s sculptural ceramics.",
    intro:
      "Bonnie wanted collectors and galleries to discover her ceramics alongside the artists already following her. Shama helped her introduce the work clearly and suggested ways to show the making, materials and exhibitions.",
    name: "Bonnie Cruickshank",
    handle: "bonniecruickshank_",
    gained: 1935,
    period: "4 recorded periods · 26 Dec 2025 – 25 Aug 2026",
    start: {
      heading: "Introduce the ceramics to collectors and galleries.",
      paragraphs: [
        "Bonnie makes sculptural ceramics in Naarm, Melbourne. She was sharing finished pieces and promoting exhibitions. Other artists already made up much of her audience; she wanted to reach art buyers, collectors, galleries and people who represent artists.",
        "Her ambitions included selling work, joining more exhibitions and finding representation. She also wanted people to see the quality and craft behind each piece, with more footage from the studio.",
      ],
      audience: [
        "Art buyers and collectors",
        "Galleries and artist representatives",
        "Artists and ceramics enthusiasts",
      ],
    },
    approach: {
      heading: "Reach art audiences. Make the practice easy to understand.",
      paragraphs: [
        "We handled daily outreach around Bonnie’s ceramic art. Shama used Bonnie’s audience brief to guide the work, then reviewed how the profile introduced her practice to someone discovering it for the first time.",
      ],
      manager: "Shama",
      managerFocus: "Art audiences, the artist’s profile and studio Highlights",
      steps: [
        {
          label: "Getting discovered",
          heading: "Look beyond the existing circle of artists.",
          paragraphs: [
            "Bonnie valued the community of artists already following her. Her brief added art buyers, collectors, galleries and artist representatives. That gave Shama a specific direction for the outreach around her ceramics.",
          ],
        },
        {
          label: "The profile",
          heading: "Put the medium, location and exhibitions up front.",
          paragraphs: [
            "Shama recommended adding “Sculptural Ceramic Artist” beside Bonnie’s name. She also proposed a shorter bio explaining that the pieces were handmade, naming Melbourne and pointing visitors to the next exhibition details.",
          ],
        },
        {
          label: "Inside the studio",
          heading: "Give each side of the practice a place in Highlights.",
          paragraphs: [
            "Shama suggested a portfolio of finished pieces, clips of the making process, and the textures or sketches that inspired the work. An exhibition Highlight could hold installation photos and event details, giving collectors and galleries a simple way to explore further.",
          ],
        },
      ],
    },
    progress: {
      heading: "1,935 followers gained through daily outreach.",
      paragraphs: [
        "Bonnie gained 1,935 followers through daily outreach across four recorded periods between December 2025 and August 2026.",
      ],
      months: [
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 384,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 340,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 654,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 557,
        },
      ],
    },
    quote:
      "I updated my bio and profile name after the review. The suggestions showed me how to introduce the ceramics and use Highlights for the work behind each piece.",
    quoteBy: "Bonnie Cruickshank · Ceramic artist · January 2026",
    close: {
      heading: "Help more people discover the work you make by hand.",
      body: "Work with a Brand Manager on reaching art audiences and showing your pieces, process and exhibitions.",
    },
  },
  {
    slug: "parkinglot-filler",
    niche: "Events",
    nicheSlug: "events",
    specialty: "Car shows and automotive events",
    title: "8,582 followers for Robert’s car-meet brand.",
    intro:
      "Robert wanted to grow a community around car meets and events. Srishti reviewed car-meet audiences, suggested ways to explain what was happening in his videos and helped organise the profile around the events and people behind them.",
    name: "Robert",
    business: "RVA’s Car Meet Guy",
    handle: "parkinglot_filler",
    gained: 8582,
    period: "13 recorded periods · 25 Jun 2025 – 25 Sep 2026",
    start: {
      heading: "Build a car community people want to be part of.",
      paragraphs: [
        "Robert runs @parkinglot_filler and is the founder of We OutSiDeee Events and OutSiDeBoYz. His goal was to grow the brand so he could sell merchandise and host car shows. He already had plenty of footage and photographs from the car community.",
        "As he worked on events, the account needed to do more than announce dates. A new visitor needed to see the cars, the people and what made a gathering worth coming to.",
      ],
      audience: [
        "Car enthusiasts",
        "Car-meet communities",
        "Automotive event audiences",
      ],
    },
    approach: {
      heading: "Reach car enthusiasts. Show what the events feel like.",
      paragraphs: [
        "We handled daily outreach to car audiences. Srishti reviewed which car-meet accounts brought followers, gave feedback on the event videos and helped Robert organise what new visitors could explore on his profile.",
      ],
      manager: "Srishti",
      managerFocus: "Car-meet audiences, event videos and Highlights",
      steps: [
        {
          label: "Getting discovered",
          heading: "Reach the communities already gathering around cars.",
          paragraphs: [
            "The audience reviews included @804meets, @vameets and @cleanculturedmv. Robert added more car pages for consideration, including @dmv_meetups and @slammedenuff. Those suggestions helped keep the outreach connected to the car culture he wanted to build around.",
          ],
        },
        {
          label: "The event videos",
          heading: "Explain what is happening beyond the parked cars.",
          paragraphs: [
            "Srishti suggested voiceovers, subtitles or a short line of text to tell the story behind a Reel. She also recommended footage of the participants and their cars after a meet. Later, she encouraged Robert to balance event posters with more original content about the people and experience behind the events.",
          ],
        },
        {
          label: "The profile",
          heading:
            "Give car meets and behind-the-scenes moments their own Highlights.",
          paragraphs: [
            "Srishti recommended Highlights for meets, behind-the-scenes footage and everyday moments. Robert updated the Highlights and asked her to review them before he added more. Srishti checked them and suggested matching covers as a next step.",
          ],
        },
      ],
    },
    progress: {
      heading: "8,582 followers gained through daily outreach.",
      paragraphs: [
        "Robert’s account gained 8,582 followers through daily outreach across 13 recorded periods between June 2025 and September 2026.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 651,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 548,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 819,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 756,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 723,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 684,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 703,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 871,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 759,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 585,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 570,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 581,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 332,
        },
      ],
    },
    quote:
      "My page already had plenty of cars and events. Srishti gave me ideas for explaining the videos and organising the profile. I updated the Highlights and asked her to review them.",
    quoteBy: "Robert · RVA’s Car Meet Guy · January 2026",
    close: {
      heading: "Help more people discover your car community.",
      body: "Get support with reaching car enthusiasts and showing the people, cars and experiences behind your events.",
    },
  },
  {
    slug: "menopause-livia",
    niche: "Fitness",
    nicheSlug: "fitness",
    specialty: "Menopause fitness & nutrition",
    title: "5,117 followers for Menopause Livia.",
    intro:
      "Livia wanted women to discover her workout plans and nutrition eBooks. Shama refined the outreach around women over 40 in Europe and the USA, and suggested ways to introduce the products through her posts.",
    name: "Menopause Livia",
    handle: "menopauselivia",
    gained: 5117,
    period: "25 Jun 2025 – 25 Sep 2026",
    start: {
      heading: "Reach the women her plans were made for.",
      paragraphs: [
        "Livia offers online workout plans, nutrition eBooks and one-to-one support for women going through menopause. She wanted help introducing those products on Instagram in a way that appealed to her audience.",
        "Her early outreach focused on the UAE. In October 2025, she asked to shift that focus to women over 40 in the UK, USA and other parts of Europe. Reaching those women mattered more to her than simply increasing the count.",
      ],
      audience: [
        "Women over 40",
        "Menopause fitness & nutrition",
        "Europe and the USA",
      ],
    },
    approach: {
      heading: "Refine who discovers the page. Show what the plans offer.",
      paragraphs: [
        "We handled daily outreach and adjusted the audience choices as Livia clarified who she wanted to reach. Shama also developed content suggestions for the workout plans and eBooks she already sold.",
      ],
      manager: "Shama",
      managerFocus:
        "Women over 40, international outreach and ways to introduce her workout plans and eBooks",
      steps: [
        {
          label: "Getting discovered",
          heading: "Move the focus from the UAE to Europe and the USA.",
          paragraphs: [
            "Shama updated the outreach around Livia’s new locations and her priority of reaching women over 40. Livia was clear that she preferred a more focused audience, even if growth was slower. We kept refining the choices around that brief.",
          ],
          note: {
            summary: "The places Livia wanted to reach",
            body: "Her brief included London, Brighton and the Midlands; Florida and Pennsylvania; Monaco, the South of France, Stockholm, Scotland, Ireland and southern Spain.",
          },
        },
        {
          label: "What to post",
          heading: "Give women a closer look at the plans and eBooks.",
          paragraphs: [
            "Shama suggested short educational posts that point readers to the link in her bio, plus glimpses of how she creates workout plans and updates her eBooks. The aim was to introduce the products through useful content women could explore before buying.",
          ],
        },
      ],
    },
    progress: {
      heading: "5,117 followers gained through daily outreach.",
      paragraphs: [
        "Menopause Livia gained 5,117 followers through daily outreach from June 2025 to September 2026. The period ending 25 December 2025 added 912 followers.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 124,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 140,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 152,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 63,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 265,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 912,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 289,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 497,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 476,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 548,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 343,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 486,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 275,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 248,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 299,
        },
      ],
    },
    quote:
      "More women are interacting with the page now. That matters to me because they’re the people my plans are for. The account is growing in a direction I wanted.",
    quoteBy: "Livia · Menopause Livia · June 2026",
    close: {
      heading: "Help more women discover the guidance you offer.",
      body: "Get support with reaching your audience and introducing your programs through useful posts.",
    },
  },
  {
    slug: "arianna-messplay",
    niche: "Spirituality & faith",
    nicheSlug: "spirituality-and-faith",
    specialty: "Spiritual coaching & conscious parenting",
    title: "4,641 followers for Arianna’s spiritual coaching.",
    intro:
      "Arianna wanted to reach women interested in spirituality and conscious parenting. Srishti reviewed which audiences were responding and suggested ways to bring more of Arianna’s own stories into her teaching posts.",
    name: "Arianna Messplay",
    handle: "ariannamessplay33",
    gained: 4641,
    period: "25 Apr 2025 – 25 Jul 2026",
    start: {
      heading: "Let visitors meet the person behind the teachings.",
      paragraphs: [
        "Arianna shares spiritual teachings, angelic messages and conscious-parenting guidance. She wanted women to discover her work, from young adults to those raising children.",
        "Her profile already had an organised bio and Highlights. Much of the content used written messages and quotes, so the next opportunity was to bring her face, voice and personal experiences into more of the posts.",
      ],
      audience: [
        "Spiritual growth",
        "Conscious parenting",
        "Women seeking self-discovery",
      ],
    },
    approach: {
      heading: "Reach spirituality audiences and make the teaching personal.",
      paragraphs: [
        "We handled daily outreach around Arianna’s spiritual-coaching interests. Srishti reviewed the audience response and gave her specific ideas for sharing personal moments alongside the teachings.",
      ],
      manager: "Srishti",
      managerFocus:
        "Spirituality audiences, personal stories and easier-to-read posts",
      steps: [
        {
          label: "Getting discovered",
          heading: "Build on the spirituality audiences already responding.",
          paragraphs: [
            "In the May 2026 review, Srishti identified strong responses from audiences interested in energy healing, spiritual alignment, soul purpose and self-love. Those findings helped guide the next outreach choices. Arianna also kept sharing accounts with audiences she wanted to reach.",
          ],
        },
        {
          label: "What to post",
          heading: "Put a personal story beside the teaching.",
          paragraphs: [
            "Srishti suggested sharing a message Arianna had needed years earlier, then explaining what was happening in her life at the time. Another idea was a personal parenting moment. These gave her concrete ways to bring her own experience into the posts.",
          ],
          note: {
            summary: "More ways for viewers to hear from Arianna",
            body: "Mix written teachings with short videos, photos and behind-the-scenes moments. The existing messages could stay; Arianna’s face, voice and stories could appear alongside them.",
          },
        },
        {
          label: "Making posts readable",
          heading: "Keep the words simple to read on screen.",
          paragraphs: [
            "Srishti noticed that some text in the videos and posts looked busy. She recommended clean fonts, fewer distractions and consistent styling so viewers could follow the message more easily.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,641 followers gained through daily outreach.",
      paragraphs: [
        "Arianna gained 4,641 followers through daily outreach from April 2025 to July 2026, across 15 recorded periods. The period ending 25 October 2025 added 415 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 133,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 194,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 187,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 196,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 319,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 415,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 401,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 399,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 414,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 374,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 334,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 349,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 303,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 296,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 327,
        },
      ],
    },
    quote:
      "I had plenty of teachings to share. Srishti gave me ways to put my own story beside them—personal moments, parenting experiences and the messages that mattered to me.",
    quoteBy: "Arianna Messplay · Spiritual coach · June 2025",
    close: {
      heading: "Help more people discover the perspective you share.",
      body: "Get support with reaching your audience and turning your experience into posts that feel like you.",
    },
  },
  {
    slug: "robin-lee-yoga",
    niche: "Yoga",
    nicheSlug: "yoga",
    specialty: "Yoga teacher & Palmy Yoga creator",
    title: "1,473 followers for Robin’s yoga teaching.",
    intro:
      "Robin wanted to reach yoga students, future teachers and fellow veterans. Aditi helped her clear older posts from the profile and explain the personal brand behind Palmy Yoga.",
    name: "Robin",
    business: "Robin Lee Yoga",
    handle: "robinleeyoga",
    gained: 1473,
    period: "6 recorded periods · 26 Nov 2025 – 25 Aug 2026",
    start: {
      heading: "Introduce the teacher behind Palmy Yoga.",
      paragraphs: [
        "Robin is a veteran and yoga teacher who created Palmy Yoga. She wanted to connect with people practising yoga online, aspiring teachers and veterans, with the longer-term goal of attracting clients through Instagram.",
        "Her Facebook posts were being shared automatically to Instagram, and the profile contained a large collection of older posts. She also wanted advice on whether to lead with her own name or Palmy Yoga.",
      ],
      audience: ["Yoga students", "Aspiring yoga teachers", "Veterans"],
    },
    approach: {
      heading:
        "Bring in yoga audiences and make the profile easier to explore.",
      paragraphs: [
        "We handled daily outreach using Robin’s yoga and veteran-focused brief. Aditi reviewed the profile and helped her decide what to keep, how to introduce herself and where Palmy Yoga fitted.",
      ],
      manager: "Aditi",
      managerFocus:
        "Yoga students, aspiring teachers and a clearer personal profile",
      steps: [
        {
          label: "Getting discovered",
          heading: "Use Robin’s teaching audience to guide the outreach.",
          paragraphs: [
            "Robin wanted to reach people practising yoga online, people considering teacher training and veterans. Aditi used that brief as the starting point, then reviewed which audiences were responding and looked for similar accounts.",
          ],
        },
        {
          label: "The profile",
          heading: "Clear older posts and stop the automatic Facebook shares.",
          paragraphs: [
            "Aditi recommended archiving older posts and switching off automatic Facebook sharing. Robin confirmed that she had stopped the sharing and reduced the profile to about 703 posts, giving her a smaller collection to work from.",
          ],
        },
        {
          label: "Personal branding",
          heading: "Keep Robin’s name at the front of the profile.",
          paragraphs: [
            "When Robin asked whether to use Palmy Yoga as her profile name, Aditi recommended leading with her own name and making the yoga focus clear. She also suggested a closer link between the bio, veteran audience and aspiring teachers.",
          ],
          note: {
            summary: "Small changes to the introduction",
            body: "Use a profile photo that shows Robin practising yoga. Give each Highlight a clear title and cover so visitors can tell what they will find inside.",
          },
        },
      ],
    },
    progress: {
      heading: "1,473 followers gained through daily outreach.",
      paragraphs: [
        "Robin gained 1,473 followers through daily outreach across six recorded periods between November 2025 and August 2026. The period ending 25 July 2026 added 340 followers.",
      ],
      months: [
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 9,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 207,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 311,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 285,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 340,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 321,
        },
      ],
    },
    quote:
      "I’m enjoying the people I’m connecting with, both the accounts I follow and the people following me. It’s good to see those connections developing around my yoga page.",
    quoteBy: "Robin · Yoga teacher · January 2026",
    close: {
      heading: "Help more students discover your teaching.",
      body: "Get support with reaching your audience and introducing the teacher and practice behind your page.",
    },
  },
  {
    slug: "jersey-girl-bagels",
    niche: "Food & drink",
    nicheSlug: "food-and-drink",
    specialty: "Bagel shop · Bradenton, Florida",
    title: "5,427 followers for Jersey Girl Bagels.",
    intro:
      "Erik wanted nearby customers and travelling bagel fans to discover his Florida shop. Rahul supported the outreach with practical advice on Reel covers, the menu and how to show the people making the bagels.",
    name: "Erik",
    business: "Jersey Girl Bagels",
    handle: "jerseygirlbagelshop",
    gained: 5427,
    period: "25 Jun 2025 – 25 Sep 2026",
    start: {
      heading: "Give bagel lovers a reason to stop in.",
      paragraphs: [
        "Jersey Girl Bagels brings New York and New Jersey-style bagels to Bradenton, Florida. Erik wanted to reach people within driving distance, as well as bagel fans who might visit while on holiday.",
        "He was already sharing food videos. The opportunity was to make the shop easier to explore: where it was, what was on the menu and what made its bagels worth a visit.",
      ],
      audience: ["Nearby customers", "Bagel fans", "Visitors to Florida"],
    },
    approach: {
      heading: "Help people find the shop and see what is inside.",
      paragraphs: [
        "We handled daily outreach. Erik’s brief gave Rahul two audiences to work with: customers who could drive to the shop and people who enjoyed bagel videos. The profile and content advice focused on what they would see when they opened the profile.",
      ],
      manager: "Rahul",
      managerFocus:
        "Local discovery, simpler Reel covers and a profile that helps people plan a visit",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep local customers and bagel fans in view.",
          paragraphs: [
            "Erik explained that some customers drove 45–60 minutes for the bagels, while others had discovered the shop through social videos before visiting Florida. That distinction shaped the audience brief: nearby customers first, with broader awareness among bagel fans.",
          ],
        },
        {
          label: "The Reel covers",
          heading: "Let the bagels stand out.",
          paragraphs: [
            "Rahul reviewed the Reel covers and pointed out where text made them look crowded. He recommended simpler covers and a consistent choice of colours and lettering across the page, so the food could be easier to see.",
          ],
        },
        {
          label: "Planning a visit",
          heading: "Put the menu, location and ordering in easy reach.",
          paragraphs: [
            "Rahul suggested a bio that named Bradenton and linked to the menu and ordering. He also proposed separate Highlights for the menu, daily specials, bagel-making and customer reviews, and shared a link to new Highlight covers.",
          ],
        },
      ],
    },
    progress: {
      heading: "5,427 followers gained through daily outreach.",
      paragraphs: [
        "Jersey Girl Bagels gained 5,427 followers through daily outreach from 25 June 2025 to 25 September 2026. The strongest recorded period added 574 followers.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 459,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 435,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 574,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 390,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 389,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 393,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 415,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 316,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 176,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 457,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 252,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 373,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 416,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 212,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 170,
        },
      ],
    },
    quote:
      "I could act on the feedback straight away. I went back through our Reels and removed the words from the covers, then started looking at what else to improve.",
    quoteBy: "Erik · Jersey Girl Bagels · November 2023",
    close: {
      heading: "Help more people discover your bagel shop.",
      body: "Reach people who could visit your shop, with practical guidance on showing the food and making a visit easy to plan.",
    },
  },
  {
    slug: "dr-andreea-boca",
    niche: "Skincare",
    nicheSlug: "skincare",
    specialty: "Dermatologist & aesthetics trainer",
    title: "9,794 followers for Dr. Andreea Boca.",
    intro:
      "Andreea wanted her account to reflect her work as a dermatologist, speaker and trainer. Sushmita supported the outreach and adjusted the content guidance around her preference for education and her own professional voice.",
    name: "Dr. Andreea Boca",
    handle: "dr.andreea.boca",
    gained: 9794,
    period: "25 Jun 2025 – 25 Sep 2026",
    start: {
      heading: "Show the doctor and trainer behind the account.",
      paragraphs: [
        "Dr. Andreea Boca’s work spans dermatology, aesthetics and professional training. Her Instagram included training events and collaborations with her clinic, DEA Clinic, and her academy, DEA Academy.",
        "She was clear about the direction: her Highlights documented individual training sessions, and she did not want to promote before-and-after treatment photographs. Creating her own posts also took time alongside her work.",
      ],
      audience: ["Dermatology", "Aesthetics", "Professional training"],
    },
    approach: {
      heading: "Build around the professional identity she wanted to share.",
      paragraphs: [
        "We handled daily outreach to audiences around dermatology and aesthetics accounts. Sushmita reviewed the response and worked through how Andreea’s own posts, training Highlights and clinic collaborations could fit together.",
      ],
      manager: "Sushmita",
      managerFocus:
        "Dermatology audiences and content built around her work as a trainer",
      steps: [
        {
          label: "Getting discovered",
          heading: "Test audiences around doctors and aesthetic clinics.",
          paragraphs: [
            "Sushmita reviewed which audiences responded to the outreach and continued testing new ones. An April 2026 report identified accounts including @dr.alexandrabloju, @dr.cristina.soare and @dermabeautyclinique among those bringing a strong response.",
          ],
        },
        {
          label: "Her priorities",
          heading: "Keep the training sessions distinct.",
          paragraphs: [
            "When Andreea explained why she kept a separate Highlight for each training, Sushmita revised the advice. She supported keeping that structure and suggested speaking moments, trainer insights and media features as additional topics that matched Andreea’s direction.",
          ],
        },
        {
          label: "The content mix",
          heading: "Make room for her own voice alongside collaborations.",
          paragraphs: [
            "Sushmita suggested making three of every five posts original content centred on Andreea, with selected collaborations alongside them. She also explained how the clinic and academy could tag her profile, while Stories could continue to acknowledge the companies she worked with.",
          ],
        },
      ],
    },
    progress: {
      heading: "9,794 followers gained through daily outreach.",
      paragraphs: [
        "Andreea gained 9,794 followers through daily outreach from 25 June 2025 to 25 September 2026. Her strongest recorded period added 943 followers.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 533,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 488,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 943,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 853,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 803,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 632,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 562,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 746,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 545,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 604,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 701,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 678,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 653,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 629,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 424,
        },
      ],
    },
    quote:
      "I wanted my profile to reflect my work as a trainer. Sushmita adjusted the suggestions around that and helped me work through the balance between my own posts and collaborations.",
    quoteBy: "Dr. Andreea Boca · December 2025",
    close: {
      heading: "Help more people discover the work behind your expertise.",
      body: "Work with a Brand Manager on audience outreach and content ideas that fit how you want to present your work.",
    },
  },
  {
    slug: "bedford-fine-art-gallery",
    niche: "Art",
    nicheSlug: "art",
    specialty: "19th-century fine art · Pennsylvania",
    title: "9,198 followers for Bedford Fine Art Gallery.",
    intro:
      "Joan wanted collectors and homeowners to discover the gallery’s original 19th-century paintings. Aditi supported the outreach, helped her revisit the profile and offered guidance on keeping the paintings in regular view.",
    name: "Joan Hawk",
    business: "Bedford Fine Art Gallery",
    handle: "bedfordfineartgallery",
    gained: 9198,
    period: "25 Apr 2025 – 25 Sep 2026",
    start: {
      heading: "Find the people who can picture a painting at home.",
      paragraphs: [
        "Bedford Fine Art Gallery sells original 19th-century paintings from its gallery in Pennsylvania. Joan described two important buyers: collectors looking for particular artists and homeowners searching for a painting for a special place.",
        "Joan created the Instagram content herself. She was already showing paintings in room settings to demonstrate how older art could fit a contemporary home, and wanted to add video to the photos and carousels.",
      ],
      audience: [
        "Fine-art collectors",
        "Homeowners choosing art",
        "Original 19th-century paintings",
      ],
    },
    approach: {
      heading: "Reach art lovers and make the gallery easier to explore.",
      paragraphs: [
        "We handled daily outreach while Aditi helped Joan work through the profile and posting routine. Joan supplied fine-art galleries and an art publication to guide the audience research.",
      ],
      manager: "Aditi",
      managerFocus:
        "Art-collector audiences, a clearer gallery profile and a manageable posting routine",
      steps: [
        {
          label: "Getting discovered",
          heading: "Start with collectors and homeowners choosing art.",
          paragraphs: [
            "Joan wanted to reach people who might buy a painting, including collectors and homeowners. She supplied accounts such as @vose_galleries, @questroyal_fine_art and @americanfineartmagazine to guide the outreach research.",
          ],
        },
        {
          label: "The profile",
          heading: "Make the gallery’s purpose easy to recognise.",
          paragraphs: [
            "Aditi shared profile guidance and asked Joan to review the account. Joan then changed the bio to better explain the business and selected the Art Gallery category.",
          ],
        },
        {
          label: "Keeping the paintings in view",
          heading: "Plan a posting routine Joan could maintain.",
          paragraphs: [
            "When Joan asked how often to post, Aditi suggested planning ahead with a content calendar. Four feed posts or Reels a week was a starting point, with the final pace based on what Joan could comfortably maintain.",
          ],
        },
      ],
    },
    progress: {
      heading: "9,198 followers gained through daily outreach.",
      paragraphs: [
        "Bedford Fine Art Gallery gained 9,198 followers through daily outreach from 25 April 2025 to 25 September 2026. The strongest recorded period added 726 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 315,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 312,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 376,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 513,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 659,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 554,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 637,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 524,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 510,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 505,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 448,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 541,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 628,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 686,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 726,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 652,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 612,
        },
      ],
    },
    quote:
      "I updated our bio and selected the Art Gallery category. I also started showing paintings in short videos, and noticed more likes on some of them. The response varied by painting.",
    quoteBy: "Joan Hawk · Bedford Fine Art Gallery · June 2024",
    close: {
      heading: "Help more people picture your art in their home.",
      body: "Get support with audience outreach and a clear way to present the artwork you want people to discover.",
    },
  },
  {
    slug: "original-mostert-photography",
    niche: "Photography",
    nicheSlug: "photography",
    specialty: "Landscape, cityscape and nature photography",
    title: "6,052 followers for Ivo’s landscape photography.",
    intro:
      "Ivo wanted photography lovers to discover his landscapes and nature scenes. Rahul refined the outreach and helped him plan Reels and carousels around a practical constraint: outdoor shoots depend on the weather.",
    name: "Ivo Mostert",
    business: "Original Mostert Photography",
    handle: "originalmostertphotography",
    photo:
      "/audiences/journey-v2/results/creatives/originalmostertphotography-avatar.png",
    gained: 6052,
    period: "25 Apr 2025 – 25 Jan 2026",
    start: {
      heading:
        "Build an audience for the photographs and the work behind them.",
      paragraphs: [
        "Ivo runs Original Mostert Photography, sharing landscapes, cityscapes and nature scenes. He wanted to build a community around the photographs and introduce people to prints and digital images he could sell.",
        "He already shared photographs and filmed while out shooting. Making more Reels was appealing, but he could not count on suitable weather every week. He wanted a plan that still left room for his strongest individual photographs.",
      ],
      audience: [
        "Photography lovers",
        "Nature and travel enthusiasts",
        "People interested in photographic prints",
      ],
    },
    approach: {
      heading: "Find photography audiences. Plan around the way Ivo shoots.",
      paragraphs: [
        "We handled daily outreach while Rahul reviewed which photography audiences responded. The content advice focused on making more use of each shoot, while balancing videos, single photographs and carousels.",
      ],
      manager: "Rahul",
      managerFocus:
        "Photography audiences, filming ahead and a mix of photographs and Reels",
      steps: [
        {
          label: "Getting discovered",
          heading: "Refine the outreach around photography audiences.",
          paragraphs: [
            "Audience reviews included people following @hit.that.shutter, @dutch_photo_academy and @natuurfotografie.nl. Rahul reviewed the responses and looked for similar accounts, with further audience tests and refinements during 2025.",
          ],
        },
        {
          label: "Planning the shoots",
          heading: "Keep footage ready for weeks when the weather changes.",
          paragraphs: [
            "Rahul suggested filming extra material when conditions were good and keeping it ready for future Reels. Single photographs and carousels could fill weeks when filming outdoors was difficult, instead of making every post depend on a new shoot.",
          ],
        },
        {
          label: "The photographs",
          heading:
            "Let the strongest images stand alone. Use carousels to explain.",
          paragraphs: [
            "Ivo asked about adding camera details to his photographs. Rahul suggested showing the image first and its technical details next in a carousel. A series from one location or an editing comparison could also work, while standout photographs could remain single posts.",
          ],
        },
      ],
    },
    progress: {
      heading: "6,052 followers gained through daily outreach.",
      paragraphs: [
        "Ivo gained 6,052 followers through daily outreach from April 2025 to January 2026.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 596,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 586,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 714,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 669,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 579,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 472,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 701,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 982,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 753,
        },
      ],
    },
    quote:
      "I posted a new Reel using Rahul’s advice. The plan made room for weather, strong individual photographs and carousels, so I knew what to work on next.",
    quoteBy: "Ivo Mostert · Photographer · September 2025",
    close: {
      heading: "Help more people discover the scenes you capture.",
      body: "Get support with reaching photography audiences and making more of the images and footage you already create.",
    },
  },
  {
    slug: "mad-steex",
    niche: "Content creators",
    nicheSlug: "content-creators",
    specialty: "Guitar and studio-gear reviews",
    title: "5,254 followers for MAD STEEX’s gear reviews.",
    intro:
      "Fabio uses Instagram to introduce his longer YouTube reviews of guitars and studio equipment. Tulsi worked from that music-focused brief and suggested ways to show both the gear and the person using it.",
    name: "Fabio",
    business: "MAD STEEX",
    handle: "madsteex",
    photo: "/audiences/journey-v2/results/creators/madsteex-avatar.png",
    gained: 5254,
    period: "25 Apr 2025 – 25 Feb 2026",
    start: {
      heading: "Reach the musicians who care about the equipment.",
      paragraphs: [
        "Fabio is a mix engineer and guitarist working from his own studio. His reviews cover guitars, pedals, amplifiers, microphones and recording equipment. Instagram helps him introduce the longer reviews on YouTube.",
        "He wanted people with an interest in making music, especially in the USA, UK, Germany and Italy. The account needed to show what each review covered and give viewers more ways to see his skills in action.",
      ],
      audience: ["Guitarists", "Music producers", "Studio-gear enthusiasts"],
    },
    approach: {
      heading: "Keep the music audience central. Make the gear easy to see.",
      paragraphs: [
        "We handled daily outreach around Fabio’s guitar and studio-gear brief. Tulsi reviewed the posts and suggested specific changes to how the products, reviews and studio work appeared on the page.",
      ],
      manager: "Tulsi",
      managerFocus:
        "Music and gear audiences, clear product images and studio content",
      steps: [
        {
          label: "Getting discovered",
          heading: "Use the music-making niche to guide the outreach.",
          paragraphs: [
            "Fabio described the equipment he reviewed and the countries he wanted to reach. That gave Tulsi a clear starting point. When he returned to the service in January 2025, he supplied more accounts and hashtags to update the audience brief.",
          ],
        },
        {
          label: "The product reviews",
          heading: "Show the whole product and give the review a clear title.",
          paragraphs: [
            "Tulsi pointed out a photograph where a tube saturator was cropped and recommended framing the whole piece of equipment. She also suggested short, clear titles on Reel covers so visitors could see what a review was about before opening it.",
          ],
        },
        {
          label: "Inside the studio",
          heading: "Show the setup and share a technique.",
          paragraphs: [
            "Tulsi suggested filming the studio setup, recording process and work behind the reviews. Short tips on mixing music could sit alongside guitar covers and product reviews, giving musicians a closer look at how Fabio uses his equipment.",
          ],
        },
      ],
    },
    progress: {
      heading: "5,254 followers gained through daily outreach.",
      paragraphs: [
        "MAD STEEX gained 5,254 followers through daily outreach from April 2025 to February 2026.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 344,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 497,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 433,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 435,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 690,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 607,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 590,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 540,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 582,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 536,
        },
      ],
    },
    quote:
      "I wanted people who were interested in guitar and studio gear. Most of the new followers felt like the right audience, and I was happy with that.",
    quoteBy: "Fabio · MAD STEEX · July 2024",
    close: {
      heading: "Help more musicians discover your work.",
      body: "Get support with finding your audience and showing the gear, skills and process behind your music content.",
    },
  },
  {
    slug: "kwok-polaris",
    niche: "Design",
    nicheSlug: "design",
    specialty: "Automotive design student",
    title: "4,468 followers for Polaris’s car designs.",
    intro:
      "Polaris wanted car designers and design managers to see his work. Shama used that brief to guide the outreach and suggested ways to show the sketches, decisions and finished designs on his profile.",
    name: "Polaris",
    business: "KwokPolaris",
    handle: "kwokpolaris",
    gained: 4468,
    period: "26 Oct 2025 – 25 Jul 2026",
    start: {
      heading: "Get the designs seen beyond the classroom.",
      paragraphs: [
        "Polaris is an automotive-design student sharing transportation concepts and renders. He wanted to be noticed by design managers, while also reaching other designers, students and car enthusiasts.",
        "He welcomed feedback on presenting his ideas. Coursework and projects limited the time he could give Instagram, so profile changes and content ideas needed to be things he could work through gradually.",
      ],
      audience: [
        "Car designers and design managers",
        "Design students",
        "Car enthusiasts",
      ],
    },
    approach: {
      heading: "Reach design audiences. Show how a concept takes shape.",
      paragraphs: [
        "We handled daily outreach around Polaris’s automotive-design brief. Shama reviewed his feedback on the people following him, then offered practical ways to present both finished designs and the process behind them.",
      ],
      manager: "Shama",
      managerFocus:
        "Car-design audiences, the design process and a profile that introduces the work",
      steps: [
        {
          label: "Getting discovered",
          heading: "Start with the car-design world Polaris wanted to join.",
          paragraphs: [
            "Polaris wanted to reach design managers and designers, while welcoming car enthusiasts too. He supplied accounts such as @danielsimondesign, @automotivedesignplanet and @transportation_designers. Shama reviewed his feedback on new followers and planned further refinements.",
          ],
        },
        {
          label: "The design process",
          heading: "Show the journey from sketch to finished render.",
          paragraphs: [
            "Shama suggested time-lapse videos of sketching and a sequence showing an initial concept, intermediate versions and the final design. These formats would let viewers see how Polaris developed an idea, alongside the finished work already on his page.",
          ],
        },
        {
          label: "The profile",
          heading: "Make the car-design focus visible from the first visit.",
          paragraphs: [
            "Shama suggested a profile image connected to the work, adding car design to the name field and using Highlights for projects and ideas. In January 2026, Polaris confirmed that he had changed the profile image.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,468 followers gained through daily outreach.",
      paragraphs: [
        "Polaris gained 4,468 followers through daily outreach from October 2025 to July 2026, across nine recorded periods.",
      ],
      months: [
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 211,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 723,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 501,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 567,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 404,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 533,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 589,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 522,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 418,
        },
      ],
    },
    quote:
      "The feedback gave me a clear place to start. I changed my profile image first, and had specific ideas for showing the sketches, tools and thinking behind my designs.",
    quoteBy: "Polaris · Automotive-design student · January 2026",
    close: {
      heading: "Help more people discover the ideas behind your designs.",
      body: "Get support with reaching design audiences and showing how your concepts develop from first sketch to finished work.",
    },
  },
  {
    slug: "studio-kumo",
    niche: "Design",
    nicheSlug: "design",
    specialty: "Branding and web design · Belgium",
    title: "3,150 followers for Studio Kumo.",
    intro:
      "Leander wanted Belgian architects, interior designers and small studios to discover his branding and web design. Aditi focused the advice on a practical problem: keeping Instagram active while client work filled his days.",
    name: "Leander",
    business: "Studio Kumo",
    handle: "studiokumo.be",
    gained: 3150,
    period: "25 Apr 2025 – 25 Feb 2026",
    start: {
      heading: "Show the studio’s work while running the studio.",
      paragraphs: [
        "Studio Kumo is Leander’s one-person branding and web-design business. He wanted clients who cared about aesthetics, especially architects, interior designers and smaller studios in Belgium, with a focus on Antwerp and Mechelen.",
        "Website projects left little time for Instagram. Leander asked what he could do that would have the most impact with the least extra work. The answer needed to fit the projects he was already delivering.",
      ],
      audience: [
        "Belgian architects",
        "Interior designers",
        "Small design studios",
      ],
    },
    approach: {
      heading:
        "Reach Belgian design businesses. Make the existing work go further.",
      paragraphs: [
        "We handled daily outreach using Leander’s location and client brief. Aditi worked with his design references and suggested ways to turn website projects, layout decisions and everyday work into posts.",
      ],
      manager: "Aditi",
      managerFocus:
        "Belgian design businesses and content made from existing client work",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep Belgium and the desired clients in the brief.",
          paragraphs: [
            "Leander supplied studios and designers such as @studiowitt.be and @gil.huybrecht. He later highlighted @ateliercontour as the kind of client he wanted to reach. Aditi acknowledged that direction and planned further audience refinements around Belgian architects, interior designers and smaller studios.",
          ],
        },
        {
          label: "Showing the work",
          heading: "Turn one website into several posts.",
          paragraphs: [
            "Aditi suggested sharing pages from completed websites, screenshots of work in progress and short design breakdowns. One client website could become a carousel, a Reel and a practical tip, instead of requiring a new idea from scratch for every post.",
          ],
        },
        {
          label: "Behind the design",
          heading: "Film a layout change while the work is happening.",
          paragraphs: [
            "Aditi proposed short clips of Leander designing, adjusting a layout or sketching. A voiceover or a line of text could explain a decision. Reusable templates for branding and web-design tips offered another format that could fit the studio’s existing black-and-white style.",
          ],
        },
      ],
    },
    progress: {
      heading: "3,150 followers gained through daily outreach.",
      paragraphs: [
        "Studio Kumo gained 3,150 followers through daily outreach from April 2025 to February 2026.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 145,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 255,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 194,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 229,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 372,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 392,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 431,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 402,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 334,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 396,
        },
      ],
    },
    quote:
      "I needed ideas I could manage alongside client work. Aditi showed me how screenshots, layout changes and one finished website could become several posts without starting from scratch.",
    quoteBy: "Leander · Studio Kumo · June 2025",
    close: {
      heading: "Help the right businesses discover your design work.",
      body: "Get support with reaching the clients you want and turning the projects you already make into useful posts.",
    },
  },
  {
    slug: "dr-ash-ifbbpro",
    niche: "Fitness",
    nicheSlug: "fitness",
    specialty: "Professional bodybuilding & fitness",
    title: "9,600 followers for Arash’s bodybuilding account.",
    intro:
      "Arash was building his profile as a professional bodybuilder while running a dental practice. Rahul helped him keep the Instagram account focused on fitness and suggested ways to share his training knowledge.",
    name: "Arash",
    business: "Dr. Ash Abdollahi",
    handle: "dr.ash_ifbbpro",
    gained: 9600,
    period: "25 Jun 2025 – 25 Sep 2026",
    start: {
      heading: "Give the bodybuilding account a clear focus.",
      paragraphs: [
        "Arash had recently become a professional bodybuilder. He wanted more visibility in the fitness community to support his career and sponsorship opportunities. He also owned a dental practice, which had its own Instagram page.",
        "Most of his posts already showed workouts and bodybuilding. When Rahul raised the question of which audience to prioritise, Arash agreed to keep fitness at the front of this account.",
      ],
      audience: [
        "Bodybuilding enthusiasts",
        "People interested in fitness",
        "Workout and training audiences",
      ],
    },
    approach: {
      heading:
        "Reach fitness audiences. Share the knowledge behind the training.",
      paragraphs: [
        "We handled daily outreach around Arash’s fitness brief. Rahul worked with him on the account’s direction and suggested ways to make his training posts and talking videos easier to follow.",
      ],
      manager: "Rahul",
      managerFocus:
        "A fitness-led audience, training content and clearer talking videos",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep the outreach centred on fitness.",
          paragraphs: [
            "Arash initially described both fitness and medical audiences. Rahul recommended keeping this page focused on bodybuilding, with the dental clinic presented through its separate account. Arash agreed. The outreach then used that fitness direction as its brief.",
          ],
        },
        {
          label: "What to post",
          heading: "Show more of the routine behind the physique.",
          paragraphs: [
            "Rahul suggested workout tips, a look at what Arash ate in a day, and clips of training or posing. These gave him ways to explain the preparation and daily habits behind his bodybuilding.",
          ],
        },
        {
          label: "The videos",
          heading: "Make the advice easy to watch and hear.",
          paragraphs: [
            "Rahul recommended full-height vertical videos, clear titles and subtitles on talking Reels. He also suggested quiet background music that left Arash’s voice easy to hear, with supporting visuals where they helped explain the point.",
          ],
        },
      ],
    },
    progress: {
      heading: "9,600 followers gained through daily outreach.",
      paragraphs: [
        "Arash gained 9,600 followers through daily outreach from June 2025 to September 2026.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 738,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 776,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 642,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 533,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 354,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 720,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 818,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 818,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 591,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 650,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 628,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 630,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 500,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 567,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 635,
        },
      ],
    },
    quote:
      "I’m a bodybuilder as well as a dentist. Rahul helped me decide what this account should lead with: fitness. My dental clinic already had a page of its own.",
    quoteBy: "Arash · Dr. Ash Abdollahi · July 2024",
    close: {
      heading: "Help more people discover your training and expertise.",
      body: "Get support with reaching fitness audiences and turning your experience into useful posts.",
    },
  },
  {
    slug: "breathguru",
    niche: "Wellness",
    nicheSlug: "wellness",
    specialty: "Breathwork school & practitioner training",
    title: "5,035 followers for Breathguru.",
    intro:
      "Breathguru wanted wellness practitioners to discover its training, alongside people interested in workshops and retreats. Sushmita reviewed breathwork audiences and worked with Natalia on video ideas that fitted the school’s approach.",
    name: "Natalia",
    business: "Breathguru",
    handle: "breath.guru",
    gained: 5035,
    period: "25 Jun 2025 – 25 Aug 2026",
    start: {
      heading: "Introduce the school to future students.",
      paragraphs: [
        "Breathguru teaches Conscious Connected Breathwork through online and in-person training. Natalia described an audience of yoga teachers, coaches, therapists and other wellness practitioners who wanted to add breathwork to their work.",
        "The school also offered workshops, retreats and one-to-one sessions. Natalia wanted videos that explained its approach and gave future students a feel for the work, while keeping clients’ personal moments private.",
      ],
      audience: [
        "Yoga teachers and coaches",
        "Wellness practitioners",
        "Workshop and retreat audiences",
      ],
    },
    approach: {
      heading: "Reach future students. Explain the school’s approach.",
      paragraphs: [
        "We handled daily outreach while Sushmita reviewed which breathwork audiences responded. She also discussed the videos with Natalia and adjusted the ideas around how the school wanted to present its work.",
      ],
      manager: "Sushmita",
      managerFocus:
        "Practitioner audiences, shorter teaching videos and behind-the-scenes content that respects client privacy",
      steps: [
        {
          label: "Getting discovered",
          heading: "Reach people already following breathwork communities.",
          paragraphs: [
            "The July 2025 audience review included @the.breathe.festival, @thebreathworkmovement and @alchemyofbreath among the accounts bringing followers. These gave Sushmita concrete starting points for finding more people interested in breathwork and practitioner training.",
          ],
        },
        {
          label: "The teaching videos",
          heading: "Open with the question and keep the lesson focused.",
          paragraphs: [
            "Sushmita suggested testing videos around 30–60 seconds, with the main question or idea in the first few seconds. After Natalia explained the school’s approach, the discussion focused on general concepts and audience questions, without turning its method into a quick demonstration.",
          ],
        },
        {
          label: "Behind the scenes",
          heading: "Show the space and atmosphere with care.",
          paragraphs: [
            "Natalia liked the idea of showing more behind the scenes, but wanted to protect clients’ privacy. Sushmita suggested filming the space, group setups and atmosphere without identifying individuals. This kept the idea connected to the experience the school wanted to convey.",
          ],
        },
      ],
    },
    progress: {
      heading: "5,035 followers gained through daily outreach.",
      paragraphs: [
        "Breathguru gained 5,035 followers through daily outreach from June 2025 to August 2026.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 218,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 299,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 260,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 349,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 314,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 476,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 305,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 90,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 415,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 532,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 427,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 406,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 543,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 401,
        },
      ],
    },
    quote:
      "We wanted ideas that fit our school. Sushmita took our feedback seriously and helped us explore shorter teaching videos and behind-the-scenes content that respected the boundaries around our clients.",
    quoteBy: "Natalia · Breathguru · March 2026",
    close: {
      heading: "Help future students discover the school you have built.",
      body: "Work with a Brand Manager on reaching your audience and explaining your approach through useful content.",
    },
  },
  {
    slug: "wonder-wo-men-nederland",
    niche: "Business",
    nicheSlug: "business",
    specialty: "Business podcast & professional stories",
    title: "2,024 followers for Wonder Wo-Men Nederland.",
    intro:
      "Esther wanted CEOs, managers and entrepreneurs to discover the podcast. Tulsi used that brief for outreach and suggested clearer Reel covers, direct-to-camera videos and a closer look behind the business stories.",
    name: "Esther",
    business: "Wonder Wo-Men Nederland",
    handle: "wonderwomennederland",
    gained: 2024,
    period: "25 Apr 2025 – 25 Mar 2026",
    start: {
      heading: "Bring the podcast to more professionals.",
      paragraphs: [
        "Wonder Wo-Men Nederland shares podcast conversations and stories from businesspeople. Esther wanted to grow an audience of professionals interested in those episodes, including CEOs, managers and entrepreneurs.",
        "She was already posting regularly. Much of the account used podcast clips, so the content review looked at how each clip introduced its topic and what else she could share between episodes.",
      ],
      audience: [
        "CEOs and managers",
        "Entrepreneurs",
        "Business-podcast listeners",
      ],
    },
    approach: {
      heading:
        "Reach the intended listeners. Give each post a clear introduction.",
      paragraphs: [
        "We handled daily outreach around Esther’s professional audience. Tulsi reviewed her account suggestions and offered practical changes to the way podcast topics appeared on the page.",
      ],
      manager: "Tulsi",
      managerFocus:
        "Professional audiences, clearer Reel covers and formats beyond podcast clips",
      steps: [
        {
          label: "Getting discovered",
          heading: "Use Esther’s professional audience to guide the outreach.",
          paragraphs: [
            "Esther’s brief centred on CEOs, managers and entrepreneurs who might follow the podcast. She updated the accounts she wanted to reach as the work continued. Tulsi acknowledged those changes and confirmed that the new suggestions would be tested.",
          ],
        },
        {
          label: "The Reel covers",
          heading: "Tell viewers what the conversation is about.",
          paragraphs: [
            "Tulsi recommended complete, easy-to-understand phrases on the Reel covers, placed where visitors could read them in the profile grid. Each cover could give the viewer a reason to open that particular conversation.",
          ],
        },
        {
          label: "Beyond the podcast",
          heading: "Add moments where Esther speaks directly to viewers.",
          paragraphs: [
            "Tulsi suggested short informational videos alongside podcast clips, plus written posts and behind-the-scenes moments from Esther’s business and personal development. These gave her more ways to share her perspective between interviews.",
          ],
        },
      ],
    },
    progress: {
      heading: "2,024 followers gained through daily outreach.",
      paragraphs: [
        "Wonder Wo-Men Nederland gained 2,024 followers through daily outreach from April 2025 to March 2026, across 11 recorded periods.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 45,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 118,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 191,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 185,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 247,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 289,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 241,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 253,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 153,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 158,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 144,
        },
      ],
    },
    quote:
      "I was pleased to see the account growing. Tulsi also gave me useful ideas for clearer Reel covers and different ways to share the stories around our podcast.",
    quoteBy: "Esther · Wonder Wo-Men Nederland · May 2024",
    close: {
      heading: "Help more listeners discover your conversations.",
      body: "Get support with audience outreach and useful ways to bring your podcast topics onto Instagram.",
    },
  },
  {
    slug: "harris-homes-az",
    niche: "Real estate",
    nicheSlug: "real-estate",
    specialty: "Real estate · Phoenix, Arizona",
    title: "4,737 followers for Harris Homes AZ.",
    intro:
      "Jackson wanted home buyers and property investors to discover his real-estate content. Rahul focused the outreach on Phoenix and suggested ways to make more of the footage Jackson was already filming at local homes.",
    name: "Jackson Harris",
    business: "Harris Homes AZ",
    handle: "harrishomesaz",
    gained: 4737,
    period: "25 Apr 2025 – 25 Sep 2026",
    start: {
      heading: "Make more of the house visits he was already filming.",
      paragraphs: [
        "Jackson works with home buyers and property investors in the Phoenix area. He was already making educational real-estate videos, often filming a month’s content in a four-to-five-hour session at a few local houses.",
        "He wanted more variety in the posts: house tours, glimpses of his working day and videos that showed his personality alongside the property advice.",
      ],
      audience: [
        "Phoenix home buyers",
        "Property investors",
        "Real-estate education",
      ],
    },
    approach: {
      heading: "Reach property audiences. Give each video more variety.",
      paragraphs: [
        "We handled daily outreach around Jackson’s real-estate audience. Rahul reviewed the profile and videos, then suggested changes Jackson could try within the filming routine he already used.",
      ],
      manager: "Rahul",
      managerFocus:
        "Phoenix property audiences, varied video angles and simpler Reel covers",
      steps: [
        {
          label: "Getting discovered",
          heading: "Focus the outreach on Phoenix property audiences.",
          paragraphs: [
            "Jackson’s brief centred on professionals aged 25–55 interested in real estate. In April 2025, Rahul confirmed that the outreach was focused on Phoenix audiences and reviewed the account’s overall audience insights with him.",
          ],
        },
        {
          label: "The videos",
          heading: "Film from more than one angle.",
          paragraphs: [
            "Rahul noticed that some Reels stayed on one camera angle. He suggested filming from different positions, moving around, using quick cuts and zooming in or out. These gave Jackson specific ways to vary the footage during his house visits.",
          ],
        },
        {
          label: "The Reel covers",
          heading: "Make the title easy to read at a glance.",
          paragraphs: [
            "Some covers had large or cropped text. Rahul recommended shorter titles that stayed inside the frame, with a consistent look across the Reels. Jackson welcomed the feedback and said he would use cleaner titles.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,737 followers gained through daily outreach.",
      paragraphs: [
        "Harris Homes AZ gained 4,737 followers through daily outreach from 25 April 2025 to 25 September 2026.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 142,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 375,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 284,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 214,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 330,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 246,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 300,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 217,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 209,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 337,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 277,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 274,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 369,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 410,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 322,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 274,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 157,
        },
      ],
    },
    quote:
      "I film a lot in one session. Rahul gave me specific ways to vary the angles and transitions, and keep the Reel titles cleaner. The feedback fitted how I work.",
    quoteBy: "Jackson Harris · Harris Homes AZ · May 2025",
    close: {
      heading: "Help more buyers discover the properties you show.",
      body: "Get support with reaching property audiences and making more of your house tours, filming days and real-estate advice.",
    },
  },
  {
    slug: "joanna-dubois-aesthetics",
    niche: "Skincare",
    nicheSlug: "skincare",
    specialty: "Aesthetic injector · Sarasota, Florida",
    title: "4,942 followers for Joanna’s aesthetics practice.",
    intro:
      "Joanna wanted people near Sarasota to discover her work as an aesthetic injector. Srishti used her local audience brief for outreach, refined the bio and helped her plan a clearer way to organise treatment information.",
    name: "Joanna DuBois",
    business: "Joanna DuBois Aesthetics",
    handle: "jodubois_aesthetics_",
    gained: 4942,
    period: "26 Aug 2025 – 25 Sep 2026",
    start: {
      heading: "Introduce an experienced injector to nearby clients.",
      paragraphs: [
        "Joanna had more than ten years of experience and was rebuilding her clientele after returning to LSpa in downtown Sarasota. She wanted people visiting her profile to understand her services and consider booking a treatment.",
        "Her audience was primarily women aged 30–65 around Sarasota, Venice, Bradenton, Lakewood Ranch and the nearby islands. Social-media marketing was new to her, and she wanted practical help with the page.",
      ],
      audience: [
        "Women aged 30–65",
        "Sarasota and nearby communities",
        "Aesthetics and skincare",
      ],
    },
    approach: {
      heading: "Reach the local audience and make the page easier to explore.",
      paragraphs: [
        "We handled daily outreach using Joanna’s local audience brief. Srishti worked with her on the bio and on giving visitors clear places to find information about treatments, skincare and common questions.",
      ],
      manager: "Srishti",
      managerFocus:
        "Sarasota-area audiences, the bio and organised treatment Highlights",
      steps: [
        {
          label: "Getting discovered",
          heading: "Start with the communities around Sarasota.",
          paragraphs: [
            "Joanna named the places her potential clients could come from, including Sarasota, Venice, Bradenton, Lakewood Ranch, Siesta Key, Lido Key and Anna Maria Island. Srishti used that brief to guide the audience choices.",
          ],
        },
        {
          label: "The bio",
          heading: "Put the services, experience and location together.",
          paragraphs: [
            "Srishti proposed a short bio naming aesthetics services, Joanna’s experience and Sarasota, followed by an invitation to book. Joanna confirmed that she updated it. Srishti then suggested breaking the wording into four short lines.",
          ],
        },
        {
          label: "The Highlights",
          heading: "Give each treatment topic its own place.",
          paragraphs: [
            "When Joanna asked how to organise treatment information into folders at the top of the page, Srishti explained Highlights. She suggested separate sections for treatments, skincare, questions and reviews, with matching covers in Joanna’s preferred pastel pink and gold.",
          ],
          note: {
            summary: "The sections Srishti suggested",
            body: "Before & After, Botox, Fillers, Lasers, Skincare, FAQs and Testimonials. Related Stories could be saved into the appropriate section as Joanna posted them.",
          },
        },
      ],
    },
    progress: {
      heading: "4,942 followers gained through daily outreach.",
      paragraphs: [
        "Joanna gained 4,942 followers through daily outreach from 26 August 2025 to 25 September 2026.",
      ],
      months: [
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 31,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 271,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 309,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 414,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 383,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 503,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 380,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 381,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 293,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 399,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 534,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 538,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 506,
        },
      ],
    },
    quote:
      "I updated my bio and made an effort to post daily. Srishti then helped me understand how to organise treatment information in Highlights, using the pink-and-gold style I wanted.",
    quoteBy: "Joanna DuBois · June 2026",
    close: {
      heading: "Help more people nearby discover your practice.",
      body: "Work with a Brand Manager on reaching your local audience and presenting your services in a profile that is easy to explore.",
    },
  },
  {
    slug: "green-bites",
    niche: "Food & drink",
    nicheSlug: "food-and-drink",
    specialty: "Japanese-inspired food · Los Angeles",
    title: "2,397 followers for Green Bites.",
    intro:
      "Keiko wanted more people to discover Green Bites’ rice wraps, onigiri and curries. Aditi used the food and farmers-market audience as the starting point for outreach, and encouraged a return to regular feed posts.",
    name: "Keiko",
    business: "Green Bites",
    handle: "greenbites_la",
    gained: 2397,
    period: "26 Oct 2025 – 25 Sep 2026",
    start: {
      heading: "Bring the food beyond the farmers-market stall.",
      paragraphs: [
        "Green Bites serves Japanese-inspired comfort food at Los Angeles farmers markets and through catering. Keiko wanted to reach local food lovers, while also building a wider community around the food.",
        "She was sharing Stories two or three times a week, but the feed had been quiet. The first content task was to start posting there again at a pace she could maintain.",
      ],
      audience: [
        "Los Angeles food lovers",
        "Farmers-market visitors",
        "Japanese-inspired food",
      ],
    },
    approach: {
      heading: "Find food audiences and get the feed moving again.",
      paragraphs: [
        "We handled daily outreach around Green Bites’ food audience. Aditi worked from Keiko’s brief and looked at how the feed could complement the Stories she was already sharing.",
      ],
      manager: "Aditi",
      managerFocus:
        "Food lovers, farmers-market audiences and a manageable return to feed posting",
      steps: [
        {
          label: "Getting discovered",
          heading: "Start with people who enjoy the food and markets.",
          paragraphs: [
            "Keiko described health-conscious food lovers in Los Angeles, especially farmers-market visitors who enjoyed fresh Japanese-inspired meals. She was also open to followers elsewhere. Aditi used that brief to guide the outreach.",
          ],
        },
        {
          label: "What to post",
          heading: "Add feed posts alongside the Stories.",
          paragraphs: [
            "Aditi encouraged Keiko to plan feed content as well as Stories, then build a posting pace she could keep up with. As the feed developed, she suggested adding behind-the-scenes content and personal stories alongside photographs of the food.",
          ],
        },
      ],
    },
    progress: {
      heading: "2,397 followers gained through daily outreach.",
      paragraphs: [
        "Green Bites gained 2,397 followers through daily outreach from 26 October 2025 to 25 September 2026.",
      ],
      months: [
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 114,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 182,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 189,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 158,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 132,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 176,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 119,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 325,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 335,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 345,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 322,
        },
      ],
      update: {
        heading: "Three new posts to review together.",
        paragraphs: [
          "In November 2025, Aditi reviewed three new feed posts after Keiko had said she would start posting again. That gave them fresh examples to work from in the next content discussion.",
        ],
      },
    },
    quote:
      "I was happy to see the account growing. I already shared Stories, and the advice gave me a practical next step: start posting on the feed again, too.",
    quoteBy: "Keiko · Green Bites · November 2025",
    close: {
      heading: "Help more people discover what you cook.",
      body: "Get support with reaching food lovers and showing the dishes, preparation and people behind your business.",
    },
  },
  {
    slug: "ari-bixhorn",
    niche: "Photography",
    nicheSlug: "photography",
    specialty: "Backpacking and landscape photography · Pacific Northwest",
    title: "7,578 followers for Ari’s backpacking and landscape photography.",
    intro:
      "Ari wanted backpackers and landscape photographers to discover his pictures. Rahul worked from that audience brief, helped him introduce the account and suggested ways to keep sharing photographs when winter meant fewer hikes.",
    name: "Ari Bixhorn",
    handle: "aribix",
    gained: 7578,
    period: "26 Sep 2025 – 25 Sep 2026",
    start: {
      heading: "Reach backpackers who enjoy landscape photography.",
      paragraphs: [
        "Ari is a solo backpacker and landscape photographer in the Pacific Northwest. He wanted to reach fellow backpackers, including people interested in lightweight gear, and photographers drawn to mountains and nightscapes. His goal was for more people to see, enjoy and follow his photography.",
        "By winter, he was hiking less and had less new material to share. He had an archive of older landscapes, but many needed editing for Instagram. He wanted ideas that would fit around work, family and the season.",
      ],
      audience: [
        "Solo and lightweight backpackers",
        "Pacific Northwest hikers",
        "Mountain and nightscape photographers",
      ],
    },
    approach: {
      heading: "Find the outdoor audience. Work with the photographs Ari has.",
      paragraphs: [
        "Ignited handled daily outreach using Ari’s backpacking and photography brief. Rahul’s advice then focused on what visitors would learn from the profile and how recent hikes and older photographs could work together.",
      ],
      manager: "Rahul",
      managerFocus:
        "Backpacking audiences, a clearer profile and photographs for the winter months",
      steps: [
        {
          label: "Getting discovered",
          heading: "Start with backpackers and landscape photographers.",
          paragraphs: [
            "Ari described a specific audience: solo and lightweight backpackers, people exploring the Pacific Northwest, and photographers who enjoy mountains and night skies. Rahul used that brief to guide outreach and invited Ari to flag any people who seemed outside the niche.",
          ],
        },
        {
          label: "The profile",
          heading: "Introduce the backpacking and photography at a glance.",
          paragraphs: [
            "Rahul suggested adding the niche to Ari’s profile name and organising Highlights around his trips, photographs and gear. Ari added Highlights and later changed the name to ‘Ari Bixhorn | Backpacking | Landscapes.’ He chose to keep the bio that felt authentic to him.",
          ],
        },
        {
          label: "The winter archive",
          heading: "Mix recent hikes with older landscape photographs.",
          paragraphs: [
            "When winter limited new shoots, Rahul suggested alternating recent pictures with archive work. Older landscape images could become carousels or simple photo Reels, while one or two posts a week offered a manageable starting point. Ari did not need to save every post for a new hike.",
          ],
        },
      ],
    },
    progress: {
      heading: "7,578 followers gained through daily outreach.",
      paragraphs: [
        "Ari gained 7,578 followers through daily outreach from September 2025 to September 2026.",
      ],
      months: [
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 505,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 754,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 707,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 682,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 586,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 565,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 609,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 551,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 663,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 723,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 657,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 576,
        },
      ],
    },
    quote:
      "The growth has been exciting, and Rahul’s advice fits the way I photograph. I updated my profile name and had a plan for sharing older landscapes through the winter.",
    quoteBy: "Ari Bixhorn · Photographer · January 2026",
    close: {
      heading: "Help more people discover the places you photograph.",
      body: "Get support with reaching outdoor and photography audiences and making more of the pictures you already have.",
    },
  },
  {
    slug: "jennifer-travel-bird-photography",
    niche: "Photography",
    nicheSlug: "photography",
    specialty: "Travel and bird photography",
    title: "9,458 followers for Jennifer’s travel and bird photography.",
    intro:
      "Jennifer was already posting photographs every day. Sushmita helped her think beyond the finished image, with ideas for captions, photo sequences and simple videos showing what it takes to photograph birds.",
    name: "Jennifer",
    business: "Travel & Bird Photography",
    handle: "jennifersunglao_photography",
    gained: 9458,
    period: "25 Jun 2025 – 25 Sep 2026",
    start: {
      heading: "Get the photographs seen. Show the story behind the shot.",
      paragraphs: [
        "Jennifer photographs travel scenes and birds. She wanted photographers and people who enjoy wildlife and travel pictures to see her work, with the possibility of selling photographs in the future.",
        "She was committed to a daily photograph, but editing extra images and making Reels took time. She wanted feedback on what to try and how to make more of the photographs and footage she already had.",
      ],
      audience: [
        "Travel photographers",
        "Wildlife photographers",
        "People who enjoy bird and travel pictures",
      ],
    },
    approach: {
      heading: "Reach photography audiences. Bring viewers into the shoot.",
      paragraphs: [
        "Ignited handled daily outreach around Jennifer’s travel and wildlife brief. Sushmita reviewed her photographs, captions and Reels, then gave feedback that connected new formats to the bird photography already at the heart of the account.",
      ],
      manager: "Sushmita",
      managerFocus:
        "Photography audiences, stories in captions and practical feedback on Reels",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep travel and wildlife photography at the centre.",
          paragraphs: [
            "Jennifer wanted to reach photographers and people who liked looking at travel and wildlife images. Sushmita acknowledged that brief for the outreach and asked Jennifer to flag any audience mismatches, keeping the photographs and their intended viewers central.",
          ],
        },
        {
          label: "Telling the story",
          heading:
            "Give a photograph context, or tell a story in three frames.",
          paragraphs: [
            "Sushmita suggested fuller captions and carousels that connected several images. Jennifer tried a three-photo story, then explained the editing time it required. The advice shifted toward fewer posts if she needed more time for each one, rather than treating a daily upload as essential.",
          ],
        },
        {
          label: "Behind the camera",
          heading: "Show the wait for a bird, then reveal the photograph.",
          paragraphs: [
            "Sushmita suggested filming camera setup, quiet waiting and the final bird photographs. After Jennifer shared a Reel about photographing puffins from a blind, Sushmita offered specific edits: a shorter cut, a clear opening question, steadier clips and quiet music beneath the narration.",
          ],
        },
      ],
    },
    progress: {
      heading: "9,458 followers gained through daily outreach.",
      paragraphs: [
        "Jennifer gained 9,458 followers through daily outreach from June 2025 to September 2026.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 744,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 652,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 588,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 603,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 546,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 568,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 703,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 593,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 628,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 715,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 437,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 653,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 755,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 702,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 571,
        },
      ],
    },
    quote:
      "I appreciated having someone look closely at my photographs and the puffin Reel. Sushmita gave me specific feedback, and I’m continuing to tell the stories behind my pictures.",
    quoteBy: "Jennifer · Travel and bird photographer · August 2025",
    close: {
      heading: "Help more people discover the stories in your photographs.",
      body: "Get support with reaching photography audiences and showing the patience, process and places behind your pictures.",
    },
  },
  {
    slug: "last-men-on-earth",
    niche: "Music & DJs",
    nicheSlug: "music-and-djs",
    specialty: "Electronic music producers and DJs",
    title: "6,884 followers for Last Men On Earth’s music.",
    intro:
      "The duo wanted electronic-music listeners to find their own productions. Srishti used that audience brief for outreach and suggested ways to turn studio sessions and new streams into content between live shows.",
    name: "Sebastian",
    business: "Last Men On Earth",
    handle: "lastmenonearth_",
    gained: 6884,
    period: "25 Jun 2025 – 25 May 2026",
    start: {
      heading: "Bring more listeners into the duo’s musical world.",
      paragraphs: [
        "Last Men On Earth produce house music and perform their own tracks in DJ sets. Sebastian wanted Instagram to introduce more people to the music and help the duo build a larger community of listeners. They also saw an audience on Instagram as useful when approaching promoters.",
        "By August 2025, the duo wanted fresh content ideas that fitted their style. They had no big festival stages coming up in the next few months, but they had a studio and had recently started streaming. Their Spanish-speaking community mattered, alongside the global audience they wanted to reach.",
      ],
      audience: [
        "Electronic-music listeners",
        "House-music fans",
        "DJs and music producers",
      ],
    },
    approach: {
      heading: "Reach music listeners. Make the studio part of the story.",
      paragraphs: [
        "We handled daily outreach around the duo’s electronic-music brief. Srishti then worked through the profile and content, looking at what Last Men On Earth could share using the music, studio and streams they already had.",
      ],
      manager: "Srishti",
      managerFocus:
        "Electronic-music audiences, a clearer profile and studio content between shows",
      steps: [
        {
          label: "Getting discovered",
          heading:
            "Use the music and the intended listeners to guide outreach.",
          paragraphs: [
            "Sebastian described the duo’s house productions, live sets and existing community of DJs and producers. Srishti acknowledged that brief for audience selection and invited feedback if the people reached did not fit the music. The aim was to introduce the account to more potential listeners.",
          ],
        },
        {
          label: "The profile",
          heading: "Give a new visitor a direct route to the music.",
          paragraphs: [
            "Srishti suggested a bio naming the duo as electronic-music producers and DJs, followed by an invitation to hear their latest releases. She also proposed Highlights for live sets, studio work, music and tours. In July 2025, Sebastian said they had followed the recommendations, with the Highlights still to finish.",
          ],
        },
        {
          label: "Between shows",
          heading: "Use the studio when a festival stage is not available.",
          paragraphs: [
            "After the duo explained that no large festival shows were coming up, Srishti proposed short studio performances and remix snippets. Lighting, quick cuts and a clear opening line could give a clip energy while keeping the music central. The ideas used the setup they already had.",
          ],
        },
        {
          label: "The new streams",
          heading: "Show the setup, then tell the story behind a track.",
          paragraphs: [
            "The duo had started streaming and planned to continue weekly. Srishti suggested filming the lights coming on, the gear and a preview of the stream. She also proposed playing an original track under captions or a voiceover about its inspiration, giving listeners more context for the music.",
          ],
        },
      ],
    },
    progress: {
      heading: "6,884 followers gained through daily outreach.",
      paragraphs: [
        "Last Men On Earth gained 6,884 followers through daily outreach from June 2025 to May 2026. The strongest recorded period, ending 25 February 2026, added 687 followers.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 546,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 622,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 627,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 634,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 673,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 652,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 686,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 687,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 529,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 662,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 566,
        },
      ],
      update: {
        heading:
          "The duo reached an audience milestone they had set themselves.",
        paragraphs: [
          "On 31 March 2026, Sebastian reported that Last Men On Earth had reached its goal of 10,000 followers on Instagram.",
        ],
      },
    },
    quote:
      "We didn’t have big festival shows coming up, so we needed ideas that fitted our style. Srishti gave us ways to share the studio, our streams and the stories behind our tracks.",
    quoteBy: "Sebastian · Last Men On Earth · August 2025",
    close: {
      heading: "Help more listeners discover the music you make.",
      body: "Get support with reaching music audiences and turning your studio work, releases and performances into things worth sharing.",
    },
  },
  {
    slug: "kulam-project",
    niche: "Music & DJs",
    nicheSlug: "music-and-djs",
    specialty: "Live improvised music and ecstatic dance",
    title: "4,768 followers for Kulam Project’s live music.",
    intro:
      "Nir wanted people to attend Kulam Project’s events, listen to its music and invite the project to festivals. Tulsi refined the audience brief and suggested a clearer introduction to the live experience.",
    name: "Nir",
    business: "Kulam Project",
    handle: "kulam_project",
    gained: 4768,
    period: "10 recorded periods · 25 Jun 2025 – 25 Aug 2026",
    start: {
      heading: "Help people understand what a Kulam event feels like.",
      paragraphs: [
        "Nir founded Kulam Project, which brings guest musicians together for live improvised music and ecstatic dance. He wanted Instagram visitors to come to an event, listen to the music or consider booking the project for a festival.",
        "The account already shared event posters, collaborations and memories of past performances. In February 2026, Nir explained that music releases were a newer part of the page. He wanted people to see the project’s character and professionalism, as well as the next date on the calendar.",
      ],
      audience: [
        "Live-music listeners",
        "Ecstatic-dance communities",
        "Festival organisers",
      ],
    },
    approach: {
      heading: "Find music audiences. Show the experience behind the event.",
      paragraphs: [
        "We handled daily outreach while Tulsi reviewed the music audiences and the references Nir supplied. The profile and content advice focused on introducing the live experience to someone who had never attended.",
      ],
      manager: "Tulsi",
      managerFocus:
        "Music and dance audiences, a clearer event introduction and moments beyond the posters",
      steps: [
        {
          label: "Getting discovered",
          heading: "Build on the music and dance audiences already responding.",
          paragraphs: [
            "A February 2025 audience review included people following @uriatsur, @curawaka_official and @janax_pacha. Nir continued adding references, including ecstatic-dance communities. When he supplied more musicians in February 2026, Tulsi agreed to include them in the outreach strategy.",
          ],
          note: {
            summary: "The audience references Nir added",
            body: "In March 2025, Nir supplied @ecstaticdanceandvoiceportugal and @ecstaticdance.berlin among his references. In February 2026, he added musicians including @aware.musica, @netanel_goldberg and @mushinamusic.",
          },
        },
        {
          label: "The profile",
          heading: "Explain the live music and show where to learn more.",
          paragraphs: [
            "Tulsi recommended adding the music-and-dance focus beside Kulam Project’s name. For the bio, she suggested a short explanation of live improvised events with guest musicians and a clear invitation to find more information through the link below.",
          ],
        },
        {
          label: "Beyond the posters",
          heading:
            "Show the crowd, the atmosphere and the people behind the music.",
          paragraphs: [
            "Nir wanted both future attendees and festival organisers to understand the project. Tulsi suggested adding real event moments, crowd reactions, behind-the-scenes footage and audience feedback alongside announcements. Nir said they already had Reels showing the energy of live events and planned to add more talking clips and testimonials.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,768 followers gained through daily outreach.",
      paragraphs: [
        "Kulam Project gained 4,768 followers through daily outreach across 10 recorded periods between June 2025 and August 2026. The strongest recorded period, ending 25 April 2026, added 636 followers.",
        "The chart shows the saved reporting periods. No period is recorded for 26 August–25 December 2025.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 528,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 247,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 29,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 408,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 597,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 636,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 626,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 559,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 546,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 592,
        },
      ],
      update: {
        heading: "Nir made the profile update his own.",
        paragraphs: [
          "On 23 February 2026, Nir confirmed that he had made the suggested profile update with a few changes of his own. Tulsi reviewed it the following day and acknowledged the changes before asking about the project’s content goals.",
        ],
      },
    },
    quote:
      "I wanted people to come to our events, hear the music and consider booking us. I made the suggested profile update with a few changes of my own.",
    quoteBy: "Nir · Founder, Kulam Project · February 2026",
    close: {
      heading: "Help more people discover the experience you create.",
      body: "Get support with reaching music and event audiences and showing what happens beyond the event poster.",
    },
  },
  {
    slug: "rewild-breathwork",
    niche: "Wellness",
    nicheSlug: "wellness",
    specialty: "Breathwork teacher training",
    title: "3,614 followers for ReWild Breathwork’s teacher training.",
    intro:
      "Jamie wanted coaches, therapists and yoga teachers to discover ReWild’s training. Sushmita reviewed breathwork audiences, worked with Jamie’s account suggestions and offered ways to explain the teaching beyond programme announcements.",
    name: "Jamie",
    business: "ReWild Breathwork",
    handle: "rewildbreathwork",
    gained: 3614,
    period: "25 Apr 2025 – 25 Jan 2026",
    start: {
      heading: "Help future facilitators discover the training.",
      paragraphs: [
        "ReWild Breathwork trains people to become somatic breathwork facilitators. Jamie described an audience of life and executive coaches, therapists, wellness practitioners and yoga teachers who might bring the approach into their own work.",
        "Jamie wanted more people to know the school and discover its training. The account already showed programmes and events; the content review explored what future students could learn from the posts between those announcements.",
      ],
      audience: [
        "Coaches and wellness practitioners",
        "Therapists",
        "Yoga teachers",
      ],
    },
    approach: {
      heading: "Find practitioner audiences. Explain what the school teaches.",
      paragraphs: [
        "We handled daily outreach while Sushmita reviewed breathwork audiences and discussed new account suggestions with Jamie. She also offered practical changes to the text and teaching content visitors would see.",
      ],
      manager: "Sushmita",
      managerFocus:
        "Practitioner audiences, readable Reel text and education alongside event posts",
      steps: [
        {
          label: "Getting discovered",
          heading: "Review audiences already following breathwork accounts.",
          paragraphs: [
            "The February 2025 review named @spiritusbreathwork, @breath.masters, @alchemyofbreath and @breathworkbali among the accounts bringing followers. Sushmita used those responses to review the outreach and asked Jamie which other audiences fitted the school.",
          ],
        },
        {
          label: "Refining the outreach",
          heading: "Work from Jamie’s chosen accounts.",
          paragraphs: [
            "Jamie did not have time to assess a research list of more than 1,500 accounts. She asked to focus on the names she had supplied, including @pausebreathwork, @othership and @breathwaveireland. Sushmita gathered those suggestions into a shorter list for her to confirm.",
          ],
        },
        {
          label: "The Reel text",
          heading: "Separate the words from the background.",
          paragraphs: [
            "In the July 2024 content review, Sushmita noticed that text blended into the background of one Reel. She suggested moving it to a clearer position or adding an outline, using another of ReWild’s own Reels as the reference.",
          ],
        },
        {
          label: "What to post",
          heading: "Explain the subject between programme announcements.",
          paragraphs: [
            "Sushmita suggested short educational Reels explaining what somatic breathwork is, alongside teasers for upcoming events. This gave Jamie a way to introduce the subject to people who might be interested in training but were still learning about the school.",
          ],
        },
      ],
    },
    progress: {
      heading: "3,614 followers gained through daily outreach.",
      paragraphs: [
        "ReWild Breathwork gained 3,614 followers through daily outreach from April 2025 to January 2026, across nine recorded periods.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 211,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 343,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 518,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 413,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 475,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 516,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 478,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 302,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 358,
        },
      ],
    },
    quote:
      "I wanted coaches and wellness practitioners to discover our training. Sushmita gave me useful content feedback and worked through the breathwork accounts I suggested when the larger research list was too much.",
    quoteBy: "Jamie · ReWild Breathwork · July 2024–March 2025",
    close: {
      heading: "Help future students discover what you teach.",
      body: "Get support with reaching coaches, therapists and yoga teachers and introducing your teaching through clear, useful posts.",
    },
  },
  {
    slug: "hygieia-fitness",
    niche: "Fitness",
    nicheSlug: "fitness",
    specialty: "Fitness coaching & wellness retreats",
    title: "835 followers for Tara’s fitness and wellness account.",
    intro:
      "Tara wanted women interested in fitness and wellness to discover her coaching and retreats. Aditi used that brief for outreach, helped refine the profile and suggested more consistent ways to present retreat footage.",
    name: "Tara",
    business: "Hygieia & Fitness by Tara",
    handle: "hygieia__fitness",
    gained: 835,
    period: "25 Apr 2025 – 25 Nov 2025",
    start: {
      heading: "Bring a dormant account back into regular use.",
      paragraphs: [
        "Tara offered fitness coaching and wellness retreats through Hygieia & Fitness. Her audience brief centred on women aged 25–55, with Dallas and New York City relevant to in-person retreats and a wider audience online.",
        "She had resumed regular posting after the account had been quiet for several years. She wanted the page to reflect both fitness and the broader wellness experiences she offered.",
      ],
      audience: [
        "Women interested in fitness and wellness",
        "Dallas and NYC retreat audiences",
        "People exploring personal growth",
      ],
    },
    approach: {
      heading:
        "Reach the intended audience. Give the profile a clear introduction.",
      paragraphs: [
        "We handled daily outreach around Tara’s audience brief. Aditi reviewed the account, explained how audience responses guided further testing and offered changes Tara could make to her profile and content.",
      ],
      manager: "Aditi",
      managerFocus:
        "Women interested in wellness, a clearer profile and more consistent retreat visuals",
      steps: [
        {
          label: "Getting discovered",
          heading: "Use Tara’s wellness brief to guide audience testing.",
          paragraphs: [
            "Tara described women interested in boutique fitness, retreats and personal growth. Aditi used that brief for outreach, then tested new audiences and adjusted the outreach based on which accounts brought followers.",
          ],
        },
        {
          label: "The profile",
          heading: "Make Tara and her services easier to recognise.",
          paragraphs: [
            "Aditi suggested a closer profile photo and a bio naming fitness coaching, retreats, NYC, Dallas and Zoom. Tara kept her existing photo, zoomed in on her face and confirmed that she had revised the bio. She had also added Story Highlights after the initial profile guidance.",
          ],
        },
        {
          label: "The retreat content",
          heading: "Choose images that tell one clear story.",
          paragraphs: [
            "Aditi suggested using one or two fonts, a consistent set of colours and retreat photos that fitted the message. For Reels, she recommended steadier footage and simpler transitions between related clips, so the visuals could follow a clear story.",
          ],
        },
      ],
    },
    progress: {
      heading: "835 followers gained through daily outreach.",
      paragraphs: [
        "Hygieia & Fitness gained 835 followers through daily outreach from April to November 2025, across seven recorded periods.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 51,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 56,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 122,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 205,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 142,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 82,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 177,
        },
      ],
    },
    quote:
      "I updated my bio and brought my face closer in the profile photo after Aditi’s feedback. Those were practical changes I could make myself while building Hygieia’s presence on Instagram.",
    quoteBy: "Tara · Hygieia & Fitness · April 2025",
    close: {
      heading: "Help people discover your coaching and retreats.",
      body: "Work with a Brand Manager on audience outreach, a clear profile and content that shows what you offer.",
    },
  },
  {
    slug: "mscoachforlife",
    niche: "Wellness",
    nicheSlug: "wellness",
    specialty: "Wellness coaching for older women",
    title: "630 followers for Michelle’s women’s wellness account.",
    intro:
      "Michelle was new to Instagram and wanted to reach older women interested in wellness. Shama worked through her audience choices, explained how to create Highlights and helped her plan formats for daily check-ins and gratitude posts.",
    name: "Michelle",
    handle: "mscoachforlife",
    gained: 630,
    period: "26 Jan 2026 – 25 Jul 2026",
    start: {
      heading: "Build a wellness community on Instagram.",
      paragraphs: [
        "Michelle began posting in 2026 with a focus on wellness and longevity. Her brief described women aged 45 and over looking for guidance and community, with coaching and digital products among her longer-term goals.",
        "She wanted to reach people beyond her local area. As the outreach developed, she clarified that the audience should be everyday women looking for wellness ideas, rather than mainly wellness professionals.",
      ],
      audience: [
        "Women aged 45+",
        "Everyday wellness audiences",
        "People seeking guidance and community",
      ],
    },
    approach: {
      heading: "Refine the audience. Make the next posting step manageable.",
      paragraphs: [
        "We handled daily outreach while Shama worked through Michelle’s audience feedback. Alongside that testing, she gave Michelle practical help with the profile and the posts she was already planning.",
      ],
      manager: "Shama",
      managerFocus:
        "Everyday wellness audiences, step-by-step Highlights help and a practical mix of photos and Reels",
      steps: [
        {
          label: "Getting discovered",
          heading: "Look for women seeking guidance, beyond other coaches.",
          paragraphs: [
            "Michelle suggested accounts such as @therglife_, @janetosbornefitness and @carolinescircuits. By April 2026, Shama confirmed that testing had started.",
          ],
        },
        {
          label: "The profile",
          heading: "Use the name and bio for different jobs.",
          paragraphs: [
            "Shama suggested moving “Author · Coach · Consultant” into Michelle’s profile name. That left the bio to explain the page’s focus on women’s wellness, simple habits and what visitors could expect to find.",
          ],
        },
        {
          label: "Learning Instagram",
          heading: "Explain Highlights from the first Story onward.",
          paragraphs: [
            "Michelle was unsure how to create the proposed About Me, Start Here and Wellness Highlights. Shama wrote a step-by-step guide that began with posting a Story, then saving it into a named Highlight and adding more Stories later.",
          ],
        },
        {
          label: "What to post",
          heading: "Keep the check-ins. Choose the right format for each.",
          paragraphs: [
            "Michelle was sharing daily wellness check-ins and gratitude posts. Shama explained that reflective images could remain ordinary photo posts, while Reels could use short moving clips or Michelle speaking. She also suggested filling the vertical screen and said Michelle could finish her planned monthly theme.",
          ],
        },
      ],
    },
    progress: {
      heading: "630 followers gained through daily outreach.",
      paragraphs: [
        "Michelle gained 630 followers through daily outreach across six recorded periods from January to July 2026.",
      ],
      months: [
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 106,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 104,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 119,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 91,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 134,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 76,
        },
      ],
    },
    quote:
      "I was new to Instagram. Shama gave me step-by-step help with Highlights and practical guidance on when to use photos or moving video for my wellness posts.",
    quoteBy: "Michelle · Wellness coach · February–March 2026",
    close: {
      heading: "Give your expertise a clear place on Instagram.",
      body: "Get help with audience outreach and the practical steps of introducing your work through your profile and posts.",
    },
  },
  {
    slug: "bar-painting",
    niche: "Home & building",
    nicheSlug: "home-and-building",
    specialty: "Home painting · Phoenix, Arizona",
    title: "4,711 followers for BAR Painting.",
    intro:
      "Gerardo wanted more people to recognise BAR Painting. Shama used his homeowner brief for outreach, responded when he wanted to reach building trades, and suggested ways to show a painting job from start to finish.",
    name: "Gerardo",
    business: "BAR Painting",
    handle: "bar_painting_",
    gained: 4711,
    period: "25 Apr 2025 – 25 Jun 2026",
    start: {
      heading: "Show homeowners the work behind a fresh coat of paint.",
      paragraphs: [
        "BAR Painting handles commercial and residential painting, with a focus on home interiors and exteriors in Phoenix. Gerardo wanted to build recognition for the business and show more people its work.",
        "His initial audience was homeowners, particularly women with families. He was already following people who looked like potential customers and liking their posts; he wanted support with reaching more of that audience.",
      ],
      audience: [
        "Homeowners",
        "Home interiors and exteriors",
        "Builders and home-service businesses",
      ],
    },
    approach: {
      heading: "Start with homeowners, then add the building trades.",
      paragraphs: [
        "We handled daily outreach using Gerardo’s audience brief. Shama reviewed his profile and painting posts, then adjusted the direction with him when he wanted to reach other businesses working on homes.",
      ],
      manager: "Shama",
      managerFocus:
        "Homeowners, building trades and showing the full painting process",
      steps: [
        {
          label: "Getting discovered",
          heading: "Follow the audience as the business brief develops.",
          paragraphs: [
            "The outreach began with Gerardo’s homeowner brief. In September 2025, he asked to include builders, general contractors, HVAC, restoration, plumbing, roofing, solar and flooring businesses. Shama agreed to use that direction and the example accounts he supplied.",
          ],
        },
        {
          label: "The bio",
          heading: "Give the free-estimate offer room to stand out.",
          paragraphs: [
            "The bio had two invitations: book a free estimate and follow for photographs. Part of the wording was hidden behind “more”. Shama recommended a shorter version with the painting message, experience and one clear invitation to request an estimate.",
          ],
        },
        {
          label: "The painting videos",
          heading: "Show the job before, during and after.",
          paragraphs: [
            "In July 2025, Shama reviewed Gerardo’s painting Reels and before-and-after carousels. She suggested turning the transformations into videos, using cuts, subtitles and voiceover to explain the work as it happened. The material could come from jobs he was already showing.",
          ],
          note: {
            summary: "A way to organise the footage",
            body: "Open with the room before painting, show the work in progress, then reveal the finished interior or exterior. Shama also suggested using the finished result as the Reel cover, with a short title.",
          },
        },
      ],
    },
    progress: {
      heading: "4,711 followers gained through daily outreach.",
      paragraphs: [
        "BAR Painting gained 4,711 followers through daily outreach from 25 April 2025 to 25 June 2026.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 139,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 261,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 294,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 171,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 417,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 413,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 374,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 462,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 446,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 457,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 554,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 313,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 249,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 161,
        },
      ],
      update: {
        heading: "Gerardo put the profile suggestions into practice.",
        paragraphs: [
          "When Shama followed up in June 2025, Gerardo confirmed that he had made the suggested profile changes shortly after receiving them. The next review moved on to presenting the painting work in videos.",
        ],
      },
    },
    quote:
      "I already had plenty of painting work to show. Shama helped me think about turning it into a story: before, during and after, with cleaner cuts and voiceover.",
    quoteBy: "Gerardo · BAR Painting · July 2025",
    close: {
      heading: "Help more people discover the work you do on homes.",
      body: "Get support with reaching homeowners and showing the preparation, progress and finished work behind your services.",
    },
  },
  {
    slug: "favorite-bikes",
    niche: "Products",
    nicheSlug: "products",
    specialty: "Electric bikes · USA and Canada",
    title: "7,433 followers for Favorite Bikes.",
    intro:
      "Favorite Bikes wanted to be recognised by more people interested in electric bikes. Tulsi reviewed competitor audiences for outreach and suggested content that explained the bikes’ features, showed how they were made and put them on the road.",
    name: "John",
    business: "Favorite Bikes",
    handle: "favoritebikesofficial",
    photo:
      "/audiences/journey-v2/results/products/favoritebikesofficial-avatar.png",
    gained: 7433,
    period: "18 recorded periods · 15 Feb 2025 – 25 Sep 2026",
    start: {
      heading: "Find people who want to understand an e-bike.",
      paragraphs: [
        "Favorite Bikes sells electric bikes. In his March 2024 brief, John wanted to reach people in the USA and Canada who were interested in buying or working on e-bikes. Building brand recognition was the first goal.",
        "The feed relied heavily on individual promotional images. John wanted advice on what else the brand could do, alongside the outreach, to give visitors more reasons to explore the bikes.",
      ],
      audience: [
        "E-bike buyers",
        "USA and Canada",
        "Cycling and electric-bike communities",
      ],
    },
    approach: {
      heading: "Find e-bike audiences and give them more to explore.",
      paragraphs: [
        "We handled daily outreach around electric-bike and cycling audiences. Tulsi worked with John’s competitor suggestions and reviewed how the posts could explain more about the products. The content discussions began in 2024; audience reviews continued in 2025.",
      ],
      manager: "Tulsi",
      managerFocus:
        "E-bike audiences, useful product explanations and ideas from the workshop and the ride",
      steps: [
        {
          label: "Getting discovered",
          heading: "Use the audiences around similar bikes.",
          paragraphs: [
            "John supplied businesses selling products like his. Tulsi reviewed the list and explained which accounts could be used for audience research. By September 2025, the outreach review named cycling and electric-bike accounts including @velowavebikes, @zoozbikes and @electricbikelife.",
          ],
        },
        {
          label: "The product posts",
          heading: "Explain the features behind the photograph.",
          paragraphs: [
            "In April 2024, Tulsi suggested Reels and carousels that introduced a bike’s battery life, motor, design and features. She also recommended fuller captions about the bikes and accessories, giving viewers more context than the brief promotional captions already on the feed.",
          ],
        },
        {
          label: "Behind the bike",
          heading: "Show how the bike is made and where it goes.",
          paragraphs: [
            "Tulsi suggested filming design, assembly and testing in the workshop. Later in 2024, she added ideas for bikes in use on trails, coastal routes and city streets, with someone explaining a feature or an everyday riding experience. These were ideas for John to develop.",
          ],
        },
      ],
    },
    progress: {
      heading: "7,433 followers gained through daily outreach.",
      paragraphs: [
        "Favorite Bikes gained 7,433 followers through daily outreach across 18 recorded periods between 15 February 2025 and 25 September 2026.",
      ],
      months: [
        {
          dates: "15 Feb 2025 – 17 Mar 2025",
          followers: 227,
        },
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 332,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 328,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 437,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 333,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 308,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 459,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 825,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 433,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 400,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 565,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 424,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 569,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 492,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 376,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 388,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 277,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 260,
        },
      ],
    },
    quote:
      "We wanted people already interested in e-bikes. Tulsi worked with competitor audiences and suggested showing the features, assembly and riding experience, giving us more to explain than a product photo.",
    quoteBy: "John · Favorite Bikes · 2024",
    close: {
      heading: "Give more people a reason to explore your products.",
      body: "Get support with reaching e-bike audiences and showing the features, assembly and riding experience behind your bikes.",
    },
  },
  {
    slug: "zaremba-potts-group",
    niche: "Real estate",
    nicheSlug: "real-estate",
    specialty: "Luxury real estate · Big Sky, Montana",
    title: "4,452 followers for Zaremba Potts Group.",
    intro:
      "Matt wanted to broaden the audience for luxury homes in Big Sky. Rahul worked with the property brief, considered the cities Matt wanted to reach, and suggested more informative tours that showed both the homes and their surroundings.",
    name: "Matt Zaremba",
    business: "Zaremba Potts Group",
    handle: "zarembapottsgroup",
    gained: 4452,
    period: "25 Apr 2025 – 25 Sep 2026",
    start: {
      heading: "Introduce the homes to buyers looking beyond their own city.",
      paragraphs: [
        "Zaremba Potts Group sells luxury homes in Big Sky, Montana. The initial brief described homes within two private clubs and an audience of men and women aged 45–55. Matt wanted to broaden the account’s reach.",
        "In February 2025, he added Park City to the audience brief and asked for more focus on Dallas and Houston, which he described as important places that buyers came from.",
      ],
      audience: [
        "Luxury-property audiences",
        "Big Sky and Park City",
        "Dallas and Houston",
      ],
    },
    approach: {
      heading:
        "Reach property audiences and explain what makes each home different.",
      paragraphs: [
        "We handled daily outreach around the property audience. Rahul reviewed Matt’s geographic requests and suggested ways to add information to the home tours, listing photographs and Reel covers.",
      ],
      manager: "Rahul",
      managerFocus:
        "Property audiences, buyer locations and narrated home tours",
      steps: [
        {
          label: "Getting discovered",
          heading: "Include the places Matt wanted buyers to come from.",
          paragraphs: [
            "Matt shared Park City accounts and asked to reach more people in Dallas and Houston. Rahul agreed to use the brief when selecting audiences. A March 2025 review also identified Big Sky property accounts bringing followers, including @bigskysir and @bigsky_realestate.",
          ],
        },
        {
          label: "The property tours",
          heading: "Explain each room as the tour moves.",
          paragraphs: [
            "In July 2024, Rahul suggested adding narration to property tours so viewers could understand individual rooms and features. He also recommended more interior photographs in listing carousels. In April 2026, he returned to guided tours with a familiar face or voice.",
          ],
        },
        {
          label: "The setting",
          heading: "Show the surroundings before visitors open the tour.",
          paragraphs: [
            "Rahul suggested drone or wide-angle images for Reel covers, with a clear title positioned over the image. He also proposed short videos of the surrounding area, giving Matt ideas for showing the setting alongside the home itself.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,452 followers gained through daily outreach.",
      paragraphs: [
        "Zaremba Potts Group gained 4,452 followers through daily outreach from 25 April 2025 to 25 September 2026.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 84,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 110,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 100,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 89,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 160,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 199,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 404,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 319,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 200,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 396,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 338,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 458,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 318,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 285,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 256,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 458,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 278,
        },
      ],
    },
    quote:
      "Our homes need more than a quick look. Rahul’s suggestions were specific: explain rooms as we move through them, show the surroundings, and make the property clear from the cover.",
    quoteBy: "Matt Zaremba · Zaremba Potts Group · July 2024",
    close: {
      heading:
        "Help more buyers discover what makes a property worth exploring.",
      body: "Get support with reaching property audiences and shaping tours that show the rooms, features and setting of the homes you represent.",
    },
  },
  {
    slug: "maan-singh-bhuller",
    niche: "Photography",
    nicheSlug: "photography",
    specialty: "City and architecture photography",
    title: "7,847 followers for Maan’s city and architecture photography.",
    intro:
      "Maan wanted to take his photography beyond a hobby while working full time. Rahul refined outreach around photography audiences and helped him find manageable ways to share the stories and editing behind his pictures.",
    name: "Maan Singh Bhuller",
    handle: "maansinghbhuller",
    gained: 7847,
    period: "25 Jun 2025 – 25 Sep 2026",
    start: {
      heading: "Make more of the photographs taken around a full-time job.",
      paragraphs: [
        "Maan photographs cities, architecture, nature and travel. His early audience brief centred on photography enthusiasts and people who enjoyed his London and UK pictures, even if they were not photographers themselves.",
        "When he returned to Ignited in June 2025, he wanted to turn his hobby into something more. A busy full-time job limited his time for creating content, and he was weighing up how often to post and how to try Reels with the photographs he already had.",
      ],
      audience: [
        "City and architecture photography enthusiasts",
        "People interested in London and UK scenes",
        "Fellow photographers and creative communities",
      ],
    },
    approach: {
      heading:
        "Reach photography audiences. Show more of the work behind each image.",
      paragraphs: [
        "Ignited handled daily outreach around Maan’s photography brief. Rahul reviewed which audiences responded, while the content advice focused on captions and simple photo-based Reels that Maan could fit around his job.",
      ],
      manager: "Rahul",
      managerFocus:
        "Photography audiences, fuller captions and simple editing Reels",
      steps: [
        {
          label: "Getting discovered",
          heading: "Start with the photography accounts Maan knew.",
          paragraphs: [
            "Maan supplied photography accounts for outreach, including @kartarbhogal, whom he knew. Rahul added that suggestion to the outreach list. In January 2026, he reviewed which audiences were bringing in followers and used that response to refine where outreach was focused.",
          ],
        },
        {
          label: "The story behind the image",
          heading: "Tell people how and why the photograph happened.",
          paragraphs: [
            "In July 2025, Rahul suggested captions about the location, the inspiration and what Maan was trying to capture. By November, Maan confirmed that he was writing fuller captions explaining how he took a shot or what inspired it.",
          ],
        },
        {
          label: "Working with existing photographs",
          heading: "Start small with before-and-after editing Reels.",
          paragraphs: [
            "Rahul supported starting with two posts a week and building up. He suggested turning existing photographs into Reels, including an unedited image followed by the finished picture. Maan published his first Reel in August 2025 and later confirmed trying two before-and-after Reels.",
          ],
        },
      ],
    },
    progress: {
      heading: "7,847 followers gained through daily outreach.",
      paragraphs: [
        "Maan gained 7,847 followers through daily outreach from 25 June 2025 to 25 September 2026, across 15 recorded periods.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 252,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 351,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 399,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 468,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 586,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 545,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 617,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 602,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 547,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 642,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 555,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 562,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 628,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 552,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 541,
        },
      ],
    },
    quote:
      "Photography has to fit around my full-time job. Rahul gave me ideas I could use with my existing pictures, and I started writing fuller captions and trying before-and-after Reels.",
    quoteBy: "Maan Singh Bhuller · Photographer · November 2025",
    close: {
      heading: "Bring more people to the photographs you love making.",
      body: "Get support with reaching photography audiences and sharing the stories and process behind your pictures.",
    },
  },
  {
    slug: "lina-bell",
    niche: "Photography",
    nicheSlug: "photography",
    specialty: "Wedding photography · Film and digital",
    title: "5,917 followers for Lina’s film and digital wedding photography.",
    intro:
      "Lina saw an Instagram following as part of the trust couples look for when choosing a wedding photographer. Alongside daily outreach, Sushmita suggested ways to answer her audience and show the care behind her photographs.",
    name: "Lina Bell",
    handle: "linabellweddings",
    gained: 5917,
    period: "25 Mar 2025 – 25 Sep 2026",
    start: {
      heading: "Give couples more reasons to get to know the photographer.",
      paragraphs: [
        "Lina makes wedding photographs on film and digital, with a focus on honest, imperfect moments. Her work includes California and destination weddings.",
        "In February 2024, she explained that she had recently started taking posting and audience growth more seriously. She wanted a following that could help people feel confident when considering her for their wedding.",
      ],
      audience: [
        "Couples choosing a wedding photographer",
        "People drawn to honest wedding photographs",
        "California and destination wedding audiences",
      ],
    },
    approach: {
      heading: "Build discovery around the work. Let couples see the process.",
      paragraphs: [
        "Ignited handled daily outreach using Lina’s account brief. Sushmita’s advice focused on what visitors could learn from her wedding photography, the conversations on her posts and the process behind the finished images.",
      ],
      manager: "Sushmita",
      managerFocus:
        "Wedding photography outreach, conversations and a closer look at the process",
      steps: [
        {
          label: "Getting discovered",
          heading: "Use Lina’s wedding photography brief to guide outreach.",
          paragraphs: [
            "Sushmita used the information Lina supplied in her growth brief to guide targeting decisions. She invited Lina to flag audiences that felt unrelated to her niche, giving the wedding photographer a way to keep the outreach focused on her work.",
          ],
        },
        {
          label: "Audience conversations",
          heading: "Give the comments on wedding photographs a reply.",
          paragraphs: [
            "In March 2024, Sushmita noticed comments waiting for replies on one of Lina’s posts. She recommended answering them so that people interested in the photographs could have a conversation with the person behind the camera.",
          ],
        },
        {
          label: "Showing the process",
          heading: "Share the edit, the shoot and the finished moment.",
          paragraphs: [
            "Sushmita’s March 2024 review included examples of photography tips, behind-the-scenes footage, before-and-after edits and wedding-shoot Reels. These gave Lina concrete ways to show how she works as well as the finished photographs. Lina thanked her for the feedback and examples.",
          ],
        },
      ],
    },
    progress: {
      heading: "5,917 followers gained through daily outreach.",
      paragraphs: [
        "Lina gained 5,917 followers through daily outreach from 25 March 2025 to 25 September 2026, across 18 recorded periods.",
      ],
      months: [
        {
          dates: "25 Mar 2025 – 24 Apr 2025",
          followers: 350,
        },
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 400,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 280,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 329,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 350,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 501,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 179,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 213,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 270,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 160,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 275,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 534,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 505,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 251,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 269,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 387,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 384,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 280,
        },
      ],
    },
    quote:
      "I wanted people choosing a wedding photographer to feel they could trust my work. Sushmita’s feedback and examples gave me practical ideas for showing more of my process.",
    quoteBy: "Lina Bell · Wedding photographer · March 2024",
    close: {
      heading: "Help more couples discover the way you photograph a wedding.",
      body: "Get support with reaching couples planning their wedding and showing the photographs, care and process that make your work yours.",
    },
  },
  {
    slug: "kaya-street",
    niche: "Music & DJs",
    nicheSlug: "music-and-djs",
    specialty: "Afro-fusion, reggae and street soul · UK",
    title: "2,177 followers for Kaya Street’s Afro-fusion and reggae.",
    intro:
      "Harry wanted to build connections around Kaya Street’s music. Alongside daily outreach, Aditi suggested ways to share the stories behind the songs and capture performances when only a few band members could get together.",
    name: "Harry",
    business: "Kaya Street",
    handle: "kaya_streetuk",
    gained: 2177,
    period: "26 Oct 2025 – 25 Jul 2026",
    start: {
      heading: "Let listeners meet the people behind the music.",
      paragraphs: [
        "Kaya Street combines Afro-fusion, reggae and street soul. Harry was sharing releases and performances, and wanted to develop personal connections with the people discovering the music.",
        "By December 2025, he was looking for practical ways to film more. Getting the full band together was difficult, and some existing footage did not fit a vertical screen. He needed ideas that worked with the musicians and material available.",
      ],
      audience: [
        "Afro-fusion and reggae listeners",
        "People discovering new music",
        "Fans of live performances",
      ],
    },
    approach: {
      heading: "Reach new listeners. Bring the band into the picture.",
      paragraphs: [
        "Ignited handled daily outreach for Kaya Street. Aditi’s advice focused on helping visitors hear Harry’s voice, understand the songs and see the musicians at work.",
      ],
      manager: "Aditi",
      managerFocus:
        "Listener outreach, stories behind the songs and filming with a smaller band lineup",
      steps: [
        {
          label: "Getting discovered",
          heading: "Start conversations with the people discovering the music.",
          paragraphs: [
            "Ignited handled daily outreach. Alongside it, Harry began messaging new followers personally. In November 2025, he said those conversations were starting to build personal connections around the music.",
          ],
        },
        {
          label: "The artist’s voice",
          heading: "Tell a song’s story without always facing the camera.",
          paragraphs: [
            "Aditi suggested short clips about song inspirations, lyrics and memories from shows. When Harry asked whether he had to appear on camera, she explained that his voice over photographs or footage could work too. Fan comments and reactions could also become part of the page.",
          ],
        },
        {
          label: "Filming the band",
          heading: "Make a session work with two or three musicians.",
          paragraphs: [
            "In December 2025, Aditi suggested filming with two or three key band members instead of waiting for the full lineup. They could set aside a session to play song sections or jam. She also recommended original footage with a small logo, lower backing music under speech and vertical filming for future clips.",
          ],
        },
      ],
    },
    progress: {
      heading: "2,177 followers gained through daily outreach.",
      paragraphs: [
        "Kaya Street gained 2,177 followers through daily outreach from 26 Oct 2025 to 25 Jul 2026.",
      ],
      months: [
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 250,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 239,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 244,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 193,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 350,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 263,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 251,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 331,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 56,
        },
      ],
    },
    quote:
      "I’ve started messaging new followers personally and building a few connections. Aditi’s ideas helped me think about sharing more of the people and the stories behind our music.",
    quoteBy: "Harry · Kaya Street · November 2025",
    close: {
      heading: "Help new listeners get to know your band.",
      body: "Reach more people through daily outreach and find ways to share your songs, rehearsals and performances with the musicians and footage you have.",
    },
  },
  {
    slug: "dj-milk",
    niche: "Music & DJs",
    nicheSlug: "music-and-djs",
    specialty: "DJ and event entertainment · Cape Cod and Boston",
    title: "2,915 followers for Michael’s DJ and event work.",
    intro:
      "Michael plays nightlife events, weddings and private parties. Sushmita paired daily outreach with advice on when to explore a new city, how to present his services and what to show from a live set.",
    name: "Michael Landers",
    business: "DJ Milk",
    handle: "_djmilk",
    gained: 2915,
    period: "25 Jun 2025 – 25 Dec 2025",
    start: {
      heading: "Show the DJ behind the party clips.",
      paragraphs: [
        "Michael Landers is DJ Milk, a Cape Cod and Boston DJ and the founder of Milk Entertainment. His work spans nightlife, weddings and private events.",
        "In July 2025, he was also considering DJ dates on Nashville’s Broadway and asked when to start reaching people there. His page needed to explain the local services clearly and give visitors a fuller sense of how he works at an event.",
      ],
      audience: [
        "Cape Cod and Boston event audiences",
        "Wedding and private-event hosts",
        "Nashville listeners for future dates",
      ],
    },
    approach: {
      heading: "Build local attention. Show what happens during a set.",
      paragraphs: [
        "Ignited handled daily outreach. Sushmita helped Michael think through the timing of a new location, the information visitors needed and ways to show the sound and preparation behind each event.",
      ],
      manager: "Sushmita",
      managerFocus:
        "Local outreach, a clearer DJ profile and clips with real event sound",
      steps: [
        {
          label: "Getting discovered",
          heading: "Time a new audience around the performance.",
          paragraphs: [
            "Alongside daily outreach, Sushmita advised Michael on his Nashville plans. If a confirmed performance was coming soon, she recommended starting to reach that audience immediately. If the dates were further away, she suggested building his existing local audience first, then gradually shifting attention to Nashville.",
          ],
        },
        {
          label: "The profile",
          heading: "Make the locations and event services easy to find.",
          paragraphs: [
            "Sushmita suggested adding ‘Boston DJ’ to Michael’s profile name and grouping nightlife, weddings and private events clearly in the bio. Highlights for gigs, collaborations, setup and his own story would help a visitor understand the work before making a booking enquiry.",
          ],
        },
        {
          label: "Inside the event",
          heading: "Keep the sound of the mix and the crowd.",
          paragraphs: [
            "Sushmita recommended short clips of Michael mixing, a beat drop and the crowd’s reaction with the original event audio. She also suggested a ‘come with me’ sequence: packing gear, arriving, setting up, soundchecking and playing.",
          ],
        },
      ],
    },
    progress: {
      heading: "2,915 followers gained through daily outreach.",
      paragraphs: [
        "Michael gained 2,915 followers through daily outreach from 25 Jun 2025 to 25 Dec 2025.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 171,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 388,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 488,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 526,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 542,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 800,
        },
      ],
    },
    quote:
      "I’ve been pleased to see steady follower growth for my DJ account. The past few months have run smoothly, and I appreciated the help as the business headed into its quieter season.",
    quoteBy: "Michael Landers · DJ Milk · December 2025",
    close: {
      heading: "Help people discover the DJ behind their next event.",
      body: "Reach local audiences and get ideas for showing your live sound, crowd reactions and the preparation that goes into every set.",
    },
  },
  {
    slug: "brittany-bowlin",
    niche: "Fitness",
    nicheSlug: "fitness",
    specialty: "Fitness education for women",
    title: "5,523 followers for Brittany’s everyday fitness advice.",
    intro:
      "Brittany wanted more women to discover her practical approach to fitness. Sushmita guided outreach around that audience and offered specific ways to make workout instructions clearer and build on relatable gym content.",
    name: "Brittany Bowlin",
    handle: "its_fitbrit",
    photo: "/audiences/journey-v2/results/coaches/its_fitbrit-avatar.png",
    gained: 5523,
    period: "26 Oct 2025 – 25 Sep 2026",
    start: {
      heading: "Share workouts women can fit into everyday life.",
      paragraphs: [
        "Brittany shares workouts, nutrition tips and encouragement for women who want to feel stronger without chasing perfection. She wanted to grow an audience around a realistic, sustainable approach to fitness and a community where women could support one another.",
        "She was already showing exercises and putting sets and repetitions in her captions. By November 2025, she wanted help deciding which of her gym videos, conversations and challenges to develop next.",
      ],
      audience: [
        "Women interested in practical workouts",
        "People seeking realistic fitness encouragement",
        "Viewers who enjoy everyday gym stories",
      ],
    },
    approach: {
      heading: "Reach women who want fitness to fit real life.",
      paragraphs: [
        "Ignited handled daily outreach around Brittany’s fitness audience. Sushmita’s content advice focused on helping visitors understand the exercises and recognise the everyday gym experiences behind her account.",
      ],
      manager: "Sushmita",
      managerFocus:
        "Women’s fitness audiences, clearer workout instructions and relatable gym videos",
      steps: [
        {
          label: "Getting discovered",
          heading: "Use the women’s fitness brief to guide outreach.",
          paragraphs: [
            "Brittany described women looking for workout ideas, motivation and a balanced approach to health. Sushmita used that brief for outreach and later shared which fitness audiences brought followers, asking Brittany which audiences best matched her goals.",
          ],
        },
        {
          label: "Workout education",
          heading: "Put the instructions beside the movement.",
          paragraphs: [
            "In December 2024, Sushmita reviewed Brittany’s full-body workout carousel. She suggested putting exercise names, sets and repetitions directly on each video, so viewers could follow the routine without repeatedly checking the caption. Voiceovers could explain the movements in Brittany’s own words.",
          ],
        },
        {
          label: "Content choices",
          heading: "Build on the gym moments Brittany already shares.",
          paragraphs: [
            "In November 2025, Sushmita recommended developing relatable gym videos and continuing the Reel Talk with Brit series. She also suggested moving the bootcamp series to weekends and trying three or four posts a week, giving Brittany a more focused set of ideas to test.",
          ],
        },
      ],
    },
    progress: {
      heading: "5,523 followers gained through daily outreach.",
      paragraphs: [
        "Brittany gained 5,523 followers through daily outreach from 26 Oct 2025 to 25 Sep 2026, across 11 recorded periods.",
      ],
      months: [
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 555,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 486,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 421,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 538,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 478,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 550,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 510,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 511,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 482,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 428,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 564,
        },
      ],
    },
    quote:
      "The November review gave me a confidence boost. Sushmita pointed to the gym videos and conversations already on my page and gave me specific ideas I wanted to try next.",
    quoteBy: "Brittany Bowlin · Fitness creator · November 2025",
    close: {
      heading: "Help more women discover your approach to fitness.",
      body: "Build a plan around the people you want to reach and the workouts, guidance and encouragement you share.",
    },
  },
  {
    slug: "stacy-crouse",
    niche: "Therapy",
    nicheSlug: "therapy",
    specialty: "Grief counseling and sound-healing practice",
    title: "4,117 followers for Stacy’s counseling and sound-healing work.",
    intro:
      "Stacy wanted a community around support, empowerment and personal growth. Tulsi worked from that audience brief and suggested narrated stories, clearer video captions and content that could introduce Stacy’s counseling and sound-healing practice.",
    name: "Stacy Crouse",
    handle: "siddhanimomma",
    gained: 4117,
    period: "25 Jun 2025 – 25 Sep 2026",
    start: {
      heading: "Introduce the person behind the counseling practice.",
      paragraphs: [
        "Stacy is a grief counselor whose work also includes sound healing. She wanted to reach women interested in support through heartbreak and life transitions, and build a community around equality, empowerment and personal growth.",
        "Her Instagram goal included introducing people to her counseling business. The content review focused on ways to explain that work through her own voice, practical topics and glimpses of her sound-healing practice.",
      ],
      audience: [
        "Women navigating life transitions",
        "People interested in counseling and personal growth",
        "People curious about sound-healing practice",
      ],
    },
    approach: {
      heading: "Reach the community. Make the practice easier to understand.",
      paragraphs: [
        "Ignited handled daily outreach using Stacy’s audience brief. Tulsi’s November 2024 review then offered ways to turn static messages into spoken stories and show visitors more of the work behind the account.",
      ],
      manager: "Tulsi",
      managerFocus:
        "A women-focused audience, narrated stories and a clearer introduction to the practice",
      steps: [
        {
          label: "Getting discovered",
          heading: "Start with Stacy’s community brief.",
          paragraphs: [
            "Stacy described women interested in support, advocacy, personal growth and life transitions. Tulsi used that information to guide outreach and invited Stacy to flag accounts outside her intended audience.",
          ],
        },
        {
          label: "Spoken stories",
          heading: "Let Stacy narrate the message.",
          paragraphs: [
            "In November 2024, Tulsi suggested turning a static-image Reel into a narrated story, beginning with a question and ending with an invitation to read Stacy’s blog. She also recommended adjusting subtitles that were being clipped and adding covers that named each video’s topic.",
          ],
        },
        {
          label: "Explaining the practice",
          heading: "Create a few repeatable ways to introduce the work.",
          paragraphs: [
            "Tulsi proposed short videos built around one journaling or grounding prompt, posts showing Stacy’s sound-healing practice, and carousels explaining what counseling can involve. These gave Stacy several formats to consider alongside her existing Reels.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,117 followers gained through daily outreach.",
      paragraphs: [
        "Stacy gained 4,117 followers through daily outreach from 25 Jun 2025 to 25 Sep 2026, across 15 recorded periods.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 119,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 161,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 202,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 246,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 298,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 372,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 376,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 407,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 257,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 264,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 288,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 287,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 278,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 280,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 282,
        },
      ],
    },
    quote:
      "I wanted a community around support and personal growth. Tulsi’s suggestions gave me concrete ways to introduce my counseling work, from narrated stories to posts showing my sound-healing practice.",
    quoteBy: "Stacy Crouse · Counselor · November 2024",
    close: {
      heading: "Help people discover the work you care about.",
      body: "Find support with reaching your intended community and explaining your counseling or wellness practice in your own voice.",
    },
  },
  {
    slug: "renee-noa-harris",
    niche: "Wellness",
    nicheSlug: "wellness",
    specialty: "Mindfulness education · Los Angeles",
    title: "1,404 followers for Renee’s mini meditations.",
    intro:
      "Renee creates mini meditations for people with busy lives. Shama guided outreach around that audience, suggested a shorter profile introduction and helped her think through a posting rhythm that could fit around the school year.",
    name: "Renee Noa Harris",
    handle: "reneenoaharris",
    gained: 1404,
    period: "25 Apr 2025 – 25 Oct 2025",
    start: {
      heading: "Make a few minutes of mindfulness easy to find.",
      paragraphs: [
        "Renee teaches mindfulness through daily mini meditations, yoga and events, and works with brands on mindful experiences. She wanted to reach busy people, often mothers, who could use a few accessible moments of mindfulness each day.",
        "She wanted her profile to feel personable and professional, with her experience visible to potential collaborators. After time away during the summer holidays, she was also thinking about how to build a more consistent online presence for the school year.",
      ],
      audience: [
        "Busy people looking for short meditations",
        "Mothers interested in accessible mindfulness",
        "Businesses interested in yoga and meditation experiences",
      ],
    },
    approach: {
      heading: "Reach busy people. Keep the invitation simple.",
      paragraphs: [
        "Ignited handled daily outreach around Renee’s mindfulness audience. Shama focused her advice on making the profile’s invitation visible and finding a posting approach that suited Renee’s available time.",
      ],
      manager: "Shama",
      managerFocus:
        "Busy mindfulness audiences, a shorter bio and a manageable posting rhythm",
      steps: [
        {
          label: "Getting discovered",
          heading: "Work from the daily mini-meditation audience.",
          paragraphs: [
            "Renee described people with little spare time, often mothers, and businesses interested in yoga and meditation experiences. Shama used that brief to guide outreach, keeping the short daily meditations and Renee’s professional work central to the audience discussion.",
          ],
        },
        {
          label: "The profile",
          heading: "Give the meditations and events room in the bio.",
          paragraphs: [
            "In May 2025, Shama suggested moving “Mother & Mindfulness Educator” into the name field and shortening the bio so visitors could see the offer and sign-up invitation without opening more text. In July, Renee confirmed changing her bio; she also said she was experimenting with Reels.",
          ],
        },
        {
          label: "A workable rhythm",
          heading:
            "Start the posting conversation with Renee’s available time.",
          paragraphs: [
            "In August 2025, Shama asked what was getting in the way of posting and whether Renee had ideas waiting to be developed. She suggested starting with one post a week or a few light posts. Renee welcomed the questions and planned to revisit consistency when the school year began.",
          ],
        },
      ],
    },
    progress: {
      heading: "1,404 followers gained through daily outreach.",
      paragraphs: [
        "Renee gained 1,404 followers through daily outreach from 25 Apr 2025 to 25 Oct 2025, across 6 recorded periods.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 113,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 178,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 250,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 235,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 290,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 338,
        },
      ],
    },
    quote:
      "I changed my bio and started experimenting with Reels. When I was planning for the school year, Shama helped me think about a posting routine I could manage.",
    quoteBy: "Renee Noa Harris · Mindfulness educator · July–August 2025",
    close: {
      heading: "Help busy people find what you teach.",
      body: "Build a plan for reaching your audience, introducing your work and sharing it at a pace you can sustain.",
    },
  },
  {
    slug: "on-rotation",
    niche: "Food & drink",
    nicheSlug: "food-and-drink",
    specialty: "Brewpub and kitchen · Dallas, Texas",
    title: "3,706 followers for On Rotation’s Dallas brewpub.",
    intro:
      "On Rotation wanted Dallas–Fort Worth beer and food lovers to discover the brewpub. Rahul used that local audience brief and suggested ways to show a visit without asking reluctant staff to model.",
    name: "Jacob",
    business: "On Rotation Brewery & Kitchen",
    handle: "on_rotation",
    gained: 3706,
    period: "26 Jan 2026 – 25 Sep 2026",
    start: {
      heading: "Help Dallas discover more than the beer list.",
      paragraphs: [
        "On Rotation is a Dallas craft beer brewpub with a full kitchen. In its October 2023 brief, the team wanted to reach local craft beer fans, food lovers and people choosing a place for after-work drinks or a group outing.",
        "By May 2026, the team wanted to show more of the experience of being there. Staff were often hesitant to appear in photoshoots, so Jacob asked for specific ideas the team could realistically film.",
      ],
      audience: [
        "Dallas–Fort Worth craft beer fans",
        "Local food and cocktail lovers",
        "People planning group outings",
      ],
    },
    approach: {
      heading: "Reach local beer fans. Show a visit to the brewpub.",
      paragraphs: [
        "Ignited handled daily outreach around On Rotation’s local beer and food audience. Rahul’s later content advice focused on the room, the pours and the food arriving at the table.",
      ],
      manager: "Rahul",
      managerFocus:
        "Dallas beer audiences and ways to film the brewpub without a staged shoot",
      steps: [
        {
          label: "Getting discovered",
          heading: "Start with the Dallas–Fort Worth audience.",
          paragraphs: [
            "On Rotation’s brief included craft beer fans, food lovers and cocktail drinkers in the Dallas–Fort Worth area. Rahul used that brief to guide outreach. In February 2026, he reviewed the targeting data and reported refining the accounts being used to reach that audience.",
          ],
        },
        {
          label: "The customer experience",
          heading: "Show the after-work plans as well as the pint.",
          paragraphs: [
            "In May 2026, Rahul suggested keeping beer and food posts while adding moments that helped visitors picture an evening there: a group raising glasses, a busy happy hour or a quick look around the pub. These were ideas for showing the experience alongside the products.",
          ],
        },
        {
          label: "A practical shoot",
          heading: "Film the space without needing staff to model.",
          paragraphs: [
            "When Jacob explained the team’s reluctance to appear on camera, Rahul suggested clips of beer pours, taps, food arriving and tables being set. A short montage of the room or a first-person view of a visit could give the team material without a staged photoshoot.",
          ],
        },
      ],
    },
    progress: {
      heading: "3,706 followers gained through daily outreach.",
      paragraphs: [
        "On Rotation gained 3,706 followers through daily outreach from 26 January to 25 September 2026.",
      ],
      months: [
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 408,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 524,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 518,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 397,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 505,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 542,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 396,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 416,
        },
      ],
      update: {
        heading: "From a filming obstacle to trial Reels.",
        paragraphs: [
          "On 12 May 2026, Jacob said he had been filming and planned to try the visit and space-showcase ideas. By 27 May, On Rotation was testing a few of those ideas as trial Reels.",
        ],
      },
    },
    quote:
      "Our staff were hesitant to be in photoshoots. Rahul gave us ideas we could film around the brewpub, and we started testing a few of them as trial Reels.",
    quoteBy: "Jacob · On Rotation Brewery & Kitchen · May 2026",
    close: {
      heading: "Help local people picture a visit to your place.",
      body: "Get support with reaching nearby food and drink audiences and showing what makes your venue worth discovering.",
    },
  },
  {
    slug: "william-ruiz-hardwood-floors",
    niche: "Home & building",
    nicheSlug: "home-and-building",
    specialty: "Flooring and stairs · Los Angeles",
    title: "4,723 followers for William Ruiz’s flooring work.",
    intro:
      "The flooring business wanted its work seen beyond the streets around each project. Aditi worked from a Los Angeles audience brief, reviewed the Highlights and suggested ways to show the craft without taking over the working day.",
    name: "William Ruiz",
    business: "William Ruiz Hardwood Floors",
    handle: "william_ruiz_hardwood_floors",
    gained: 4723,
    period: "25 Apr 2025 – 25 Aug 2026",
    start: {
      heading: "Take local word of mouth beyond the next block.",
      paragraphs: [
        "William Ruiz Hardwood Floors wanted to reach Los Angeles homeowners and the contractors, architects, designers and builders who work with them. The team saw Instagram as a way to show installations and refinishing projects, meet other businesses and extend local word of mouth.",
        "The business had already worked on its bio and Highlights before the September 2024 review. Later, the team asked how to engage with people without spending hours on Instagram when there was flooring work to do.",
      ],
      audience: [
        "Los Angeles homeowners",
        "Contractors and builders",
        "Architects and interior designers",
      ],
    },
    approach: {
      heading: "Find the local network. Make the flooring easy to see.",
      paragraphs: [
        "Ignited handled daily outreach using the business’s Los Angeles and building-trade brief. Aditi’s advice covered the profile, the way flooring work appeared on video and a more manageable routine for replies.",
      ],
      manager: "Aditi",
      managerFocus:
        "Local building audiences, wood-inspired profile details and manageable engagement",
      steps: [
        {
          label: "Getting discovered",
          heading: "Reach the people around a flooring project.",
          paragraphs: [
            "The September 2024 brief named contractors, construction companies, architects, designers and builders, alongside homeowners in Los Angeles and surrounding areas. Aditi used those details to guide outreach, with a goal of helping the business become known beyond the immediate neighbourhood of each job.",
          ],
        },
        {
          label: "The profile",
          heading: "Give the Highlights a look that fits the woodwork.",
          paragraphs: [
            "Aditi’s September 2024 review left the existing bio in place and focused on the Highlight covers. After the team designed a more consistent set, she suggested wood-brown backgrounds with white text to fit the flooring photographs.",
          ],
        },
        {
          label: "The work on camera",
          heading: "Let people see the flooring process clearly.",
          paragraphs: [
            "In September 2024, Aditi suggested replacing still-image process Reels with video clips, using steadier footage and simpler transitions, and keeping large text from covering the work. She also proposed practical posts about paint colours that complement different wood textures.",
          ],
        },
        {
          label: "Time for the business",
          heading: "Set aside short windows for replies and connections.",
          paragraphs: [
            "When the team asked for a less time-consuming approach in February 2025, Aditi suggested 10–15-minute sessions for comments and messages. She also proposed a flooring-style poll and exchanges with local designers, renovators and realtors. The aim was a routine that could fit around project work.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,723 followers gained through daily outreach.",
      paragraphs: [
        "William Ruiz Hardwood Floors gained 4,723 followers through daily outreach from 25 April 2025 to 25 August 2026.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 260,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 205,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 382,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 356,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 352,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 273,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 225,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 373,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 441,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 193,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 185,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 172,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 283,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 451,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 326,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 246,
        },
      ],
    },
    quote:
      "The review helped us see how to present our flooring work more clearly. We worked on the Highlight covers and appreciated having specific feedback while learning what to improve.",
    quoteBy: "William Ruiz Hardwood Floors · September 2024",
    close: {
      heading: "Help nearby homeowners and builders discover your work.",
      body: "Get help reaching a local building audience and showing the details that matter in your installations and finishes.",
    },
  },
  {
    slug: "coppersmith",
    niche: "Products",
    nicheSlug: "products",
    specialty: "Custom metalwork · Ecommerce",
    title: "3,739 followers for CopperSmith’s custom metalwork.",
    intro:
      "CopperSmith wanted US interior designers to discover its products and trade programme. Shama worked from that brief, kept outreach on the existing brand account and suggested ways to show product details, sizing and care.",
    name: "Ryan",
    business: "CopperSmith",
    handle: "worldcoppersmith",
    gained: 3739,
    period: "26 Jul 2025 – 25 Sep 2026",
    start: {
      heading: "Reach designers who specify products for real projects.",
      paragraphs: [
        "CopperSmith offers custom metalwork, including range hoods, sinks and tubs. Ryan wanted to reach interior designers in the US who could use the website to design products, request samples or join the trade programme.",
        "The existing Instagram account was already part of the business: customers tagged it and the team used it to engage with designers. Ryan wanted to keep those connections and understand how daily outreach would fit alongside his team’s own conversations.",
      ],
      audience: [
        "US interior designers",
        "Potential trade partners",
        "Designers sourcing custom metalwork",
      ],
    },
    approach: {
      heading: "Reach designers. Help them understand the metalwork.",
      paragraphs: [
        "Ignited handled daily outreach for CopperSmith’s interior-design brief. Shama explained the division of work with Ryan’s team, reviewed the profile and suggested product videos that could answer a designer’s practical questions.",
      ],
      manager: "Shama",
      managerFocus:
        "US interior designers, a clearer metalwork profile and product-detail videos",
      steps: [
        {
          label: "Getting discovered",
          heading: "Use real designer customers to guide outreach.",
          paragraphs: [
            "Ryan named US interior designers as the priority in August 2025 and supplied examples of existing customers. Shama used the brief for outreach while the CopperSmith team handled its own comments and conversations. A December review included design and metalwork audiences, including @annadinger_design, one of Ryan’s examples.",
          ],
        },
        {
          label: "The profile",
          heading: "Name the metalwork and refresh the Highlights.",
          paragraphs: [
            "In September 2025, Shama suggested adding “Metalwork Design & Fabrication” to the profile name. She also recommended refreshing the older stories in the Highlights. Shama’s review praised the existing logo, bio and enquiry invitation.",
          ],
        },
        {
          label: "Product details",
          heading: "Show the angles, then answer the practical questions.",
          paragraphs: [
            "Shama’s September 2025 advice included short clips showing products from different angles and videos explaining which sinks or tables suit a space. Sizing advice and care tips could sit alongside product photographs. She also suggested mixing a Reel, a carousel and a still image across a three-post week.",
          ],
        },
      ],
    },
    progress: {
      heading: "3,739 followers gained through daily outreach.",
      paragraphs: [
        "CopperSmith gained 3,739 followers through daily outreach from 26 July 2025 to 25 September 2026.",
      ],
      months: [
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 10,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 300,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 243,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 331,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 246,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 216,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 291,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 266,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 372,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 350,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 357,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 318,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 272,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 167,
        },
      ],
    },
    quote:
      "We wanted outreach focused on US interior designers, with our own team handling customer conversations. Shama explained the roles and worked with the account our customers already knew.",
    quoteBy: "Ryan · CopperSmith · August 2025",
    close: {
      heading: "Help designers discover what you can make for a project.",
      body: "Get support with reaching interior designers and showing the materials, details and choices behind your products.",
    },
  },
  {
    slug: "carlos-barquin",
    niche: "Photography",
    nicheSlug: "photography",
    specialty: "Travel and street photography",
    title: "10,685 followers for Carlos’s travel and street photography.",
    intro:
      "Carlos wanted people to discover photographs he had taken over the years. Alongside daily outreach, Tulsi helped him explore captions and photo-based Reels using the photographs and short clips he already had.",
    name: "Carlos Barquin",
    handle: "carlosbarquinph",
    gained: 10685,
    period: "25 Apr 2025 – 25 Sep 2026",
    start: {
      heading: "Bring Carlos’s travel and street photographs to new viewers.",
      paragraphs: [
        "Carlos is a photographer and cinematographer who had moved into real estate. In September 2024, he explained that his Instagram was for the photography he wanted to return to, rather than his property work.",
        "He was using the account as a photo gallery and wanted to build his name in travel and street photography. He hoped to reach photography publications and eventually work as a photographer full time, while learning social media at a pace he felt comfortable with.",
      ],
      audience: [
        "Travel photography enthusiasts",
        "Street photography audiences",
        "Photography publications and feature accounts",
      ],
    },
    approach: {
      heading: "Introduce the photographs. Find formats Carlos could use.",
      paragraphs: [
        "Ignited handled daily outreach using Carlos’s photography brief. Tulsi’s September 2024 advice gave him ways to explain his pictures and try Reels with the photographs and short clips he already had.",
      ],
      manager: "Tulsi",
      managerFocus:
        "Photography audiences, image stories and photo-based Reels",
      steps: [
        {
          label: "Getting discovered",
          heading: "Let the photography brief guide the outreach.",
          paragraphs: [
            "Carlos named travel and photography as the interests he wanted to reach. He also supplied accounts he admired, including @streetphotographyinternational and @landscapephotomag. Tulsi acknowledged the brief as a guide for targeting decisions, keeping the account’s photography purpose at the centre.",
          ],
        },
        {
          label: "The story behind the photograph",
          heading: "Add the moment behind the image to the caption.",
          paragraphs: [
            "In September 2024, Tulsi noticed that Carlos was using hashtags as his captions. She suggested adding the story, emotion or message behind a photograph so someone discovering the image could understand more about what he had seen and wanted to capture.",
          ],
        },
        {
          label: "Trying Reels",
          heading:
            "Work with photographs and short clips, without appearing on camera.",
          paragraphs: [
            "Carlos reported publishing a Reel in September 2024, but said editing was slow and he had little video footage. Tulsi supported compiling photos and short clips, timing transitions to music and choosing an editing app he found comfortable. When Carlos said he did not want to film himself shooting, she confirmed that the work could remain the focus.",
          ],
        },
      ],
    },
    progress: {
      heading: "10,685 followers gained through daily outreach.",
      paragraphs: [
        "Carlos gained 10,685 followers through daily outreach from 25 April 2025 to 25 September 2026, across 17 recorded periods.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 501,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 439,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 668,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 604,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 780,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 489,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 590,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 864,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 869,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 676,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 750,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 769,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 493,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 586,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 667,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 675,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 265,
        },
      ],
    },
    quote:
      "Tulsi helped me see how to turn my photographs into Reels without appearing on camera. I could start with the pictures and short clips I already had.",
    quoteBy: "Carlos Barquin · Photographer · September 2024",
    close: {
      heading:
        "Help more people discover the photographs you have been making.",
      body: "Get support with reaching photography audiences and finding ways to share your pictures that feel comfortable to you.",
    },
  },
  {
    slug: "velvet-horizons-studio",
    niche: "Photography",
    nicheSlug: "photography",
    specialty: "Abstract and experimental photography · NYC",
    title: "7,231 followers for Iryna’s experimental photography.",
    intro:
      "Iryna wanted her profile to reflect an artist still learning and experimenting. Sushmita helped her explain that direction, organise ideas for Highlights and take her first steps into video alongside daily outreach.",
    name: "Iryna Shcherban",
    business: "Velvet Horizons Studio",
    handle: "velvet_horizons_studio",
    gained: 7231,
    period: "26 Aug 2025 – 25 Sep 2026",
    start: {
      heading: "Make room for learning and experimentation.",
      paragraphs: [
        "Iryna shares abstract and experimental photography through Velvet Horizons Studio in New York City. She wanted a profile that felt true to where she was creatively, with room to keep learning.",
        "In September 2025, she said she wanted growth she could trust and was willing to take things step by step. Reels were new to her, and she later made clear that she preferred to stay behind the camera without using her face or voice.",
      ],
      audience: [
        "People interested in abstract photography",
        "Experimental photography audiences",
        "People curious about light, colour and visual process",
      ],
    },
    approach: {
      heading: "Support discovery while keeping the photography personal.",
      paragraphs: [
        "Ignited handled daily outreach around Iryna’s account brief. Sushmita worked with her on how the profile introduced the photography and how to try video while respecting her comfort behind the camera.",
      ],
      manager: "Sushmita",
      managerFocus:
        "Photography outreach, a profile introduction and first Reels",
      steps: [
        {
          label: "Getting discovered",
          heading:
            "Pair daily outreach with a review of the existing audience.",
          paragraphs: [
            "Iryna wanted to build an audience she trusted and was unsure which existing followers to keep. Alongside daily follows and unfollows, Sushmita prepared a list of followers for Iryna to review. In October 2025, Iryna thanked her for the list and said she would begin removing them herself.",
          ],
        },
        {
          label: "Introducing the work",
          heading: "Describe a photographer who is learning and experimenting.",
          paragraphs: [
            "After Sushmita’s September 2025 profile review, Iryna drafted a bio around “Exploring photography” and “Learning & experimenting”, with NYC as her location. Sushmita also explained how Highlights could hold a portfolio, experiments, work in progress and an introduction to the person behind the images. Iryna said the explanation helped her understand how to use them.",
          ],
        },
        {
          label: "First steps into video",
          heading: "Let the visuals lead while Iryna stays behind the camera.",
          paragraphs: [
            "Sushmita asked whether Iryna wanted to appear in Reels or keep the focus on her visuals. By October 2025, Iryna had started a mobile videography course and published a couple of Reels. Sushmita supported her choice to keep her face and voice off camera, and encouraged her to build on the visual storytelling she enjoyed.",
          ],
        },
      ],
    },
    progress: {
      heading: "7,231 followers gained through daily outreach.",
      paragraphs: [
        "Iryna gained 7,231 followers through daily outreach from 26 August 2025 to 25 September 2026, across 13 recorded periods.",
      ],
      months: [
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 341,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 521,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 490,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 513,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 571,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 635,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 500,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 579,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 697,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 559,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 699,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 622,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 504,
        },
      ],
    },
    quote:
      "Sushmita’s profile review helped me describe where I am with my photography. Her explanation of Highlights made sense, and I appreciated being able to try Reels while staying behind the camera.",
    quoteBy: "Iryna Shcherban · Velvet Horizons Studio · October 2025",
    close: {
      heading: "Bring more people into the photography you are exploring.",
      body: "Get support with reaching photography audiences, introducing your work and trying new formats at a pace that suits you.",
    },
  },
  {
    slug: "ayden-j",
    niche: "Music & DJs",
    nicheSlug: "music-and-djs",
    specialty: "Afro House and Afro Tech · DJ and producer",
    title: "4,612 followers for Ayden’s Afro House and Afro Tech.",
    intro:
      "Ayden wanted listeners, fellow artists and promoters to discover his music. Rahul refined the outreach around music accounts Ayden knew, helped clarify his booking information and suggested ways to show the work behind his sets.",
    name: "Ayden",
    handle: "aydenj.music",
    gained: 4612,
    period: "12 recorded periods · 25 Jun 2025 – 25 Sep 2026",
    start: {
      heading: "Build a fanbase around the music he makes and plays.",
      paragraphs: [
        "Ayden is a DJ and producer working in Afro House and Afro Tech. He wanted a fanbase that would follow his music, alongside artists, event promoters and club owners who could get to know his work.",
        "His page already showed the energy of his performances. The next step was to introduce the music to more people and give visitors a way to enquire about bookings or collaborations.",
      ],
      audience: [
        "Afro House and Afro Tech listeners",
        "DJs and producers",
        "Event promoters and club owners",
      ],
    },
    approach: {
      heading: "Refine the outreach and show what happens behind the decks.",
      paragraphs: [
        "Ignited handled daily outreach while Ayden contributed music and event accounts he wanted us to consider. Rahul also reviewed the profile and suggested ways to add studio work and gig stories to the performance clips.",
      ],
      manager: "Rahul",
      managerFocus:
        "Music audiences, booking information and stories from the studio and gigs",
      steps: [
        {
          label: "Getting discovered",
          heading: "Use Ayden’s music knowledge to refine the outreach.",
          paragraphs: [
            "Ayden suggested accounts including @kunyerecords and @chillipros. In September 2025, both appeared in the outreach review. Rahul checked which music audiences were bringing new followers, removed weaker options and tested additional accounts.",
          ],
        },
        {
          label: "The profile",
          heading: "Make bookings and collaborations easy to find.",
          paragraphs: [
            "Rahul suggested adding a clear invitation to the bio. Ayden kept his own wording and added a bookings and collaborations section with a contact address. He confirmed the change in August 2025.",
          ],
        },
        {
          label: "What to post",
          heading: "Show a track taking shape and a gig unfolding.",
          paragraphs: [
            "Rahul suggested clips of production and sound design alongside the finished sets. A gig could become a short sequence: travelling to the venue, preparing the set and capturing a crowd reaction. Captions could explain why a track mattered to Ayden or how he built a transition.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,612 followers gained through daily outreach.",
      paragraphs: [
        "Ayden gained 4,612 followers through daily outreach from 25 Jun 2025 to 25 Sep 2026.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 168,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 345,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 588,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 423,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 504,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 475,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 458,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 412,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 409,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 384,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 339,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 107,
        },
      ],
    },
    quote:
      "I kept my own voice in the bio and added the bookings and collaborations section. Rahul also gave me ideas for showing the studio work and stories behind my sets.",
    quoteBy: "Ayden · DJ and producer · August 2025",
    close: {
      heading: "Give new listeners a way into your music.",
      body: "Reach more people through daily outreach and work with a Brand Manager on your profile, studio clips and stories from the gigs.",
    },
  },
  {
    slug: "greg-yoder",
    niche: "Film & acting",
    nicheSlug: "film-and-acting",
    specialty: "Actor · Los Angeles",
    title: "5,313 followers for Greg’s next chapter in acting.",
    intro:
      "Greg was putting fresh energy into his acting career. Shama helped him introduce the person behind the credits, plan a manageable posting rhythm and refine the audiences for daily outreach.",
    name: "Greg Yoder",
    handle: "gregyoder",
    gained: 5313,
    period: "26 Sep 2025 – 25 Sep 2026",
    start: {
      heading: "Let people meet the actor beyond the audition.",
      paragraphs: [
        "A commercial audition had just asked Greg for his Instagram handle. After years working in Hollywood, he was putting more attention into the page as part of his acting career.",
        "He wanted people to see his humour and persistence as well as his acting work. Film and television fans mattered, and he also hoped to connect with writers, producers, casting directors and independent filmmakers.",
      ],
      audience: [
        "Film and television fans",
        "Actors and independent filmmakers",
        "Writers, producers and casting directors",
      ],
    },
    approach: {
      heading: "Find the audience and give them an introduction.",
      paragraphs: [
        "Ignited handled daily outreach while Greg and Shama worked through whom he wanted to reach. Her content advice centred on telling his story and choosing a posting rhythm he could sustain.",
      ],
      manager: "Shama",
      managerFocus:
        "Film audiences, an introduction carousel and a sustainable posting rhythm",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep film audiences in view as the outreach widens.",
          paragraphs: [
            "Greg initially focused on the United States. In March 2026, Shama suggested adding the UK, Mexico, Canada and Australia. Greg updated his preferences while keeping an emphasis on Los Angeles, New York, Atlanta and Texas. Shama confirmed she would adjust the outreach accordingly.",
          ],
        },
        {
          label: "The introduction",
          heading: "Pin the story behind the acting credits.",
          paragraphs: [
            "Shama proposed a carousel moving from early headshots and years of acting to Greg’s life as a father and his next career chapter. Greg made the introduction himself and confirmed in December 2025 that he had posted and pinned it.",
          ],
          note: {
            summary: "Give the carousel a beginning, middle and next step.",
            body: "The suggested sequence opened with a present-day portrait, moved through early work and setbacks, and returned to Greg today. Short lines of text would carry the story between photographs.",
          },
        },
        {
          label: "Posting rhythm",
          heading: "Make room for good posts without needing two a day.",
          paragraphs: [
            "Greg said it was difficult to come up with more than one interesting post a day. Shama suggested around four posts a week, with daily posting optional, and using his own audience activity to choose when to publish. This gave him a practical rhythm to consider alongside auditions and acting work.",
          ],
        },
      ],
    },
    progress: {
      heading: "5,313 followers gained through daily outreach.",
      paragraphs: [
        "Greg gained 5,313 followers through daily outreach from 26 Sep 2025 to 25 Sep 2026.",
      ],
      months: [
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 14,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 540,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 419,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 528,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 353,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 395,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 402,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 573,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 612,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 669,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 449,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 359,
        },
      ],
    },
    quote:
      "I wanted my page to show the actor and the person. Shama helped me shape that introduction, and I posted and pinned it. I’ve appreciated seeing the audience grow.",
    quoteBy: "Greg Yoder · Actor",
    close: {
      heading: "Give people a reason to follow your acting journey.",
      body: "Work with a Brand Manager on daily outreach, introducing your work and deciding what to share between auditions, rehearsals and roles.",
    },
  },
  {
    slug: "adi-j",
    niche: "Content creators",
    nicheSlug: "content-creators",
    specialty: "Fitness and gym humour",
    title: "1,268 followers for Adi’s gym humour.",
    intro:
      "Adi wanted to reach people who enjoy the funny, everyday side of the gym. Rahul refined the audience brief and suggested profile and visual changes that kept Adi’s humour central to the account.",
    name: "Adi J",
    handle: "adiquate_fitness",
    gained: 1268,
    period: "26 Sep 2025 – 25 May 2026",
    start: {
      heading: "Make the gym feel familiar and fun.",
      paragraphs: [
        "Adi shares gym humour, fitness tips and everyday moments from working out. He wanted people to recognise themselves in his posts and enjoy following along with his fitness journey.",
        "He was also building @getpulsebox around trying workout supplements before buying full tubs. His profile needed to introduce both his personality and that business without losing the casual tone of his gym content.",
      ],
      audience: [
        "People who enjoy gym humour",
        "Viewers looking for everyday fitness tips",
        "US fitness audiences",
      ],
    },
    approach: {
      heading: "Find the gym audience and show Adi’s personality.",
      paragraphs: [
        "Ignited handled daily outreach while Rahul reviewed Adi’s audience preferences and the profile new visitors would see. The advice focused on a recognisable mix of gym humour, workout tips and the PulseBox business.",
      ],
      manager: "Rahul",
      managerFocus:
        "US fitness audiences, profile introductions and consistent Reel covers",
      steps: [
        {
          label: "Getting discovered",
          heading: "Refine the outreach around Adi’s US audience.",
          paragraphs: [
            "Adi asked for a stronger focus on the US and shared examples of accounts outside his intended audience. In October 2025, Rahul reviewed the targeting and asked Adi to keep sending examples so the outreach could be adjusted around his preferences.",
          ],
        },
        {
          label: "The profile",
          heading: "Make the fitness humour and business easy to spot.",
          paragraphs: [
            "Rahul suggested adding “Fitness & Humor” or “Gym Lifestyle” to the name field, plus a “Try before you buy” invitation to @getpulsebox in the bio. He also proposed Highlights for Adi’s introduction, gym moments, workouts and supplements.",
          ],
        },
        {
          label: "Reel presentation",
          heading: "Keep the humour and simplify the visuals.",
          paragraphs: [
            "In November 2025, Rahul recommended a consistent font, fewer words on cover images and text that appeared in time with narration. The aim was to make Adi’s videos easier to recognise while keeping the gym memes and everyday stories that gave the account its voice.",
          ],
        },
      ],
    },
    progress: {
      heading: "1,268 followers gained through daily outreach.",
      paragraphs: [
        "Adi gained 1,268 followers through daily outreach from 26 Sep 2025 to 25 May 2026, across 8 recorded periods.",
      ],
      months: [
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 195,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 196,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 186,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 192,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 132,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 112,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 158,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 97,
        },
      ],
      update: {
        heading: "Adi updated the name, covers and Highlights.",
        paragraphs: [
          "Adi confirmed changing his Instagram name in October 2025. In November, he said he had changed several Reel covers and added Story Highlights. He also chose a red-and-green colour direction for future posts.",
        ],
      },
    },
    quote:
      "I changed my name, updated Reel covers and added Highlights after Rahul’s suggestions. The review gave me specific things to work on while keeping the gym humour that makes my page mine.",
    quoteBy: "Adi J · Fitness creator · October–November 2025",
    close: {
      heading: "Help more people discover your take on fitness.",
      body: "Build an audience plan around your workouts, humour and the personality you bring to the gym.",
    },
  },
  {
    slug: "lucy-hernandez",
    niche: "Spirituality & faith",
    nicheSlug: "spirituality-and-faith",
    specialty: "Faith based teaching and podcasts",
    title: "4,500 followers for Lucy’s teaching and ministry.",
    intro:
      "Lucy wanted more people to discover her ministry and conversations for women. Tulsi suggested ways to introduce her teaching through shorter clips, readable subtitles and a clearer place for event announcements.",
    name: "Lucy Hernandez",
    handle: "apostle.lucy",
    gained: 4500,
    period: "25 Apr 2025 – 25 Sep 2026",
    start: {
      heading: "Give new listeners a way into Lucy’s teaching.",
      paragraphs: [
        "In August 2024, Lucy described a ministry reaching men and women, with women especially drawn to her message. She hosted the Level Up Girl Podcast and shared live morning broadcasts across Instagram and other platforms.",
        "She wanted to grow that reach. Her Instagram already contained talks, full live sessions and event announcements, giving Tulsi plenty of existing material to work with in the September review.",
      ],
      audience: [
        "Women interested in faith based conversations",
        "Podcast listeners",
        "People discovering Lucy’s ministry",
      ],
    },
    approach: {
      heading: "Introduce the teaching one useful clip at a time.",
      paragraphs: [
        "Ignited handled daily outreach using Lucy’s ministry and audience brief. Tulsi’s September 2024 review focused on helping someone new to the account discover a topic before committing to a full broadcast.",
      ],
      manager: "Tulsi",
      managerFocus:
        "Ministry audiences, short teaching clips and readable subtitles",
      steps: [
        {
          label: "Getting discovered",
          heading: "Work from the ministry and podcast audience.",
          paragraphs: [
            "Lucy described the people she wanted to reach and the women’s conversations at the heart of her ministry. Tulsi used that brief to guide outreach and invited Lucy to flag any accounts that did not fit her intended audience.",
          ],
        },
        {
          label: "Teaching clips",
          heading: "Turn longer broadcasts into short introductions.",
          paragraphs: [
            "Tulsi suggested selecting useful moments from Lucy’s live sessions and sharing them as short Reels, alongside a full session once a week. She also pointed to clips from Lucy’s talks and everyday moments as formats worth developing.",
          ],
        },
        {
          label: "Finding the topic",
          heading: "Make each clip easy to recognise and follow.",
          paragraphs: [
            "The September 2024 review recommended subtitles in colours that stood out from the background and Reel covers with clear topic titles. Tulsi also suggested moving announcement posts to Stories, giving the main feed more room for Lucy’s teaching and conversations.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,500 followers gained through daily outreach.",
      paragraphs: [
        "Lucy gained 4,500 followers through daily outreach from 25 Apr 2025 to 25 Sep 2026, across 17 recorded periods.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 116,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 112,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 327,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 291,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 344,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 321,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 214,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 346,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 445,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 140,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 156,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 249,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 362,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 232,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 199,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 447,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 199,
        },
      ],
    },
    quote:
      "I wanted more people to discover my ministry. Tulsi suggested using moments from my live sessions as short Reels, with clear titles and subtitles to introduce the message.",
    quoteBy: "Lucy Hernandez · Ministry and podcast host · September 2024",
    close: {
      heading: "Help new listeners discover what you teach.",
      body: "Get support with reaching your audience and turning your talks, broadcasts and ideas into inviting Instagram content.",
    },
  },
  {
    slug: "jacques-nicole-causey",
    niche: "Therapy",
    nicheSlug: "therapy",
    specialty: "Therapist and life experience coach",
    title: "6,030 followers for Jacques’s coaching account.",
    intro:
      "Jacques wanted a platform for motivational speaking alongside her work as a therapist and coach. Srishti shaped the audience brief and suggested ways to bring her knowledge and speaking ambitions into the content.",
    name: "Jacques Nicole Causey",
    handle: "thatsjacquescausey",
    gained: 6030,
    period: "15 recorded periods · 15 Feb 2025 – 25 Jun 2026",
    start: {
      heading: "Show visitors what Jacques wants to speak about.",
      paragraphs: [
        "Jacques is a mental health therapist and life experience coach. She wanted to build a platform for motivational speaking and grow her business, reaching women entrepreneurs, business owners and people interested in faith, family and mental health.",
        "Her page already showed her lifestyle. In July 2024, Srishti reviewed how more spoken and educational content could help visitors understand the professional interests behind those personal posts.",
      ],
      audience: [
        "Women entrepreneurs and business owners",
        "People interested in mental health",
        "People drawn to faith and family content",
      ],
    },
    approach: {
      heading: "Make Jacques’s coaching and speaking goals visible.",
      paragraphs: [
        "Ignited handled daily outreach around Jacques’s audience brief. Srishti’s reviews offered ways to show her voice, explain the topics she cared about and make her therapist and coach roles visible on the profile.",
      ],
      manager: "Srishti",
      managerFocus:
        "An audience for coaching, spoken Reels and a clearer professional introduction",
      steps: [
        {
          label: "Getting discovered",
          heading: "Reach women entrepreneurs and business owners.",
          paragraphs: [
            "Jacques named women entrepreneurs, business owners and people interested in faith, family and mental health. Srishti used those interests to guide targeting, then reviewed how the outreach was performing as Jacques asked about growing her following.",
          ],
        },
        {
          label: "Speaking content",
          heading: "Let people hear the ideas behind the lifestyle posts.",
          paragraphs: [
            "In July and September 2024, Srishti suggested self-love voiceovers, mental-health explainers and clips from speaking engagements. She also proposed videos about meaningful quotations and why they mattered to Jacques, offering several ways to develop her speaking presence.",
          ],
        },
        {
          label: "The profile",
          heading: "Introduce the therapist, coach and podcast co-host.",
          paragraphs: [
            "In November 2025, Srishti drafted a shorter bio that brought Jacques’s therapist and coach roles together with The Cousin’s Conversations Podcast. She also suggested refreshing the Highlight covers for a more consistent introduction.",
          ],
        },
      ],
    },
    progress: {
      heading: "6,030 followers gained through daily outreach.",
      paragraphs: [
        "Jacques gained 6,030 followers through daily outreach from 15 Feb 2025 to 25 Jun 2026, across 15 recorded periods.",
      ],
      months: [
        {
          dates: "15 Feb 2025 – 17 Mar 2025",
          followers: 40,
        },
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 377,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 434,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 552,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 250,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 453,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 390,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 345,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 377,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 452,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 543,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 502,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 521,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 411,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 383,
        },
      ],
    },
    quote:
      "I wanted people to see the speaker behind my lifestyle posts. Srishti suggested voiceovers, mental-health explainers and clips from talks. These gave me specific formats to consider for that goal.",
    quoteBy:
      "Jacques Nicole Causey · Therapist and coach · 2024 content review",
    close: {
      heading: "Let more people discover the ideas you want to share.",
      body: "Work on reaching your coaching audience and showing the knowledge and voice behind your profile.",
    },
  },
  {
    slug: "charleenes-houses",
    niche: "Home & building",
    nicheSlug: "home-and-building",
    specialty: "Home design and renovation · Baltimore",
    title: "4,765 followers for Charleene’s Baltimore renovation work.",
    intro:
      "Charleene wanted Baltimore homeowners to discover her renovation work. Tulsi refined outreach with local account examples, suggested ways to show the design process and coordinated around a contest Charleene was running herself.",
    name: "Charleene Doverspike",
    business: "Charleene’s Houses",
    handle: "charleeneshouses",
    gained: 4765,
    period: "25 Apr 2025 – 25 Sep 2026",
    start: {
      heading: "Build on the local relationships already around the business.",
      paragraphs: [
        "Charleene’s Houses specialises in kitchens, additions, bathrooms and basements in the Baltimore area. Charleene wanted to reach local homeowners, particularly women with families who might be planning improvements to their homes.",
        "She already knew where some of her followers came from. In 2024, she shared Baltimore property, design and local-business accounts to help shape outreach. She also wanted to keep speaking with existing followers and run her annual contest.",
      ],
      audience: [
        "Baltimore homeowners",
        "Families planning home improvements",
        "Local property and design audiences",
      ],
    },
    approach: {
      heading: "Use local knowledge. Make room for the customer’s own plans.",
      paragraphs: [
        "Ignited handled daily outreach. In 2024, Tulsi used Charleene’s local examples to refine the audience, reviewed the renovation posts and agreed a pause around the business’s annual contest.",
      ],
      manager: "Tulsi",
      managerFocus:
        "Baltimore homeowner audiences, renovation videos and coordination around a customer contest",
      steps: [
        {
          label: "Getting discovered",
          heading: "Use the Baltimore accounts Charleene already knew.",
          paragraphs: [
            "Charleene supplied accounts such as @harryhomeowner, @home_sweet_baltimore and @tinabeliveau, explaining that many existing followers had come from these local circles. In July 2024, Tulsi reported focusing more closely on Baltimore and acknowledged the new list as a way to refine outreach.",
          ],
        },
        {
          label: "Showing the work",
          heading: "Show the choices behind a finished room.",
          paragraphs: [
            "Tulsi’s May 2024 review suggested Reels about colour combinations and glimpses of the design process. She also recommended consistent text on Reel covers, fuller captions and vertical video that filled the screen. These ideas gave Charleene ways to explain her work alongside the finished spaces.",
          ],
        },
        {
          label: "Working together",
          heading: "Coordinate outreach around Charleene’s annual contest.",
          paragraphs: [
            "In October 2024, Charleene asked for a pause while she invited followers to recommend friends in the comments. Tulsi agreed. After the contest, she helped clarify how Charleene could share the suggested usernames for outreach.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,765 followers gained through daily outreach.",
      paragraphs: [
        "Charleene’s Houses gained 4,765 followers through daily outreach from 25 April 2025 to 25 September 2026. The strongest recorded period, ending 25 November 2025, added 745 followers.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 94,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 50,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 141,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 114,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 148,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 145,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 745,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 325,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 345,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 517,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 327,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 305,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 232,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 410,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 223,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 408,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 236,
        },
      ],
    },
    quote:
      "I knew the Baltimore audience I wanted to reach. Tulsi listened to my feedback, and we coordinated the outreach around the contest I was running for our followers.",
    quoteBy: "Charleene Doverspike · Charleene’s Houses · October 2024",
    close: {
      heading: "Help nearby homeowners discover the work you do.",
      body: "Get support with reaching a local audience and showing the design decisions behind your renovation projects.",
    },
  },
  {
    slug: "nails-by-nikki",
    niche: "Hair & beauty",
    nicheSlug: "hair-and-beauty",
    specialty: "Nail art · Millsboro, Delaware",
    title: "4,049 followers for Nails by Nikki’s nail art.",
    intro:
      "Nails by Nikki wanted nearby people to discover the artist behind the manicures. Aditi worked from a Millsboro audience brief and suggested ways to show the nail work while keeping the page’s beige style.",
    name: "Nails by Nikki",
    handle: "nailsbynikki.de",
    gained: 4049,
    period: "26 Oct 2025 – 25 Sep 2026",
    start: {
      heading: "Turn a page of nail photographs into an introduction.",
      paragraphs: [
        "In October 2025, the artist behind Nails by Nikki was working in a spa in Millsboro, Delaware, with an ambition to build enough regular clients to open a home studio. Instagram was meant to help potential clients discover the work and send a booking enquiry.",
        "The page already had a consistent beige look. The artist wanted to preserve it while trying more personal content, and had filmed a client’s nails being done. The next question was how to turn that footage into a post people would want to watch.",
      ],
      audience: [
        "Potential nail clients in Millsboro",
        "Delaware beauty audiences",
        "People looking for nail designs",
      ],
    },
    approach: {
      heading: "Reach nearby people. Show who is doing the nails.",
      paragraphs: [
        "Ignited handled daily outreach using the local client brief. Aditi’s content advice kept the page’s established look and added ideas for showing the artist, the process and the finished nails.",
      ],
      manager: "Aditi",
      managerFocus:
        "Nearby nail clients, the existing beige style and videos of the work in progress",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep potential nail clients at the centre of outreach.",
          paragraphs: [
            "The October 2025 brief named Millsboro and Delaware, with Philadelphia also included among the areas to consider. Aditi acknowledged those details for targeting. The aim was to introduce the nail work to people who might become clients.",
          ],
        },
        {
          label: "Keeping the style",
          heading: "Keep the beige theme and add the person behind it.",
          paragraphs: [
            "The artist was open to new ideas but wanted to keep the beige styling across the page. Aditi agreed and suggested behind-the-scenes moments, more conversational captions and personal experiences connected to the nail work. The existing visual identity stayed part of the brief.",
          ],
        },
        {
          label: "The work on camera",
          heading: "Film the prep, shaping and final reveal.",
          paragraphs: [
            "After the artist filmed work on a client’s nails in October, Aditi’s November review suggested short clips of preparation, shaping and painting. She also proposed 15-second before-and-after videos, client reactions and brief appearances by the artist.",
          ],
        },
      ],
    },
    progress: {
      heading: "4,049 followers gained through daily outreach.",
      paragraphs: [
        "Nails by Nikki gained 4,049 followers through daily outreach from 26 October 2025 to 25 September 2026. The recorded count rose from 252 in the period ending 25 November to 394 in the period ending 25 December 2025.",
      ],
      months: [
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 252,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 394,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 417,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 403,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 422,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 416,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 348,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 399,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 403,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 371,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 224,
        },
      ],
    },
    quote:
      "I wanted to keep my beige theme while showing more of the person behind the nails. Aditi respected that, and I started filming myself working on a client.",
    quoteBy: "Nails by Nikki · October 2025",
    close: {
      heading: "Help nearby clients discover your nail work.",
      body: "Get support with reaching a local beauty audience and showing your style, process and finished designs.",
    },
  },
  {
    slug: "self-build-angels",
    niche: "Home & building",
    nicheSlug: "home-and-building",
    specialty: "Self-build construction guidance · UK and Ireland",
    title: "3,750 followers for Self Build Angels’ construction guidance.",
    intro:
      "Jimmy wanted people planning their own building projects to find Self Build Angels. Rahul worked from a UK and Ireland audience brief and suggested a clearer profile that kept the company name at its centre.",
    name: "Jimmy Sexton",
    business: "Self Build Angels",
    handle: "selfbuildangels",
    gained: 3750,
    period: "25 Jun 2025 – 25 Mar 2026",
    start: {
      heading:
        "Make construction knowledge useful to people outside the trade.",
      paragraphs: [
        "Jimmy Sexton described Self Build Angels as construction knowledge for people who wanted to build their own projects. Based in London, he wanted to reach self-builders across England, Scotland, Wales, Northern Ireland and the Republic of Ireland.",
        "The company identity mattered to him. In February 2025, Jimmy asked to keep the business name on the profile, so the recommendations needed to explain the construction guidance while preserving that name.",
      ],
      audience: [
        "People planning a self-build",
        "UK and Ireland homeowners",
        "People seeking construction guidance",
      ],
    },
    approach: {
      heading: "Find self-build audiences. Explain the help in plain terms.",
      paragraphs: [
        "Ignited handled daily outreach from Jimmy’s audience brief. Rahul worked with the company-name preference and suggested a profile that made the construction guidance easier to understand.",
      ],
      manager: "Rahul",
      managerFocus:
        "Self-build audiences, company branding and a clearer route to construction guidance",
      steps: [
        {
          label: "Getting discovered",
          heading: "Start with the places self-builders look for ideas.",
          paragraphs: [
            "Jimmy supplied architecture and building accounts in February 2025, including @riba, @londonfestivalofarchitecture and @new_home_quality_control. Rahul confirmed that the outreach plan had been updated. The geographic brief covered the UK and the Republic of Ireland.",
          ],
        },
        {
          label: "The company identity",
          heading: "Keep the business name and explain what it does.",
          paragraphs: [
            "Rahul accepted Jimmy’s wish to leave the profile unchanged for the time being. In the March 2025 review, he recommended retaining the logo and username, with “Self Build Angels | Construction Guidance” as a possible display name. The suggestion preserved the company name while making its subject clear.",
          ],
        },
        {
          label: "Finding the guidance",
          heading: "Give self-builders clear places to start exploring.",
          paragraphs: [
            "The March review suggested a shorter bio with a direct invitation to explore the website. Rahul also proposed Highlights for Self-Build, Tips, Projects and Testimonials, with matching covers and a clear purpose for each.",
          ],
        },
      ],
    },
    progress: {
      heading: "3,750 followers gained through daily outreach.",
      paragraphs: [
        "Self Build Angels gained 3,750 followers through daily outreach from 25 June 2025 to 25 March 2026. Its highest recorded period, ending 25 October 2025, added 908 followers.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 306,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 287,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 508,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 908,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 509,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 332,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 436,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 281,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 183,
        },
      ],
    },
    quote:
      "I wanted the profile to stay under the company name. Rahul understood that and suggested ways to explain our construction guidance more clearly, while keeping Self Build Angels at the centre.",
    quoteBy: "Jimmy Sexton · Self Build Angels · February–March 2025",
    close: {
      heading: "Help people planning a build discover your expertise.",
      body: "Get support with reaching self-build audiences and making the guidance your business offers easy to understand.",
    },
  },
  {
    slug: "stephanie-chan",
    niche: "Art",
    nicheSlug: "art",
    specialty: "Architectural drawing and leather craft",
    title: "5,346 followers for Stephanie’s drawings and leatherwork.",
    intro:
      "Stephanie wanted her work to reach architecture accounts and established artists. Sushmita worked from that audience goal and offered practical ways to introduce each Reel while respecting the time Stephanie needed to make and share her art.",
    name: "Stephanie Chan",
    handle: "artbystephchan",
    gained: 5346,
    period: "25 Apr 2025 – 25 Sep 2026",
    start: {
      heading:
        "Bring architectural drawings and handmade pieces to more people.",
      paragraphs: [
        "Stephanie creates freehand architectural drawings and hand-stitched leather goods. Her Instagram brings together original art, prints and commissions for people who enjoy making and looking at art.",
        "In June 2024, she wanted to reach beyond friends and fellow artists to larger architecture accounts and more established artists. She had boosted posts before, but wanted a way to grow without paying to boost every post.",
      ],
      audience: [
        "Architecture audiences",
        "Artists and sketching communities",
        "People interested in original art and handmade goods",
      ],
    },
    approach: {
      heading: "Reach art audiences and give each Reel a clear beginning.",
      paragraphs: [
        "Ignited handled daily outreach while Sushmita reviewed Stephanie’s profile and Reels. The June–July 2024 discussions focused on the artists she wanted to reach and small changes she could try in her existing posts.",
      ],
      manager: "Sushmita",
      managerFocus:
        "Architecture and art audiences, Reel introductions and a manageable posting rhythm",
      steps: [
        {
          label: "Getting discovered",
          heading:
            "Use Stephanie’s architecture and art interests to guide outreach.",
          paragraphs: [
            "Stephanie named larger architecture accounts and established artists as the audience she wanted to reach. Sushmita acknowledged those priorities for the outreach and invited Stephanie to flag accounts that did not fit her work.",
          ],
        },
        {
          label: "Introducing a Reel",
          heading: "Give viewers something to notice from the first moment.",
          paragraphs: [
            "In July 2024, Sushmita suggested adding short text at the start of a Reel, choosing a striking cover image or opening with a voiceover or question. Stephanie tried a text introduction on her Reel that evening, turning the review into one specific experiment.",
          ],
        },
        {
          label: "Posting rhythm",
          heading: "Keep sharing the work while allowing time for breaks.",
          paragraphs: [
            "Stephanie was aiming for at least five posts a week, but wanted to avoid burning out. Sushmita supported her attention to both posting and taking breaks, and encouraged her to keep experimenting with how she introduced the art.",
          ],
        },
      ],
    },
    progress: {
      heading: "5,346 followers gained through daily outreach.",
      paragraphs: [
        "Stephanie gained 5,346 followers through daily outreach from 25 Apr 2025 to 25 Sep 2026, across 17 recorded periods.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 310,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 365,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 480,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 396,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 623,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 554,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 475,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 495,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 457,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 466,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 361,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 364,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 0,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 0,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 0,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 0,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 0,
        },
      ],
    },
    quote:
      "Sushmita gave me an idea I could use straight away. I added text at the start of my next Reel that evening, which made the feedback feel practical.",
    quoteBy: "Stephanie Chan · Artist · July 2024",
    close: {
      heading: "Help more people discover what you make by hand.",
      body: "Get support with reaching art audiences and finding practical ways to introduce your drawings, process and finished pieces.",
    },
  },
  {
    slug: "todd-bracher",
    niche: "Design",
    nicheSlug: "design",
    specialty: "Industrial design and creative direction",
    title: "8,317 followers for Todd’s view of design.",
    intro:
      "Todd wanted a younger design community to discover the person behind his work. Rahul refined the outreach around design accounts and suggested ways to connect Todd’s observations, experience and creative process on Instagram.",
    name: "Todd Bracher",
    handle: "toddbracher",
    photo: "/audiences/journey-v2/results/products/toddbracher-avatar.png",
    gained: 8317,
    period: "25 Apr 2025 – 25 Sep 2026",
    start: {
      heading: "Let design fans meet the person behind the work.",
      paragraphs: [
        "Todd is an industrial designer and creative director who works with brands. In November 2023, he explained that he wanted to bring his existing visibility into Instagram and connect with younger people interested in design.",
        "He wanted the page to show his observations, inspiration, culture and travel. His website could hold the portfolio; Instagram was a place for people to discover how he saw the world, with a style that still felt like his own.",
      ],
      audience: [
        "Design fans",
        "Younger designers",
        "People interested in industrial and furniture design",
      ],
    },
    approach: {
      heading: "Keep the outreach and the profile rooted in design.",
      paragraphs: [
        "Ignited handled daily outreach for Todd’s design audience. Rahul also reviewed how the profile could introduce his experience and how the photographs could say more about the thinking behind his work.",
      ],
      manager: "Rahul",
      managerFocus:
        "Design audiences, a personal profile and ideas from sketch to finished product",
      steps: [
        {
          label: "Getting discovered",
          heading: "Review which design audiences bring new followers.",
          paragraphs: [
            "In May 2025, the targeting discussion included @industrialfacility, @layer_design and @ronanbouroullec. Rahul reported keeping audiences where people were more likely to follow Todd after outreach. Todd also updated his preferences with more design examples and an interest in furniture design.",
          ],
        },
        {
          label: "The profile",
          heading: "Give visitors a clear introduction to the designer.",
          paragraphs: [
            "Todd confirmed updating his profile and creating a Linktree in November 2023. Rahul supported a News or Mentions Highlight for coverage of his work. A later review proposed a bio naming his industrial design and creative director roles, with Highlights for products, design, perspective and industry insights.",
          ],
        },
        {
          label: "Showing the thinking",
          heading: "Connect the observation with the design process.",
          paragraphs: [
            "In January 2024, Rahul suggested captions that explained Todd’s design thinking, carousels moving from sketches to a finished piece, and short videos showing a process or product. Todd said the ideas made sense while explaining that he wanted a restrained, consistent format that felt natural to him.",
          ],
        },
      ],
    },
    progress: {
      heading: "8,317 followers gained through daily outreach.",
      paragraphs: [
        "Todd gained 8,317 followers through daily outreach from 25 Apr 2025 to 25 Sep 2026, across 17 recorded periods.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 424,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 444,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 522,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 503,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 644,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 551,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 510,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 508,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 511,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 385,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 234,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 586,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 536,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 624,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 442,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 501,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 392,
        },
      ],
    },
    quote:
      "I wanted people to understand how I see design, without making the page feel like a sales pitch. Rahul’s suggestions gave me ways to introduce the work and my perspective.",
    quoteBy:
      "Todd Bracher · Industrial designer · 2023–2024 profile and content discussions",
    close: {
      heading: "Bring your design work and perspective to more people.",
      body: "Work with a Brand Manager on reaching design audiences and helping visitors understand the ideas behind your work.",
    },
  },
  {
    slug: "andre-hardy",
    niche: "Authors",
    nicheSlug: "authors",
    specialty: "Crime novelist",
    title: "2,663 followers for Andre’s new author account.",
    intro:
      "Andre wanted to build an audience before his debut novel. Srishti helped him introduce his writing, connect it with his football and music interests, and try showing more of himself on camera.",
    name: "Andre Hardy",
    handle: "andrehardybooks",
    gained: 2663,
    period: "26 Aug 2025 – 25 Feb 2026",
    start: {
      heading: "Introduce the novelist behind the new account.",
      paragraphs: [
        "Andre Hardy is a former NFL running back and crime novelist. In August 2025, he had just started an Instagram account for his books and wanted to build a readership ahead of his debut release.",
        "His audience crossed several interests: crime fiction, jazz, hip-hop and football. He wanted readers to get to know the person and influences behind the stories before he asked them to buy a book.",
      ],
      audience: [
        "Crime fiction readers",
        "Jazz and hip-hop listeners",
        "NFL fans interested in his writing",
      ],
    },
    approach: {
      heading: "Find readers and let them meet the storyteller.",
      paragraphs: [
        "Ignited handled daily outreach around Andre’s audience brief. Srishti reviewed the new profile and suggested ways to show his writing life, musical influences and journey from football to fiction.",
      ],
      manager: "Srishti",
      managerFocus:
        "Reader audiences, an author bio, Highlights and on-camera storytelling",
      steps: [
        {
          label: "Getting discovered",
          heading: "Build the outreach around books, music and football.",
          paragraphs: [
            "Andre named crime-fiction readers, jazz and hip-hop listeners, and NFL fans. He also suggested accounts such as @harlancoben and @vanlathan. Srishti used that brief to guide the targeting and reviewed which audiences brought followers, with book lovers and readers remaining the focus.",
          ],
        },
        {
          label: "The profile",
          heading: "Make the author story easy to find.",
          paragraphs: [
            "In September 2025, Srishti proposed a shorter bio connecting Andre’s crime writing and NFL background, with an invitation to learn more. She suggested Highlights for his writing journey, inspirations, book teasers and reading recommendations. Andre confirmed changing his bio and posting a Highlight that month.",
          ],
        },
        {
          label: "What to post",
          heading: "Let readers hear Andre tell a story.",
          paragraphs: [
            "Srishti’s October review suggested reading a line on camera, sharing a football memory, showing his writing desk or recommending a crime novel or jazz record. Andre was initially unsure about appearing on camera. Later that month, he thanked her for the suggestion and said he was getting a clearer idea of what worked.",
          ],
        },
      ],
    },
    progress: {
      heading: "2,663 followers gained through daily outreach.",
      paragraphs: [
        "Andre gained 2,663 followers through daily outreach from 26 Aug 2025 to 25 Feb 2026.",
      ],
      months: [
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 265,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 529,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 626,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 419,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 484,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 340,
        },
      ],
    },
    quote:
      "I updated my bio and added a Highlight, then gave on-camera content a chance. Srishti was right about letting people see me. I started getting a clearer sense of what worked.",
    quoteBy: "Andre Hardy · Crime novelist · September–October 2025",
    close: {
      heading: "Help readers discover the person behind your books.",
      body: "Work with a Brand Manager on reaching readers, introducing your writing and sharing the stories behind it.",
    },
  },
  {
    slug: "rausch",
    niche: "Music & DJs",
    nicheSlug: "music-and-djs",
    specialty: "Electronic music producer",
    title: "6,206 followers for Raūsch’s electronic music.",
    intro:
      "Raul wanted more people to discover his music as Raūsch. Alongside daily outreach, Aditi suggested ways to share his studio work, live performances and the story of a release in formats that fitted the material.",
    name: "Raul",
    business: "Raūsch",
    handle: "rausch.ofc",
    gained: 6206,
    period: "13 recorded periods · 15 Feb 2025 – 25 Apr 2026",
    start: {
      heading: "Give listeners more ways into the music.",
      paragraphs: [
        "Raul produces electronic music as Raūsch, with indie dance, melodic techno and progressive house among the styles on his profile. His Instagram held releases, studio work and performance clips.",
        "In April 2025, he was promoting a festival performance scheduled for 3 May and asked what he and Aditi could work on together. He wanted the outreach and his own posts to support discovery of the music.",
      ],
      audience: [
        "Electronic music listeners",
        "Indie dance and melodic techno audiences",
        "People discovering his releases and live sets",
      ],
    },
    approach: {
      heading: "Show the music being made and played.",
      paragraphs: [
        "Ignited handled daily outreach while Raul promoted his music. Aditi’s December 2024 review separated the material by format: movement and performance for Reels, release details for carousels, and quick updates for Stories.",
      ],
      manager: "Aditi",
      managerFocus:
        "Music outreach, studio and performance Reels, and release stories",
      steps: [
        {
          label: "Getting discovered",
          heading: "Make room for Raul’s own music connections.",
          paragraphs: [
            "Raul shared a list of creators in December 2024, including @mausolle_music, @djleebutler and @sageartmusic. Aditi agreed to test his suggestions. When he asked about promoting his May 2025 festival performance, she confirmed that daily outreach was continuing alongside his event posts.",
          ],
        },
        {
          label: "Studio and stage",
          heading: "Use Reels for the parts of music that move.",
          paragraphs: [
            "Aditi suggested replacing static-image Reels with studio snippets, live performances and moments behind the scenes. A clip could show Raul testing a melody, preparing his equipment or playing a set, with a short explanation of what inspired the track.",
          ],
        },
        {
          label: "Release stories",
          heading: "Take listeners from the first melody to the final mix.",
          paragraphs: [
            "For album art, EP information and longer track stories, Aditi recommended carousel posts. She suggested showing how a release came together and explaining why the music mattered to Raul. Stories could carry announcements, polls and informal studio updates.",
          ],
        },
      ],
    },
    progress: {
      heading: "6,206 followers gained through daily outreach.",
      paragraphs: [
        "Raūsch gained 6,206 followers through daily outreach from 15 Feb 2025 to 25 Apr 2026.",
      ],
      months: [
        {
          dates: "15 Feb 2025 – 17 Mar 2025",
          followers: 393,
        },
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 399,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 264,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 408,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 317,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 424,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 489,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 1054,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 574,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 469,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 561,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 382,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 472,
        },
      ],
    },
    quote:
      "I was pleased with the growth even when I wasn’t posting much. Aditi gave me practical ideas for sharing my studio work, live performances and the stories behind my tracks.",
    quoteBy: "Raul · Raūsch · April 2025",
    close: {
      heading: "Help more listeners discover the music you make.",
      body: "Get support with daily outreach and ideas for sharing your studio work, performances and releases.",
    },
  },
  {
    slug: "claudia-warias",
    niche: "Wellness",
    nicheSlug: "wellness",
    specialty: "Women’s vitality coaching",
    title: "3,083 followers for Claudia’s coaching account.",
    intro:
      "Claudia wanted her coaching to reach women with demanding careers. Srishti paired daily outreach with a profile review and content ideas that built on Claudia’s written posts while giving her new ways to try Reels.",
    name: "Claudia Warias",
    handle: "claudia.warias",
    gained: 3083,
    period: "26 Aug 2025 – 25 Aug 2026",
    start: {
      heading: "Reach the women Claudia built her coaching around.",
      paragraphs: [
        "Claudia describes her work as women’s vitality coaching. Her audience brief centred on women in their early to mid-thirties, including those working in technology, consulting and leadership across Europe. She wanted more of them to discover her work and consider her coaching programme.",
        "She was already posting regularly. Single-page posts combining text and a photograph felt promising, while talking videos were harder to keep short. Claudia wanted feedback on how her profile introduced the offer and which content formats to keep developing.",
      ],
      audience: [
        "Women with demanding corporate careers",
        "Women interested in stress, mindset and wellbeing",
        "Prospective participants in Claudia’s coaching programme",
      ],
    },
    approach: {
      heading: "Connect the audience, the offer and the content.",
      paragraphs: [
        "Ignited handled daily outreach around Claudia’s coaching brief. Srishti reviewed how the bio introduced her work, then helped her explore a mix of written posts and Reels she could adapt to her own voice.",
      ],
      manager: "Srishti",
      managerFocus:
        "Women’s coaching audiences, a clearer bio and written posts alongside Reels",
      steps: [
        {
          label: "Getting discovered",
          heading: "Use Claudia’s audience brief to guide outreach.",
          paragraphs: [
            "Claudia explained the careers, interests and countries she wanted to reach, and shared examples of accounts her prospective clients followed. By December 2025, Srishti’s outreach review included audiences around @mona.remembers and @transformwith.tori.",
          ],
        },
        {
          label: "Introducing the offer",
          heading: "Make the coaching invitation easy to find.",
          paragraphs: [
            "In October 2025, Srishti recommended keeping Claudia’s profile photo, name and Highlights while refining the bio around her coaching and an invitation to apply for the next coaching programme intake. Claudia confirmed that she updated the bio after the review and described the feedback as “gold”.",
          ],
        },
        {
          label: "Content she could build on",
          heading: "Keep the written insights. Test shorter Reels.",
          paragraphs: [
            "Claudia said her single-page text posts were working better than her talking videos. Srishti encouraged her to keep those posts while testing short Reels: a specific audience concern at the start, a 30–45-second script, or quiet footage with text. The suggestions gave Claudia options for expressing the same ideas in different formats.",
          ],
        },
      ],
    },
    progress: {
      heading: "3,083 followers gained through daily outreach.",
      paragraphs: [
        "Claudia gained 3,083 followers through daily outreach from 26 Aug 2025 to 25 Aug 2026, across 12 recorded periods.",
      ],
      months: [
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 56,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 101,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 238,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 225,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 333,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 399,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 243,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 402,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 363,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 296,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 308,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 119,
        },
      ],
      update: {
        heading: "A Reel reached beyond her usual views.",
        paragraphs: [
          "In February 2026, Claudia reported that one Reel had reached 23,000 views, with around 500 likes and several comments. She continued discussing which formats to repeat and how to keep the content in her own voice.",
        ],
      },
    },
    quote:
      "Srishti’s feedback was exactly what I needed. I updated my bio after her review, and her suggestions gave me specific ways to build on my written posts and try Reels.",
    quoteBy: "Claudia Warias · Women’s Vitality Coach · October 2025",
    close: {
      heading: "Help more women discover the coaching you offer.",
      body: "Build an outreach plan around the women you want to work with, with support for introducing your programme and sharing your ideas.",
    },
  },
  {
    slug: "jeremy-sieurac",
    niche: "Fitness",
    nicheSlug: "fitness",
    specialty: "Men’s fitness and mindset coaching",
    title: "2,245 followers for Jeremy’s fitness and mindset coaching.",
    intro:
      "Jeremy wanted to reach men who were starting their fitness journey or struggling to stay consistent. Rahul worked through that audience brief with him and offered specific ways to make his coaching videos shorter and more personal.",
    name: "Jeremy Sieurac",
    handle: "jeremy_sieurac",
    gained: 2245,
    period: "26 Aug 2025 – 25 Jul 2026",
    start: {
      heading: "Speak to men who find consistency difficult.",
      paragraphs: [
        "Jeremy coaches men on fitness, health and mindset. He was looking for people taking their first steps or repeatedly starting and stopping, and said his mindset content was what this audience responded to. Bodybuilding and high-endurance sport were outside the focus he wanted for his account.",
        "He also wanted help presenting his coaching on Instagram. Jeremy asked for profile and content reviews, then returned with practical questions: how short should a video be, and how could he turn his own experiences into stories people would want to watch?",
      ],
      audience: [
        "Men beginning a fitness routine",
        "Men who struggle to stay consistent",
        "Men interested in fitness, health and mindset coaching",
      ],
    },
    approach: {
      heading: "Make the audience brief and the coaching message specific.",
      paragraphs: [
        "Ignited handled daily outreach while Jeremy and Rahul reviewed which audiences fitted the coaching. Rahul’s profile and video feedback focused on helping a new visitor understand Jeremy’s work and hear more of his own experience.",
      ],
      manager: "Rahul",
      managerFocus:
        "Men beginning their fitness journey, shorter videos and personal stories",
      steps: [
        {
          label: "Getting discovered",
          heading:
            "Review fitness audiences against Jeremy’s actual client brief.",
          paragraphs: [
            "Jeremy explained why followers of bodybuilding and endurance accounts were often a poor fit. Rahul reviewed the outreach audiences with him and proposed a new selection for approval in January 2026. Jeremy approved examples including @dadbod_steve and @healthbenders, while excluding an account focused on bodybuilding.",
          ],
        },
        {
          label: "Introducing the coach",
          heading: "Give profile visitors a tour of Jeremy’s coaching.",
          paragraphs: [
            "In September 2025, Rahul suggested keeping Jeremy’s Client Wins Highlight and adding “Jeremy Here”, “Tips” and “Behind the Scenes”. The proposed sections would introduce Jeremy, share health and mindset habits, and show his coaching process. Jeremy found the review helpful and said he planned to add the Highlights.",
          ],
        },
        {
          label: "From advice to a personal story",
          heading: "Use everyday footage to explain a coaching idea.",
          paragraphs: [
            "By December 2025, Jeremy confirmed he had started making shorter videos. In February, Rahul reviewed his Reel about procrastination and suggested replacing fast text screens with slower clips of Jeremy thinking, working or exercising, paired with a voiceover. Jeremy called the examples helpful and said he would work on them.",
          ],
        },
      ],
    },
    progress: {
      heading: "2,245 followers gained through daily outreach.",
      paragraphs: [
        "Jeremy gained 2,245 followers through daily outreach from 26 Aug 2025 to 25 Jul 2026, across 11 recorded periods.",
      ],
      months: [
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 57,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 176,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 261,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 275,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 232,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 196,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 134,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 136,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 166,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 296,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 316,
        },
      ],
    },
    quote:
      "I’d started making shorter videos, but needed help telling my own stories. Rahul’s examples gave me practical ideas, including how to use everyday clips and voiceover in my coaching content.",
    quoteBy: "Jeremy Sieurac · Fitness and mindset coach · February 2026",
    close: {
      heading: "Introduce your coaching to the people it is designed for.",
      body: "Build an outreach plan around your clients’ starting point, with support for explaining your approach through your profile and videos.",
    },
  },
  {
    slug: "preston-woody",
    niche: "Spirituality & faith",
    nicheSlug: "spirituality-and-faith",
    specialty: "Faith and leadership coaching",
    title: "3,561 followers for Preston’s coaching account.",
    intro:
      "Preston wanted his personal account to reach men who connected with his approach to faith, leadership and growth. Shama paired daily outreach with specific ideas for his bio, personal stories and quote-based posts.",
    name: "Preston Woody",
    handle: "prestonwoody",
    photo: "/audiences/journey-v2/results/coaches/prestonwoody-avatar.png",
    gained: 3561,
    period: "25 Apr 2025 – 25 Jul 2026",
    start: {
      heading: "Introduce Preston’s coaching to faith-driven men.",
      paragraphs: [
        "Preston coaches executives and entrepreneurs. His audience brief focused on men aged 25–45 around Dallas–Fort Worth who were interested in faith, fitness and personal growth. He wanted his Instagram to build familiarity with his work and support the community he was developing through SaintsCrown.",
        "His personal account was the focus of the outreach. Preston asked for advice on the profile and content as well as follower growth, creating room to explain his coaching through the experiences and ideas he shared.",
      ],
      audience: [
        "Faith-driven men aged 25–45",
        "Executives and entrepreneurs",
        "Men interested in leadership, fitness and personal growth",
      ],
    },
    approach: {
      heading: "Bring Preston’s audience and personal voice into focus.",
      paragraphs: [
        "Ignited handled daily outreach around Preston’s audience brief. Shama’s October and November 2024 reviews suggested ways to introduce the coaching, show more of Preston’s experience and give his written messages a stronger presentation.",
      ],
      manager: "Shama",
      managerFocus:
        "Faith-driven men, a profile invitation and more personal coaching content",
      steps: [
        {
          label: "Getting discovered",
          heading:
            "Let faith, leadership and personal growth guide the outreach.",
          paragraphs: [
            "Preston described the men he wanted to reach and the leadership voices they followed, including Tony Robbins and John Maxwell. Shama used that brief to guide the targeting discussion. When Preston refreshed his account examples in May 2025, he pointed to communities around @braveco.men, @wildatheart and @jontyson.",
          ],
        },
        {
          label: "A next step in the bio",
          heading: "Tell a new visitor what to do next.",
          paragraphs: [
            "Shama’s October 2024 profile review found that Preston’s coaching message was already clear. She recommended adding one direct next step to the bio: follow for more, explore the link, or send a message. The advice focused on making the invitation as visible as the coaching itself.",
          ],
        },
        {
          label: "More than a quote",
          heading: "Give the message context and a human voice.",
          paragraphs: [
            "In November 2024, Shama suggested turning static quote Reels into carousels, with each slide adding context, or pairing the words with moving footage. She also recommended more unscripted moments about faith, personal challenges and victories, alongside consistent fonts and colours for Preston’s SaintsCrown content.",
          ],
        },
      ],
    },
    progress: {
      heading: "3,561 followers gained through daily outreach.",
      paragraphs: [
        "Preston gained 3,561 followers through daily outreach from 25 Apr 2025 to 25 Jul 2026, across 15 recorded periods.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 212,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 331,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 284,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 201,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 253,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 190,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 228,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 255,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 230,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 283,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 230,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 224,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 180,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 144,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 316,
        },
      ],
    },
    quote:
      "I appreciated how specific Shama’s feedback was: a clearer next step in my bio, more personal moments, and new ways to present quotes. She was responsive when I had questions.",
    quoteBy: "Preston Woody · Growth coach · April 2025",
    close: {
      heading: "Help more men discover your approach to leadership and growth.",
      body: "Build an outreach plan around the community you want to reach, with support for presenting your coaching and the experiences behind it.",
    },
  },
  {
    slug: "weldon-hobbs",
    niche: "Real estate",
    nicheSlug: "real-estate",
    specialty: "Real estate referrals · Colorado Springs and nationwide",
    title: "2,116 followers for Weldon’s real estate expertise.",
    intro:
      "Weldon wanted his real estate experience to reach military families and veterans across the country. Rahul adjusted the outreach and suggested ways to make that shared background clear in the profile and videos.",
    name: "Weldon Hobbs",
    handle: "weldon_hobbs",
    gained: 2116,
    period: "25 Jun 2025 – 25 Jul 2026",
    start: {
      heading: "Build a real estate audience around a shared background.",
      paragraphs: [
        "Weldon Hobbs is a Colorado Springs real estate professional and former Air Force member. He initially wanted local families to know him as someone who could represent them when buying or selling a home.",
        "By January 2026, his plans had expanded into nationwide referrals: connecting military families and veterans with agents who shared their values. He wanted to stay visibly based in Colorado Springs while reaching people well beyond the city.",
      ],
      audience: [
        "Military families",
        "Veterans looking for real estate guidance",
        "Colorado Springs buyers and sellers",
      ],
    },
    approach: {
      heading: "Connect the outreach with Weldon’s military experience.",
      paragraphs: [
        "Ignited handled daily outreach while Rahul worked through Weldon’s changing audience goals. The January–February 2026 work focused on military and veteran communities and the real estate questions they would recognise.",
      ],
      manager: "Rahul",
      managerFocus:
        "Military and veteran audiences, the bio and real estate video topics",
      steps: [
        {
          label: "Getting discovered",
          heading: "Follow the shift from local buyers to military referrals.",
          paragraphs: [
            "Weldon supplied military-base accounts and examples such as @frommilitarytomillionaire, @militarymoneymanual and @themilitarywallet. In February 2026, Rahul confirmed that outreach had shifted toward military and veteran audiences in January. The examples gave the new referral strategy a concrete starting point.",
          ],
        },
        {
          label: "The profile",
          heading: "Make the Air Force connection easy to see.",
          paragraphs: [
            "Rahul recommended making Weldon’s former Air Force service prominent in his bio, alongside his real estate role. The aim was to help a military family recognise the shared experience behind the advice as soon as they opened the profile.",
          ],
        },
        {
          label: "What to post",
          heading: "Start videos with the move a military family is facing.",
          paragraphs: [
            "Rahul pointed to Weldon’s video about a military relocation as an example to build on. He suggested opening more videos around military relocations, deployments, VA loans and retirement timelines, giving each real estate topic a situation the intended viewer would recognise.",
          ],
        },
      ],
    },
    progress: {
      heading: "2,116 followers gained through daily outreach.",
      paragraphs: [
        "Weldon Hobbs gained 2,116 followers through daily outreach from 25 Jun 2025 to 25 Jul 2026, across 13 recorded periods.",
      ],
      months: [
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 27,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 73,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 132,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 153,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 177,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 222,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 171,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 235,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 174,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 157,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 122,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 229,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 244,
        },
      ],
    },
    quote:
      "Rahul’s review connected my military background with the people I want to help. The suggestions for my bio and real estate videos were specific, and I found the review helpful.",
    quoteBy: "Weldon Hobbs · Real estate professional · February 2026",
    close: {
      heading: "Help the people you serve recognise your experience.",
      body: "Work with a Brand Manager on reaching your real estate audience and showing why your background matters to them.",
    },
  },
  {
    slug: "natalia-hancock",
    niche: "Skincare",
    nicheSlug: "skincare",
    specialty: "Aesthetic medicine and skincare",
    title: "2,016 followers for Natalia’s aesthetics and skincare page.",
    intro:
      "Natalia was developing a skincare brand alongside her aesthetic practice. Sushmita helped her think through the audiences for each, organise the profile and decide how a future product account could fit into her plans.",
    name: "Dr Natalia Hancock",
    handle: "dr.natalia.hancock",
    gained: 2016,
    period: "25 Apr 2025 – 25 Jan 2026",
    start: {
      heading: "Introduce the doctor and the skincare brand in development.",
      paragraphs: [
        "Natalia is a medical doctor working in aesthetics and skincare. In February 2025, she wanted more local people to discover her aesthetic services and more people to follow the development of her skincare formulations.",
        "Her original audience was women aged 30–65 interested in anti-ageing. As the product plans developed, she also wanted to explore audiences around nutritionists and functional-medicine practitioners. The account needed a clear place for those different interests.",
      ],
      audience: [
        "Women interested in skincare and anti-ageing",
        "Local people exploring aesthetic services",
        "People following skincare development",
      ],
    },
    approach: {
      heading: "Match the audience with what Natalia was ready to share.",
      paragraphs: [
        "Ignited handled daily outreach from Natalia’s audience brief. Sushmita reviewed how the page introduced her work, then helped her consider whether the developing skincare brand belonged on the same account.",
      ],
      manager: "Sushmita",
      managerFocus:
        "Skincare audiences, profile organisation and planning for a future product account",
      steps: [
        {
          label: "Getting discovered",
          heading: "Review new audiences against the content on the page.",
          paragraphs: [
            "In April and July 2025, Natalia asked about reaching people following functional-medicine practitioners. She supplied examples including @drsamwatts and @tanyaborowski. Sushmita compared those audiences with Natalia’s existing aesthetic-medicine posts and discussed how a separate skincare account could fit the plan.",
          ],
        },
        {
          label: "The profile",
          heading: "Give treatments and skincare development their own place.",
          paragraphs: [
            "Sushmita’s February review suggested a bio invitation to follow Natalia’s skincare journey, plus Highlights for Skincare Trials, Treatments, Results and About Me. She also recommended moving the phone number to Instagram’s contact button so the bio could focus on her treatments and skincare development.",
          ],
        },
        {
          label: "Planning the next account",
          heading: "Plan a separate home for the skincare launch.",
          paragraphs: [
            "In July 2025, Sushmita asked whether Natalia wanted a new skincare account or to continue with the existing page, which was focused on aesthetic medicine. Natalia agreed that a separate account would probably make sense and planned to create it closer to manufacturing and launch.",
          ],
        },
      ],
    },
    progress: {
      heading: "2,016 followers gained through daily outreach.",
      paragraphs: [
        "Dr Natalia Hancock gained 2,016 followers through daily outreach from 25 Apr 2025 to 25 Jan 2026, across 9 recorded periods.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 136,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 134,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 265,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 207,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 189,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 213,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 256,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 267,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 349,
        },
      ],
    },
    quote:
      "Sushmita helped me think through how my aesthetics page and future skincare brand should fit together. I decided to plan a separate account closer to launch, and appreciated her guidance.",
    quoteBy: "Natalia Hancock · Aesthetic doctor · July 2025",
    close: {
      heading: "Give each part of your work a clear introduction.",
      body: "Get help with reaching your audience, explaining your services and planning how a new product fits into your Instagram presence.",
    },
  },
  {
    slug: "phoenix-home-remodeling",
    niche: "Home & building",
    nicheSlug: "home-and-building",
    specialty: "Home remodeling · Phoenix, Arizona",
    title: "5,028 followers for Phoenix Home Remodeling’s projects.",
    intro:
      "Jeremy wanted more people to discover Phoenix Home Remodeling. Aditi reviewed construction and design audiences, suggested a simpler bio and developed video ideas around the choices homeowners make before a remodel.",
    name: "Jeremy",
    business: "Phoenix Home Remodeling",
    handle: "phoenix_home_remodeling",
    gained: 5028,
    period: "25 Apr 2025 – 25 Sep 2026",
    start: {
      heading: "Help homeowners understand the remodel before they enquire.",
      paragraphs: [
        "Phoenix Home Remodeling helps homeowners plan interior renovations, with design work and 3D renderings as part of its offer. Jeremy wanted the Instagram account to reach more people interested in home improvement in the Phoenix area.",
        "The profile had plenty to say about the business, and customer reviews appeared regularly in the feed. The profile needed a shorter introduction and more room for project videos.",
      ],
      audience: [
        "Phoenix homeowners",
        "People following interior design and renovation",
        "Local home improvement audiences",
      ],
    },
    approach: {
      heading: "Refine the outreach and make the work easier to explore.",
      paragraphs: [
        "Ignited handled daily outreach while Aditi reviewed which home improvement audiences were bringing followers. She also worked with Jeremy on the profile and on content that could explain a renovation before someone asked for a quote.",
      ],
      manager: "Aditi",
      managerFocus:
        "Phoenix home improvement audiences, a readable bio and remodeling videos",
      steps: [
        {
          label: "Getting discovered",
          heading: "Keep testing construction and design audiences.",
          paragraphs: [
            "The June 2025 review identified accounts whose followers were responding to the outreach such as @premiumcabinetsaz, @phoenix_cabinet_co and @customstoneworksaz. Jeremy later supplied interior-design and local accounts, including @livingwithloloaz and @scottsdalemoms. By March 2026, Aditi confirmed reviewing and adding his suggestions to the outreach plan.",
          ],
        },
        {
          label: "The profile",
          heading: "Put the main services on separate lines.",
          paragraphs: [
            "In August 2025, Aditi suggested a shorter bio naming the design-build approach, 3D renderings and interior remodels, followed by an invitation to send a message. Jeremy split the profile information onto separate lines and confirmed that it looked nicer and was easier to read.",
          ],
        },
        {
          label: "Showing the work",
          heading: "Show the transformation and explain remodeling decisions.",
          paragraphs: [
            "Aditi’s September review suggested before-and-after project videos and short explanations of remodeling mistakes that increase costs. She also recommended moving frequent review posts into Stories and Highlights. Jeremy said he planned to change how reviews were posted and prepare more 30–60-second videos.",
          ],
        },
      ],
    },
    progress: {
      heading: "5,028 followers gained through daily outreach.",
      paragraphs: [
        "Phoenix Home Remodeling gained 5,028 followers through daily outreach from 25 Apr 2025 to 25 Sep 2026, across 17 recorded periods.",
      ],
      months: [
        {
          dates: "25 Apr 2025 – 25 May 2025",
          followers: 310,
        },
        {
          dates: "26 May 2025 – 25 Jun 2025",
          followers: 165,
        },
        {
          dates: "25 Jun 2025 – 25 Jul 2025",
          followers: 173,
        },
        {
          dates: "26 Jul 2025 – 25 Aug 2025",
          followers: 87,
        },
        {
          dates: "26 Aug 2025 – 25 Sep 2025",
          followers: 393,
        },
        {
          dates: "26 Sep 2025 – 25 Oct 2025",
          followers: 350,
        },
        {
          dates: "26 Oct 2025 – 25 Nov 2025",
          followers: 176,
        },
        {
          dates: "26 Nov 2025 – 25 Dec 2025",
          followers: 246,
        },
        {
          dates: "26 Dec 2025 – 25 Jan 2026",
          followers: 267,
        },
        {
          dates: "26 Jan 2026 – 25 Feb 2026",
          followers: 385,
        },
        {
          dates: "26 Feb 2026 – 25 Mar 2026",
          followers: 386,
        },
        {
          dates: "26 Mar 2026 – 25 Apr 2026",
          followers: 414,
        },
        {
          dates: "26 Apr 2026 – 25 May 2026",
          followers: 386,
        },
        {
          dates: "26 May 2026 – 25 Jun 2026",
          followers: 325,
        },
        {
          dates: "26 Jun 2026 – 25 Jul 2026",
          followers: 309,
        },
        {
          dates: "26 Jul 2026 – 25 Aug 2026",
          followers: 424,
        },
        {
          dates: "26 Aug 2026 – 25 Sep 2026",
          followers: 232,
        },
      ],
    },
    quote:
      "Aditi’s bio feedback gave me a simple improvement to make. I put the profile information on separate lines, and it looked nicer and was easier to read straight away.",
    quoteBy: "Jeremy · Phoenix Home Remodeling · August 2025",
    close: {
      heading: "Help homeowners see the work behind a remodel.",
      body: "Get support with reaching home improvement audiences and showing your services, project transformations and advice for homeowners.",
    },
  },
];

/** Every niche with at least one case study, A to Z. */
export const NICHES = Array.from(
  new Map(CASE_STUDIES.map((c) => [c.nicheSlug, c.niche])),
  ([slug, label]) => ({
    slug,
    label,
    count: CASE_STUDIES.filter((c) => c.nicheSlug === slug).length,
  }),
).sort((a, b) => a.label.localeCompare(b.label));
