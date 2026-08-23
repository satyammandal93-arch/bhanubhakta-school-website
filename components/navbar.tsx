"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AuthNav } from "@/components/auth-nav";
import { useLanguage } from "@/components/language-provider";

const links = [["home", "/"], ["about", "/about"], ["events", "/events"], ["notices", "/notices"], ["staff", "/staff"], ["contact", "/contact"]] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  useEffect(() => { const update = () => setScrolled(window.scrollY > 12); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  return <header className={`site-header ${scrolled ? "scrolled" : ""}`}><div className="nav-wrap"><Link className="brand" href="/" onClick={() => setOpen(false)}><span className="brand-mark"><img className="navbar-logo" src="/images/logo2.jpeg" alt="Bhanubhakta Secondary School logo"/></span><span><strong>भानुभक्त</strong><small>Secondary School</small></span></Link><nav className="desktop-nav" aria-label="Main navigation">{links.map(([key, href]) => <Link key={href} href={href} className={pathname === href ? "active" : ""}>{t(key)}</Link>)}<AuthNav /></nav><div className="nav-actions"><button className="language-toggle" onClick={() => setLanguage(language === "ne" ? "en" : "ne")} aria-label="Change website language">नेपाली <span>/</span> English</button><button className="menu-button" onClick={() => setOpen(!open)} aria-label="Open navigation menu">{open ? <X /> : <Menu />}</button></div></div>{open && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map(([key, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{t(key)}</Link>)}<AuthNav mobile onNavigate={() => setOpen(false)} /></nav>}</header>;
}
