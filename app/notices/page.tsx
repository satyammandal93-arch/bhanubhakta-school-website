import { NoticesDirectory } from "@/components/public/notices-directory";
import { PageIntro } from "@/components/public/page-intro";
import { getNotices } from "@/lib/school-data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NoticesPage() { const notices = await getNotices(); return <><PageIntro eyebrow="NOTICE BOARD" titleEn="Stay informed." titleNe="जानकारीमा रहनुहोस्।" copyEn="Search announcements, academic information and school updates from one place." copyNe="सूचना, शैक्षिक जानकारी र विद्यालय अपडेटहरू एकै ठाउँमा खोज्नुहोस्।"/><section className="content-section container"><NoticesDirectory notices={notices}/></section></>; }
