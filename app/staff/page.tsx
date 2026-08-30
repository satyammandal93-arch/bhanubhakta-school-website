import { PageIntro } from "@/components/public/page-intro";
import { StaffDirectory } from "@/components/public/staff-directory";
import { getStaff } from "@/lib/school-data";

// Staff records are edited in the admin dashboard, so never serve a build-time
// snapshot of the directory.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StaffPage() { const staff = await getStaff(); return <><PageIntro eyebrow="OUR PEOPLE" titleEn="Meet the people behind the learning." titleNe="सिकाइका पछाडिका व्यक्तिहरूलाई भेट्नुहोस्।" copyEn="Our teachers and staff bring subject expertise, care and high expectations to each school day." copyNe="हाम्रा शिक्षक र कर्मचारीले विषयगत ज्ञान, माया र उच्च अपेक्षासहित हरेक विद्यालय दिनलाई जीवन्त बनाउनुहुन्छ।"/><section className="content-section container"><StaffDirectory staff={staff}/></section></>; }
