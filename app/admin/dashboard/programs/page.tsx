import { redirect } from "next/navigation";

export default function LegacyProgramsManagerPage() {
  redirect("/admin/dashboard/events");
}
