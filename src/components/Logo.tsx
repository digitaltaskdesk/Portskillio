export default function Logo() {
  return (
    <span className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
        <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e5416d" /><stop offset="1" stopColor="#ff7a5c" /></linearGradient></defs>
        <rect width="28" height="28" rx="9" fill="url(#lg)" />
        <path d="M9 21V7h6a4 4 0 010 8H9" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="20" r="2" fill="#fff" />
      </svg>
      PORTSKILLIO
    </span>
  );
}
