import Link from "next/link";
import { ArrowRight, FileText, Quote } from "lucide-react";
import { LocalizedText } from "@/components/language-provider";
import { EventsGrid } from "@/components/public/events-grid";

// Admin content, especially hero photos, should be fetched anew on each visit.
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { HeroSlider } from "@/components/public/hero-slider";
import { Stats } from "@/components/public/stats";
import { getEvents, getHeroSlides, getNotices } from "@/lib/school-data";

export default async function Home() {
 const [slides, notices, events] = await Promise.all([getHeroSlides(), getNotices(), getEvents()]);
 return <>
  <HeroSlider slides={slides}/>
  <section className="welcome container section-grid"><div><p className="eyebrow">EST. B.S. 2052 · JAHADA-5, MORANG, NEPAL</p><LocalizedText as="h1" en="Where bright futures take root." ne="जहाँ उज्याला भविष्यले जरा गाड्छ।"/><LocalizedText as="p" className="lead" en="Bhanubhakta is a close-knit school community where character, curiosity and confident learning grow together." ne="भानुभक्त एउटा आत्मीय विद्यालय परिवार हो, जहाँ चरित्र, जिज्ञासा र आत्मविश्वासी सिकाइ सँगसँगै हुर्कन्छ।"/><Link className="text-link" href="/about"><LocalizedText en="Discover our story" ne="हाम्रो कथा जान्नुहोस्"/><ArrowRight size={17}/></Link></div><div className="welcome-image"><img src="/images/check1.png" alt="Teacher helping students in class"/></div></section>
  <Stats/>
  <section className="container section"><div className="section-heading"><div><p className="eyebrow">NOTICE BOARD</p><LocalizedText as="h2" en="Latest updates" ne="नवीनतम सूचनाहरू"/></div><Link className="text-link" href="/notices"><LocalizedText en="All notices" ne="सबै सूचनाहरू"/><ArrowRight size={17}/></Link></div><div className="notice-grid">{notices.slice(0,3).map((notice) => <article className="notice-card" key={notice.id}><span>{new Date(notice.date_published).toLocaleDateString("en-GB", {day:"numeric", month:"short", year:"numeric"})}</span><h3>{notice.title_en || notice.title_ne}</h3><p>{notice.description_en || notice.description_ne}</p><a href={notice.pdf_url} target="_blank" rel="noreferrer"><FileText size={16}/> View PDF</a></article>)}{notices.length === 0 && <div className="empty-state"><LocalizedText en="No notices are published right now." ne="अहिले कुनै सूचना प्रकाशित गरिएको छैन।"/></div>}</div></section>
  <section className="principal-band"><div className="container principal-grid"><img src="images/check2.png" alt="Principal Mahesh Kumar Mandal"/><div><Quote className="quote"/><LocalizedText as="h2" en="A message from the Principal" ne="प्रधानाध्यापकको सन्देश"/><LocalizedText as="p" en="Every child arrives with potential. Our role is to make school a place where that potential feels seen, challenged and supported—every single day." ne="प्रत्येक बालबालिकामा सम्भावना हुन्छ। त्यो सम्भावनालाई हरेक दिन देखिने, चुनौतीपूर्ण र साथ पाउने बनाउनु नै हाम्रो भूमिका हो।"/><div className="signature">महेश कुमार मण्डल <small>Principal</small></div></div></div></section>
  <section className="section events-section"><div className="container section-surface"><div className="section-heading"><div><p className="eyebrow">LIFE AT BHANUBHAKTA</p><LocalizedText as="h2" en="Recent moments" ne="हालका झलकहरू"/></div><Link className="text-link" href="/events"><LocalizedText en="All events" ne="कार्यक्रमहरू"/><ArrowRight size={17}/></Link></div><EventsGrid events={events} limit={3}/></div></section>
 </>;
}
