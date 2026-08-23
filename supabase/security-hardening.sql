-- Run once in Supabase Dashboard > SQL Editor.
-- This removes the warnings reported by the Security Advisor without changing
-- public image/PDF URLs or the admin dashboard workflow.

-- 1. Inquiries are already authenticated in app/api/inquiries; remove the
-- old anonymous policy from an earlier setup.
drop policy if exists "public insert inquiries" on public.inquiries;
drop policy if exists "Public Insert Inquiries" on public.inquiries;
drop policy if exists "authenticated insert inquiries" on public.inquiries;
create policy "authenticated insert inquiries"
on public.inquiries for insert to authenticated
with check (auth.uid() is not null);

-- 2. Public buckets serve files directly from their public URLs. A SELECT
-- policy is not required and would allow clients to list every object.
drop policy if exists "public read school media" on storage.objects;

-- 3. Trigger functions must stay SECURITY DEFINER, but must not be callable
-- through the Data API.
revoke all on function public.handle_new_user() from public, anon, authenticated;
revoke all on function public.rls_auto_enable() from public, anon, authenticated;

-- 4. Move the RLS helper out of the API-exposed schema. Existing policies are
-- recreated to use the private helper, then the old public helper is disabled.
create schema if not exists private;
create or replace function private.is_school_admin()
returns boolean
language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'school_admin'); $$;

revoke all on function private.is_school_admin() from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.is_school_admin() to authenticated;

drop policy if exists "profiles admin read" on public.profiles;
drop policy if exists "admin read inquiries" on public.inquiries;
drop policy if exists "admin write notices" on public.notices;
drop policy if exists "admin write staffs" on public.staffs;
drop policy if exists "admin write hero" on public.hero_slides;
drop policy if exists "admin write events" on public.events;
drop policy if exists "admin write school media" on storage.objects;
drop policy if exists "admin update school media" on storage.objects;
drop policy if exists "admin delete school media" on storage.objects;

create policy "profiles admin read" on public.profiles for select to authenticated using (private.is_school_admin());
create policy "admin read inquiries" on public.inquiries for select to authenticated using (private.is_school_admin());
create policy "admin write notices" on public.notices for all to authenticated using (private.is_school_admin()) with check (private.is_school_admin());
create policy "admin write staffs" on public.staffs for all to authenticated using (private.is_school_admin()) with check (private.is_school_admin());
create policy "admin write hero" on public.hero_slides for all to authenticated using (private.is_school_admin()) with check (private.is_school_admin());
create policy "admin write events" on public.events for all to authenticated using (private.is_school_admin()) with check (private.is_school_admin());
create policy "admin write school media" on storage.objects for insert to authenticated with check (bucket_id = 'school-media' and private.is_school_admin());
create policy "admin update school media" on storage.objects for update to authenticated using (bucket_id = 'school-media' and private.is_school_admin()) with check (bucket_id = 'school-media' and private.is_school_admin());
create policy "admin delete school media" on storage.objects for delete to authenticated using (bucket_id = 'school-media' and private.is_school_admin());

-- The old helper is no longer used by project policies. Disable its API access.
revoke all on function public.is_school_admin() from public, anon, authenticated;
