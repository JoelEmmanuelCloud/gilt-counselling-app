'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import axios from 'axios';
import { useToast } from '@/components/ui/Toast';
import TestimonialImageUpload from '@/components/admin/TestimonialImageUpload';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import Skeleton from '@/components/ui/Skeleton';
import {
  CATEGORY_LABELS,
  CATEGORY_PAGES,
  STORY_CATEGORIES,
  TESTIMONIAL_CATEGORIES,
  TestimonialCategory as Category,
  isStoryCategory,
} from '@/lib/testimonialCategories';


interface SchoolQuote {
  text: string;
  role: string;
}

interface Testimonial {
  _id: string;
  category: Category;
  published: boolean;
  order: number;
  quote?: string;
  name?: string;
  service?: string;
  date?: string;
  school?: string;
  quotes?: SchoolQuote[];
  title?: string;
  organization?: string;
  description?: string;
  images?: string[];
  videoUrl?: string;
}

interface FormState {
  section: Category;
  quote: string;
  name: string;
  service: string;
  date: string;
  school: string;
  quotes: SchoolQuote[];
  title: string;
  organization: string;
  description: string;
  images: string[];
  videoUrl: string;
  published: boolean;
  order: number;
}

const emptyForm = (section: Category): FormState => ({
  section,
  quote: '',
  name: '',
  service: '',
  date: '',
  school: '',
  quotes: [{ text: '', role: '' }],
  title: '',
  organization: '',
  description: '',
  images: [],
  videoUrl: '',
  published: true,
  order: 0,
});

const toFormState = (item: Testimonial): FormState => ({
  section: item.category,
  quote: item.quote || '',
  name: item.name || '',
  service: item.service || '',
  date: item.date || '',
  school: item.school || '',
  quotes: item.quotes && item.quotes.length > 0 ? item.quotes : [{ text: '', role: '' }],
  title: item.title || '',
  organization: item.organization || '',
  description: item.description || '',
  images: item.images || [],
  videoUrl: item.videoUrl || '',
  published: item.published,
  order: item.order ?? 0,
});

