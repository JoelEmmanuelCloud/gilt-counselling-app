'use client';

import React, { useRef, useState } from 'react';

interface TestimonialImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export default function TestimonialImageUpload({
  images,
  onChange,
  maxImages = 8,
}: TestimonialImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setError(null);

    if (images.length + files.length > maxImages) {
      setError(`You can upload a maximum of ${maxImages} images.`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 8 * 1024 * 1024;

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        setError('Only JPEG, PNG, and WebP files are allowed.');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      if (file.size > maxSize) {
        setError('Each file must be less than 8MB.');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
    }

    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/api/admin/testimonials/upload', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Upload failed');
        }

        uploadedUrls.push(data.url);
      }

      onChange([...images, ...uploadedUrls]);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = (url: string) => {
    onChange(images.filter((image) => image !== url));
  };

  return (
    <div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
        {images.map((url) => (
          <div key={url} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => handleRemove(url)}
              className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-black/60 text-white text-xs hover:bg-black/80 transition"
            >
              ×
            </button>
          </div>
        ))}
        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-1 text-gray-400 hover:border-gilt-gold hover:text-gilt-gold transition disabled:opacity-50"
          >
            {uploading ? (
              <div className="w-5 h-5 border-2 border-gilt-gold border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="text-2xl leading-none">+</span>
                <span className="text-xs">Add image</span>
              </>
            )}
          </button>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFilesSelect}
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
