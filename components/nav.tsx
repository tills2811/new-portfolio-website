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
      <nav
        aria-label="Main"
        className="wrap flex flex-wrap items-center justify-between gap-x-[26px] gap-y-2 pb-2.5 pt-3.5 text-[15px] font-medium min-[900px]:py-[18px]"
      >
        <Link href="/" className="mr-auto text-[17px] font-bold no-underline">
          Shreyash Arali
        </Link>
        {/* One set of links: its own row on phones, inline before the buttons on desktop. */}
        <div
          data-testid="nav-links"
          className="order-last flex w-full gap-6 min-[900px]:order-none min-[900px]:w-auto min-[900px]:gap-[26px]"
        >
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="py-1 no-underline underline-offset-4 hover:underline">
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-[18px] min-[900px]:gap-[26px]">
          <ThemeToggle />
          <a href="/CV.pdf" download className="pill !px-4 !py-2">
            Download CV
          </a>
        </div>
      </nav>
    </header>
  );
}
