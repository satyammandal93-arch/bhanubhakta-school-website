"use client";

import { CalendarDays } from "lucide-react";
import type { SchoolEvent } from "@/types/school";
import { useLanguage } from "@/components/language-provider";

export function EventsGrid({ events, limit }: { events: SchoolEvent[]; limit?: number }) {
  const { language } = useLanguage();
  const visibleEvents = limit ? events.slice(0, limit) : events;
  if (visibleEvents.length === 0) return <div className="empty-state">{language === "ne" ? "अहिले कुनै कार्यक्रम प्रकाशित गरिएको छैन।" : "No events are published right now."}</div>;
  return <div className="events-grid">{visibleEvents.map((event) => {
    const eventTitle = language === "ne" ? event.title_ne : event.title_en || event.title_ne;
    const eventDescription = language === "ne" ? event.description_ne : event.description_en || event.description_ne;
    return <article className="event-card event-card-with-description" key={event.id}>
      <div className="event-image-wrap"><img src={event.image_url || "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=750&q=85"} alt={eventTitle}/></div>
      <div className="event-card-content"><p className="event-date"><CalendarDays size={14}/>{new Date(event.event_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p><h3>{eventTitle}</h3>{eventDescription && <p className="event-description">{eventDescription}</p>}</div>
    </article>;
  })}</div>;
}
