"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Trash2, Plus, X } from "lucide-react";
import {
  createContent,
  updateContent,
  deleteContent,
  getContent,
  extractCreatedId,
  listContent,
  uploadFile,
} from "@/lib/content-client";
import { LAVO_CONTENT_SLUGS } from "@/lib/lavo-slugs";
import type { ContentRecord } from "@/lib/normalize-content";
import { ImagePathField } from "./image-field";

const SLUG = LAVO_CONTENT_SLUGS.product;
const SERIES_SLUG = LAVO_CONTENT_SLUGS.series;

type SpecRow = { label: string; value: string };

function parseSpecs(raw: unknown): SpecRow[] {
  if (!Array.isArray(raw)) return [{ label: "", value: "" }];
  const rows: SpecRow[] = [];
  for (const item of raw) {
    if (item && typeof item === "object") {
      const o = item as Record<string, unknown>;
      rows.push({
        label: typeof o.label === "string" ? o.label : "",
        value: typeof o.value === "string" ? o.value : "",
      });
    }
  }
  return rows.length ? rows : [{ label: "", value: "" }];
}

export function ProductForm({ id }: { id?: string }) {
  const router = useRouter();
  const isNew = !id;
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [docBusy, setDocBusy] = useState(false);
  const [seriesList, setSeriesList] = useState<ContentRecord[]>([]);
  const [language, setLanguage] = useState("en");
  const [translationGroupId, setTranslationGroupId] = useState<string | undefined>();
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [renderingImage, setRenderingImage] = useState("");
  const [availableLocation, setAvailableLocation] = useState("");
  const [seriesId, setSeriesId] = useState("");
  const [specs, setSpecs] = useState<SpecRow[]>([{ label: "", value: "" }]);
  const [documents, setDocuments] = useState<string[]>([]);

  useEffect(() => {
    listContent(SERIES_SLUG)
      .then(setSeriesList)
      .catch(() => setSeriesList([]));
  }, []);

  useEffect(() => {
    if (isNew || !id) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const rec = await getContent(SLUG, id);
        if (cancelled) return;
        setLanguage(rec.language ?? "en");
        setTranslationGroupId(rec.translation_group_id);
        const d = rec.data;
        setProductName(typeof d.product_name === "string" ? d.product_name : "");
        const pi = d.product_image;
        setProductImage(typeof pi === "string" ? pi : "");
        const ri = d.rendering_image;
        setRenderingImage(typeof ri === "string" ? ri : "");
        setAvailableLocation(
          typeof d.available_location === "string" ? d.available_location : ""
        );
        const sid = d.series_id;
        setSeriesId(sid != null ? String(sid) : "");
        setSpecs(parseSpecs(d.specs));
        const docs = d.documents;
        if (Array.isArray(docs)) {
          setDocuments(docs.filter((x): x is string => typeof x === "string"));
        } else if (typeof docs === "string" && docs) {
          setDocuments([docs]);
        } else {
          setDocuments([]);
        }
      } catch (e) {
        alert(e instanceof Error ? e.message : "Failed to load");
        router.push("/products");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, isNew, router]);

  function buildSpecsPayload(): { label: string; value: string }[] {
    return specs
      .map((s) => ({
        label: s.label.trim(),
        value: s.value.trim(),
      }))
      .filter((s) => s.label || s.value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!seriesId.trim()) {
      alert("Select a series.");
      return;
    }
    setSaving(true);
    const sid = Number(seriesId);
    const data: Record<string, unknown> = {
      product_name: productName.trim() || undefined,
      product_image: productImage.trim() || undefined,
      rendering_image: renderingImage.trim() || undefined,
      available_location: availableLocation.trim() || undefined,
      specs: buildSpecsPayload(),
      documents: documents.length ? documents : undefined,
      series_id: Number.isNaN(sid) ? seriesId.trim() : sid,
    };

    try {
      if (isNew) {
        const json = await createContent(SLUG, { language, data });
        const newId = extractCreatedId(json);
        if (newId) router.replace(`/products/${newId}`);
        else router.push("/products");
      } else if (id) {
        await updateContent(SLUG, id, {
          language,
          translation_group_id: translationGroupId,
          data,
        });
        router.push("/products");
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!id || isNew) return;
    if (!confirm("Delete this product?")) return;
    setSaving(true);
    try {
      await deleteContent(SLUG, id);
      router.push("/products");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-1 items-center justify-center bg-gray-50 p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex-1 bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link href="/products" className="text-sm text-[#005daa] hover:underline">
            ← Back to list
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            {isNew ? "New product" : "Edit product"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Language</label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Product name</label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Series *</label>
            <select
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={seriesId}
              onChange={(e) => setSeriesId(e.target.value)}
            >
              <option value="">Select…</option>
              {seriesList.map((s) => (
                <option key={String(s.id)} value={String(s.id)}>
                  {typeof s.data.title === "string" ? s.data.title : String(s.id)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Available location</label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={availableLocation}
              onChange={(e) => setAvailableLocation(e.target.value)}
            />
          </div>
          <ImagePathField label="Product image" value={productImage} onChange={setProductImage} />
          <ImagePathField label="Rendering image" value={renderingImage} onChange={setRenderingImage} />

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Specs (label / value)</label>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm text-[#005daa] hover:underline"
                onClick={() => setSpecs((p) => [...p, { label: "", value: "" }])}
              >
                <Plus className="h-4 w-4" />
                Add row
              </button>
            </div>
            <div className="space-y-2">
              {specs.map((row, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    placeholder="Label, e.g. Material"
                    className="flex-1 rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                    value={row.label}
                    onChange={(e) =>
                      setSpecs((p) =>
                        p.map((x, j) => (j === i ? { ...x, label: e.target.value } : x))
                      )
                    }
                  />
                  <input
                    placeholder="Value"
                    className="flex-1 rounded-md border border-gray-300 px-2 py-1.5 text-sm"
                    value={row.value}
                    onChange={(e) =>
                      setSpecs((p) =>
                        p.map((x, j) => (j === i ? { ...x, value: e.target.value } : x))
                      )
                    }
                  />
                  <button
                    type="button"
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-600"
                    onClick={() => setSpecs((p) => p.filter((_, j) => j !== i))}
                    aria-label="Remove row"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Documents (multiple files)</label>
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50">
              {docBusy ? (
                <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
              ) : (
                <Plus className="h-4 w-4 text-gray-500" />
              )}
              <span>Upload file</span>
              <input
                type="file"
                className="hidden"
                disabled={docBusy}
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  e.target.value = "";
                  if (!f) return;
                  setDocBusy(true);
                  try {
                    const r = await uploadFile(f);
                    const path = r.path;
                    if (path) setDocuments((p) => [...p, path]);
                  } catch (err) {
                    alert(err instanceof Error ? err.message : "Upload failed");
                  } finally {
                    setDocBusy(false);
                  }
                }}
              />
            </label>
            <ul className="mt-2 space-y-1 text-xs text-gray-600">
              {documents.map((p, i) => (
                <li key={`${p}-${i}`} className="flex items-center justify-between gap-2 break-all">
                  <span>{p}</span>
                  <button
                    type="button"
                    className="shrink-0 text-red-600 hover:underline"
                    onClick={() => setDocuments((d) => d.filter((_, j) => j !== i))}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {!isNew && translationGroupId ? (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Translation group ID</label>
              <input
                className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600"
                readOnly
                value={translationGroupId}
              />
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-[#005daa] px-5 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            {!isNew ? (
              <button
                type="button"
                disabled={saving}
                onClick={handleDelete}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-5 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
