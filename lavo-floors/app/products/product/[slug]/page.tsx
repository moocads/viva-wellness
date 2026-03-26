import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StrapiProductDetail } from "@/components/products/strapi-product-detail";
import {
  getProductById,
  getProductsForSeries,
  getStrapiProductBySegment,
} from "@/lib/api/products";
import { getSeriesBySlug } from "@/lib/api/series";
import { mapStrapiProductToFrontend, buildStrapiProductDetailVM } from "@/lib/strapi-mappers";
import { collectionUrlSegment } from "@/lib/product-path";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const numericId = Number(slug);
  const isNumericId =
    Number.isFinite(numericId) && String(slug) === String(numericId);

  const strapiProduct = isNumericId
    ? await getProductById(slug)
    : (await getStrapiProductBySegment(slug))?.strapiProduct ?? null;

  if (!strapiProduct) {
    return { title: "Product Not Found - Lavo Floors" };
  }

  const displayName = strapiProduct.product_name;
  return { title: `${displayName} - Lavo Floors` };
}

export default async function LegacyProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const numericId = Number(slug);
  const isNumericId =
    Number.isFinite(numericId) && String(slug) === String(numericId);

  const ctx = isNumericId
    ? await (async () => {
        const strapiProduct = await getProductById(slug);
        if (!strapiProduct?.series?.slug) return null;
        const series = await getSeriesBySlug(String(strapiProduct.series.slug));
        return { strapiProduct, series: series ?? (strapiProduct.series as any) };
      })()
    : await getStrapiProductBySegment(slug);

  if (!ctx) notFound();

  const { strapiProduct, series } = ctx;
  const collectionSlug = collectionUrlSegment(series);
  const relatedStrapiProducts = await getProductsForSeries(series);
  const relatedProducts = relatedStrapiProducts
    .filter((p) => String(p.id) !== String(strapiProduct.id))
    .slice(0, 4)
    .map((p) =>
      mapStrapiProductToFrontend(p, {
        urlCollectionSlug: collectionSlug,
        seriesForPaths: series,
      })
    );

  const backHref = `/products/${collectionSlug}/${series.slug}`;
  const detailVm = buildStrapiProductDetailVM(strapiProduct);

  return (
    <>
      <Navbar />
      <main>
        <StrapiProductDetail
          detail={detailVm}
          backHref={backHref}
          backLabel="Back to series"
          relatedProducts={relatedProducts}
        />
      </main>
      <Footer />
    </>
  );
}
