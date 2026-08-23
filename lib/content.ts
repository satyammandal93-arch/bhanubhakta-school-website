import type { HeroSlide, Notice, SchoolEvent, StaffMember } from "@/types/school";

export const demoNotices: Notice[] = [
  { id: "n1", title_ne: "शैक्षिक सत्र २०८३ का लागि भर्ना खुला", title_en: "Admissions open for the 2083 academic session", description_ne: "कक्षा नर्सरीदेखि कक्षा १२ सम्म।", description_en: "Nursery through Grade 12 enrolment information.", pdf_url: "/sample-notice.pdf", date_published: "2026-08-12" },
  { id: "n2", title_ne: "पहिलो त्रैमासिक परीक्षाको तालिका", title_en: "First terminal examination routine", description_ne: "सबै तहका लागि परीक्षा तालिका प्रकाशित गरिएको छ।", description_en: "The examination routine is now available for all levels.", pdf_url: "/sample-notice.pdf", date_published: "2026-08-04" },
  { id: "n3", title_ne: "अभिभावक-शिक्षक भेटघाट", title_en: "Parent–teacher meeting", description_ne: "विद्यार्थी प्रगति बारे छलफलका लागि उपस्थित हुनुहोस्।", description_en: "Join us to discuss student progress.", pdf_url: "/sample-notice.pdf", date_published: "2026-07-28" },
  { id: "n4", title_ne: "विद्यालय बस मार्ग अद्यावधिक", title_en: "School bus route update", description_ne: "नयाँ बस समय र मार्गहरू।", description_en: "Updated routes and pickup times.", pdf_url: "/sample-notice.pdf", date_published: "2026-07-18" },
];

export const demoStaff: StaffMember[] = [
  { id: "s1", name_ne: "डा. सविता अधिकारी", name_en: "Dr. Sabita Adhikari", designation_ne: "प्रधानाध्यापक", designation_en: "Principal", department: "Administration", phone: "+977 9812345678", email: "principal@bhanubhakta.edu.np", photo_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&q=85", display_order: 1 },
  { id: "s2", name_ne: "सुरेश कार्की", name_en: "Suresh Karki", designation_ne: "उपप्रधानाध्यापक", designation_en: "Vice Principal", department: "Administration", phone: "+977 9800000002", email: "suresh@bhanubhakta.edu.np", photo_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85", display_order: 2 },
  { id: "s3", name_ne: "अनिता पोखरेल", name_en: "Anita Pokhrel", designation_ne: "विज्ञान संयोजक", designation_en: "Science Coordinator", department: "Science", phone: "+977 9800000003", email: "anita@bhanubhakta.edu.np", photo_url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85", display_order: 3 },
  { id: "s4", name_ne: "विवेक श्रेष्ठ", name_en: "Bibek Shrestha", designation_ne: "भौतिकशास्त्र शिक्षक", designation_en: "Physics Teacher", department: "Science", phone: "+977 9800000004", email: "bibek@bhanubhakta.edu.np", photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85", display_order: 4 },
  { id: "s5", name_ne: "राधा तामाङ", name_en: "Radha Tamang", designation_ne: "प्राथमिक संयोजक", designation_en: "Primary Coordinator", department: "Primary", phone: "+977 9800000005", email: "radha@bhanubhakta.edu.np", photo_url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=85", display_order: 5 },
  { id: "s6", name_ne: "निर्मल गुरुङ", name_en: "Nirmal Gurung", designation_ne: "व्यवस्थापन शिक्षक", designation_en: "Management Teacher", department: "Management", phone: "+977 9800000006", email: "nirmal@bhanubhakta.edu.np", photo_url: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=700&q=85", display_order: 6 },
];

export const demoSlides: HeroSlide[] = [
  { id: "h1", image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=2200&q=90", display_order: 1 },
  { id: "h2", image_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=2200&q=90", display_order: 2 },
  { id: "h3", image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=2200&q=90", display_order: 3 },
];

export const demoEvents: SchoolEvent[] = [
  { id: "e1", title_ne: "विज्ञान प्रदर्शनी २०८३", title_en: "Science Exhibition 2083", description_ne: "विद्यार्थीका सिर्जनात्मक वैज्ञानिक परियोजनाहरूको प्रदर्शनी।", description_en: "A showcase of students’ inventive science projects.", event_date: "2026-08-06", image_url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=750&q=85" },
  { id: "e2", title_ne: "अन्तर सदन खेलकुद", title_en: "Inter-house Sports Meet", description_ne: "खेलकुद र टोलीभावनाको उत्सव।", description_en: "A celebration of sport, teamwork and school spirit.", event_date: "2026-07-24", image_url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=750&q=85" },
  { id: "e3", title_ne: "हाजिरीजवाफ प्रतियोगिता", title_en: "Quiz Competition", description_ne: "जिज्ञासा र ज्ञानलाई प्रेरित गर्ने मैत्रीपूर्ण प्रतिस्पर्धा।", description_en: "A friendly competition that celebrates curiosity and knowledge.", event_date: "2026-07-14", image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=750&q=85" },
];

