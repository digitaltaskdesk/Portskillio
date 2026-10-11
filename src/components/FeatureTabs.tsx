"use client";
import { useState } from "react";

const tabs = [
  { id: "portfolio", name: "Portfolio builder", text: "Fill in guided steps once. Pick a template, set your accent color, and publish at a link you can share.", rows: ["Personal information", "Projects with GitHub links", "Skills and proficiency", "Publish at /p/your-name"] },
  { id: "matching", name: "Job matching", text: "Paste a job description. Recruiters see which skills, projects, experience and certifications matched, and how each part adds to the score.", rows: ["Skills overlap", "Relevant projects", "Experience", "Certifications"] },
  { id: "shortlist", name: "Shortlist and connect", text: "Compare candidates side by side, shortlist the best fits and send a connection request. Students choose whether to accept.", rows: ["Compare profiles", "Shortlist candidates", "Send connection request", "Student accepts or declines"] },
];

export default function FeatureTabs() {
  const [active, setActive] = useState(tabs[0].id);
  const tab = tabs.find((t) => t.id === active)!;
  return (
    <div className="glass rounded-3xl p-5 sm:p-8">
      <div role="tablist" className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={t.id === active} onClick={() => setActive(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${t.id === active ? "brand-bg text-white" : "border border-line text-muted hover:text-ink"}`}>{t.name}</button>
        ))}
      </div>
      <div role="tabpanel" className="mt-6 grid gap-6 md:grid-cols-2">
        <p className="max-w-md text-lg leading-relaxed">{tab.text}</p>
        <ul className="space-y-2">
          {tab.rows.map((r) => (<li key={r} className="rounded-xl border border-line bg-surface px-4 py-3 text-sm">{r}</li>))}
        </ul>
      </div>
    </div>
  );
}
