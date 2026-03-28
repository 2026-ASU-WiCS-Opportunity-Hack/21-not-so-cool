create extension if not exists pgcrypto;
create extension if not exists vector;

-- Chapters
create table chapters (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  region text,
  contact_email text,
  description text,
  hero_image_url text,
  created_at timestamptz default now()
);

-- Coaches
create table coaches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete set null,
  chapter_id uuid references chapters(id) on delete set null,
  full_name text not null,
  email text,
  bio text,
  photo_url text,
  cert_level text check (cert_level in ('CALC','PALC','SALC','MALC')),
  location text,
  is_approved boolean default false,
  embedding vector(1536),
  created_at timestamptz default now()
);

-- Payments
create table payments (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid references chapters(id),
  coach_id uuid references coaches(id),
  payment_type text check (payment_type in ('enrollment','certification')),
  amount_usd integer not null,
  stripe_session_id text,
  status text default 'pending' check (status in ('pending','paid','failed')),
  paid_at timestamptz,
  created_at timestamptz default now()
);

-- Semantic search function
create or replace function search_coaches(
  query_embedding vector(1536),
  match_threshold float default 0.3,
  match_count int default 10
)
returns table (
  id uuid, full_name text, bio text, cert_level text,
  location text, photo_url text, chapter_id uuid, similarity float
)
language sql stable as $$
  select c.id, c.full_name, c.bio, c.cert_level,
    c.location, c.photo_url, c.chapter_id,
    1 - (c.embedding <=> query_embedding) as similarity
  from coaches c
  where c.is_approved = true
    and c.embedding is not null
    and 1 - (c.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;