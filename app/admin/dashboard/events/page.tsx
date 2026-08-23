import { RecordManager } from "@/components/admin/record-manager";
import { demoEvents } from "@/lib/content";

export default function AdminEventsPage() {
  return <>
    <div className="admin-top"><div><h1>Event manager</h1><p>Add and update school events, their descriptions, dates and feature photos.</p></div></div>
    <RecordManager table="events" title="Event manager" description="Add event dates, titles, short descriptions and feature photos." initialRows={demoEvents} assetField="image_url" fields={[
      { name: "title_ne", label: "Nepali title" },
      { name: "title_en", label: "English title" },
      { name: "description_ne", label: "Nepali description", type: "textarea" },
      { name: "description_en", label: "English description", type: "textarea" },
      { name: "event_date", label: "Event date", type: "date" },
      { name: "image_url", label: "Image URL" },
    ]}/>
  </>;
}
