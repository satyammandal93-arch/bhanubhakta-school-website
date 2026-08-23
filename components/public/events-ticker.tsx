"use client";

import { CalendarDays } from "lucide-react";
import type { SchoolEvent } from "@/types/school";
import { useLanguage } from "@/components/language-provider";

export function EventsTicker({ events }: { events: SchoolEvent[] }) { const { language } = useLanguage(); return <div className="event-rail">{[...events, ...events].map((event, index) => <article className="event-card" key={`${event.id}-${index}`}><img src={event.image_url || "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=750&q=85"} alt=""/><div><p><CalendarDays size={14}/>{new Date(event.event_date).toLocaleDateString("en-GB", {day:"numeric", month:"short", year:"numeric"})}</p><h3>{language === "ne" ? event.title_ne : event.title_en || event.title_ne}</h3></div></article>)}</div>; }
