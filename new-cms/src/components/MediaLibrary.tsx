"use client";

import { useState, useRef } from "react";
import { Upload, Database, Loader2 } from "lucide-react";
import Image from "next/image";
import { uploadImage, uploadFile, type UploadResult } from "@/lib/content-client";

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  path?: string;
  size: string;
}

export function MediaLibrary() {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [lastResult, setLastResult] = useState<UploadResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setLastResult(null);

    try {
      const file = files[0];
      const isImage = file.type.startsWith("image/");
      const data = isImage ? await uploadImage(file) : await uploadFile(file);
      setLastResult(data);

      const previewUrl =
        data.signed_url || data.url || (isImage ? URL.createObjectURL(file) : "");
      const newItem: MediaItem = {
        id: `${Date.now()}-${file.name}`,
        filename: file.name,
        url: previewUrl || "",
        path: data.path,
        size: formatFileSize(file.size),
      };

      setImages((prev) => [newItem, ...prev]);
    } catch (error) {
      console.error("Upload failed:", error);
      alert(error instanceof Error ? error.message : "Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative min-h-screen flex-1 bg-gray-50 p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-green-700">Media library</h1>
          <p className="text-gray-600">Upload images or files; use the returned path when saving content.</p>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm">
          <Database className="h-5 w-5 text-yellow-600" />
          <div>
            <div className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
              This session
            </div>
            <div className="text-sm font-semibold text-gray-900">{images.length} file(s) uploaded</div>
          </div>
        </div>
      </div>

      {lastResult?.path ? (
        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-900">
          <p className="font-medium">Latest upload path (paste into collection / series / product forms)</p>
          <code className="mt-2 block break-all text-xs">{lastResult.path}</code>
        </div>
      ) : null}

      <section className="mb-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Upload</h2>
        <div
          onClick={handleUploadClick}
          className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-12 text-center transition-colors hover:border-green-500 hover:bg-green-50/50"
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-12 w-12 animate-spin text-green-600" />
              <p className="text-gray-600">Uploading…</p>
            </div>
          ) : (
            <>
              <Upload className="mx-auto mb-3 h-12 w-12 text-gray-400" />
              <p className="text-gray-500">
                Click to upload (images use /upload/image, other files use /upload/file)
              </p>
            </>
          )}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Uploaded this session ({images.length})</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {images.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-square bg-gray-100">
                {image.url && image.filename.match(/\.(png|jpe?g|gif|webp|svg)$/i) ? (
                  <Image
                    src={image.url}
                    alt={image.filename}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-2 text-center text-xs text-gray-500">
                    Not an image or no preview
                  </div>
                )}
              </div>
              <div className="p-3">
                <p
                  className="mb-1 truncate text-xs font-medium text-gray-700"
                  title={image.filename}
                >
                  {image.filename}
                </p>
                <p className="text-xs text-gray-500">{image.size}</p>
                {image.path ? (
                  <p className="mt-1 break-all text-[10px] text-gray-400">{image.path}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        {images.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            <p>Uploaded files appear here; use path values in API content data fields.</p>
          </div>
        )}
      </section>
    </div>
  );
}
