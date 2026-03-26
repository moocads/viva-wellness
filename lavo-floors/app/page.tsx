import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/home/hero";
import { IntroSection } from "@/components/home/intro-section";
import { SeriesCards } from "@/components/home/series-cards";
import { SplitFeature } from "@/components/home/split-feature";
import { LifestyleImage } from "@/components/home/lifestyle-image";
import { BestSelling } from "@/components/home/best-selling";
import { getCollections } from "@/lib/api/collections";

export default async function Home() {
  const collections = await getCollections();
  const firstSlug = collections[0]?.slug;
  const collectionHref = firstSlug ? `/products/${firstSlug}` : "/products";

  return (
    <>
      <Navbar />
      <main>
        <Hero collectionHref={collectionHref} />
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
