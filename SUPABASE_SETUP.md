# Supabase setup guide

1. Create a new Supabase project in the region nearest to Nepal or your hosting region.
2. In **SQL Editor**, run the complete contents of `supabase/schema.sql`.
3. In **Project Settings → API**, copy the Project URL and anon key into `.env.local` as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Copy the **service_role** key only into `SUPABASE_SERVICE_ROLE_KEY`. Never expose this value to the browser or commit it to Git. It powers the protected administrator-provisioning endpoint.
5. In **Authentication → Providers → Email**, enable Email. For the requested no-confirmation sign-up flow, disable **Confirm email** in the Email provider configuration.
6. In **Authentication → Users**, create the first user with a strong password. Then run the final commented `update public.profiles ...` statement in `schema.sql`, substituting that email, to make that account a `school_admin`.
7. The SQL creates a public `school-media` storage bucket and policies. It is used by the admin managers for PDFs and imagery. Review the public-read setting before uploading sensitive material.
8. Add the SMTP values to `.env.local`. Any standard provider works: Brevo, Postmark, Amazon SES, your domain mail server, or Gmail SMTP with an app password. The contact API declares success only after both the inquiry record and SMTP message succeed.
9. In **Authentication → URL Configuration**, set your production Site URL and add your local and deployed callback URLs.
10. Deploy to Vercel or another Node-compatible host and configure the same environment variables in its project settings. Do not add the service-role key to a client-prefixed variable.

## Helpful validation checklist

- Public visitors can view notices, staff, hero slides and events.
- Public visitors can submit inquiries, but cannot read them.
- Public users can self-register and can never set their own role to `school_admin`.
- A school admin can create/edit/delete site content and upload media.
- Only a school admin can use the Admin Accounts screen.

The project deliberately has no database fallback for contact submissions: if Supabase or SMTP is unavailable, users get the required red message: `Submission failed. Database connection error.`

## Program Manager migration

The Program Manager needs the additional `programs` table included at the end of `supabase/schema.sql`. If you already ran the original schema, copy and run only that final **Program Manager migration** block in Supabase SQL Editor. Then visit `/admin/dashboard/programs`; the original four program cards will appear until you add or update records.

## Require sign-in for inquiries

Run the final **Require logged-in users for direct database inquiry inserts** block from `supabase/schema.sql` in Supabase SQL Editor. The website already redirects logged-out visitors to Login; this migration also prevents anonymous direct database writes.
