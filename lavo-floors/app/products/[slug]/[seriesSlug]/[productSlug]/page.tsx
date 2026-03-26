import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { StrapiProductDetail } from "@/components/products/strapi-product-detail";
import {
  getProductsForSeries,
  getStrapiProductDetailContext,
} from "@/lib/api/products";
import {
  buildStrapiProductDetailVM,
  mapStrapiProductToFrontend,
} from "@/lib/strapi-mappers";

interface Props {
  params: Promise<{
    slug: string;
    seriesSlug: string;
    productSlug: string;
  }>;
}

export const dynamicParams = true;

export async function generateMetadata({ params }: Props) {
  const { slug, seriesSlug, productSlug } = await params;
  const ctx = await getStrapiProductDetailContext(slug, seriesSlug, productSlug);
  if (!ctx) {
    return { title: "Product Not Found - Lavo Floors" };
  }
  const mapOpts = {
    urlCollectionSlug: slug,
    seriesForPaths: ctx.series,
  };
  const product = mapStrapiProductToFrontend(ctx.strapiProduct, mapOpts);
  return {
    title: `${product.name} - Lavo Floors`,
    description: product.description,
  };
}

export default async function StrapiProductDetailPage({ params }: Props) {
  const { slug, seriesSlug, productSlug } = await params;

  const ctx = await getStrapiProductDetailContext(slug, seriesSlug, productSlug);
  if (!ctx) notFound();

  const { strapiProduct, series } = ctx;
  const mapOpts = {
    urlCollectionSlug: slug,
    seriesForPaths: series,
  };

  const sameSeries = await getProductsForSeries(series);
  const relatedProducts = sameSeries
    .filter((p) => String(p.id) !== String(strapiProduct.id))
    .slice(0, 4)
    .map((p) => mapStrapiProductToFrontend(p, mapOpts));

  const detailVm = buildStrapiProductDetailVM(strapiProduct);
  const backHref = seriesListingHrefFromSlugs(slug, seriesSlug);

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

function seriesListingHrefFromSlugs(collectionSlug: string, seriesSlug: string) {
  return `/products/${collectionSlug}/${seriesSlug}`;
}
