import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductGrid } from "@/components/products/product-grid";
import { SeriesFeatures } from "@/components/products/series-features";
import { getSeriesBySlug } from "@/lib/api/series";
import { getProductsForSeries } from "@/lib/api/products";
import { mapStrapiProductToFrontend } from "@/lib/strapi-mappers";
import { getSeriesByName } from "@/lib/products";
import { getCollectionBySlug } from "@/lib/api/collections";

interface SeriesPageProps {
  params: Promise<{ slug: string; seriesSlug: string }>;
}

export default async function SeriesPage({ params }: SeriesPageProps) {
  const { slug: collectionSlug, seriesSlug } = await params;

  const series = await getSeriesBySlug(seriesSlug);
  if (!series) return notFound();

  const collection = await getCollectionBySlug(collectionSlug);
  if (!collection) return notFound();

  const products = await getProductsForSeries(series);
  const mapOpts = {
    urlCollectionSlug: collectionSlug,
    seriesForPaths: series,
  };
  const frontendProducts = products.map((p) =>
    mapStrapiProductToFrontend(p, mapOpts)
  );

  // Your local series json still contains icon/title layout content.
  const localSeries = getSeriesByName(series.seriesName);
  const descriptionForFeatures =
    series.description ?? localSeries?.description ?? "";

  return (
    <>
      <Navbar />
      <main>
        {/* Banner */}
        <section className="relative h-[400px] w-full">
          <div
            className={`absolute inset-0 bg-cover bg-center`}
            style={{
              backgroundImage: series.cover_image?.url
                ? `url('${series.cover_image.url}')`
                : undefined,
            }}
          >
            {/* Fallback background if no image */}
            {!series.cover_image?.url && (
              <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-100" />
            )}
            <div className="absolute inset-0 bg-black/30" />

            {/* 上下排文案：不用 flex，用 grid 居中 + 内层块级纵向排列 */}
            <div className="absolute inset-0 grid place-content-center px-4">
              <div className="text-center space-y-3">
                <p className="text-xs text-white uppercase tracking-wide">
                  {collection.collection_name}
                </p>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
                  Series - {series.seriesName}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Series Features */}
        {localSeries && (
          <SeriesFeatures
            series={{
              ...localSeries,
              description: descriptionForFeatures,
            }}
          />
        )}

        {/* Products */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <ProductGrid products={frontendProducts} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

