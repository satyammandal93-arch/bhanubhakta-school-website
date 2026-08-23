"use client";

import { useEffect, useRef, useState } from "react";
import { LocalizedText } from "@/components/language-provider";

function Count({ value }: { value: number }) { const [number, setNumber] = useState(0); const ref = useRef<HTMLDivElement>(null); useEffect(() => { const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; const start = Date.now(); const timer = setInterval(() => { const elapsed = Math.min((Date.now() - start) / 1200, 1); setNumber(Math.floor(value * elapsed)); if (elapsed === 1) clearInterval(timer); }, 16); observer.disconnect(); }, {threshold: .4}); if (ref.current) observer.observe(ref.current); return () => observer.disconnect(); }, [value]); return <div ref={ref}>{number.toLocaleString()}<span>+</span></div>; }

const stats = [[130, "Students", "विद्यार्थी"], [4, "Teachers", "शिक्षक"], [31, "Years of excellence", "उत्कृष्टताका वर्ष"], [30, "Passed-out batches", "उत्तीर्ण ब्याच"]] as const;
export function Stats() { return <section className="stats-section"><div className="container stats-grid">{stats.map(([value, en, ne]) => <div className="stat" key={en}><Count value={value}/><LocalizedText as="p" en={en} ne={ne}/></div>)}</div></section>; }
