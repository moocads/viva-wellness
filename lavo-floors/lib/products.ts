import productsData from "@/data/products.json";
import seriesData from "@/data/series.json";

export interface Product {
  slug: string;
  name: string;
  sku: string;
  metaLine: string;
  images: string[]; // Array of image URLs (at least 2 images)
  colour: string;
  collection: string;
  size: string;
  thickness: string;
  length: string;
  width: string;
  description: string;
}

// Import products from JSON file
export const products: Product[] = productsData as unknown as Product[];

/**
 * Dynamically calculate filter options based on products data
 */
function calculateFilterOptions() {
  const colours = new Map<string, number>();
  const collections = new Map<string, number>();
  const sizes = new Map<string, number>();
  const thicknesses = new Map<string, number>();
  const lengths = new Map<string, number>();
  const widths = new Map<string, number>();

  products.forEach((product) => {
    colours.set(product.colour, (colours.get(product.colour) || 0) + 1);
    collections.set(product.collection, (collections.get(product.collection) || 0) + 1);
    sizes.set(product.size, (sizes.get(product.size) || 0) + 1);
    thicknesses.set(product.thickness, (thicknesses.get(product.thickness) || 0) + 1);
    lengths.set(product.length, (lengths.get(product.length) || 0) + 1);
    widths.set(product.width, (widths.get(product.width) || 0) + 1);
  });

  return {
    colours: Array.from(colours.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => a.value.localeCompare(b.value)),
    collections: Array.from(collections.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => a.value.localeCompare(b.value)),
    sizes: Array.from(sizes.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => a.value.localeCompare(b.value)),
    thicknesses: Array.from(thicknesses.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => a.value.localeCompare(b.value)),
    lengths: Array.from(lengths.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => a.value.localeCompare(b.value)),
    widths: Array.from(widths.entries())
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => a.value.localeCompare(b.value)),
  };
}

export const filterOptions = calculateFilterOptions();

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getRelatedProducts(currentSlug: string, limit: number = 4): Product[] {
  return products.filter(p => p.slug !== currentSlug).slice(0, limit);
}

/**
 * Get all unique series/collections from products
 */
export function getAllSeries(): string[] {
  const seriesSet = new Set(products.map(p => p.collection));
  return Array.from(seriesSet).sort();
}

/**
 * Convert series name to URL-friendly slug
 * Example: "Series A" -> "series-a"
 */
export function seriesToSlug(series: string): string {
  return series.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Convert URL slug back to series name
 * Example: "series-a" -> "Series A"
 */
export function slugToSeries(slug: string): string | null {
  const allSeries = getAllSeries();
  const normalizedSlug = slug.toLowerCase();
  
  // Find matching series by comparing slugs
  const matchingSeries = allSeries.find(s => seriesToSlug(s) === normalizedSlug);
  return matchingSeries || null;
}

/**
 * Series information interface
 */
export interface SeriesFeature {
  icon: string; // SVG file path (e.g., "cloud.svg") or emoji
  color?: string; // Optional color for SVG icons (e.g., "#000000", "currentColor")
  title: string;
  description: string;
}

export interface Series {
  name: string;
  bannerImage: string;
  description: string;
  featuresTitle: string;
  features: SeriesFeature[];
}

// Import series data from JSON file
export const series: Series[] = seriesData as unknown as Series[];

/**
 * Get series information by name
 */
export function getSeriesByName(name: string): Series | undefined {
  return series.find(s => s.name === name);
}
