import { fetchStrapi } from "@/lib/strapi";
import type { Collection, StrapiListResponse } from "@/lib/types";

export async function getCollections(): Promise<Collection[]> {
  const res = await fetchStrapi<StrapiListResponse<Collection>>(
    "/api/collections?populate=*"
  );
  return res.data || [];
}

export async function getCollectionBySlug(
  slug: string
): Promise<Collection | null> {
  const res = await fetchStrapi<StrapiListResponse<Collection>>(
    `/api/collections?filters[slug][$eq]=${encodeURIComponent(
      slug
    )}&populate=*`
  );

  return res.data?.[0] ?? null;
}

