import { NextResponse } from "next/server";
import { fetchStrapi, getStrapiMedia } from "@/lib/strapi";
import { SERIES_LIST_SORT_QUERY } from "@/lib/api/series";
import type { Series, StrapiListResponse, StrapiImage, Collection } from "@/lib/types";

const ORPHAN_COLLECTION_SLUG = "other";

export async function GET() {
  const res = await fetchStrapi<StrapiListResponse<Series>>(
    `/api/series-list?populate=*&pagination[pageSize]=50&${SERIES_LIST_SORT_QUERY}`
  );

  const list = res.data || [];

  const items = list.map((s) => {
    const collection = s.collection as Collection | null | undefined;
    const collectionName = collection?.collection_name ?? "";
    const collectionSlug = collection?.slug?.trim() || ORPHAN_COLLECTION_SLUG;
    const seriesShortDescription =
      s.short_description ?? "";

    const imageUrl =
      getStrapiMedia((s.cover_image as StrapiImage | null | undefined)?.url) ||
      "/placeholder.svg";

    return {
      id: String(s.id),
      href: `/products/${collectionSlug}/${String(s.slug).toLowerCase()}`,
      imageUrl,
      collectionName,
      seriesName: s.seriesName,
      seriesShortDescription,
    };
  });

  return NextResponse.json({ items });
}

