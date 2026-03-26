"use client";

import { normalizeList, normalizeOne, type ContentRecord } from "./normalize-content";

async function parseJsonResponse(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    throw new Error(text.slice(0, 200) || "Invalid JSON from API");
  }
}

function errorMessage(json: unknown, fallback: string): string {
  const o = json && typeof json === "object" ? (json as Record<string, unknown>) : null;
  if (!o) return fallback;
  const err = o.error ?? o.message;
  if (typeof err === "string") return err;
  if (err && typeof err === "object" && "message" in err && typeof (err as { message: unknown }).message === "string") {
    return (err as { message: string }).message;
  }
  return fallback;
}

export async function listContent(slug: string, search?: Record<string, string>): Promise<ContentRecord[]> {
  const u = new URL(`/api/moocads/content/${encodeURIComponent(slug)}`, window.location.origin);
  if (search) {
    Object.entries(search).forEach(([k, v]) => {
      if (v !== undefined && v !== "") u.searchParams.set(k, v);
    });
  }
  const res = await fetch(u.toString());
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(errorMessage(json, res.statusText));
  return normalizeList(json);
}

export async function getContent(slug: string, id: string): Promise<ContentRecord> {
  const res = await fetch(
    `/api/moocads/content/${encodeURIComponent(slug)}/${encodeURIComponent(id)}`
  );
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(errorMessage(json, res.statusText));
  const one = normalizeOne(json);
  if (!one) throw new Error("Unexpected record shape");
  return one;
}

export async function createContent(
  slug: string,
  body: { language?: string; translation_group_id?: string; data: Record<string, unknown> }
): Promise<unknown> {
  const res = await fetch(`/api/moocads/content/${encodeURIComponent(slug)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(errorMessage(json, res.statusText));
  return json;
}

export async function updateContent(
  slug: string,
  id: string,
  body: { language?: string; translation_group_id?: string; data: Record<string, unknown> }
): Promise<unknown> {
  const res = await fetch(
    `/api/moocads/content/${encodeURIComponent(slug)}/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(errorMessage(json, res.statusText));
  return json;
}

export async function deleteContent(slug: string, id: string): Promise<void> {
  const res = await fetch(
    `/api/moocads/content/${encodeURIComponent(slug)}/${encodeURIComponent(id)}`,
    { method: "DELETE" }
  );
  if (res.status === 204 || res.status === 200) return;
  const json = await parseJsonResponse(res);
  throw new Error(errorMessage(json, res.statusText));
}

export type UploadResult = { path?: string; url?: string | null; signed_url?: string | null };

export async function uploadImage(file: File): Promise<UploadResult> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/moocads/upload/image", { method: "POST", body: fd });
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(errorMessage(json, res.statusText));
  return json as UploadResult;
}

export function extractCreatedId(json: unknown): string | undefined {
  if (!json || typeof json !== "object") return undefined;
  const o = json as Record<string, unknown>;
  if (o.id != null) return String(o.id);
  const d = o.data;
  if (d && typeof d === "object" && (d as Record<string, unknown>).id != null) {
    return String((d as Record<string, unknown>).id);
  }
  return undefined;
}

export async function uploadFile(file: File): Promise<UploadResult> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/moocads/upload/file", { method: "POST", body: fd });
  const json = await parseJsonResponse(res);
  if (!res.ok) throw new Error(errorMessage(json, res.statusText));
  return json as UploadResult;
}
