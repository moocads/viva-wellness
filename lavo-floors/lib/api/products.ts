import { cache } from "react";
import { fetchStrapi } from "@/lib/strapi";
import { getSeriesBySlug } from "@/lib/api/series";
import {
  collectionSlugMatchesSeries,
  productUrlSegmentFromStrapi,
} from "@/lib/product-path";
import type {
  Product,
  Series,
  StrapiListResponse,
  StrapiSingleResponse,
} from "@/lib/types";

function toNumberMaybe(value: string): number | null {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

/**
 * 同一 Series 下的 Products（Collection → Series → Product）
 * 优先用 Strapi 返回的 series.id 匹配，避免 slug 大小写不一致只筛到 0/1 条。
 */
export async function getProductsBySeries(
  seriesSlug: string,
  seriesId?: number | string
): Promise<Product[]> {
  const res = await fetchStrapi<StrapiListResponse<Product>>(
    `/api/products?populate=*&pagination[pageSize]=1000`
  );
  const list = res.data || [];

  if (seriesId != null && seriesId !== "") {
    const sid = String(seriesId);
    return list.filter((p) => p.series != null && String(p.series.id) === sid);
  }

  const want = seriesSlug.toLowerCase();
  return list.filter(
    (p) => p.series?.slug && p.series.slug.toLowerCase() === want
  );
}

/**
 * 合并两种 Strapi 建法：
 * 1) Product 上选 Series（/api/products 里带 series）→ getProductsBySeries
 * 2) Series 上选 Product（series-list 里嵌套 product）→ 若 1 漏了仍展示
 */
export async function getProductsForSeries(series: Series): Promise<Product[]> {
  const fromProductSide = await getProductsBySeries(series.slug, series.id);
  const map = new Map<string, Product>(
    fromProductSide.map((p) => [String(p.id), p])
  );

  const embeddedId = series.product?.id;
  if (embeddedId != null && embeddedId !== "" && !map.has(String(embeddedId))) {
    const full = await getProductById(String(embeddedId));
    if (full) map.set(String(full.id), full);
  }

  return Array.from(map.values());
}

export async function getProductById(id: string): Promise<Product | null> {
  const productId = toNumberMaybe(id);
  if (!productId) return null;

  // Strapi entity endpoint
  const res = await fetchStrapi<StrapiSingleResponse<Product>>(
    `/api/products/${productId}?populate=*`
  );

  return res?.data ?? null;
}

/**
 * 根据 URL 最后一段 product slug（kebab-case）在 Strapi 中查找产品。
 * slug 优先使用 product.slug；若没有则使用 product.product_name 做 slugify。
 */
export async function getStrapiProductBySegment(
  productSegment: string
): Promise<{ strapiProduct: Product; series: Series } | null> {
  const want = productSegment.trim().toLowerCase();

  const res = await fetchStrapi<StrapiListResponse<Product>>(
    `/api/products?populate=*&pagination[pageSize]=1000`
  );
  const list = res.data || [];

  const strapiProduct = list.find(
    (p) => productUrlSegmentFromStrapi(p).toLowerCase() === want
  );

  if (!strapiProduct?.series?.slug) return null;

  const series = await getSeriesBySlug(String(strapiProduct.series.slug));
  // series-list 可能存在 collection 也可能不存在；至少要保证 series.slug 正确
  if (series) return { strapiProduct, series };

  // fallback: 用当前 product 内的 series（collection 可能为空）
  return {
    strapiProduct,
    series: strapiProduct.series as unknown as Series,
  };
}

export async function getAllProductIds(): Promise<string[]> {
  const res = await fetchStrapi<StrapiListResponse<Product>>(
    `/api/products?fields[0]=id&pagination[pageSize]=1000`
  );
  return (res.data || []).map((p) => String(p.id));
}

/** `/products/[collection]/[series]/[product]` — 同一请求内 metadata 与页面共用缓存 */
export const getStrapiProductDetailContext = cache(
  async (
    collectionSlug: string,
    seriesSlug: string,
    productSlug: string
  ): Promise<{ strapiProduct: Product; series: Series } | null> => {
    const series = await getSeriesBySlug(seriesSlug);
    if (!series || !collectionSlugMatchesSeries(collectionSlug, series)) {
      return null;
    }

    const products = await getProductsForSeries(series);
    const want = productSlug.trim().toLowerCase();
    const strapiProduct =
      products.find(
        (p) => productUrlSegmentFromStrapi(p).toLowerCase() === want
      ) ?? null;

    if (!strapiProduct) return null;
    return { strapiProduct, series };
  }
);

export async function getStrapiProductByNestedSlug(
  collectionSlug: string,
  seriesSlug: string,
  productSlug: string
): Promise<Product | null> {
  const ctx = await getStrapiProductDetailContext(
    collectionSlug,
    seriesSlug,
    productSlug
  );
  return ctx?.strapiProduct ?? null;
}

