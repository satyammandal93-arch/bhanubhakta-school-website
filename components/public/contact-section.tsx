"use client";

import { LoaderCircle, Mail, MapPin, Phone } from "lucide-react";
import { FormEvent, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { Toast, useToast } from "@/components/ui/toast";
import { createClient } from "@/lib/supabase/client";

export function ContactSection() {
  const { language } = useLanguage(); const { toast, showToast, closeToast } = useToast(); const [pending, setPending] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Keep the form element before the first await. React clears event targets
    // after async work, which otherwise makes FormData(event.currentTarget) fail.
    const formElement = event.currentTarget;
    const supabase = createClient(); const { data: { session } } = await supabase?.auth.getSession() || { data: { session: null } };
    if (!session) { window.location.assign("/login"); return; }
    setPending(true); const form = new FormData(formElement);
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify(Object.fromEntries(form)) });
      const result = await response.json(); if (!response.ok) throw new Error(result.error || "Unable to submit inquiry.");
      formElement.reset(); showToast("Inquiry Submitted Successfully", "success");
    } catch (error) { showToast(error instanceof Error ? error.message : "Submission failed. Database connection error.", "error"); } finally { setPending(false); }
  }
  return <section className="content-section container"><div className="contact-grid"><aside className="contact-details"><h2>{language === "ne" ? "हामीलाई सम्पर्क गर्नुहोस्" : "Let’s talk"}</h2><p><MapPin size={20}/><span>Bhanubhakta Secondary School<br/>C8JW+6RQ, Unnamed Road, Majhare 56600, Nepal</span></p><p><Phone size={20}/><span>+977 9805308789</span></p><p><Mail size={20}/><span>bhanubhaktaschooljahada5@gmail.com<br/>mandalmahesh650@gmail.com</span></p><div className="map-embed"><iframe title="Bhanubhakta Secondary School location" src="https://maps.google.com/maps?q=C8JW%2B6RQ%2C%20Unnamed%20Road%2C%20Majhare%2056600%2C%20Nepal&z=17&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/></div></aside><form className="contact-form" onSubmit={submit}><h2>{language === "ne" ? "जिज्ञासा पठाउनुहोस्" : "Send an inquiry"}</h2><div className="form-grid"><label className="form-label">{language === "ne" ? "नाम" : "Name"}<input required name="name" className="field"/></label><label className="form-label">{language === "ne" ? "फोन" : "Phone"}<input required name="phone" className="field" type="tel"/></label><label className="form-label">{language === "ne" ? "इमेल" : "Email"}<input required name="email" className="field" type="email"/></label><label className="form-label full">{language === "ne" ? "सन्देश" : "Message"}<textarea required name="message" className="field"/></label></div><button className="btn" disabled={pending}>{pending && <LoaderCircle size={16} className="animate-spin"/>}{language === "ne" ? "पठाउनुहोस्" : "Send inquiry"}</button><p className="inline-note">{language === "ne" ? "जिज्ञासा पठाउन लगइन आवश्यक छ।" : "You need to sign in before sending an inquiry."}</p></form></div>{toast && <Toast {...toast} onClose={closeToast}/>}</section>;
}

