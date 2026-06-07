'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';
import AdminImageUpload from '@/components/admin/AdminImageUpload';

interface GalleryItem {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  order?: number;
  createdAt: string;
}

const CATEGORIES = ['General', 'Events', 'Outreach', 'Workshops', 'Team'];

const emptyForm = {
  title: '',
  description: '',
  imageUrl: '',
  category: 'General',
};

export default function GalleryManager() {
  const toast = useToast();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const authHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/admin/gallery', authHeaders());
      setItems(res.data);
    } catch (error) {
      console.error('Failed to fetch gallery', error);
      toast.error('Failed to load gallery items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (item: GalleryItem) => {
    setForm({
      title: item.title,
      description: item.description || '',
      imageUrl: item.imageUrl,
      category: item.category || 'General',
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.imageUrl) {
      toast.error('Please upload an image first.');
      return;
    }
    setSubmitting(true);
    try {
      if (editingId) {
        await axios.patch(`/api/admin/gallery/${editingId}`, form, authHeaders());
        toast.success('Gallery item updated.');
      } else {
        await axios.post('/api/admin/gallery', form, authHeaders());
        toast.success('Image added to gallery.');
      }
      resetForm();
      fetchItems();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save gallery item.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Remove this image from the gallery?')) return;
    try {
      await axios.delete(`/api/admin/gallery/${id}`, authHeaders());
      toast.success('Image removed.');
      fetchItems();
    } catch (error) {
      console.error('Failed to delete gallery item', error);
      toast.error('Failed to remove image.');
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="heading-md">Gallery Management</h2>
          <p className="text-gray-600 text-sm mt-1">{items.length} image{items.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="px-4 py-2 bg-gilt-gold text-white rounded-lg hover:bg-gilt-orange transition"
        >
          {showForm ? 'Cancel' : '+ Add Image'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-warm-cream rounded-lg">
          <h3 className="font-semibold text-lg mb-4">{editingId ? 'Edit Image' : 'Add New Image'}</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Image *</label>
            <AdminImageUpload
              folder="gallery"
              currentImageUrl={form.imageUrl || undefined}
              onImageUploaded={(url) => setForm({ ...form, imageUrl: url })}
              onImageRemoved={() => setForm({ ...form, imageUrl: '' })}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title *"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <textarea
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border rounded-lg mt-4"
          />
          <button
            type="submit"
            disabled={submitting}
            className="mt-4 px-6 py-2 bg-gilt-gold text-white rounded-lg hover:bg-gilt-orange transition disabled:opacity-50"
          >
            {submitting ? 'Saving...' : editingId ? 'Update Image' : 'Add to Gallery'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-soft-gold mb-4"></div>
          <p className="text-gray-600">Loading gallery...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 bg-warm-cream rounded-lg">
          <p className="text-gray-600">No images yet. Add your first image above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item._id} className="group relative rounded-lg overflow-hidden border border-gray-200">
              <div className="relative aspect-square bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                <span className="inline-block mt-1 px-2 py-0.5 bg-warm-sand rounded-full text-xs">{item.category}</span>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-2 py-1 text-xs bg-white/90 text-gray-700 rounded hover:bg-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-2 py-1 text-xs bg-white/90 text-red-600 rounded hover:bg-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
