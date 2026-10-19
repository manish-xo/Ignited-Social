-- One row per time we read a customer's Instagram counts. The dashboard shows
-- the latest row; the history drives total growth and the growth chart.
create table if not exists public.instagram_snapshots (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users (id) on delete cascade,
  username    text not null,
  followers   integer not null,
  following   integer not null,
  posts       integer not null,
  captured_at timestamptz not null default now()
);

create index if not exists instagram_snapshots_user_captured_idx
  on public.instagram_snapshots (user_id, captured_at desc);

-- Read and written only by the server with the service role, like the other
-- tables. No public policies.
alter table public.instagram_snapshots enable row level security;
