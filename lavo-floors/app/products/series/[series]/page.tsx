import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductsClient } from "@/components/products/products-client";
import { SeriesFeatures } from "@/components/products/series-features";
import { slugToSeries, getAllSeries, getSeriesByName } from "@/lib/products";

interface SeriesPageProps {
  params: Promise<{
    series: string;
  }>;
}

export async function generateStaticParams() {
  const allSeries = getAllSeries();
  return allSeries.map((series) => ({
    series: series.toLowerCase().replace(/\s+/g, '-'),
  }));
}

export async function generateMetadata({ params }: SeriesPageProps) {
  const { series: seriesSlug } = await params;
  const seriesName = slugToSeries(seriesSlug);
  
  if (!seriesName) {
    return {
      title: "Series Not Found - Lavo Floors",
    };
  }

  return {
    title: `${seriesName} - Lavo Floors`,
    description: `Browse our ${seriesName} collection of premium engineered hardwood floors.`,
  };
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { series: seriesSlug } = await params;
  const seriesName = slugToSeries(seriesSlug);

  if (!seriesName) {
    notFound();
  }

  const seriesData = getSeriesByName(seriesName);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] w-full">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: seriesData?.bannerImage
                ? `url('${seriesData.bannerImage}')`
                : "url('https://placehold.co/1920x600/4a4035/4a4035?text=')",
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative h-full flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
              {seriesName}
            </h1>
          </div>
        </section>

        {/* Series Features Section */}
        {seriesData && (
          <SeriesFeatures series={seriesData} />
        )}

        {/* Products Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
              <ProductsClient series={seriesName} />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
