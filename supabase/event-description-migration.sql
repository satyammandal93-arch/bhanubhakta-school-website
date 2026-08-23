-- Run once in Supabase Dashboard > SQL Editor.
-- Adds optional bilingual descriptions to existing event records.
alter table public.events add column if not exists description_ne text;
alter table public.events add column if not exists description_en text;
