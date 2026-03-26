import { NextResponse } from "next/server";
import { fetchStrapi } from "@/lib/strapi";
import type { Product as StrapiProduct, Series, StrapiListResponse } from "@/lib/types";
import { mapStrapiProductToFrontend } from "@/lib/strapi-mappers";

export async function GET() {
  const res = await fetchStrapi<StrapiListResponse<StrapiProduct>>(
    `/api/products?populate=*&pagination[pageSize]=4`
  );

  const list = res.data || [];

  const items = list.map((p) => {
    const seriesName = p.series?.seriesName ?? "";
    const mapped = mapStrapiProductToFrontend(p as StrapiProduct);
    const href = mapped.detailPath ?? "";
    const imageUrl = mapped.images?.[0] ?? "/placeholder.svg";

    return {
      id: String(p.id),
      href,
      imageUrl,
      seriesName,
      productName: p.product_name,
    };
  });

  return NextResponse.json({ items });
}

