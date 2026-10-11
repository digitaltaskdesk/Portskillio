import Link from "next/link";
import { GraduationCap, Briefcase } from "lucide-react";
import HeroArt from "@/components/HeroArt";
import FeatureTabs from "@/components/FeatureTabs";

const steps = [
  ["Build", "Students add skills, projects, certifications and experience in guided steps."],
  ["Publish", "Choose a template and go live at a shareable link, public or private."],
  ["Get discovered", "Recruiters search and match against a job description."],
  ["Connect", "Recruiters send a request. You decide whether to accept."],
];

const templates = [
  { name: "Professional", note: "Clean, structured, built for corporate roles", cls: "bg-surface", bar: "bg-ink/70" },
  { name: "Creative", note: "Bold color and big visuals for designers", cls: "brand-bg text-white", bar: "bg-white/80" },
  { name: "Developer", note: "Repo-first layout with a dark code feel", cls: "bg-[#1b1218] text-[#ffd9d0]", bar: "bg-coral" },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-pink/20 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div>
            <h1 className="rise font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">Beyond resumes. Built on skills.</h1>
            <p className="rise mt-5 max-w-md text-lg text-muted" style={{ "--d": ".1s" } as React.CSSProperties}>Turn your skills, projects and certificates into a portfolio people can open, and let recruiters find you by what you can actually do.</p>
            <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--d": ".2s" } as React.CSSProperties}>
              <Link href="/student" className="brand-bg flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-lg shadow-pink/30"><GraduationCap size={18} />I am a student</Link>
              <Link href="/recruiter" className="glass flex items-center gap-2 rounded-full px-6 py-3 font-semibold"><Briefcase size={18} />I am a recruiter</Link>
            </div>
          </div>
          <HeroArt />
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-3xl font-extrabold tracking-tight">One platform, two sides</h2>
        <p className="mt-2 mb-8 max-w-xl text-muted">Pick a feature to see how it works.</p>
        <FeatureTabs />
      </section>

      <section id="how" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-3xl font-extrabold tracking-tight">How it works</h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <li key={t} className="rounded-2xl border border-line bg-surface p-5">
              <span className="brand-bg grid h-8 w-8 place-items-center rounded-full text-sm font-bold text-white">{i + 1}</span>
              <h3 className="mt-4 font-display text-lg font-bold">{t}</h3>
              <p className="mt-1 text-sm text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="templates" className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="font-display text-3xl font-extrabold tracking-tight">Three templates, your style</h2>
        <p className="mt-2 max-w-xl text-muted">Change accent color and font in a live preview before you publish.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {templates.map((t) => (
            <article key={t.name} className="overflow-hidden rounded-3xl border border-line">
              <div className={`${t.cls} h-44 p-5`}>
                <div className={`h-9 w-9 rounded-full ${t.bar}`} />
                <div className={`mt-4 h-2.5 w-28 rounded ${t.bar}`} />
                <div className={`mt-2 h-2 w-40 rounded opacity-50 ${t.bar}`} />
                <div className="mt-5 flex gap-2"><span className={`h-6 w-14 rounded-full opacity-60 ${t.bar}`} /><span className={`h-6 w-10 rounded-full opacity-40 ${t.bar}`} /></div>
              </div>
              <div className="bg-surface p-5"><h3 className="font-display font-bold">{t.name}</h3><p className="text-sm text-muted">{t.note}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20 pt-8">
        <div className="brand-bg rounded-3xl p-8 text-white sm:p-12">
          <h2 className="font-display text-3xl font-extrabold tracking-tight">Your skills deserve more than one page.</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/student" className="rounded-full bg-white px-6 py-3 font-semibold text-pink">Build my portfolio</Link>
            <Link href="/recruiter" className="rounded-full border border-white/60 px-6 py-3 font-semibold">Discover talent</Link>
          </div>
        </div>
      </section>
    </>
  );
}
