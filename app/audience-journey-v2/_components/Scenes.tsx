/* eslint-disable @next/next/no-img-element -- small decorative images inside an animated mockup */
import type { ReactNode } from "react";
import {
  ChevronDown,
  Clapperboard,
  Grid3x3,
  Heart,
  House,
  Menu,
  Search,
  Send,
  SquarePlus,
  SquareUser,
  UserPlus,
} from "lucide-react";
import { photo, type Niche, type NichePhoto } from "../data";
import type { Person } from "./crowd";

export const FACE = 34;
export const ROW_AVATAR = 32;

/** Instagram's grey default avatar, for accounts without a photo. */
function DefaultAvatar({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      aria-hidden
      className="block rounded-full"
    >
      <rect width="40" height="40" fill="#dbdbdb" />
      <circle cx="20" cy="16" r="7" fill="#fff" />
      <path d="M6 38c1.6-8 7.4-12 14-12s12.4 4 14 12z" fill="#fff" />
    </svg>
  );
}

export function Face({ person, size }: { person: Person; size: number }) {
  return (
    <span
      className="block overflow-hidden rounded-full bg-subtle-bg"
      style={{ width: size, height: size }}
    >
      {person.src ? (
        <img
          src={person.src}
          alt=""
          draggable={false}
          className={`h-full w-full object-cover ${person.src.includes("portrait") ? "scale-[1.12]" : ""}`}
        />
      ) : (
        <DefaultAvatar size={size} />
      )}
    </span>
  );
}

function Img({
  niche,
  name,
  className,
}: {
  niche: Niche;
  name: NichePhoto | "map";
  className: string;
}) {
  const src =
    name === "map"
      ? `/audiences/journey-v2/${niche.id}/map.webp`
      : photo(niche.id, name);
  return <img src={src} alt="" draggable={false} className={className} />;
}

/* ---------- 01 Find your audience ---------- */

function Phase({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div data-phase className="overflow-hidden">
      <div data-phase-inner className="border-b border-hairline py-3.5">
        <p className="mb-2 text-[11.5px] font-semibold text-ink">{label}</p>
        {children}
      </div>
    </div>
  );
}

