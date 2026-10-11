"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/#features", label: "Features" },
  { href: "/#how", label: "How it works" },
  { href: "/#templates", label: "Templates" },
  { href: "/student", label: "For students" },
  { href: "/recruiter", label: "For recruiters" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="glass sticky top-0 z-50 border-x-0 border-t-0">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5" aria-label="Main">
        <Link href="/" aria-label="Portskillio home"><Logo /></Link>
        <ul className="hidden items-center gap-7 text-sm md:flex">
          {links.map((l) => (<li key={l.href}><Link href={l.href} className="text-muted transition hover:text-ink">{l.label}</Link></li>))}
        </ul>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className="hidden px-3 text-sm font-medium sm:block">Log in</Link>
          <Link href="/signup" className="brand-bg hidden rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-pink/25 sm:block">Create account</Link>
          <button className="grid h-9 w-9 place-items-center md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="border-t border-line px-5 py-3 md:hidden">
          {[...links, { href: "/login", label: "Log in" }, { href: "/signup", label: "Create account" }].map((l) => (
            <li key={l.href}><Link href={l.href} onClick={() => setOpen(false)} className="block py-2.5 text-sm">{l.label}</Link></li>
          ))}
        </ul>
      )}
    </header>
  );
}
