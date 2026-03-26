"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Trash2 } from "lucide-react";
import {
  createContent,
  updateContent,
  deleteContent,
  getContent,
  extractCreatedId,
  listContent,
} from "@/lib/content-client";
import { LAVO_CONTENT_SLUGS } from "@/lib/lavo-slugs";
import type { ContentRecord } from "@/lib/normalize-content";
import { ImagePathField } from "./image-field";

const SLUG = LAVO_CONTENT_SLUGS.series;
const COL_SLUG = LAVO_CONTENT_SLUGS.collection;

function normalizeRelationIds(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String);
  if (v != null && v !== "") return [String(v)];
  return [];
}

export function SeriesForm({ id }: { id?: string }) {
  const router = useRouter();
  const isNew = !id;
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [collections, setCollections] = useState<ContentRecord[]>([]);
  const [language, setLanguage] = useState("en");
  const [translationGroupId, setTranslationGroupId] = useState<string | undefined>();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [coverImage, setCoverImage] = useState("");
  const [collectionIds, setCollectionIds] = useState<string[]>([]);

  useEffect(() => {
    listContent(COL_SLUG)
      .then(setCollections)
      .catch(() => setCollections([]));
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
        setTitle(typeof d.title === "string" ? d.title : "");
        setSlug(typeof d.slug === "string" ? d.slug : "");
        setDescription(typeof d.description === "string" ? d.description : "");
        setSortOrder(d.sort_order != null ? String(d.sort_order) : "");
        const ci = d.cover_image;
        setCoverImage(typeof ci === "string" ? ci : "");
        setCollectionIds(normalizeRelationIds(d.collection_id));
      } catch (e) {
        alert(e instanceof Error ? e.message : "Failed to load");
        router.push("/series");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, isNew, router]);

  function toggleCollection(cid: string) {
    setCollectionIds((prev) =>
      prev.includes(cid) ? prev.filter((x) => x !== cid) : [...prev, cid]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (collectionIds.length === 0) {
      alert("Select at least one collection.");
      return;
    }
    setSaving(true);
    const numericIds = collectionIds.map((x) => Number(x)).filter((n) => !Number.isNaN(n));
    const data: Record<string, unknown> = {
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
      cover_image: coverImage.trim() || undefined,
      collection_id: numericIds.length === collectionIds.length ? numericIds : collectionIds,
    };
    const so = parseInt(sortOrder, 10);
    if (!Number.isNaN(so)) data.sort_order = so;

    try {
      if (isNew) {
        const json = await createContent(SLUG, { language, data });
        const newId = extractCreatedId(json);
        if (newId) router.replace(`/series/${newId}`);
        else router.push("/series");
      } else if (id) {
        await updateContent(SLUG, id, {
          language,
          translation_group_id: translationGroupId,
          data,
        });
        router.push("/series");
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!id || isNew) return;
    if (!confirm("Delete this series?")) return;
    setSaving(true);
    try {
      await deleteContent(SLUG, id);
      router.push("/series");
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
          <Link href="/series" className="text-sm text-[#005daa] hover:underline">
            ← Back to list
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            {isNew ? "New series" : "Edit series"}
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
            <label className="mb-1 block text-sm font-medium text-gray-700">Title *</label>
            <input
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Slug *</label>
            <input
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Collections * (multi-select)</label>
            <div className="max-h-48 space-y-2 overflow-y-auto rounded-md border border-gray-200 p-3">
              {collections.length === 0 ? (
                <p className="text-sm text-gray-500">No collections yet. Create one under Collections first.</p>
              ) : (
                collections.map((c) => {
                  const cid = String(c.id);
                  const name =
                    typeof c.data.title === "string" ? c.data.title : cid;
                  return (
                    <label key={cid} className="flex cursor-pointer items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={collectionIds.includes(cid)}
                        onChange={() => toggleCollection(cid)}
                      />
                      <span>{name}</span>
                    </label>
                  );
                })
              )}
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Sort order</label>
            <input
              type="number"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            />
          </div>
          <ImagePathField label="Cover image" value={coverImage} onChange={setCoverImage} />

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
