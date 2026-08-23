"use client";

import { LoaderCircle } from "lucide-react";
import { FormEvent, useState } from "react";
import { createClient, hasSupabaseConfig } from "@/lib/supabase/client";

export function LoginForm() {
  const [mode, setMode] = useState<"public" | "admin">("public");
  const [register, setRegister] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setMessage("");
    if (!hasSupabaseConfig) { setMessage("Supabase is not configured yet. Add your environment variables first."); return; }
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email")); const password = String(form.get("password")); const fullName = String(form.get("fullName") || "");
    const supabase = createClient(); if (!supabase) return;
    setPending(true);
    try {
      if (register) {
        const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } });
        if (error) throw error;
        if (data.session) { window.location.assign("/"); return; }
        setMessage("Account created. You can now sign in."); setRegister(false); return;
      }
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (mode === "admin") {
        const { data: profile, error: profileError } = await supabase.from("profiles").select("role").eq("id", data.user.id).single();
        if (profileError || profile?.role !== "school_admin") { await supabase.auth.signOut(); throw new Error("This account is not registered as a school administrator."); }
        window.location.assign("/admin/dashboard"); return;
      }
      window.location.assign("/");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Unable to complete login."); } finally { setPending(false); }
  }

  return <main className="login-page"><section className="login-card"><p className="eyebrow">BHANUBHAKTA PORTAL</p><h1>{mode === "admin" ? "School Admin Login" : register ? "Create your account" : "Welcome back"}</h1><div className="tab-buttons"><button type="button" className={mode === "public" ? "active" : ""} onClick={() => { setMode("public"); setRegister(false); setMessage(""); }}>Public user</button><button type="button" className={mode === "admin" ? "active" : ""} onClick={() => { setMode("admin"); setRegister(false); setMessage(""); }}>School admin</button></div><form className="login-form" onSubmit={submit}>{register && <label className="form-label">Full name<input className="field" name="fullName" required /></label>}<label className="form-label">Email address<input className="field" name="email" type="email" required /></label><label className="form-label">Password<input className="field" name="password" type="password" minLength={6} required /></label>{message && <p className={message.includes("created") ? "form-success" : "form-error"}>{message}</p>}<button className="btn" disabled={pending}>{pending && <LoaderCircle size={16} className="animate-spin" />}{register ? "Create account" : "Sign in"}</button></form>{mode === "public" && <p className="inline-note">{register ? "Already have an account? " : "New to Bhanubhakta? "}<button type="button" className="link-button" onClick={() => { setRegister(!register); setMessage(""); }}>{register ? "Sign in" : "Create an account"}</button></p>}{mode === "admin" && <p className="inline-note">Administrator accounts are provisioned by the school. Contact the principal’s office if you need access.</p>}</section></main>;
}



