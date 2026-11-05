/* eslint-disable @next/next/no-img-element -- small decorative crops inside an animated mockup */
import type { ReactNode } from "react";
import {
  Bookmark,
  ChevronLeft,
  Clapperboard,
  Ellipsis,
  Grid3x3,
  Heart,
  House,
  MapPin,
  MessageCircle,
  Search,
  Send,
  SquarePlus,
  SquareUser,
  UserPlus,
} from "lucide-react";
import { photo, type Niche, type NichePhoto } from "../data";

const STORY_RING =
  "bg-[conic-gradient(from_210deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5,#feda75)]";

function Photo({
  niche,
  name,
  className,
}: {
  niche: Niche;
  name: NichePhoto;
  className?: string;
}) {
  return (
    <img
      src={photo(niche.id, name)}
      alt=""
      draggable={false}
      decoding="async"
      className={className}
    />
  );
}

/** Round photo. The source portraits have white corners, so they're zoomed in slightly. */
export function Avatar({
  niche,
  name,
  size,
  ring = false,
}: {
  niche: Niche;
  name: NichePhoto;
  size: number;
  ring?: boolean;
}) {
  const img = (
    <span
      className="block overflow-hidden rounded-full bg-subtle-bg"
      style={{ width: size, height: size }}
    >
      <Photo
        niche={niche}
        name={name}
        className={`h-full w-full object-cover ${name === "portrait" ? "scale-[1.12]" : ""}`}
      />
    </span>
  );
  if (!ring) return img;
  return (
    <span className={`block shrink-0 rounded-full p-[2px] ${STORY_RING}`}>
      <span className="block rounded-full bg-white p-[2px]">{img}</span>
    </span>
  );
}

function TouchDot({ className }: { className: string }) {
  return (
    <span
      data-touch
      aria-hidden
      className={`pointer-events-none absolute z-30 h-8 w-8 rounded-full border-2 border-white/90 bg-black/30 shadow-lg ${className}`}
    />
  );
}

