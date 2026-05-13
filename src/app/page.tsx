import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Presentacion } from "@/components/Presentacion";
import { Modulos } from "@/components/Modulos";
import { Dirigido } from "@/components/Dirigido";
import { Cronograma } from "@/components/Cronograma";
import { Modalidad } from "@/components/Modalidad";
import { CTA } from "@/components/CTA";
import { StickyBanner } from "@/components/StickyBanner";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pb-16">
        <Hero />
        <Presentacion />
        <Modulos />
        <Dirigido />
        <Cronograma />
        <Modalidad />
        <CTA />
      </main>
      <StickyBanner />
    </>
  );
}
