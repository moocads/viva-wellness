import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/home/hero";
import { IntroSection } from "@/components/home/intro-section";
import { SeriesCards } from "@/components/home/series-cards";
import { SplitFeature } from "@/components/home/split-feature";
import { LifestyleImage } from "@/components/home/lifestyle-image";
import { BestSelling } from "@/components/home/best-selling";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IntroSection />
        <SeriesCards />
        <SplitFeature />
        <LifestyleImage />
        <BestSelling />
      </main>
      <Footer />
    </>
  );
}