function BottomNav({ niche, likeBadge = false }: { niche: Niche; likeBadge?: boolean }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 border-t border-hairline bg-white pb-[14px] pt-2">
      <div className="flex items-center justify-around text-[#111]">
        <House size={20} strokeWidth={2} />
        <Search size={20} strokeWidth={2} />
        <SquarePlus size={20} strokeWidth={2} />
        <Clapperboard size={20} strokeWidth={2} />
        <span className="relative">
          <Avatar niche={niche} name="portrait" size={21} />
          {likeBadge && (
            <span
              data-like-badge
              className="absolute -top-[34px] right-[-8px] flex items-center gap-1 rounded-lg bg-[#ff3040] px-2 py-1 text-[10px] font-semibold text-white shadow-md after:absolute after:-bottom-1 after:right-3 after:h-2 after:w-2 after:rotate-45 after:bg-[#ff3040]"
            >
              <Heart size={10} fill="currentColor" strokeWidth={0} /> 1
            </span>
          )}
        </span>
      </div>
      <span className="absolute bottom-[4px] left-1/2 h-[3px] w-[84px] -translate-x-1/2 rounded-full bg-[#111]" />
    </div>
  );
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div
      data-phone
      className="absolute left-1/2 top-[72px] -ml-[134px] h-[556px] w-[268px] rounded-[44px] bg-[#16141c] p-[7px] shadow-[0_34px_60px_-24px_rgba(61,53,122,0.75),inset_0_0_0_1.5px_rgba(255,255,255,0.14)]"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[37px] bg-white text-[#111]">
        <div className="relative z-20 flex h-[38px] items-center justify-between bg-white px-6 pt-1 text-[11px] font-semibold">
          <span>9:41</span>
          <span className="absolute left-1/2 top-2 h-[20px] w-[70px] -translate-x-1/2 rounded-full bg-[#16141c]" />
          <span className="flex items-center gap-1">
            <span className="flex items-end gap-[1.5px]">
              {[4, 6, 8, 10].map((h) => (
                <i key={h} className="block w-[2.5px] rounded-[1px] bg-[#111]" style={{ height: h }} />
              ))}
            </span>
            <span className="relative ml-0.5 block h-[10px] w-[20px] rounded-[3px] border border-[#111]/50 p-[1.5px]">
              <i className="block h-full w-[75%] rounded-[1px] bg-[#111]" />
            </span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------- Step 1: Instagram search ---------- */

function ResultRow({
  niche,
  name,
  title,
  sub,
  maya = false,
}: {
  niche: Niche;
  name: NichePhoto;
  title: string;
  sub: string;
  maya?: boolean;
}) {
  return (
    <div
      data-row
      {...(maya ? { "data-maya": true } : {})}
      className="flex items-center gap-2.5 rounded-xl px-2.5 py-[7px]"
    >
      <Avatar niche={niche} name={name} size={40} />
      <div className="min-w-0">
        <p className="truncate text-[12.5px] font-semibold leading-tight">{title}</p>
        <p className="truncate text-[11px] leading-snug text-[#737373]">{sub}</p>
      </div>
    </div>
  );
}

export function SearchScreen({ niche }: { niche: Niche }) {
  const tiles: NichePhoto[] = ["a1", "main", "a2", "more1", "a3", "more2", "a2", "a1", "more1", "a3", "more2", "main", "a1", "a2"];
  return (
    <>
      <div className="relative z-10 px-2.5 pb-2 pt-1">
        <div
          data-searchbar
          className="flex h-[34px] items-center gap-2 rounded-[10px] bg-[#efefef] px-2.5 text-[13px]"
        >
          <Search size={14} strokeWidth={2.2} className="shrink-0 text-[#737373]" />
          <span className="flex min-w-0 items-center">
            <span data-typed className="truncate" />
            <span className="ml-px h-[15px] w-[1.5px] shrink-0 animate-pulse bg-[#0095f6]" />
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 top-[84px]">
        <div className="grid auto-rows-[84px] grid-cols-3 gap-[2px]">
          {tiles.map((t, i) => (
            <div
              key={i}
              data-tile
              className={`overflow-hidden bg-subtle-bg ${i === 1 ? "row-span-2" : ""}`}
            >
              <Photo niche={niche} name={t} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div data-results className="absolute inset-0 bg-white">
          <div className="flex gap-4 border-b border-hairline px-3 pb-2 text-[11.5px] font-semibold text-[#737373]">
            <span>For you</span>
            <span className="relative text-[#111]">
              Accounts
              <i className="absolute -bottom-2 left-0 right-0 h-[1.5px] bg-[#111]" />
            </span>
            <span>Reels</span>
            <span>Places</span>
          </div>
          <div className="px-1 pt-2">
            {niche.accounts.map((a, i) => (
              <ResultRow
                key={a}
                niche={niche}
                name={(["a1", "a2", "a3"] as const)[i]}
                title={a}
                sub="An account to explore"
              />
            ))}
            <div data-row className="flex items-center gap-2.5 rounded-xl px-2.5 py-[7px]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-hairline text-[#111]">
                <MapPin size={17} strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[12.5px] font-semibold leading-tight">{niche.place}</p>
                <p className="truncate text-[11px] leading-snug text-[#737373]">Where to look</p>
              </div>
            </div>
            <ResultRow
              maya
              niche={niche}
              name="portrait"
              title={niche.person}
              sub={`${niche.personPlace} · Follows ${niche.accounts[0].toLowerCase()}`}
            />
            <div className="mt-3 flex justify-center">
              <span
                data-maya-tag
                className="rounded-full bg-action px-3 py-1.5 text-[11px] font-semibold text-white shadow-[0_10px_18px_-8px_rgba(90,76,224,0.9)]"
              >
                Someone we’d look for
              </span>
            </div>
          </div>
        </div>
      </div>
      <BottomNav niche={niche} />
    </>
  );
}

/* ---------- Step 2: the person's feed, with notifications dropping in ---------- */

function NotificationBanner({
  niche,
  index,
  text,
  action,
}: {
  niche: Niche;
  index: number;
  text: string;
  action: ReactNode;
}) {
  return (
    <div
      data-banner={index}
      className="relative flex items-center gap-2 rounded-[18px] border border-black/5 bg-white/95 p-2 shadow-[0_14px_28px_-12px_rgba(34,31,27,0.55)] backdrop-blur"
    >
      <Avatar niche={niche} name="main" size={32} />
      <p className="min-w-0 flex-1 text-[11px] leading-[1.25]">
        <b className="font-semibold">{niche.handle}</b> {text}
        <span className="text-[#737373]"> · now</span>
      </p>
      {action}
    </div>
  );
}

export function FeedScreen({ niche }: { niche: Niche }) {
  return (
    <>
      <div className="relative z-10 flex items-center justify-between bg-white px-3 pb-2">
        <span className="text-[17px] font-semibold -tracking-[0.02em]">Instagram</span>
        <span className="flex items-center gap-3">
          <Heart size={19} strokeWidth={2} />
          <Send size={18} strokeWidth={2} />
        </span>
      </div>

      <div data-feed>
        <div className="flex gap-2.5 border-b border-hairline px-2.5 pb-2">
          {(["portrait", "a1", "a2", "a3"] as const).map((n, i) => (
            <div key={n} className="flex w-[50px] flex-col items-center gap-0.5">
              <Avatar niche={niche} name={n} size={42} ring={i > 0} />
              <span className="w-full truncate text-center text-[9px]">
                {i === 0 ? "Your story" : niche.accounts[i - 1]}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 px-2.5 py-2">
          <Avatar niche={niche} name="portrait" size={26} />
          <span className="text-[11.5px] font-semibold">{niche.person}</span>
          <Ellipsis size={15} className="ml-auto" />
        </div>
        <div className="relative h-[232px] overflow-hidden bg-subtle-bg">
          <Photo niche={niche} name="a2" className="h-full w-full object-cover" />
          <Heart
            data-post-heart
            size={74}
            fill="white"
            strokeWidth={0}
            className="absolute left-1/2 top-1/2 -ml-[37px] -mt-[37px] drop-shadow-lg"
          />
        </div>
        <div className="flex items-center gap-3 px-2.5 pt-2">
          <span className="relative h-[20px] w-[20px]">
            <Heart size={20} strokeWidth={2} className="absolute inset-0" />
            <Heart
              data-post-liked
              size={20}
              fill="#ff3040"
              strokeWidth={0}
              className="absolute inset-0"
            />
          </span>
          <MessageCircle size={19} strokeWidth={2} />
          <Send size={18} strokeWidth={2} />
          <Bookmark size={19} strokeWidth={2} className="ml-auto" />
        </div>
        <p data-liked-line className="px-2.5 pt-1 text-[11px]">
          Liked by <b className="font-semibold">{niche.handle}</b>
        </p>
        <div className="mt-2 h-[140px] overflow-hidden bg-subtle-bg">
          <Photo niche={niche} name="more2" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="absolute inset-x-[6px] top-[40px] z-30 flex flex-col gap-1.5">
        <NotificationBanner
          niche={niche}
          index={0}
          text="liked your photo."
          action={
            <span className="h-8 w-8 shrink-0 overflow-hidden rounded-md">
              <Photo niche={niche} name="a2" className="h-full w-full object-cover" />
            </span>
          }
        />
        <NotificationBanner
          niche={niche}
          index={1}
          text="started following you."
          action={
            <span className="shrink-0 rounded-lg bg-[#0095f6] p-1.5 text-white">
              <UserPlus size={13} strokeWidth={2.4} />
            </span>
          }
        />
        <TouchDot className="left-[70px] top-[58px]" />
      </div>
      <BottomNav niche={niche} likeBadge />
    </>
  );
}

/* ---------- Step 3: your profile, seen by the visitor ---------- */

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="text-center">
      <div className="text-[13px] font-semibold leading-none">{value}</div>
      <div className="mt-1 text-[10.5px] leading-none text-[#111]">{label}</div>
    </div>
  );
}

export function ProfileScreen({ niche }: { niche: Niche }) {
  const grid: NichePhoto[] = ["main", "more1", "more2", "a1", "a3", "a2"];
  return (
    <>
      <div className="relative z-10 flex items-center gap-1.5 bg-white px-2 pb-2">
        <ChevronLeft size={20} strokeWidth={2.2} />
        <span className="text-[14px] font-semibold">{niche.handle}</span>
        <Ellipsis size={17} className="ml-auto" />
      </div>

      <div data-head className="flex items-center gap-3 px-3 pb-2">
        <Avatar niche={niche} name="main" size={60} ring />
        <div className="flex flex-1 justify-between pr-1">
          <Stat value="184" label="posts" />
          <Stat
            label="followers"
            value={
              <span className="block h-[13px] overflow-hidden">
                <span data-count-roll className="block">
                  <span className="block h-[13px]">2,418</span>
                  <span className="block h-[13px] text-[#0095f6]">2,419</span>
                </span>
              </span>
            }
          />
          <Stat value="312" label="following" />
        </div>
      </div>

      <div data-head className="px-3 pb-2.5">
        <p className="truncate text-[11.5px] font-semibold leading-snug">{niche.profileName}</p>
        <p className="truncate text-[11px] leading-snug text-[#333]">{niche.profileBio}</p>
      </div>

      <div data-head className="relative flex gap-1.5 px-3 pb-3">
        <span
          data-follow
          className="flex h-[28px] flex-1 items-start justify-center overflow-hidden rounded-lg bg-[#0095f6] text-[11.5px] font-semibold text-white"
        >
          <span data-follow-roll className="block text-center">
            <span className="flex h-[28px] items-center justify-center">Follow</span>
            <span className="flex h-[28px] items-center justify-center">Following</span>
          </span>
        </span>
        <span className="flex h-[28px] flex-1 items-center justify-center rounded-lg bg-[#efefef] text-[11.5px] font-semibold">
          Message
        </span>
        <TouchDot className="left-[50px] top-[-2px]" />
      </div>

      <div data-head className="flex gap-3 px-3 pb-2.5">
        {(["a1", "a2", "a3", "more1"] as const).map((n) => (
          <span key={n} className="block rounded-full border border-hairline p-[2px]">
            <Avatar niche={niche} name={n} size={38} />
          </span>
        ))}
      </div>

      <div data-head className="flex justify-around border-t border-hairline py-1.5 text-[#737373]">
        <Grid3x3 size={18} strokeWidth={2} className="text-[#111]" />
        <Clapperboard size={18} strokeWidth={2} />
        <SquareUser size={18} strokeWidth={2} />
      </div>

      <div className="grid grid-cols-3 gap-[2px]">
        {grid.map((n, i) => (
          <div key={i} data-grid-tile className="h-[84px] overflow-hidden bg-subtle-bg">
            <Photo niche={niche} name={n} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <BottomNav niche={niche} />
    </>
  );
}
