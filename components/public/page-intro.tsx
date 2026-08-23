import { LocalizedText } from "@/components/language-provider";

export function PageIntro({ eyebrow, titleEn, titleNe, copyEn, copyNe }: { eyebrow: string; titleEn: string; titleNe: string; copyEn: string; copyNe: string }) {
 return <section className="page-intro"><div className="container"><p className="eyebrow">{eyebrow}</p><LocalizedText as="h1" en={titleEn} ne={titleNe}/><LocalizedText as="p" className="lead" en={copyEn} ne={copyNe}/></div></section>;
}
