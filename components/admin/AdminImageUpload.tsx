'use client';

import React, { useRef, useState } from 'react';

interface AdminImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
  onImageRemoved?: () => void;
  // Subfolder under public/uploads to store the file in (must be allowlisted server-side).
  folder?: 'gallery' | 'articles';
}

export default function AdminImageUpload({
  onImageUploaded,
  currentImageUrl,
  onImageRemoved,
  folder = 'gallery',
}: AdminImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPEG, PNG, and WebP files are allowed.');
      return;
    }

    const maxSize = 8 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewUrl(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', folder);

      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/upload-image', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      onImageUploaded(data.imageUrl);
    } catch (err: any) {
      setError(err.message || 'Failed to upload image');
      setPreviewUrl(currentImageUrl || null);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageRemoved?.();
  };

  return (
    <div className="space-y-3">
      {/* The label is the click target — clicking it natively opens the file
          picker, so no JS .click() is needed (more reliable across browsers). */}
      <label
        className={`relative block w-full max-w-md aspect-video rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 cursor-pointer ${
          uploading ? 'pointer-events-none opacity-70' : ''
        }`}
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-6 text-center">
            <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm font-medium">Click to upload an image</p>
            <p className="text-xs mt-1">JPEG, PNG or WebP · max 8MB</p>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
            <div className="w-8 h-8 border-2 border-gilt-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
        />
      </label>

      <div className="flex items-center gap-2">
        <label
          className={`px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition cursor-pointer inline-block ${
            uploading ? 'pointer-events-none opacity-50' : ''
          }`}
        >
          {previewUrl ? 'Change Image' : 'Upload Image'}
          <input
            type="file"
            onChange={handleFileSelect}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
          />
        </label>
        {previewUrl && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={uploading}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-700 transition disabled:opacity-50"
          >
            Remove
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
