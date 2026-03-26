/** URL / 路由用：产品名等 → kebab-case（如 LV121-Aston → lv121-aston） */
export function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
