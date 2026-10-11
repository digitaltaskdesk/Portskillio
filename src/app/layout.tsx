import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-display" });
const body = DM_Sans({ subsets: ["latin"], variable: "--f-body" });

export const metadata: Metadata = {
  title: "Portskillio | Beyond Resumes. Built on Skills.",
  description: "Build a skill-first portfolio as a student, or discover talent by real skills and projects as a recruiter.",
};

const themeScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${body.variable}`}>
      <head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head>
      <body className="bg-bg font-sans text-ink antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
