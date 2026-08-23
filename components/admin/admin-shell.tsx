"use client";

import Link from "next/link";
import { CalendarDays, ChevronLeft, FileText, Images, LayoutDashboard, LogOut, Menu, School, Users, UserRoundPlus, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const links = [["Overview", "/admin/dashboard", LayoutDashboard],["Notices", "/admin/dashboard/notices", FileText],["Staff", "/admin/dashboard/staff", Users],["Hero slider", "/admin/dashboard/hero", Images],["Events", "/admin/dashboard/events", CalendarDays],["Admin accounts", "/admin/dashboard/users", UserRoundPlus]] as const;
export function AdminShell({ children }: { children: React.ReactNode }) { const [open,setOpen] = useState(false); const pathname=usePathname(); async function signOut(){await createClient()?.auth.signOut();window.location.assign("/");} return <div className="dashboard-shell"><aside className={`admin-sidebar ${open?"open":""}`}><div className="admin-brand"><span><School size={20}/></span><div>भानुभक्त <small style={{display:"block",color:"#9fb8d3",fontSize:10}}>ADMIN PORTAL</small></div></div><nav>{links.map(([label,href,Icon])=><Link href={href} key={href} className={pathname===href?"active":""} onClick={()=>setOpen(false)}><Icon size={17}/>{label}</Link>)}<Link href="/" onClick={()=>setOpen(false)}><ChevronLeft size={17}/>Public website</Link></nav></aside><section className="admin-main"><button className="mobile-admin-toggle" onClick={()=>setOpen(!open)} aria-label="Open admin menu">{open?<X/>:<Menu/>}</button>{children}<button className="admin-signout" onClick={signOut}><LogOut size={15} style={{verticalAlign:"middle",marginRight:6}}/>Sign out</button></section></div>; }



