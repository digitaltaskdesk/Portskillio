import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div><Logo /><p className="mt-2 text-sm text-muted">Beyond Resumes. Built on Skills.</p></div>
        <ul className="flex flex-wrap gap-6 text-sm text-muted">
          <li><Link href="/student" className="hover:text-ink">Students</Link></li>
          <li><Link href="/recruiter" className="hover:text-ink">Recruiters</Link></li>
          <li><Link href="/login" className="hover:text-ink">Log in</Link></li>
        </ul>
      </div>
      <p className="pb-8 text-center text-xs text-muted">A Web Technologies college project.</p>
    </footer>
  );
}