function AdminDashboardContent() {
  const { user, loading: authLoading } = useAuth();
  const toast = useToast();

  const [activeCategory, setActiveCategory] = useState<Category>('client');
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm('client'));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchTestimonials();
    }
    closeForm();
  }, [activeCategory, user]);

  const authHeaders = () => {
    const storedToken = localStorage.getItem('token');
    return { Authorization: `Bearer ${storedToken}` };
  };

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/testimonials', {
        params: { category: activeCategory },
        headers: authHeaders(),
      });
      setItems(response.data);
    } catch (error) {
      console.error('Failed to fetch testimonials', error);
      toast.error('Unable to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const openCreateForm = () => {
    setEditingId(null);
    setForm(emptyForm(activeCategory));
    setFormOpen(true);
  };

  const openEditForm = (item: Testimonial) => {
    setEditingId(item._id);
    setForm(toFormState(item));
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(emptyForm(activeCategory));
  };

  const buildPayload = () => {
    const base: Record<string, unknown> = {
      category: isStoryCategory(activeCategory) ? form.section : activeCategory,
      published: form.published,
      order: form.order,
    };

    if (activeCategory === 'client') {
      base.quote = form.quote;
      base.name = form.name;
      base.service = form.service;
      base.date = form.date;
    } else if (activeCategory === 'school') {
      base.school = form.school;
      base.quotes = form.quotes.filter((q) => q.text.trim() && q.role.trim());
    } else {
      base.title = form.title;
      base.organization = form.organization;
      base.date = form.date;
      base.description = form.description;
      base.images = form.images;
      base.videoUrl = form.videoUrl;
    }

    return base;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = buildPayload();
      if (editingId) {
        await axios.patch(`/api/admin/testimonials/${editingId}`, payload, {
          headers: authHeaders(),
        });
        toast.success(
          form.section !== activeCategory
            ? `Entry moved to ${CATEGORY_LABELS[form.section]}`
            : 'Entry updated successfully'
        );
      } else {
        await axios.post('/api/admin/testimonials', payload, {
          headers: authHeaders(),
        });
        toast.success('Entry added successfully');
      }
      closeForm();
      fetchTestimonials();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save testimonial');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this entry permanently? This cannot be undone.')) {
      return;
    }
    try {
      await axios.delete(`/api/admin/testimonials/${id}`, {
        headers: authHeaders(),
      });
      toast.success('Testimonial deleted');
      fetchTestimonials();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete testimonial');
    }
  };

  const handleTogglePublished = async (item: Testimonial) => {
    try {
      await axios.patch(
        `/api/admin/testimonials/${item._id}`,
        { published: !item.published },
        { headers: authHeaders() }
      );
      fetchTestimonials();
    } catch (error: any) {
      toast.error('Failed to update visibility');
    }
  };

  const updateQuoteRow = (index: number, field: keyof SchoolQuote, value: string) => {
    setForm((prev) => {
      const quotes = [...prev.quotes];
      quotes[index] = { ...quotes[index], [field]: value };
      return { ...prev, quotes };
    });
  };

  const addQuoteRow = () => {
    setForm((prev) => ({ ...prev, quotes: [...prev.quotes, { text: '', role: '' }] }));
  };

  const removeQuoteRow = (index: number) => {
    setForm((prev) => ({ ...prev, quotes: prev.quotes.filter((_, i) => i !== index) }));
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-off-white">
        <div className="w-10 h-10 border-4 border-gilt-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return <AdminLoginForm />;
  }

  return (
    <div className="min-h-screen bg-off-white py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="heading-lg">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Add, edit, and publish testimonials, outreach stories, media features, and news.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200">
          {TESTIMONIAL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                activeCategory === cat
                  ? 'border-gilt-gold text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <p className="-mt-3 mb-4 text-sm text-gray-600">
          Shown on the{' '}
          <a
            href={CATEGORY_PAGES[activeCategory].href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gray-900 underline decoration-soft-terracotta decoration-2 underline-offset-4"
          >
            {CATEGORY_PAGES[activeCategory].label}
          </a>{' '}
          page.
        </p>

        <div className="flex justify-end mb-4">
          {!formOpen && (
            <button
              onClick={openCreateForm}
              className="px-4 py-2.5 rounded-lg font-medium bg-soft-terracotta text-gray-900 hover:bg-soft-terracotta/90 transition"
            >
              + Add New
            </button>
          )}
        </div>

        {formOpen && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-calm mb-8 space-y-4">
            <h2 className="heading-sm">
              {editingId ? 'Edit Entry' : 'Add New Entry'}
            </h2>

            {activeCategory === 'client' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quote</label>
                  <textarea
                    required
                    rows={4}
                    value={form.quote}
                    onChange={(e) => setForm({ ...form, quote: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-soft-terracotta/40 focus:border-gray-900"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-soft-terracotta/40 focus:border-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                    <input
                      type="text"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      placeholder="Individual Counselling"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-soft-terracotta/40 focus:border-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="text"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      placeholder="November 2025"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-soft-terracotta/40 focus:border-gray-900"
                    />
                  </div>
                </div>
              </>
            )}

            {activeCategory === 'school' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                  <input
                    required
                    type="text"
                    value={form.school}
                    onChange={(e) => setForm({ ...form, school: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-soft-terracotta/40 focus:border-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quotes</label>
                  <div className="space-y-3">
                    {form.quotes.map((q, index) => (
                      <div key={index} className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
                        <textarea
                          rows={2}
                          placeholder="Quote text"
                          value={q.text}
                          onChange={(e) => updateQuoteRow(index, 'text', e.target.value)}
                          className="flex-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-soft-terracotta/40 focus:border-gray-900"
                        />
                        <input
                          type="text"
                          placeholder="Role (Student, Principal...)"
                          value={q.role}
                          onChange={(e) => updateQuoteRow(index, 'role', e.target.value)}
                          className="w-full sm:w-48 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-soft-terracotta/40 focus:border-gray-900"
                        />
                        {form.quotes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeQuoteRow(index)}
                            className="text-red-600 text-sm px-2"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={addQuoteRow}
                    className="mt-2 text-sm text-gilt-gold font-medium"
                  >
                    + Add another quote
                  </button>
                </div>
              </>
            )}

            {isStoryCategory(activeCategory) && (
              <>
                <div>
                  <label htmlFor="entry-section" className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                  <select
                    id="entry-section"
                    value={form.section}
                    onChange={(e) => setForm({ ...form, section: e.target.value as Category })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 focus:outline-none focus:ring-4 focus:ring-soft-terracotta/40 focus:border-gray-900"
                  >
                    {STORY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {CATEGORY_LABELS[cat]} ({CATEGORY_PAGES[cat].label} page)
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    required
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-soft-terracotta/40 focus:border-gray-900"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization / Location</label>
                    <input
                      type="text"
                      value={form.organization}
                      onChange={(e) => setForm({ ...form, organization: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-soft-terracotta/40 focus:border-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="text"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      placeholder="June 2026"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-soft-terracotta/40 focus:border-gray-900"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={4}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-soft-terracotta/40 focus:border-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
                  <TestimonialImageUpload
                    images={form.images}
                    onChange={(images) => setForm({ ...form, images })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video URL (optional)</label>
                  <input
                    type="text"
                    value={form.videoUrl}
                    onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                    placeholder="/videos/event.mp4"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-4 focus:ring-soft-terracotta/40 focus:border-gray-900"
                  />
                </div>
              </>
            )}

            <div className="flex items-center gap-2">
              <input
                id="published"
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-gilt-gold focus:outline-none focus:ring-4 focus:ring-soft-terracotta/40 focus:border-gray-900"
              />
              <label htmlFor="published" className="text-sm text-gray-700">
                Published (visible on the public testimonials page)
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2.5 rounded-lg font-medium bg-soft-terracotta text-gray-900 hover:bg-soft-terracotta/90 transition disabled:opacity-50"
              >
                {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Entry'}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="px-5 py-2.5 rounded-lg font-medium border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="space-y-4" role="status" aria-live="polite">
            <span className="sr-only">Loading entries</span>
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-white rounded-lg p-5 shadow-calm flex flex-col sm:flex-row sm:items-start gap-4" aria-hidden="true">
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
                <div className="flex sm:flex-col gap-2 flex-shrink-0">
                  <Skeleton className="h-7 w-20 rounded-full" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No entries yet in this category. Click &ldquo;Add New&rdquo; to create the first one.
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item._id} className="bg-white rounded-lg p-5 shadow-calm flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  {item.category === 'client' && (
                    <>
                      <p className="text-gray-800 italic line-clamp-2">&ldquo;{item.quote}&rdquo;</p>
                      <p className="text-sm text-gray-500 mt-1">{item.name} · {item.service} · {item.date}</p>
                    </>
                  )}
                  {item.category === 'school' && (
                    <>
                      <p className="font-semibold text-gray-900">{item.school}</p>
                      <p className="text-sm text-gray-500 mt-1">{item.quotes?.length || 0} quote(s)</p>
                    </>
                  )}
                  {isStoryCategory(item.category) && (
                    <>
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.organization} {item.date && `· ${item.date}`} · {item.images?.length || 0} photo(s)
                      </p>
                    </>
                  )}
                </div>
                <div className="flex sm:flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleTogglePublished(item)}
                    className={`px-3 py-1.5 text-xs rounded-full font-medium ${
                      item.published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {item.published ? 'Published' : 'Hidden'}
                  </button>
                  <button
                    onClick={() => openEditForm(item)}
                    className="px-3 py-1.5 text-xs rounded-full font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-3 py-1.5 text-xs rounded-full font-medium bg-red-50 text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return <AdminDashboardContent />;
}
