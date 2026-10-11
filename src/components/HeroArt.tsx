const chips = [
  ["React", "var(--pink)", "0s", "left-[46%] top-[6%]"],
  ["SQL", "var(--coral)", "1s", "left-[40%] top-[44%]"],
  ["Figma", "var(--pink)", "2s", "left-[48%] bottom-[8%]"],
] as const;
const bars = [["Skills", "88%"], ["Projects", "76%"], ["Experience", "60%"], ["Certifications", "100%"]];

export default function HeroArt() {
  return (
    <div className="relative mx-auto h-[380px] w-full max-w-[520px]" role="img" aria-label="Illustration: a plain resume turning into a skill-based portfolio with a match score">
      {/* the old resume */}
      <div className="rise absolute left-0 top-8 w-[44%] -rotate-3 rounded-2xl border border-line bg-surface p-4 opacity-70" style={{ "--d": ".1s" } as React.CSSProperties}>
        <div className="mb-3 h-2.5 w-2/3 rounded bg-line" />
        {[100, 90, 95, 70, 85, 60, 90, 50].map((w, i) => (<div key={i} className="mb-2 h-1.5 rounded bg-line" style={{ width: w + "%" }} />))}
      </div>
      {/* skills leaving the resume */}
      {chips.map(([t, c, d, pos]) => (
        <span key={t} className={`drift glass absolute ${pos} z-10 rounded-full px-3 py-1 text-xs font-semibold`} style={{ "--d": d, color: c } as React.CSSProperties}>{t}</span>
      ))}
      {/* the portfolio */}
      <div className="rise glass absolute right-0 top-0 w-[58%] rounded-3xl p-5 shadow-2xl shadow-pink/20" style={{ "--d": ".35s" } as React.CSSProperties}>
        <div className="flex items-center gap-3">
          <div className="brand-bg h-11 w-11 rounded-full" />
          <div><div className="h-2.5 w-24 rounded bg-ink/80" /><div className="mt-1.5 h-2 w-16 rounded bg-line" /></div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <div className="h-16 rounded-xl brand-bg opacity-90" /><div className="h-16 rounded-xl bg-line" />
        </div>
        <p className="mt-5 text-xs font-semibold">Match breakdown</p>
        <div className="mt-2 space-y-2">
          {bars.map(([l, w]) => (
            <div key={l} className="flex items-center gap-2 text-[10px] text-muted">
              <span className="w-20">{l}</span>
              <span className="h-1.5 flex-1 rounded bg-line"><span className="bar brand-bg block h-full rounded" style={{ width: w }} /></span>
            </div>
          ))}
        </div>
      </div>
      <p className="absolute bottom-0 right-0 text-[11px] text-muted">Sample preview, not a real profile</p>
    </div>
  );
}
