import { RecordManager } from "@/components/admin/record-manager";
import { demoSlides } from "@/lib/content";
export default function AdminHeroPage(){return <><div className="admin-top"><div><h1>Hero slider</h1><p>Upload, order or remove the homepage gallery images.</p></div></div><RecordManager table="hero_slides" title="Hero slider manager" description="Images are automatically displayed in ascending display order." initialRows={demoSlides} assetField="image_url" fields={[{name:"image_url",label:"Image URL"},{name:"display_order",label:"Display order",type:"number"}]}/></>}
