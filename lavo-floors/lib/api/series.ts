import { fetchStrapi } from "@/lib/strapi";
import type { Series, StrapiListResponse } from "@/lib/types";

/** Strapi：系列列表排序（与 CMS 字段 sortOrder 一致） */
export const SERIES_LIST_SORT_QUERY = "sort=sortOrder:asc";

export async function getSeriesByCollection(
  collectionSlug: string
): Promise<Series[]> {
  // Strapi 5: comma-separated populate is invalid — use populate=*
  const filtered = await fetchStrapi<StrapiListResponse<Series>>(
    `/api/series-list?filters[collection][slug][$eq]=${encodeURIComponent(
      collectionSlug
    )}&populate=*&pagination[pageSize]=1000&${SERIES_LIST_SORT_QUERY}`
  );
  const fromFilter = filtered.data || [];
  if (fromFilter.length > 0) return fromFilter;

  // 兜底：拉全量再在内存里按 collection.slug 过滤（保证 Collection → Series 层级）
  const all = await fetchStrapi<StrapiListResponse<Series>>(
    `/api/series-list?populate=*&pagination[pageSize]=1000&${SERIES_LIST_SORT_QUERY}`
  );
  return (all.data || []).filter(
    (s) => s.collection?.slug === collectionSlug
  );
}

export async function getSeriesBySlug(slug: string): Promise<Series | null> {
  const res = await fetchStrapi<StrapiListResponse<Series>>(
    `/api/series-list?filters[slug][$eq]=${encodeURIComponent(
      slug
    )}&populate=*&${SERIES_LIST_SORT_QUERY}`
  );

  return res.data?.[0] ?? null;
}

