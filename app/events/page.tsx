import { PageIntro } from "@/components/public/page-intro";
import { EventsGrid } from "@/components/public/events-grid";

export const dynamic = "force-dynamic";
export const revalidate = 0;
import { getEvents } from "@/lib/school-data";

export default async function EventsPage() {
  const events = await getEvents();
  return <><PageIntro eyebrow="SCHOOL LIFE" titleEn="Events that bring learning to life." titleNe="सिकाइलाई जीवन्त बनाउने कार्यक्रमहरू।" copyEn="Explore our academic, creative, sporting and community moments." copyNe="हाम्रा शैक्षिक, सिर्जनात्मक, खेलकुद र सामुदायिक गतिविधिहरू हेर्नुहोस्।"/><section className="content-section"><div className="container"><EventsGrid events={events}/></div></section></>;
}
