-- Every subscription a customer cancels from the dashboard, with their reason,
-- so the team can see who left, what they cancelled and why.
create table if not exists public.subscription_cancellations (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid references auth.users (id) on delete set null,
  signup_id              uuid references public."Signup" (id) on delete set null,
  paypal_subscription_id text not null,
  kind                   text not null check (kind in ('plan', 'upsell', 'addon')),
  reason                 text,
  created_at             timestamptz not null default now()
);

create index if not exists subscription_cancellations_created_at_idx
  on public.subscription_cancellations (created_at desc);

-- Written and read only by the server with the service role. No public policies.
alter table public.subscription_cancellations enable row level security;

notify pgrst, 'reload schema';
