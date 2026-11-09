import Link from "next/link";
import TileGrid from "./tile-grid";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="wrap">
      <TileGrid>
        <h1 id="hero-title" className="cond text-[clamp(56px,6.6vw,96px)]">
          I take products from an empty repo to production.
        </h1>
        <p className="mt-[26px] max-w-[42ch] text-lg text-ink-2">
          Full-stack engineer (Next.js, Python, LangGraph). I&apos;ve built three AI products from scratch to real
          users: BrandStream at THG Ingenuity, iContent and iTranslate at Harbinger.
        </p>
        <div className="mt-[26px] flex flex-wrap gap-2.5">
          <Link href="/#work" className="pill">
            See my work
          </Link>
          <a href="/Shreyash_Arali_Resume.pdf" download className="pill pill-ghost">
            Download CV
          </a>
        </div>
      </TileGrid>
    </section>
  );
}
