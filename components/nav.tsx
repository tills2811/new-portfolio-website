"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "./theme-toggle";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#exp", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="sticky top-0 z-40 transition-colors data-[scrolled=true]:border-b data-[scrolled=true]:border-hair data-[scrolled=true]:bg-page"
    >
      <nav aria-label="Main" className="wrap flex items-center justify-between py-[18px] text-[15px] font-medium">
        <Link href="/" className="text-[17px] font-bold no-underline">
          Shreyash Arali
        </Link>
        <div className="flex items-center gap-[26px]">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hidden no-underline underline-offset-4 hover:underline min-[900px]:inline"
            >
              {l.label}
            </Link>
          ))}
          <ThemeToggle />
          <a href="/CV.pdf" download className="pill !px-4 !py-2">
            Download CV
          </a>
        </div>
      </nav>
    </header>
  );
}
