import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { LanguageProvider } from "@/components/language-provider";
import { Navbar } from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = { title: { default: "Bhanubhakta Basic School", template: "%s | Bhanubhakta School" },icons: {
    icon: "/images/check6.png",
  }, description: "A modern school website for Bhanubhakta Basic School, Morang, Nepal." };

export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="ne"><body><LanguageProvider><Navbar/><main>{children}</main><Footer/></LanguageProvider></body></html>; }
