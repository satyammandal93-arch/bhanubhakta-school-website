export type Notice = {
  id: string;
  title_ne: string;
  title_en: string | null;
  description_ne?: string | null;
  description_en?: string | null;
  pdf_url: string;
  date_published: string;
};

export type StaffMember = {
  id: string;
  name_ne: string;
  name_en: string;
  designation_ne: string;
  designation_en: string;
  department: string;
  phone?: string | null;
  email?: string | null;
  photo_url?: string | null;
  display_order: number;
};

export type HeroSlide = { id: string; image_url: string; display_order: number };

export type SchoolEvent = {
  id: string;
  title_ne: string;
  title_en: string | null;
  description_ne?: string | null;
  description_en?: string | null;
  event_date: string;
  image_url?: string | null;
};
