'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/AuthContext';
import axios from 'axios';
import Image from 'next/image';
import { useToast } from '@/components/ui/Toast';
import TestimonialImageUpload from '@/components/admin/TestimonialImageUpload';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import Skeleton from '@/components/ui/Skeleton';
import Pagination from '@/components/ui/Pagination';
import TeamManager, { StaffMemberRecord } from '@/components/admin/TeamManager';
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

const ADMIN_PAGE_SIZE = 5;

const GROUP_STYLES: Record<string, { dot: string; bar: string; chip: string; chipDark: string; text: string; ring: string; icon: string }> = {
  Testimonies: {
    dot: 'bg-gilt-teal',
    bar: 'bg-gilt-teal',
    chip: 'bg-gilt-teal/15 text-gilt-teal-strong',
    chipDark: 'bg-gilt-teal/20 text-gilt-teal',
    text: 'text-gilt-teal-strong',
    ring: 'ring-gilt-teal',
    icon: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z',
  },
  Outreach: {
    dot: 'bg-gilt-green',
    bar: 'bg-gilt-green',
    chip: 'bg-gilt-green/15 text-gilt-green-strong',
    chipDark: 'bg-gilt-green/20 text-gilt-green',
    text: 'text-gilt-green-strong',
    ring: 'ring-gilt-green',
    icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
  },
  'News & Media': {
    dot: 'bg-gilt-orange',
    bar: 'bg-gilt-orange',
    chip: 'bg-gilt-orange/20 text-gilt-orange-strong',
    chipDark: 'bg-gilt-orange/20 text-gilt-orange',
    text: 'text-gilt-orange-strong',
    ring: 'ring-gilt-orange',
    icon: 'M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46',
  },
};

const CATEGORY_ICONS: Record<Category, string> = {
  client: 'M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z',
  school: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  community: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
  event: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5',
  media: 'M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46',
};

const TEAM_ICON = 'M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z';

const SIDEBAR_STORAGE_KEY = 'admin-sidebar-collapsed';

const entryTitle = (item: Testimonial) => {
  if (item.category === 'client') return item.name || 'Client testimonial';
  if (item.category === 'school') return item.school || 'School';
  return item.title || 'Untitled entry';
};

const entrySummary = (item: Testimonial) => {
  if (item.category === 'client') {
    const meta = [item.service, item.date].filter(Boolean).join(' · ');
    const quote = item.quote ? `“${item.quote}”` : '';
    return [meta, quote].filter(Boolean).join(' — ');
  }
  if (item.category === 'school') {
    const count = item.quotes?.length || 0;
    return `${count} ${count === 1 ? 'quote' : 'quotes'}`;
  }
  const photos = item.images?.length || 0;
  return [item.organization, item.date, `${photos} ${photos === 1 ? 'photo' : 'photos'}`].filter(Boolean).join(' · ');
};

