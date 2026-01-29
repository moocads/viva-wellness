"use client";

import { useState, useRef } from "react";
import { Upload, Database, MessageCircle } from "lucide-react";
import Image from "next/image";

interface MediaItem {
  id: string;
  filename: string;
  url: string;
  size: string;
  path?: string;
}

export function MediaLibrary() {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [storageUsed, setStorageUsed] = useState("17.1 MB");
  const [storageLimit] = useState("100 MB");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // TODO: 替换为实际的 API 地址
  const UPLOAD_API = "/api/upload"; // 用户之后会提供

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    try {
      // TODO: 实现实际上传逻辑
      // const formData = new FormData();
      // formData.append('file', files[0]);
      // const response = await fetch(UPLOAD_API, {
      //   method: 'POST',
      //   body: formData,
      // });
      // const data = await response.json();
      
      // 临时模拟上传成功
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 这里应该从 API 响应中获取图片信息
      // 暂时使用本地预览
      const file = files[0];
      const url = URL.createObjectURL(file);
      const newItem: MediaItem = {
        id: Date.now().toString(),
        filename: file.name,
        url: url,
        size: formatFileSize(file.size),
      };
      
      setImages(prev => [newItem, ...prev]);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("上传失败，请重试");
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
    <div className="flex-1 p-8 bg-gray-50 min-h-screen relative">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-700 mb-2">Media Library</h1>
          <p className="text-gray-600">Manage all your uploaded images.</p>
        </div>
        
        {/* Storage Used Box */}
        <div className="bg-white border border-gray-300 rounded-lg px-4 py-3 flex items-center gap-3 shadow-sm">
          <Database className="w-5 h-5 text-yellow-600" />
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Storage Used</div>
            <div className="text-sm font-semibold text-gray-900">
              {storageUsed} / {storageLimit}
            </div>
          </div>
        </div>
      </div>

      {/* Upload New Image Section */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload New Image</h2>
        <div
          onClick={handleUploadClick}
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-green-500 hover:bg-green-50/50 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isUploading}
          />
          {isUploading ? (
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="text-gray-600">上传中...</p>
            </div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Click to Upload New Image</p>
            </>
          )}
        </div>
      </section>

      {/* All Images Section */}
      <section>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          All Images ({images.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square relative bg-gray-100">
                <Image
                  src={image.url}
                  alt={image.filename}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-700 font-medium truncate mb-1" title={image.filename}>
                  {image.filename}
                </p>
                <p className="text-xs text-gray-500">{image.size}</p>
              </div>
            </div>
          ))}
        </div>
        {images.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>还没有上传任何图片</p>
          </div>
        )}
      </section>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/your-number"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-50"
        aria-label="WhatsApp Support"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </div>
  );
}



