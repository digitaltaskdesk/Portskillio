import Link from "next/link";

export default function RoleEntry({ title, intro, points }: { title: string; intro: string; points: string[] }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20">
      <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-4 text-lg text-muted">{intro}</p>
      <ul className="mt-8 space-y-3">
        {points.map((p) => (<li key={p} className="rounded-xl border border-line bg-surface px-4 py-3">{p}</li>))}
      </ul>
      <p className="glass mt-10 rounded-2xl p-5 text-sm">Accounts are not open yet. Sign-up and login arrive in Phase 2, when real authentication is connected.</p>
      <Link href="/" className="mt-6 inline-block text-sm font-medium text-pink">Back to home</Link>
    </section>
  );
}
