-- Run this in Supabase SQL Editor before connecting the application.
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  email text unique not null,
  role text check (role in ('school_admin', 'public_user')) not null default 'public_user',
  created_at timestamptz default now()
);

create table if not exists public.notices (
  id uuid default gen_random_uuid() primary key,
  title_ne text not null,
  title_en text,
  description_ne text,
  description_en text,
  pdf_url text not null,
  date_published date not null default current_date,
  created_at timestamptz default now()
);

create table if not exists public.staffs (
  id uuid default gen_random_uuid() primary key,
  name_ne text not null,
  name_en text not null,
  designation_ne text not null,
  designation_en text not null,
  department text not null,
  phone text,
  email text,
  photo_url text,
  display_order integer not null default 0,
  created_at timestamptz default now()
);

create table if not exists public.hero_slides (
  id uuid default gen_random_uuid() primary key,
  image_url text not null,
  display_order integer not null default 0,
  created_at timestamptz default now()
);

create table if not exists public.events (
  id uuid default gen_random_uuid() primary key,
  title_ne text not null,
  title_en text,
  description_ne text,
  description_en text,
  event_date date not null,
  image_url text,
  created_at timestamptz default now()
);

-- Safe migration for projects where the events table was already created.
alter table public.events add column if not exists description_ne text;
alter table public.events add column if not exists description_en text;

create table if not exists public.inquiries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  phone text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Profile rows are automatically created. User-controlled metadata can never set an admin role.
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', split_part(new.email, '@', 1)), new.email, 'public_user');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- Keep the RLS helper out of the API-exposed public schema.
create schema if not exists private;
create or replace function private.is_school_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'school_admin'); $$;

revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function private.is_school_admin() from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.is_school_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.notices enable row level security;
alter table public.staffs enable row level security;
alter table public.hero_slides enable row level security;
alter table public.events enable row level security;
alter table public.inquiries enable row level security;

-- Remove only the policies from a previous run if you are rerunning this script.
drop policy if exists "profiles own read" on public.profiles;
drop policy if exists "profiles admin read" on public.profiles;
drop policy if exists "public select notices" on public.notices;
drop policy if exists "public select staffs" on public.staffs;
drop policy if exists "public select hero" on public.hero_slides;
drop policy if exists "public select events" on public.events;
drop policy if exists "public insert inquiries" on public.inquiries;
drop policy if exists "admin read inquiries" on public.inquiries;
drop policy if exists "admin write notices" on public.notices;
drop policy if exists "admin write staffs" on public.staffs;
drop policy if exists "admin write hero" on public.hero_slides;
drop policy if exists "admin write events" on public.events;

create policy "profiles own read" on public.profiles for select to authenticated using (id = auth.uid());
create policy "profiles admin read" on public.profiles for select to authenticated using (private.is_school_admin());
create policy "public select notices" on public.notices for select using (true);
create policy "public select staffs" on public.staffs for select using (true);
create policy "public select hero" on public.hero_slides for select using (true);
create policy "public select events" on public.events for select using (true);
create policy "authenticated insert inquiries" on public.inquiries for insert to authenticated with check (auth.uid() is not null);
create policy "admin read inquiries" on public.inquiries for select to authenticated using (private.is_school_admin());
create policy "admin write notices" on public.notices for all to authenticated using (private.is_school_admin()) with check (private.is_school_admin());
create policy "admin write staffs" on public.staffs for all to authenticated using (private.is_school_admin()) with check (private.is_school_admin());
create policy "admin write hero" on public.hero_slides for all to authenticated using (private.is_school_admin()) with check (private.is_school_admin());
create policy "admin write events" on public.events for all to authenticated using (private.is_school_admin()) with check (private.is_school_admin());

-- Public media storage for notice PDFs and staff / event imagery.
insert into storage.buckets (id, name, public) values ('school-media', 'school-media', true) on conflict (id) do update set public = true;
drop policy if exists "admin write school media" on storage.objects;
drop policy if exists "admin update school media" on storage.objects;
drop policy if exists "admin delete school media" on storage.objects;
create policy "admin write school media" on storage.objects for insert to authenticated with check (bucket_id = 'school-media' and private.is_school_admin());
create policy "admin update school media" on storage.objects for update to authenticated using (bucket_id = 'school-media' and private.is_school_admin()) with check (bucket_id = 'school-media' and private.is_school_admin());
create policy "admin delete school media" on storage.objects for delete to authenticated using (bucket_id = 'school-media' and private.is_school_admin());

-- After creating your first Supabase Auth user in Authentication > Users, promote that user:
-- update public.profiles set role = 'school_admin' where email = 'principal@example.com';

-- Run this additional migration in Supabase SQL Editor to enable Program Manager.
create table if not exists public.programs (
  id uuid default gen_random_uuid() primary key,
  level text not null,
  title_en text not null,
  title_ne text not null,
  description_en text not null,
  description_ne text not null,
  highlights text not null default '',
  display_order integer not null default 0,
  created_at timestamptz default now()
);
alter table public.programs enable row level security;
drop policy if exists "public select programs" on public.programs;
drop policy if exists "admin write programs" on public.programs;
create policy "public select programs" on public.programs for select using (true);
create policy "admin write programs" on public.programs for all to authenticated using (private.is_school_admin()) with check (private.is_school_admin());

insert into public.programs (level, title_en, title_ne, description_en, description_ne, highlights, display_order)
select * from (values
  ('Grades 1-8', 'Primary level', 'प्राथमिक तह', 'Strong foundations through creative, practical learning.', 'सिर्जनशील र व्यावहारिक सिकाइमार्फत बलियो आधार।', 'Foundational literacy and numeracy|Creative arts and physical education|Project-based exploration', 1),
  ('Grades 9-10', 'Secondary level', 'माध्यमिक तह', 'SEE-focused academics with practical labs and student clubs.', 'प्रयोगशाला र विद्यार्थी क्लबसहित SEE केन्द्रित अध्ययन।', 'SEE-aligned learning|Practical labs and student clubs|Career guidance and counselling', 2),
  ('Grades 11-12', '+2 Management', '+२ व्यवस्थापन', 'Business, economics and digital commerce skills.', 'व्यवसाय, अर्थशास्त्र र डिजिटल वाणिज्य सीप।', 'Business studies and economics|Entrepreneurship exposure|Digital skills for commerce', 3),
  ('Grades 11-12', '+2 Science', '+२ विज्ञान', 'Lab-led science learning and university preparation.', 'प्रयोगशाला केन्द्रित विज्ञान र विश्वविद्यालय तयारी।', 'Physics, chemistry, biology and maths|Laboratory-led inquiry|University preparation support', 4)
) as seed(level, title_en, title_ne, description_en, description_ne, highlights, display_order)
where not exists (select 1 from public.programs);


