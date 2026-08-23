import type { Program } from "@/types/program";

export const demoPrograms: Program[] = [
  { id: "p1", level: "Grades 1–8", title_en: "Primary level", title_ne: "प्राथमिक तह", description_en: "Strong foundations through creative, practical learning.", description_ne: "सिर्जनशील र व्यावहारिक सिकाइमार्फत बलियो आधार।", highlights: "Foundational literacy and numeracy|Creative arts and physical education|Project-based exploration", display_order: 1 },
  { id: "p2", level: "Grades 9–10", title_en: "Secondary level", title_ne: "माध्यमिक तह", description_en: "SEE-focused academics with practical labs and student clubs.", description_ne: "प्रयोगशाला र विद्यार्थी क्लबसहित SEE केन्द्रित अध्ययन।", highlights: "SEE-aligned learning|Practical labs and student clubs|Career guidance and counselling", display_order: 2 },
  { id: "p3", level: "Grades 11–12", title_en: "+2 Management", title_ne: "+२ व्यवस्थापन", description_en: "Business, economics and digital commerce skills.", description_ne: "व्यवसाय, अर्थशास्त्र र डिजिटल वाणिज्य सीप।", highlights: "Business studies and economics|Entrepreneurship exposure|Digital skills for commerce", display_order: 3 },
  { id: "p4", level: "Grades 11–12", title_en: "+2 Science", title_ne: "+२ विज्ञान", description_en: "Lab-led science learning and university preparation.", description_ne: "प्रयोगशाला केन्द्रित विज्ञान र विश्वविद्यालय तयारी।", highlights: "Physics, chemistry, biology and maths|Laboratory-led inquiry|University preparation support", display_order: 4 },
];
