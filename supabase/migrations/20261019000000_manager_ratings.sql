-- The customer's 1–5 star rating of their Growth Manager (dashboard).
-- One row per customer; rating again overwrites it.
create table if not exists public.manager_ratings (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  rating     smallint not null check (rating between 1 and 5),
  updated_at timestamptz not null default now()
);

-- Written only by the server with the service role. No public policies.
alter table public.manager_ratings enable row level security;
