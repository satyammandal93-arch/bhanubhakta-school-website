import { demoEvents, demoNotices, demoSlides, demoStaff } from "@/lib/content";
import { createServerClient } from "@/lib/supabase/server";
import type { HeroSlide, Notice, SchoolEvent, StaffMember } from "@/types/school";

async function readCollection<T>(table: string, fallback: T[], order = "created_at") {
  const supabase = createServerClient();
  if (!supabase) return fallback;
  const { data, error } = await supabase.from(table).select("*").order(order, { ascending: table === "notices" ? false : true });
  return error || !data?.length ? fallback : (data as T[]);
}

export const getNotices = () => readCollection<Notice>("notices", demoNotices, "date_published");
export const getStaff = () => readCollection<StaffMember>("staffs", demoStaff, "display_order");
export async function getHeroSlides() {
  const slides = await readCollection<HeroSlide>("hero_slides", demoSlides, "display_order");
  // Older dashboard records can contain an empty image_url. Never allow one
  // invalid record to replace the working slider with a blank hero.
  const usableSlides = slides.filter((slide) => typeof slide.image_url === "string" && /^https?:\/\//.test(slide.image_url.trim()));
  return usableSlides.length ? usableSlides : demoSlides;
}
export const getEvents = () => readCollection<SchoolEvent>("events", demoEvents, "event_date");

