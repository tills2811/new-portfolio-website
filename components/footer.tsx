import { contactLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="wrap flex flex-wrap justify-between gap-3 pb-12 pt-9 text-sm text-muted">
      <span>Shreyash Arali, Pune</span>
      <span className="flex gap-5">
        <a href={`mailto:${contactLinks.email}`} className="inline-flex min-h-[24px] items-center hover:text-ink">
          Email
        </a>
        <a href={contactLinks.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-[24px] items-center hover:text-ink">
          LinkedIn
        </a>
        <a href={contactLinks.github} target="_blank" rel="noreferrer" className="inline-flex min-h-[24px] items-center hover:text-ink">
          GitHub
        </a>
      </span>
    </footer>
  );
}