function AdminDashboardContent() {
  const { user, loading: authLoading, logout } = useAuth();
  const toast = useToast();

  const [activeCategory, setActiveCategory] = useState<Category>('client');
  const [allItems, setAllItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm('client'));
  const [saving, setSaving] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [staff, setStaff] = useState<StaffMemberRecord[]>([]);
  const [staffLoading, setStaffLoading] = useState(true);

  useEffect(() => {
    try {
      setSidebarCollapsed(localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true');
    } catch {}
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed((previous) => {
      const next = !previous;
      try {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'team') {
      setShowTeam(true);
    } else if (isTestimonialCategory(hash)) {
      setActiveCategory(hash);
    }
  }, []);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchTestimonials();
      fetchStaff();
    }
  }, [user]);

  useEffect(() => {
    if (user?.role !== 'admin') return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [user]);

  const [page, setPage] = useState(1);

  useEffect(() => {
    closeForm();
    setPage(1);
  }, [activeCategory]);

  const selectCategory = (category: Category) => {
    setShowTeam(false);
    setActiveCategory(category);
    window.history.replaceState(null, '', `#${category}`);
  };

  const selectTeam = () => {
    closeForm();
    setShowTeam(true);
    window.history.replaceState(null, '', '#team');
  };

  const handleSectionSelect = (value: string) => {
    if (value === 'team') {
      selectTeam();
    } else if (isTestimonialCategory(value)) {
      selectCategory(value);
    }
  };

  const items = allItems.filter((item) => item.category === activeCategory);
  const totalPages = Math.max(1, Math.ceil(items.length / ADMIN_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = items.slice((currentPage - 1) * ADMIN_PAGE_SIZE, currentPage * ADMIN_PAGE_SIZE);

  const changePage = (nextPage: number) => {
    setPage(Math.min(Math.max(1, nextPage), totalPages));
    document.getElementById('section-title')?.scrollIntoView({ block: 'center' });
  };
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

  const fetchStaff = async () => {
    try {
      setStaffLoading(true);
      const response = await axios.get('/api/admin/staff', {
        headers: authHeaders(),
      });
      setStaff(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Failed to fetch team members', error);
      toast.error('Unable to load team members');
    } finally {
      setStaffLoading(false);
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

  const groupStats = CATEGORY_GROUPS.map((group) => {
    const groupItems = allItems.filter((item) => group.categories.includes(item.category));
    const published = groupItems.filter((item) => item.published).length;
    return { ...group, total: groupItems.length, published, hidden: groupItems.length - published };
  });
  const activeGroup = CATEGORY_GROUPS.find((group) => group.categories.includes(activeCategory))!;
  const activeStyle = GROUP_STYLES[activeGroup.page];
  const staffPublished = staff.filter((member) => member.published).length;
  const staffCount = staffLoading ? '–' : staff.length;

  return (
    <div className="fixed inset-0 z-[60] flex bg-gray-50 font-body">
      <aside
        aria-label="Admin sidebar"
        className={`hidden flex-shrink-0 flex-col bg-gray-900 text-white transition-[width] duration-200 ease-out motion-reduce:transition-none lg:flex ${
          sidebarCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        <div
          className={`flex items-center border-b border-white/10 py-5 ${
            sidebarCollapsed ? 'justify-center px-3' : 'justify-between gap-3 px-5'
          }`}
        >
          {!sidebarCollapsed && (
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-lg bg-white">
                <Image src="/Gilt Counselling Consult Profile.svg" alt="" fill sizes="44px" className="object-contain p-1" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold leading-tight">Gilt Counselling</p>
                <p className="text-xs text-gray-400">Content Manager</p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={toggleSidebar}
            aria-expanded={!sidebarCollapsed}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md text-gray-300 transition-colors duration-150 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracotta"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
              {sidebarCollapsed ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
              )}
            </svg>
          </button>
        </div>

        <nav aria-label="Content sections" className={`flex-1 overflow-y-auto py-6 ${sidebarCollapsed ? 'space-y-5 px-3' : 'space-y-7 px-4'}`}>
          <div>
            {sidebarCollapsed ? (
              <span className="mx-auto mb-2 block h-1 w-6 rounded-full bg-soft-terracotta" aria-hidden="true" />
            ) : (
              <p className="mb-2 flex items-center gap-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                <span className="h-2 w-2 rounded-full bg-soft-terracotta" aria-hidden="true" />
                About page
              </p>
            )}
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  onClick={selectTeam}
                  aria-current={showTeam ? 'page' : undefined}
                  aria-label={sidebarCollapsed ? `Team Members (About page), ${staffCount} members` : undefined}
                  title={sidebarCollapsed ? `Team Members · ${staffCount}` : undefined}
                  className={`relative flex w-full items-center rounded-md text-left text-[15px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracotta ${
                    sidebarCollapsed ? 'h-12 justify-center' : 'justify-between px-3 py-2.5'
                  } ${showTeam ? 'bg-white/10 font-semibold text-white' : 'font-medium text-gray-300 hover:bg-white/5 hover:text-white'}`}
                >
                  {showTeam && (
                    <span className="absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-soft-terracotta" aria-hidden="true" />
                  )}
                  {sidebarCollapsed ? (
                    <>
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-soft-terracotta/20 text-soft-terracotta" aria-hidden="true">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d={TEAM_ICON} />
                        </svg>
                      </span>
                      <span
                        className={`absolute right-1 top-0.5 min-w-[20px] rounded-full px-1 text-center text-[11px] font-semibold leading-5 tabular-nums ${
                          showTeam ? 'bg-soft-terracotta text-gray-900' : 'bg-gray-700 text-gray-200'
                        }`}
                        aria-hidden="true"
                      >
                        {staffCount}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center gap-3 pl-1">
                        <svg className="h-5 w-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d={TEAM_ICON} />
                        </svg>
                        Team Members
                      </span>
                      <span
                        className={`min-w-[28px] rounded-full px-2 py-0.5 text-center text-xs font-semibold tabular-nums ${
                          showTeam ? 'bg-soft-terracotta text-gray-900' : 'bg-white/10 text-gray-300'
                        }`}
                      >
                        {staffCount}
                      </span>
                    </>
                  )}
                </button>
              </li>
            </ul>
          </div>
          {CATEGORY_GROUPS.map((group) => {
            const style = GROUP_STYLES[group.page];
            return (
              <div key={group.page}>
                {sidebarCollapsed ? (
                  <span className={`mx-auto mb-2 block h-1 w-6 rounded-full ${style.dot}`} aria-hidden="true" />
                ) : (
                  <p className="mb-2 flex items-center gap-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    <span className={`h-2 w-2 rounded-full ${style.dot}`} aria-hidden="true" />
                    {group.page} page
                  </p>
                )}
                <ul className="space-y-1">
                  {group.categories.map((cat) => {
                    const selected = !showTeam && cat === activeCategory;
                    const label = CATEGORY_DETAILS[cat].label;
                    const count = loading ? '–' : countFor(cat);
                    return (
                      <li key={cat}>
                        <button
                          type="button"
                          onClick={() => selectCategory(cat)}
                          aria-current={selected ? 'page' : undefined}
                          aria-label={sidebarCollapsed ? `${label} (${group.page} page), ${count} entries` : undefined}
                          title={sidebarCollapsed ? `${label} · ${count}` : undefined}
                          className={`relative flex w-full items-center rounded-md text-left text-[15px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracotta ${
                            sidebarCollapsed ? 'h-12 justify-center' : 'justify-between px-3 py-2.5'
                          } ${selected ? 'bg-white/10 font-semibold text-white' : 'font-medium text-gray-300 hover:bg-white/5 hover:text-white'}`}
                        >
                          {selected && (
                            <span className="absolute inset-y-1.5 left-0 w-[3px] rounded-full bg-soft-terracotta" aria-hidden="true" />
                          )}
                          {sidebarCollapsed ? (
                            <>
                              <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${style.chipDark}`} aria-hidden="true">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" d={CATEGORY_ICONS[cat]} />
                                </svg>
                              </span>
                              <span
                                className={`absolute right-1 top-0.5 min-w-[20px] rounded-full px-1 text-center text-[11px] font-semibold leading-5 tabular-nums ${
                                  selected ? 'bg-soft-terracotta text-gray-900' : 'bg-gray-700 text-gray-200'
                                }`}
                                aria-hidden="true"
                              >
                                {count}
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="flex items-center gap-3 pl-1">
                                <svg className="h-5 w-5 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d={CATEGORY_ICONS[cat]} />
                                </svg>
                                {label}
                              </span>
                              <span
                                className={`min-w-[28px] rounded-full px-2 py-0.5 text-center text-xs font-semibold tabular-nums ${
                                  selected ? 'bg-soft-terracotta text-gray-900' : 'bg-white/10 text-gray-300'
                                }`}
                              >
                                {count}
                              </span>
                            </>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>

        {sidebarCollapsed ? (
          <div className="flex flex-col items-center gap-1 border-t border-white/10 py-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View website (opens in a new tab)"
              title="View website"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-gray-300 transition-colors duration-150 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracotta"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <button
              type="button"
              onClick={logout}
              aria-label="Sign out"
              title="Sign out"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-gray-300 transition-colors duration-150 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracotta"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="space-y-3 border-t border-white/10 px-6 py-5">
            {user?.email && (
              <p className="truncate text-sm text-gray-400" title={user.email}>
                Signed in as <span className="font-medium text-gray-200">{user.email}</span>
              </p>
            )}
            <div className="flex gap-2">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 flex-1 items-center justify-center rounded-md bg-white/10 px-3 text-sm font-medium text-white transition-colors duration-150 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracotta"
              >
                View website<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <button
                type="button"
                onClick={logout}
                className="inline-flex h-10 items-center justify-center rounded-md px-3 text-sm font-medium text-gray-300 transition-colors duration-150 hover:bg-white/5 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracotta"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <header className="sticky top-0 z-10 bg-gray-900 text-white lg:hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-md bg-white">
                <Image src="/Gilt Counselling Consult Profile.svg" alt="" fill sizes="36px" className="object-contain p-0.5" />
              </div>
              <p className="truncate text-[15px] font-semibold">Content Manager</p>
            </div>
            <div className="flex items-center gap-1">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center whitespace-nowrap rounded-md px-2.5 text-sm font-medium text-gray-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracotta"
              >
                Website<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <button
                type="button"
                onClick={logout}
                className="inline-flex h-10 items-center whitespace-nowrap rounded-md px-2.5 text-sm font-medium text-gray-200 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-soft-terracotta"
              >
                Sign out
              </button>
            </div>
          </div>
          <div className="border-t border-white/10 px-4 py-3">
            <label htmlFor="section-select" className="sr-only">Content section</label>
            <select
              id="section-select"
              value={showTeam ? 'team' : activeCategory}
              onChange={(e) => handleSectionSelect(e.target.value)}
              className="block h-11 w-full rounded-md border border-white/20 bg-white/10 px-3 text-base text-white focus:outline-none focus:ring-2 focus:ring-soft-terracotta"
            >
              <optgroup label="About page" className="text-gray-900">
                <option value="team" className="text-gray-900">
                  Team Members ({staffLoading ? '…' : staff.length})
                </option>
              </optgroup>
              {CATEGORY_GROUPS.map((group) => (
                <optgroup key={group.page} label={`${group.page} page`} className="text-gray-900">
                  {group.categories.map((cat) => (
                    <option key={cat} value={cat} className="text-gray-900">
                      {CATEGORY_DETAILS[cat].label} ({loading ? '…' : countFor(cat)})
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="mb-8 hidden lg:block">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Content Manager</h1>
            <p className="mt-1 text-gray-600">
              Manage the testimonials, outreach stories, events, and media features published across the website.
            </p>
          </div>

          <h2 className="sr-only">Content overview</h2>
          <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
            <button
              type="button"
              onClick={selectTeam}
              aria-label={`About page: ${staff.length} team members, ${staffPublished} published, ${staff.length - staffPublished} hidden`}
              className={`group relative overflow-hidden rounded-lg border bg-white p-3 text-left shadow-sm transition-shadow duration-150 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 sm:p-5 ${
                showTeam ? 'border-transparent ring-2 ring-soft-terracotta' : 'border-gray-200'
              }`}
            >
              <span className="absolute inset-x-0 top-0 h-1 bg-soft-terracotta" aria-hidden="true" />
              <div className="flex items-start justify-between gap-2">
                <span className="hidden h-10 w-10 items-center justify-center rounded-lg bg-soft-terracotta/20 text-gilt-gold-strong sm:flex" aria-hidden="true">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={TEAM_ICON} />
                  </svg>
                </span>
                <span className="text-xs font-semibold leading-tight text-gilt-gold-strong sm:text-[13px] sm:uppercase sm:tracking-wider">About</span>
              </div>
              <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-gray-900 sm:mt-4 sm:text-3xl">
                {staffCount}
              </p>
              <p className="mt-0.5 text-xs text-gray-600 sm:text-sm">
                <span className="sm:hidden">members</span>
                <span className="hidden sm:inline">
                  {staffLoading ? 'Loading…' : `${staffPublished} published · ${staff.length - staffPublished} hidden`}
                </span>
              </p>
            </button>
            {groupStats.map((group) => {
              const style = GROUP_STYLES[group.page];
              const isActive = !showTeam && group.page === activeGroup.page;
              return (
                <button
                  key={group.page}
                  type="button"
                  onClick={() => selectCategory(group.categories[0])}
                  aria-label={`${group.page} page: ${group.total} entries, ${group.published} published, ${group.hidden} hidden`}
                  className={`group relative overflow-hidden rounded-lg border bg-white p-3 text-left shadow-sm transition-shadow duration-150 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 sm:p-5 ${
                    isActive ? `border-transparent ring-2 ${style.ring}` : 'border-gray-200'
                  }`}
                >
                  <span className={`absolute inset-x-0 top-0 h-1 ${style.bar}`} aria-hidden="true" />
                  <div className="flex items-start justify-between gap-2">
                    <span className={`hidden h-10 w-10 items-center justify-center rounded-lg sm:flex ${style.chip}`} aria-hidden="true">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d={style.icon} />
                      </svg>
                    </span>
                    <span className={`text-xs font-semibold leading-tight sm:text-[13px] sm:uppercase sm:tracking-wider ${style.text}`}>{group.page}</span>
                  </div>
                  <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-gray-900 sm:mt-4 sm:text-3xl">
                    {loading ? '–' : group.total}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-600 sm:text-sm">
                    <span className="sm:hidden">entries</span>
                    <span className="hidden sm:inline">
                      {loading ? 'Loading…' : `${group.published} published · ${group.hidden} hidden`}
                    </span>
                  </p>
                </button>
              );
            })}
          </div>

          {showTeam ? (
            <TeamManager members={staff} loading={staffLoading} onChanged={fetchStaff} icon={TEAM_ICON} />
          ) : (
          <section aria-labelledby="section-title" className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex min-w-0 items-start gap-4">
                <span className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg ${activeStyle.chip}`} aria-hidden="true">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={activeStyle.icon} />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-500">
                    {activeDetails.page} page{activeDetails.tab ? ` › ${activeDetails.tab} tab` : ''}
                  </p>
                  <h2 id="section-title" className="text-xl font-semibold tracking-tight text-gray-900">
                    {activeDetails.label}
                  </h2>
                  <p className="mt-0.5 text-sm text-gray-600">{activeDetails.description}</p>
                </div>
              </div>
              <div className="flex flex-shrink-0 items-center gap-2">
                <a
                  href={activeDetails.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-900 shadow-sm transition-colors duration-150 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                >
                  View on site<span className="sr-only"> (opens in a new tab)</span>
                </a>
                {!formOpen && (
                  <button
                    type="button"
                    onClick={openCreateForm}
                    className="inline-flex h-10 items-center gap-1.5 rounded-md bg-soft-terracotta px-4 text-sm font-semibold text-gray-900 shadow-sm transition-colors duration-150 hover:bg-soft-terracotta/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.25} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add New
                  </button>
                )}
              </div>
            </div>

            {formOpen && (
              <form onSubmit={handleSubmit} className="space-y-4 border-b border-gray-200 bg-gray-50 p-5 sm:p-6">
                <h3 className="text-lg font-semibold tracking-tight text-gray-900">
                  {editingId ? 'Edit Entry' : 'Add New Entry'}
                </h3>

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
                        className="mt-2 text-sm font-semibold text-gray-900 underline decoration-soft-terracotta decoration-2 underline-offset-4"
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
                    Published (visible on the website)
                  </label>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex h-10 items-center rounded-md bg-soft-terracotta px-5 text-sm font-semibold text-gray-900 shadow-sm transition-colors duration-150 hover:bg-soft-terracotta/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:opacity-60"
                  >
                    {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Entry'}
                  </button>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-5 text-sm font-medium text-gray-900 shadow-sm transition-colors duration-150 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {loading ? (
              <div role="status" aria-live="polite">
                <span className="sr-only">Loading entries</span>
                <div className="divide-y divide-gray-200" aria-hidden="true">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-5">
                      <Skeleton className="h-12 w-16 flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-3 w-1/3" />
                      </div>
                      <Skeleton className="hidden h-6 w-20 rounded-full sm:block" />
                    </div>
                  ))}
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center px-6 py-14 text-center">
                <span className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${activeStyle.chip}`} aria-hidden="true">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={activeStyle.icon} />
                  </svg>
                </span>
                <p className="font-semibold text-gray-900">No entries in {activeDetails.label} yet</p>
                <p className="mt-1 text-sm text-gray-600">Click &ldquo;Add New&rdquo; to create the first one.</p>
              </div>
            ) : (
              <>
                <ul className="divide-y divide-gray-200">
                  {pageItems.map((item) => {
                    const title = entryTitle(item);
                    return (
                      <li key={item._id} className="flex flex-col gap-4 p-4 transition-colors duration-150 hover:bg-gray-50/70 sm:flex-row sm:items-center sm:p-5">
                        <div className="flex min-w-0 flex-1 items-center gap-4">
                          {isStoryCategory(item.category) && item.images?.[0] ? (
                            <div className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                              <Image src={item.images[0]} alt="" fill sizes="64px" className="object-cover" />
                            </div>
                          ) : (
                            <span
                              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-base font-semibold ${activeStyle.chip}`}
                              aria-hidden="true"
                            >
                              {title.charAt(0).toUpperCase()}
                            </span>
                          )}
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-gray-900">{title}</p>
                            <p className="mt-0.5 truncate text-sm text-gray-600">{entrySummary(item)}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 sm:justify-end">
                          <button
                            type="button"
                            role="switch"
                            aria-checked={item.published}
                            aria-label={`Published: ${title}`}
                            onClick={() => handleTogglePublished(item)}
                            className="group/switch inline-flex items-center gap-2 rounded-md py-1 pr-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                          >
                            <span
                              className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 ${
                                item.published ? 'bg-green-600' : 'bg-gray-300'
                              }`}
                              aria-hidden="true"
                            >
                              <span
                                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
                                  item.published ? 'translate-x-[22px]' : 'translate-x-0.5'
                                }`}
                              />
                            </span>
                            <span className={`w-[72px] text-left text-sm font-medium ${item.published ? 'text-green-700' : 'text-gray-600'}`}>
                              {item.published ? 'Published' : 'Hidden'}
                            </span>
                          </button>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => openEditForm(item)}
                              aria-label={`Edit ${title}`}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-600 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(item._id)}
                              aria-label={`Delete ${title}`}
                              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-red-600 transition-colors duration-150 hover:bg-red-50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t border-gray-200 px-4 pb-6 sm:px-6">
                  <Pagination
                    page={currentPage}
                    totalPages={totalPages}
                    onPageChange={changePage}
                    label={`${activeDetails.label} pages`}
                  />
                  {totalPages <= 1 && (
                    <p className="pt-6 text-center text-sm text-gray-500">
                      Showing all {items.length} {items.length === 1 ? 'entry' : 'entries'}
                    </p>
                  )}
                </div>
              </>
            )}
          </section>
          )}
        </main>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return <AdminDashboardContent />;
}
