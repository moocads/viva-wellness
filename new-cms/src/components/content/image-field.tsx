"use client";

import { useState } from "react";
import { uploadImage } from "@/lib/content-client";
import { Loader2, Upload } from "lucide-react";

export function ImagePathField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (path: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const displaySrc =
    value && (value.startsWith("http://") || value.startsWith("https://"))
      ? value
      : null;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50">
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
          ) : (
            <Upload className="h-4 w-4 text-gray-500" />
          )}
          <span>Upload image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={busy}
            onChange={async (e) => {
              const f = e.target.files?.[0];
              e.target.value = "";
              if (!f) return;
              setBusy(true);
              try {
                const r = await uploadImage(f);
                if (r.path) onChange(r.path);
              } catch (err) {
                alert(err instanceof Error ? err.message : "Upload failed");
              } finally {
                setBusy(false);
              }
            }}
          />
        </label>
        {value ? (
          <button
            type="button"
            className="text-sm text-red-600 hover:underline"
            onClick={() => onChange("")}
          >
            Clear
          </button>
        ) : null}
      </div>
      {value ? (
        <p className="break-all text-xs text-gray-500">{value}</p>
      ) : null}
      {displaySrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={displaySrc} alt="" className="mt-2 max-h-40 rounded border object-contain" />
      ) : null}
    </div>
  );
}
