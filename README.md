# Bhanubhakta Secondary School website

A modular Next.js school website and Supabase-ready admin portal for Morang, Nepal.

## Local development

1. Copy `.env.example` to `.env.local` and add your Supabase and SMTP credentials.
2. Run `npm run dev`.
3. Visit `http://localhost:3000`.

Without credentials, the public pages render polished demonstration content; the contact form intentionally reports the required database connection failure and the protected admin portal redirects to login.

## Supabase setup

Use the step-by-step guide in `SUPABASE_SETUP.md`. The complete SQL source is in `supabase/schema.sql`.

## Main routes

- `/`, `/about`, `/programs`, `/notices`, `/staff`, `/contact`
- `/login`
- `/admin/dashboard` and dedicated managers for notices, staff, hero photos, events and administrator accounts.
