import { NextResponse } from "next/server";
import { sendInquiryNotification } from "@/lib/email";
import { createServerClient, createServiceClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "");
    const publicClient = createServerClient(); const serviceClient = createServiceClient();
    if (!token || !publicClient || !serviceClient) return NextResponse.json({ error: "Please sign in to send an inquiry." }, { status: 401 });
    const { data: { user }, error: userError } = await publicClient.auth.getUser(token);
    if (userError || !user) return NextResponse.json({ error: "Please sign in to send an inquiry." }, { status: 401 });
    const body = await request.json(); const inquiry = { name: String(body.name || "").trim(), phone: String(body.phone || "").trim(), email: String(body.email || "").trim(), message: String(body.message || "").trim() };
    if (!inquiry.name || !inquiry.phone || !inquiry.email || !inquiry.message) return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    const { error } = await serviceClient.from("inquiries").insert(inquiry); if (error) throw error;
    // Storing the inquiry must not fail merely because the optional email
    // notification SMTP service has not been configured yet.
    try {
      await sendInquiryNotification(inquiry);
      return NextResponse.json({ ok: true, notificationSent: true });
    } catch {
      return NextResponse.json({ ok: true, notificationSent: false });
    }
  } catch { return NextResponse.json({ error: "Submission failed. Database connection error." }, { status: 503 }); }
}

