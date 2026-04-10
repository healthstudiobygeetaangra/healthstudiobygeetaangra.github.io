create table if not exists webinar_leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  phone text,
  city text,
  health_goal text,
  amount numeric default 249,
  payment_status text default 'pending',
  created_at timestamp default now()
);
