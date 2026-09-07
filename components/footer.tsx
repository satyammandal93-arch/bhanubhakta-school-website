import Link from "next/link";
import { Globe2, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return <footer className="footer">
    <div className="footer-grid container"><div><div className="footer-name">भानुभक्त आधारभूत विद्यालय</div><p>A thoughtful learning community in Morang, Nepal—nurturing capable, kind and curious citizens.</p></div><div><h3>Explore</h3><Link href="/about">About us</Link><Link href="/events">Events</Link><Link href="/notices">Notices</Link></div><div><h3>Contact</h3><p><MapPin size={15} /> Jahada-5, Morang, Nepal</p><p><Phone size={15} /> +977 9805308789</p><p><Mail size={15} /> bhanubhaktaschooljahada5@gmail.com</p><div className="socials"><Link href="/contact" aria-label="Contact the school"><Globe2 size={18}/></Link><a href="https://mail.google.com/mail/?view=cm&fs=1&to=bhanubhaktaschooljahada5%40gmail.com" target="_blank" rel="noreferrer" aria-label="Email the school with Gmail"><Mail size={18}/></a></div></div></div>
    <div className="footer-bottom">© {new Date().getFullYear()} Bhanubhakta Basic School. All rights reserved.</div>
  </footer>;
}


