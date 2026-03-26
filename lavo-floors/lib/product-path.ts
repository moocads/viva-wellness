import { slugify } from "@/lib/slug";
import type { Product as StrapiProduct, Series } from "@/lib/types";

/** Collection 未关联时用 other，对应 URL: /products/other/... */
export const ORPHAN_COLLECTION_SLUG = "other";

export function collectionUrlSegment(series: Series | null | undefined): string {
  const s = series?.collection?.slug?.trim();
  return s && s.length > 0 ? s.toLowerCase() : ORPHAN_COLLECTION_SLUG;
}

export function seriesUrlSegment(series: Series | null | undefined): string {
  if (!series) return "unknown";
  if (series.slug && String(series.slug).trim()) {
    return String(series.slug).toLowerCase();
  }
  return slugify(series.seriesName || "series");
}

/** 详情页最后一段：优先 Strapi slug，否则由 product_name 生成 */
export function productUrlSegmentFromStrapi(product: StrapiProduct): string {
  if (product.slug && String(product.slug).trim()) {
    return slugify(String(product.slug));
  }
  return slugify(product.product_name);
}

export function buildProductDetailHref(
  collectionSlug: string,
  seriesSlug: string,
  productSegment: string
): string {
  return `/products/${collectionSlug}/${seriesSlug}/${productSegment}`;
}

export function seriesListingHref(collectionSlug: string, seriesSlug: string): string {
  return `/products/${collectionSlug}/${seriesSlug}`;
}

/**
 * URL 里的 collection 是否与当前 Series 一致。
 * Strapi 在 /api/products 里嵌套的 series 常不带 collection，系列也可能未在 CMS 挂 Collection：
 * 此时不校验 URL 第一段，避免 /products/water-resistant-laminate/12h/... 与 detailPath /other/... 不一致导致 404。
 */
export function collectionSlugMatchesSeries(
  collectionSlugFromUrl: string,
  series: Series
): boolean {
  const strict = series.collection?.slug?.trim();
  if (!strict) return true;
  return collectionSlugFromUrl.toLowerCase() === strict.toLowerCase();
}
