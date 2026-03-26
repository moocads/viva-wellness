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
} from "@/lib/content-client";
import { LAVO_CONTENT_SLUGS } from "@/lib/lavo-slugs";
import { ImagePathField } from "./image-field";

const SLUG = LAVO_CONTENT_SLUGS.collection;

export function CollectionForm({ id }: { id?: string }) {
  const router = useRouter();
  const isNew = !id;
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [language, setLanguage] = useState("en");
  const [translationGroupId, setTranslationGroupId] = useState<string | undefined>();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [coverImage, setCoverImage] = useState("");

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
      } catch (e) {
        alert(e instanceof Error ? e.message : "Failed to load");
        router.push("/collections");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, isNew, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const data: Record<string, unknown> = {
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
      cover_image: coverImage.trim() || undefined,
    };
    const so = parseInt(sortOrder, 10);
    if (!Number.isNaN(so)) data.sort_order = so;

    try {
      if (isNew) {
        const json = await createContent(SLUG, {
          language,
          data,
        });
        const newId = extractCreatedId(json);
        if (newId) router.replace(`/collections/${newId}`);
        else router.push("/collections");
      } else if (id) {
        await updateContent(SLUG, id, {
          language,
          translation_group_id: translationGroupId,
          data,
        });
        router.push("/collections");
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!id || isNew) return;
    if (!confirm("Delete this collection? Linked series may be affected.")) return;
    setSaving(true);
    try {
      await deleteContent(SLUG, id);
      router.push("/collections");
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
          <Link href="/collections" className="text-sm text-[#005daa] hover:underline">
            ← Back to list
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            {isNew ? "New collection" : "Edit collection"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Language</label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="en"
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
