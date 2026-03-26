export type ContentRecord = {
  id: string | number;
  language?: string;
  translation_group_id?: string;
  data: Record<string, unknown>;
  raw: Record<string, unknown>;
};

function asRecord(v: unknown): Record<string, unknown> | null {
  if (v && typeof v === "object" && !Array.isArray(v)) {
    return v as Record<string, unknown>;
  }
  return null;
}

export function normalizeOne(row: unknown): ContentRecord | null {
  const r = asRecord(row);
  if (!r) return null;
  const id = r.id;
  if (id === undefined || id === null) return null;
  if (typeof id !== "string" && typeof id !== "number") return null;
  const dataObj = asRecord(r.data) ?? {};
  return {
    id,
    language: typeof r.language === "string" ? r.language : undefined,
    translation_group_id:
      typeof r.translation_group_id === "string"
        ? r.translation_group_id
        : undefined,
    data: dataObj,
    raw: r,
  };
}

export function normalizeList(raw: unknown): ContentRecord[] {
  if (Array.isArray(raw)) {
    return raw.map(normalizeOne).filter(Boolean) as ContentRecord[];
  }
  const root = asRecord(raw);
  if (!root) return [];
  const arr =
    (Array.isArray(root.data) ? root.data : null) ??
    (Array.isArray(root.items) ? root.items : null) ??
    (Array.isArray(root.records) ? root.records : null) ??
    (Array.isArray(root.results) ? root.results : null);
  if (!arr) return [];
  return arr.map(normalizeOne).filter(Boolean) as ContentRecord[];
}
