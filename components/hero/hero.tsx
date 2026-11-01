import TileGrid from "./tile-grid";

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="wrap">
      <TileGrid>
        <h1 id="hero-title" className="cond text-[clamp(64px,8.4vw,120px)]">
          I build the AI tools that make the creative.
        </h1>
        <p className="mt-[26px] max-w-[42ch] text-lg text-ink-2">
          Software Engineer at THG Ingenuity. I build BrandStream, which turns a brief and a product photo into
          campaign-ready creatives, launches them on Meta and learns from the results.
        </p>
      </TileGrid>
    </section>
  );
}
