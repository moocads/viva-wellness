const CMS_API_URL = process.env.NEXT_PUBLIC_CMS_API_URL;

export function getStrapiURL(path: string): string {
  // Build/CI sometimes runs without env vars. Instead of crashing prerender,
  // return empty string and let callers fall back to placeholders.
  if (!CMS_API_URL) {
    if (/^https?:\/\//i.test(path)) return path;
    return "";
  }

  // Already a full URL (e.g. S3 signed URL)
  if (/^https?:\/\//i.test(path)) return path;

  const base = CMS_API_URL!.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

// Strapi media URLs are often relative. This ensures we always return a full URL.
export function getStrapiMedia(url?: string | null): string {
  if (!url) return "";
  if (!CMS_API_URL) {
    // If env missing, keep relative URLs from crashing Image; caller will use placeholders.
    if (/^https?:\/\//i.test(url)) return url;
    return "";
  }
  return getStrapiURL(url);
}

// Common fetch wrapper with ISR revalidation.
export async function fetchStrapi<T>(endpoint: string): Promise<T> {
  if (!CMS_API_URL) {
    // Allow build/prerender without Strapi env vars.
    return {} as T;
  }

  const fullURL = /^https?:\/\//i.test(endpoint) ? endpoint : getStrapiURL(endpoint);

  const res = await fetch(fullURL, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Strapi request failed: ${res.status} ${res.statusText}. ${text}`
    );
  }

  return (await res.json()) as T;
}

