'use client';

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useToast } from '@/components/ui/Toast';

interface ProfilePhotoUploadProps {
  currentPhoto?: string;
  onPhotoUpdate: (newPhotoUrl: string) => void;
}

export default function ProfilePhotoUpload({ currentPhoto, onPhotoUpdate }: ProfilePhotoUploadProps) {
  const toast = useToast();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.warning('Please select a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.warning('File size must be less than 5MB');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('profilePhoto', file);

      const token = localStorage.getItem('token');
      const response = await axios.post('/api/profile/upload-photo', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      onPhotoUpdate(response.data.photoUrl);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      toast.success('Profile photo updated successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to upload photo');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = async () => {
    if (!window.confirm('Are you sure you want to remove your profile photo?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete('/api/profile/upload-photo', {
        headers: { Authorization: `Bearer ${token}` },
      });

      onPhotoUpdate('');
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      toast.success('Profile photo removed successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to remove photo');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Current/Preview Photo */}
        <div className="relative">
          <img
            src={preview || currentPhoto || '/default-avatar.svg'}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
        </div>

        {/* Upload Controls */}
        <div className="flex-1">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            id="photo-upload"
          />

          <div className="space-y-2">
            <label
              htmlFor="photo-upload"
              className="inline-block px-4 py-2 bg-gilt-gold text-white rounded-lg cursor-pointer hover:bg-gilt-orange transition"
            >
              Choose Photo
            </label>

            {preview && (
              <div className="flex gap-2">
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="px-4 py-2 bg-olive-green text-white rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
                <button
                  onClick={() => {
                    setPreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            )}

            {currentPhoto && !preview && (
              <button
                onClick={handleRemove}
                className="block px-4 py-2 text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove Photo
              </button>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Recommended: Square image, at least 400x400px. Max 5MB. JPG, PNG, or WebP.
          </p>
        </div>
      </div>
    </div>
  );
}
