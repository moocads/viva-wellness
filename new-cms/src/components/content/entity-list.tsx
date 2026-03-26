"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Loader2, AlertCircle } from "lucide-react";
import { listContent } from "@/lib/content-client";
import type { ContentRecord } from "@/lib/normalize-content";

export function EntityList({
  slug,
  title,
  description,
  labelKey,
  newHref,
  editPathPrefix,
}: {
  slug: string;
  title: string;
  description?: string;
  labelKey: string;
  newHref: string;
  /** e.g. `/collections/` → links to `/collections/{id}` */
  editPathPrefix: string;
}) {
  const [rows, setRows] = useState<ContentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listContent(slug);
      setRows(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    load();
  }, [load]);

  function labelFor(row: ContentRecord): string {
    const v = row.data[labelKey];
    if (typeof v === "string" && v.trim()) return v;
    return `#${row.id}`;
  }

  return (
    <div className="min-h-screen flex-1 bg-gray-50 p-8">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">{title}</h1>
          {description ? <p className="text-gray-600">{description}</p> : null}
        </div>
        <Link
          href={newHref}
          className="inline-flex items-center gap-2 rounded-lg bg-[#005daa] px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
        >
          <Plus className="h-4 w-4" />
          New
        </Link>
      </div>

      {error ? (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <div>
            <p className="font-medium">Could not load data</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      ) : null}

      {loading ? (
        <div className="flex items-center gap-2 text-gray-600">
          <Loader2 className="h-6 w-6 animate-spin" />
          Loading…
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-700">ID</th>
                <th className="px-4 py-3 font-medium text-gray-700">Name</th>
                <th className="px-4 py-3 font-medium text-gray-700">Language</th>
                <th className="w-28 px-4 py-3 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-gray-500">
                    No items yet. Click New to add one.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={String(row.id)} className="border-b border-gray-100 last:border-0">
                    <td className="px-4 py-3 text-gray-600">{String(row.id)}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{labelFor(row)}</td>
                    <td className="px-4 py-3 text-gray-600">{row.language ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Link
                        href={`${editPathPrefix}${encodeURIComponent(String(row.id))}`}
                        className="inline-flex items-center gap-1 text-[#005daa] hover:underline"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
