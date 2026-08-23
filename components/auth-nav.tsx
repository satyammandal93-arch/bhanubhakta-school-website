"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

function displayName(user: User) {
  const name = typeof user.user_metadata.full_name === "string" ? user.user_metadata.full_name.trim() : "";
  if (name) return name;
  return user.email?.split("@")[0] || "Account";
}

export function AuthNav({ onNavigate, mobile = false }: { onNavigate?: () => void; mobile?: boolean }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user ?? null));
    return () => subscription.subscription.unsubscribe();
  }, []);

  async function signOut() {
    await createClient()?.auth.signOut();
    setUser(null);
    window.location.assign("/");
  }

  if (!user) return <Link href="/login" className={mobile ? "" : "auth-login"} onClick={onNavigate}>Login</Link>;
  return <button type="button" className={mobile ? "mobile-user-button" : "auth-user"} title="Sign out" onClick={signOut}><span>{displayName(user)}</span><LogOut size={mobile ? 15 : 14} aria-hidden="true"/></button>;
}

