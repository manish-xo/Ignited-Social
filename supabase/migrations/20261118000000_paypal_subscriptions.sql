-- A customer's PayPal plan subscription, saved after PayPal confirms payment
-- (app/api/create-subscription). Account creation checks it for an ACTIVE or
-- APPROVED row before making a dashboard login, and the dashboard reads the
-- latest one for the plan and billing details.
create table if not exists public.paypal_subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  signup_id              uuid references public."Signup" (id) on delete set null,
  paypal_subscription_id text not null unique,
  plan                   text,
  status                 text,
  email                  text,
  full_name              text,
  country                text,
  postal_code            text,
  instagram_username     text,
  created_at             timestamptz not null default now()
);

create index if not exists paypal_subscriptions_signup_id_idx
  on public.paypal_subscriptions (signup_id);
create index if not exists paypal_subscriptions_email_idx
  on public.paypal_subscriptions (lower(email));

-- Written and read only by the server with the service role. No public policies.
alter table public.paypal_subscriptions enable row level security;

-- Make the new table visible to the API straight away.
notify pgrst, 'reload schema';
