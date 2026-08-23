"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { HeroSlide } from "@/types/school";

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const usableSlides = slides.filter((slide) => /^https?:\/\//.test(slide.image_url?.trim() || ""));
  const [active, setActive] = useState(0);
  const previous = () => setActive((current) => (current - 1 + usableSlides.length) % usableSlides.length);
  const next = () => setActive((current) => (current + 1) % usableSlides.length);
  useEffect(() => { const timer = setInterval(next, 5000); return () => clearInterval(timer); }, [usableSlides.length]);
  if (!usableSlides.length) return null;
  const slide = usableSlides[Math.min(active, usableSlides.length - 1)];
  return <section className="hero-outer" aria-label="School photo gallery"><div className="hero"><AnimatePresence mode="wait"><motion.div key={slide.id} className="hero-image" style={{ backgroundImage: `url(${slide.image_url})` }} initial={{ opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .75, ease: "easeOut" }} /></AnimatePresence><div className="hero-shade"/><button type="button" className="hero-arrow hero-arrow-left" onClick={previous} aria-label="Previous image"><ChevronLeft size={28}/></button><button type="button" className="hero-arrow hero-arrow-right" onClick={next} aria-label="Next image"><ChevronRight size={28}/></button><div className="hero-dots">{usableSlides.map((currentSlide, index) => <button key={currentSlide.id} className={active === index ? "selected" : ""} onClick={() => setActive(index)} aria-label={`Show image ${index + 1}`}/>)}</div></div></section>;
}
