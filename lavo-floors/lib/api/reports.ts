import { fetchStrapi } from "@/lib/strapi";
import type { Report, StrapiListResponse } from "@/lib/types";

/**
 * Strapi `report` 集合：字段 `report_name`、`report_file`（单文件）。
 * REST 端点通常为 `/api/reports`。
 */
export async function getReports(): Promise<Report[]> {
  try {
    const res = await fetchStrapi<StrapiListResponse<Report>>(
      "/api/reports?populate=*&pagination[pageSize]=100"
    );
    return Array.isArray(res.data) ? res.data : [];
  } catch {
    return [];
  }
}
