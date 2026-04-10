create table if not exists webinar_events (
  id uuid primary key default gen_random_uuid(),
  title text,
  webinar_date date,
  webinar_time text,
  duration text,
  speaker_name text,
  meeting_link text,
  banner_image text,
  is_active boolean default true,
  created_at timestamp default now()
);
