import type { Product as StrapiProduct, Series } from "@/lib/types";
import type { Product as FrontendProduct } from "@/lib/products";
import { getStrapiMedia } from "@/lib/strapi";
import {
  ORPHAN_COLLECTION_SLUG,
  buildProductDetailHref,
  productUrlSegmentFromStrapi,
  seriesListingHref,
  seriesUrlSegment,
} from "@/lib/product-path";

const PLACEHOLDER = "/placeholder.svg";

type LabelValueSpec = { label: string; value: string };

function getSpecValue(specs: LabelValueSpec[] | undefined, label: string): string | undefined {
  if (!specs) return undefined;
  return specs.find((s) => s.label === label)?.value;
}

function parsePlankSize(plankSize?: string): { length?: string; width?: string } {
  if (!plankSize) return {};
  // Example: 7.7" x 60"
  const parts = plankSize.split("x").map((p) => p.trim());
  if (parts.length >= 2) {
    return { width: parts[0], length: parts[1] };
  }
  return {};
}

function mapImages(product: StrapiProduct): string[] {
  const first = getStrapiMedia(product.product_image?.url) || PLACEHOLDER;
  const second = getStrapiMedia(product.rendering_image?.url) || PLACEHOLDER;

  // Ensure at least 2 images for hover/fade + slider thumbnails.
  return [first, second];
}

export type MapStrapiProductOptions = {
  /** 当前路由上的 collection slug（系列页/详情页），嵌套 series 无 collection 时用 */
  urlCollectionSlug?: string;
  /** series-list 返回的完整 series，优先用于生成 detailPath */
  seriesForPaths?: Series | null;
};

/** 生成详情页链接里的 collection 段：优先 CMS 里系列的 collection，否则用 URL，再否则 other */
function collectionSegmentForPaths(
  series: Series | null | undefined,
  urlCollectionSlug?: string
): string {
  const fromCms = series?.collection?.slug?.trim();
  if (fromCms) return fromCms.toLowerCase();
  const fromUrl = urlCollectionSlug?.trim();
  if (fromUrl) return fromUrl.toLowerCase();
  return ORPHAN_COLLECTION_SLUG;
}

function seriesForProduct(
  product: StrapiProduct,
  options?: MapStrapiProductOptions
): Series | null | undefined {
  return options?.seriesForPaths ?? product.series ?? null;
}

function locationField(p: StrapiProduct): string {
  return p.available_location ?? p.avaliable_location ?? "";
}

function mapFrontendProduct(
  product: StrapiProduct,
  options?: MapStrapiProductOptions
): FrontendProduct {
  const series = seriesForProduct(product, options);
  const loc = locationField(product);

  const colour = getSpecValue(product.specs, "Color No.") || "";
  const plankSize = getSpecValue(product.specs, "Plank Size") || "";
  const thickness = getSpecValue(product.specs, "Thickness") || "";

  const { length = "", width = "" } = parsePlankSize(plankSize);

  const sku = getSpecValue(product.specs, "Color No.") || product.product_name;
  const collectionName =
    series?.collection?.collection_name || series?.seriesName || loc || "";

  const collSeg = collectionSegmentForPaths(series, options?.urlCollectionSlug);
  const serSeg = seriesUrlSegment(series);
  const prodSeg = productUrlSegmentFromStrapi(product);

  return {
    slug: prodSeg,
    detailPath: buildProductDetailHref(collSeg, serSeg, prodSeg),
    seriesBackPath: seriesListingHref(collSeg, serSeg),
    name: product.product_name,
    sku,
    metaLine: series?.seriesName ? `${series.seriesName}` : loc || "",
    images: mapImages(product),

    colour,
    collection: collectionName,
    size: plankSize,
    thickness,
    length,
    width,

    description: "",
  };
}

export function mapStrapiProductToFrontend(
  product: StrapiProduct,
  options?: MapStrapiProductOptions
): FrontendProduct {
  return mapFrontendProduct(product, options);
}

/** Strapi 详情页专用展示数据 */
export type StrapiProductDetailVM = {
  name: string;
  productImageUrl: string;
  renderingImageUrl: string;
  documents: { id: string; name: string; url: string }[];
  specRows: { label: string; value: string }[];
};

export function buildStrapiProductDetailVM(p: StrapiProduct): StrapiProductDetailVM {
  return {
    name: p.product_name,
    productImageUrl: getStrapiMedia(p.product_image?.url) || PLACEHOLDER,
    renderingImageUrl: getStrapiMedia(p.rendering_image?.url) || PLACEHOLDER,
    documents: (p.Documents ?? []).map((d) => ({
      id: String(d.id),
      name: d.name?.trim() || "Document",
      url: getStrapiMedia(d.url),
    })),
    specRows: (p.specs ?? []).map((s) => ({
      label: s.label,
      value: s.value,
    })),
  };
}

