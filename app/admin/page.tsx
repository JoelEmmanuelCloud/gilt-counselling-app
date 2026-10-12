'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import axios from 'axios';
import Image from 'next/image';
import { useToast } from '@/components/ui/Toast';
import TestimonialImageUpload from '@/components/admin/TestimonialImageUpload';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import Skeleton from '@/components/ui/Skeleton';
import {
  CATEGORY_DETAILS,
  CATEGORY_GROUPS,
  STORY_CATEGORIES,
  TestimonialCategory as Category,
  isStoryCategory,
  isTestimonialCategory,
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
  const [allItems, setAllItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm('client'));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (isTestimonialCategory(hash)) {
      setActiveCategory(hash);
    }
  }, []);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchTestimonials();
    }
  }, [user]);

  useEffect(() => {
    closeForm();
  }, [activeCategory]);

  const selectCategory = (category: Category) => {
    setActiveCategory(category);
    window.history.replaceState(null, '', `#${category}`);
  };

  const items = allItems.filter((item) => item.category === activeCategory);
  const countFor = (category: Category) => allItems.filter((item) => item.category === category).length;
  const activeDetails = CATEGORY_DETAILS[activeCategory];

  const authHeaders = () => {
    const storedToken = localStorage.getItem('token');
    return { Authorization: `Bearer ${storedToken}` };
  };

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/testimonials', {
        headers: authHeaders(),
      });
      setAllItems(Array.isArray(response.data) ? response.data : []);
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
            ? `Entry moved to ${CATEGORY_DETAILS[form.section].label}`
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="heading-lg">Content Manager</h1>
          <p className="text-gray-600 mt-1">
            Manage the testimonials, outreach stories, events, and media features published across the website.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
          <nav aria-label="Content sections" className="mb-6 lg:mb-0">
            <label htmlFor="section-select" className="sr-only">Content section</label>
            <select
              id="section-select"
              value={activeCategory}
              onChange={(e) => selectCategory(e.target.value as Category)}
              className="block h-12 w-full rounded-md border border-gray-300 bg-white px-3 text-base text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-4 focus:ring-soft-terracotta/40 lg:hidden"
            >
              {CATEGORY_GROUPS.map((group) => (
                <optgroup key={group.page} label={`${group.page} page`}>
                  {group.categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {CATEGORY_DETAILS[cat].label} ({loading ? '…' : countFor(cat)})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>

            <div className="hidden space-y-6 lg:block">
              {CATEGORY_GROUPS.map((group) => (
                <div key={group.page}>
                  <p className="eyebrow mb-2 px-3 text-gray-500">{group.page} page</p>
                  <ul className="space-y-1">
                    {group.categories.map((cat) => {
                      const selected = cat === activeCategory;
                      return (
                        <li key={cat}>
                          <button
                            type="button"
                            onClick={() => selectCategory(cat)}
                            aria-current={selected ? 'page' : undefined}
                            className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-[15px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 ${
                              selected ? 'bg-white font-semibold text-gray-900 shadow-sm ring-1 ring-gray-200' : 'font-medium text-gray-700 hover:bg-white/70'
                            }`}
                          >
                            <span>{CATEGORY_DETAILS[cat].label}</span>
                            <span className="rounded-full bg-gray-900/5 px-2 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
                              {loading ? '–' : countFor(cat)}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          <section aria-labelledby="section-title" className="min-w-0">
            <div className="mb-6 flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="eyebrow mb-1 text-gray-500">
                  {activeDetails.page} page{activeDetails.tab ? ` › ${activeDetails.tab} tab` : ''}
                </p>
                <h2 id="section-title" className="text-xl font-semibold tracking-tight text-gray-900">
                  {activeDetails.label}
                </h2>
                <p className="mt-1 text-sm text-gray-600">{activeDetails.description}</p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-3">
                <a
                  href={activeDetails.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-900 shadow-sm transition-colors duration-150 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                >
                  View on site<span className="sr-only"> (opens in a new tab)</span>
                </a>
                {!formOpen && (
                  <button
                    type="button"
                    onClick={openCreateForm}
                    className="inline-flex h-11 items-center rounded-md bg-soft-terracotta px-4 text-sm font-semibold text-gray-900 shadow-sm transition-colors duration-150 hover:bg-soft-terracotta/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                  >
                    + Add New
                  </button>
                )}
              </div>
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
                            {CATEGORY_DETAILS[cat].label} ({CATEGORY_DETAILS[cat].page} page)
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
                No entries in {activeDetails.label} yet. Click &ldquo;Add New&rdquo; to create the first one.
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
                        <div className="flex items-start gap-4">
                          <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-md bg-warm-cream">
                            {item.images?.[0] && (
                              <Image src={item.images[0]} alt="" fill sizes="80px" className="object-cover" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-gray-900 line-clamp-2">{item.title}</p>
                            <p className="text-sm text-gray-600 mt-1">
                              {[item.organization, item.date, `${item.images?.length || 0} photo(s)`].filter(Boolean).join(' · ')}
                            </p>
                          </div>
                        </div>
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
          </section>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return <AdminDashboardContent />;
}
