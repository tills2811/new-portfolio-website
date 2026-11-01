import FitAndWork from "@/components/fit-and-work";
import FitBand from "@/components/fit-band";
import Hero from "@/components/hero/hero";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <FitBand />
      <FitAndWork />
    </main>
  );
}