export function AudienceCard({
  niche,
  people,
}: {
  niche: Niche;
  people: Person[];
}) {
  const rows = [people.slice(0, 7), people.slice(7)];
  return (
    <div
      data-card
      className="absolute left-1/2 top-[64px] -ml-[160px] w-[320px] rounded-[22px] border border-action/40 bg-white px-5 pb-5 pt-[18px] shadow-[0_24px_50px_-34px_rgba(61,53,122,0.6)]"
    >
      <p className="text-[11px] font-medium text-action">
        An example of who we’d look for
      </p>
      <p className="mt-1 border-b border-hairline pb-3.5 text-[20px] font-semibold leading-tight -tracking-[0.02em] text-ink">
        {niche.example}
      </p>

      <Phase label="Interested in">
        <div className="flex flex-wrap gap-1.5">
          {niche.interests.map((x) => (
            <span
              key={x}
              data-pop
              className="rounded-full bg-action-tint-bg px-2.5 py-1 text-[10.5px] font-medium text-action-active"
            >
              {x}
            </span>
          ))}
        </div>
      </Phase>

      <Phase label="Where">
        <div
          data-pop
          className="h-[64px] overflow-hidden rounded-xl bg-subtle-bg"
        >
          <Img
            niche={niche}
            name="map"
            className="h-full w-full object-cover"
          />
        </div>
        <p data-pop className="mt-1.5 text-[10.5px] text-secondary">
          {niche.place}
        </p>
      </Phase>

      <Phase label="Accounts to explore">
        <div className="grid grid-cols-3 gap-2">
          {niche.accounts.map((a, i) => (
            <div key={a} data-pop>
              <div className="h-[58px] overflow-hidden rounded-lg bg-subtle-bg">
                <Img
                  niche={niche}
                  name={(["a1", "a2", "a3"] as const)[i]}
                  className="h-full w-full object-cover"
                />
              </div>
              <p className="mt-1 line-clamp-2 text-[9.5px] leading-tight text-ink">
                {a}
              </p>
            </div>
          ))}
        </div>
      </Phase>

      <div className="pt-3.5">
        <div className="mb-2.5 flex items-center justify-between">
          <p className="text-[11.5px] font-semibold text-ink">
            People we’d look for
          </p>
          <p className="font-mono text-[10.5px] text-secondary">
            <span data-remaining>14</span> people
          </p>
        </div>
        {rows.map((row, r) => (
          <div
            key={r}
            className={`flex gap-1 ${r === 1 ? "mt-1.5 pl-[19px]" : ""}`}
          >
            {row.map((p) => (
              <span
                key={p.key}
                data-face
                data-key={p.key}
                data-drop={p.drop ?? "keep"}
                className="block rounded-full"
              >
                <Face person={p} size={FACE} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 02 Reach out ---------- */

export function ReachOut({ kept }: { kept: Person[] }) {
  return (
    <div data-s2 className="absolute inset-x-0 top-[70px]">
      <p
        data-s2-title
        className="text-center text-[27px] font-semibold leading-[1.1] -tracking-[0.03em] text-ink"
      >
        Your Brand Manager
        <br />
        reaches out.
      </p>

      <div className="mt-9 flex flex-col items-center gap-2.5">
        {kept.map((p) => (
          <div
            key={p.key}
            data-row
            className="flex h-[50px] w-[260px] items-center gap-2.5 rounded-2xl border border-hairline bg-white pl-2.5 pr-2 shadow-[0_10px_22px_-16px_rgba(34,31,27,0.5)]"
          >
            <span data-row-avatar>
              <Face person={p} size={ROW_AVATAR} />
            </span>
            <span className="flex-1 truncate text-[13.5px] font-medium text-ink">
              {p.name}
            </span>
            <Heart
              data-heart
              size={16}
              fill="#ff3040"
              strokeWidth={0}
              className="shrink-0"
            />
            <span
              data-follow-btn
              className="relative block h-[28px] w-[78px] shrink-0"
            >
              <span
                data-state-follow
                className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#0095f6] text-[11px] font-semibold text-white"
              >
                Follow
              </span>
              <span
                data-state-following
                className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#efefef] text-[11px] font-semibold text-ink"
              >
                Following
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- 03 Get discovered ---------- */

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="text-center">
      <div className="text-[13px] font-semibold leading-none">{value}</div>
      <div className="mt-1 text-[10.5px] leading-none">{label}</div>
    </div>
  );
}

export const FOLLOWER_START = 2418;
const LINE = 13;

export function ProfilePhone({
  niche,
  kept,
}: {
  niche: Niche;
  kept: Person[];
}) {
  const grid: NichePhoto[] = ["main", "more1", "more2", "a1", "a3", "a2"];
  const counts = kept.map((_, i) => FOLLOWER_START + i + 1);
  return (
    <>
      <p
        data-s3-title
        className="absolute inset-x-0 top-[70px] text-center text-[27px] font-semibold leading-[1.1] -tracking-[0.03em] text-ink"
      >
        They discover your profile
        <br />
        and follow you.
      </p>
      <div
        data-phone
        className="absolute left-1/2 top-[146px] -ml-[134px] h-[556px] w-[268px] rounded-[44px] bg-[#16141c] p-[7px] shadow-[0_34px_60px_-28px_rgba(61,53,122,0.65),inset_0_0_0_1.5px_rgba(255,255,255,0.14)]"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[37px] bg-white text-[#111]">
          <div className="flex h-[38px] items-center justify-between px-6 pt-1 text-[11px] font-semibold">
            <span>9:41</span>
            <span className="absolute left-1/2 top-2 h-[20px] w-[70px] -translate-x-1/2 rounded-full bg-[#16141c]" />
            <span className="flex items-end gap-[1.5px]">
              {[4, 6, 8, 10].map((h) => (
                <i
                  key={h}
                  className="block w-[2.5px] rounded-[1px] bg-[#111]"
                  style={{ height: h }}
                />
              ))}
              <span className="ml-1 block h-[10px] w-[20px] rounded-[3px] border border-[#111]/50 p-[1.5px]">
                <i className="block h-full w-[75%] rounded-[1px] bg-[#111]" />
              </span>
            </span>
          </div>

          {/* notifications */}
          <div className="absolute inset-x-[7px] top-[42px] z-20">
            {kept.map((p) => (
              <div
                key={p.key}
                data-banner
                className="absolute inset-x-0 top-0 flex items-center gap-2.5 rounded-[18px] border border-black/5 bg-white/90 px-2.5 py-2 shadow-[0_16px_30px_-14px_rgba(34,31,27,0.55)] backdrop-blur-md"
              >
                <Face person={p} size={34} />
                <div className="min-w-0 flex-1 leading-tight">
                  <p className="flex justify-between text-[10.5px] font-semibold">
                    Instagram{" "}
                    <span className="font-normal text-[#8e8e8e]">now</span>
                  </p>
                  <p className="truncate text-[11px]">
                    <b className="font-semibold">{p.name}</b> started following
                    you.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1 px-3.5 pb-2.5 pt-1">
            <span className="text-[15px] font-semibold">{niche.handle}</span>
            <ChevronDown size={14} strokeWidth={2.4} />
            <SquarePlus size={19} strokeWidth={2} className="ml-auto" />
            <Menu size={20} strokeWidth={2} className="ml-3" />
          </div>

          <div className="flex items-center gap-4 px-3.5">
            <span className="block h-[62px] w-[62px] shrink-0 overflow-hidden rounded-full">
              <Img
                niche={niche}
                name="main"
                className="h-full w-full object-cover"
              />
            </span>
            <div className="flex flex-1 justify-between pr-1">
              <Stat value="184" label="posts" />
              <Stat
                label="followers"
                value={
                  <span
                    className="block overflow-hidden"
                    style={{ height: LINE }}
                  >
                    <span data-count className="block">
                      {[FOLLOWER_START, ...counts].map((n) => (
                        <span
                          key={n}
                          className="block"
                          style={{ height: LINE }}
                        >
                          {n.toLocaleString("en-US")}
                        </span>
                      ))}
                    </span>
                  </span>
                }
              />
              <Stat value="312" label="following" />
            </div>
          </div>

          <div className="px-3.5 pt-2.5">
            <p className="truncate text-[11.5px] font-semibold">
              {niche.profileName}
            </p>
            <p className="truncate text-[11px] text-[#333]">
              {niche.profileBio}
            </p>
          </div>

          <div className="flex gap-1.5 px-3.5 pt-3">
            <span className="flex h-[28px] flex-1 items-center justify-center rounded-lg bg-[#efefef] text-[11px] font-semibold">
              Edit profile
            </span>
            <span className="flex h-[28px] flex-1 items-center justify-center rounded-lg bg-[#efefef] text-[11px] font-semibold">
              Share profile
            </span>
            <span className="flex h-[28px] w-[30px] items-center justify-center rounded-lg bg-[#efefef]">
              <UserPlus size={13} strokeWidth={2.2} />
            </span>
          </div>

          <div className="flex gap-3.5 px-3.5 pt-3">
            {(["a1", "a2", "a3", "more1"] as const).map((n, i) => (
              <div
                key={n}
                className="flex w-[46px] flex-col items-center gap-1"
              >
                <span className="block rounded-full border border-hairline p-[2px]">
                  <span className="block h-[40px] w-[40px] overflow-hidden rounded-full">
                    <Img
                      niche={niche}
                      name={n}
                      className="h-full w-full object-cover"
                    />
                  </span>
                </span>
                <span className="w-full truncate text-center text-[9px]">
                  {["New", "Work", "Behind", "Reviews"][i]}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-2.5 flex justify-around border-t border-hairline py-1.5 text-[#737373]">
            <Grid3x3 size={18} strokeWidth={2} className="text-[#111]" />
            <Clapperboard size={18} strokeWidth={2} />
            <SquareUser size={18} strokeWidth={2} />
          </div>

          <div className="grid grid-cols-3 gap-[2px]">
            {grid.map((n, i) => (
              <div key={i} className="h-[84px] overflow-hidden bg-subtle-bg">
                <Img
                  niche={niche}
                  name={n}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 border-t border-hairline bg-white pb-[14px] pt-2">
            <div className="flex items-center justify-around">
              <House size={20} strokeWidth={2} />
              <Search size={20} strokeWidth={2} />
              <Send size={19} strokeWidth={2} />
              <Clapperboard size={20} strokeWidth={2} />
              <span className="block h-[21px] w-[21px] overflow-hidden rounded-full ring-1 ring-[#111] ring-offset-1">
                <Img
                  niche={niche}
                  name="main"
                  className="h-full w-full object-cover"
                />
              </span>
            </div>
            <span className="absolute bottom-[4px] left-1/2 h-[3px] w-[84px] -translate-x-1/2 rounded-full bg-[#111]" />
          </div>
        </div>
      </div>
    </>
  );
}

export const COUNT_LINE = LINE;
