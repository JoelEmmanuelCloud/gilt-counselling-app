'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useToast } from '@/components/ui/Toast';
import Skeleton from '@/components/ui/Skeleton';
import TestimonialImageUpload from '@/components/admin/TestimonialImageUpload';
import { DEFAULT_STAFF_TIER, STAFF_TIERS, type StaffTier } from '@/lib/staffInput';

export interface StaffMemberRecord {
  _id: string;
  name: string;
  role: string;
  title?: string;
  credentials?: string;
  bio?: string;
  photo?: string;
  tier?: StaffTier;
  featured: boolean;
  published: boolean;
  order: number;
}

interface StaffForm {
  name: string;
  role: string;
  title: string;
  credentials: string;
  bio: string;
  photo: string;
  tier: StaffTier;
  featured: boolean;
  published: boolean;
  order: number;
}

interface TeamManagerProps {
  members: StaffMemberRecord[];
  loading: boolean;
  onChanged: () => void;
  icon: string;
}

const emptyStaffForm = (order: number, tier: StaffTier = DEFAULT_STAFF_TIER): StaffForm => ({
  name: '',
  role: '',
  title: '',
  credentials: '',
  bio: '',
  photo: '',
  tier,
  featured: false,
  published: true,
  order,
});

const fieldClass =
  'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 focus:outline-none focus:ring-4 focus:ring-soft-terracotta/40 focus:border-gray-900';

const authHeaders = () => {
  const storedToken = localStorage.getItem('token');
  return { Authorization: `Bearer ${storedToken}` };
};

export default function TeamManager({ members, loading, onChanged, icon }: TeamManagerProps) {
  const toast = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<StaffForm>(emptyStaffForm(0));
  const [saving, setSaving] = useState(false);

  const groups = [
    {
      key: 'spotlight',
      label: 'Founder spotlight',
      description: 'Shown first on the About page with a large photo and full bio.',
      tier: null,
      members: members.filter((member) => member.featured),
    },
    ...STAFF_TIERS.map((tier) => ({
      key: tier.value,
      label: tier.label,
      description: null,
      tier: tier.value,
      members: members.filter((member) => !member.featured && (member.tier || DEFAULT_STAFF_TIER) === tier.value),
    })),
  ].filter((group) => group.tier !== null || group.members.length > 0);

  const nextOrder = members.reduce((max, member) => Math.max(max, member.order), -1) + 1;

  const openCreateForm = (tier: StaffTier = DEFAULT_STAFF_TIER) => {
    setEditingId(null);
    setForm(emptyStaffForm(nextOrder, tier));
    setFormOpen(true);
    document.getElementById('section-title')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  };

  const openEditForm = (member: StaffMemberRecord) => {
    setEditingId(member._id);
    setForm({
      name: member.name,
      role: member.role,
      title: member.title || '',
      credentials: member.credentials || '',
      bio: member.bio || '',
      photo: member.photo || '',
      tier: member.tier || DEFAULT_STAFF_TIER,
      featured: member.featured,
      published: member.published,
      order: member.order ?? 0,
    });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await axios.patch(`/api/admin/staff/${editingId}`, form, { headers: authHeaders() });
        toast.success('Team member updated');
      } else {
        await axios.post('/api/admin/staff', form, { headers: authHeaders() });
        toast.success('Team member added');
      }
      closeForm();
      onChanged();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save team member');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (member: StaffMemberRecord) => {
    if (!window.confirm(`Remove ${member.name} from the team? This cannot be undone.`)) {
      return;
    }
    try {
      await axios.delete(`/api/admin/staff/${member._id}`, { headers: authHeaders() });
      toast.success('Team member removed');
      onChanged();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to remove team member');
    }
  };

  const handleTogglePublished = async (member: StaffMemberRecord) => {
    try {
      await axios.patch(`/api/admin/staff/${member._id}`, { published: !member.published }, { headers: authHeaders() });
      onChanged();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update visibility');
    }
  };

  return (
    <section aria-labelledby="section-title" className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex min-w-0 items-start gap-4">
          <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-soft-terracotta/20 text-gilt-gold-strong" aria-hidden="true">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500">About page › Team section</p>
            <h2 id="section-title" className="text-xl font-semibold tracking-tight text-gray-900">Team Members</h2>
            <p className="mt-0.5 text-sm text-gray-600">
              Grouped exactly as they appear on the About page. Order sets the position within each group.
            </p>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-2">
          <a
            href="/about"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-900 shadow-sm transition-colors duration-150 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
          >
            View on site<span className="sr-only"> (opens in a new tab)</span>
          </a>
          {!formOpen && (
            <button
              type="button"
              onClick={() => openCreateForm()}
              className="inline-flex h-10 items-center gap-1.5 rounded-md bg-soft-terracotta px-4 text-sm font-semibold text-gray-900 shadow-sm transition-colors duration-150 hover:bg-soft-terracotta/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.25} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add Member
            </button>
          )}
        </div>
      </div>

      {formOpen && (
        <form onSubmit={handleSubmit} className="space-y-4 border-b border-gray-200 bg-gray-50 p-5 sm:p-6">
          <h3 className="text-lg font-semibold tracking-tight text-gray-900">
            {editingId ? 'Edit Team Member' : 'Add Team Member'}
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="staff-name" className="mb-1 block text-sm font-medium text-gray-700">Full name</label>
              <input id="staff-name" required maxLength={120} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="staff-role" className="mb-1 block text-sm font-medium text-gray-700">Role</label>
              <input id="staff-role" required maxLength={120} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Counsellor" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="staff-title" className="mb-1 block text-sm font-medium text-gray-700">Title line (optional)</label>
              <input id="staff-title" maxLength={160} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="CEO, Gilt Counselling Consult" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="staff-credentials" className="mb-1 block text-sm font-medium text-gray-700">Credentials (optional)</label>
              <input id="staff-credentials" maxLength={160} value={form.credentials} onChange={(e) => setForm({ ...form, credentials: e.target.value })} placeholder="FCASSON, CPCN" className={fieldClass} />
            </div>
          </div>
          <div>
            <label htmlFor="staff-tier" className="mb-1 block text-sm font-medium text-gray-700">Team group</label>
            <select id="staff-tier" value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value as StaffTier })} className={fieldClass}>
              {STAFF_TIERS.map((tier) => (
                <option key={tier.value} value={tier.value}>{tier.label}</option>
              ))}
            </select>
            <p className="mt-1 text-xs text-gray-500">Controls which group this person appears under on the About page.</p>
          </div>
          <div>
            <label htmlFor="staff-bio" className="mb-1 block text-sm font-medium text-gray-700">Bio (optional, shown for spotlight members)</label>
            <textarea id="staff-bio" rows={4} maxLength={2000} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className={fieldClass} />
          </div>
          <div>
            <span className="mb-2 block text-sm font-medium text-gray-700">Photo</span>
            <TestimonialImageUpload
              images={form.photo ? [form.photo] : []}
              onChange={(images) => setForm({ ...form, photo: images[0] || '' })}
              maxImages={1}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-end">
            <div>
              <label htmlFor="staff-order" className="mb-1 block text-sm font-medium text-gray-700">Display order</label>
              <input
                id="staff-order"
                type="number"
                min={0}
                max={9999}
                step={1}
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Math.max(0, Math.floor(Number(e.target.value) || 0)) })}
                className={fieldClass}
              />
            </div>
            <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="h-5 w-5 rounded border-gray-400 accent-gray-900" />
              Founder spotlight (overrides team group)
            </label>
            <label className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} className="h-5 w-5 rounded border-gray-400 accent-gray-900" />
              Published (visible on the website)
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex h-10 items-center rounded-md bg-soft-terracotta px-5 text-sm font-semibold text-gray-900 shadow-sm transition-colors duration-150 hover:bg-soft-terracotta/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:opacity-60"
            >
              {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Member'}
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
          <span className="sr-only">Loading team members</span>
          <div className="divide-y divide-gray-200" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4 p-5">
                <Skeleton className="h-12 w-12 flex-shrink-0 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : members.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-14 text-center">
          <p className="font-semibold text-gray-900">No team members yet</p>
          <p className="mt-1 text-sm text-gray-600">Click &ldquo;Add Member&rdquo; to add the first one.</p>
        </div>
      ) : (
        <>
          <div className="divide-y divide-gray-200">
            {groups.map((group) => (
              <div key={group.key} role="group" aria-labelledby={`team-group-${group.key}`}>
                <div className="flex items-center justify-between gap-3 bg-gray-50 px-4 py-3 sm:px-5">
                  <div className="min-w-0">
                    <h3 id={`team-group-${group.key}`} className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-700">
                      {group.label}
                      <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold normal-case tracking-normal text-gray-600 ring-1 ring-gray-200">
                        {group.members.length}
                      </span>
                    </h3>
                    {group.description && <p className="mt-0.5 text-xs text-gray-500">{group.description}</p>}
                  </div>
                  {group.tier && !formOpen && (
                    <button
                      type="button"
                      onClick={() => openCreateForm(group.tier as StaffTier)}
                      aria-label={`Add a member to ${group.label}`}
                      className="inline-flex h-9 flex-shrink-0 items-center gap-1 rounded-md px-3 text-sm font-medium text-gray-700 transition-colors duration-150 hover:bg-white hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.25} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add
                    </button>
                  )}
                </div>
                {group.members.length === 0 ? (
                  <p className="px-4 py-4 text-sm text-gray-500 sm:px-5">No one in this group yet.</p>
                ) : (
                  <ul className="divide-y divide-gray-200 border-t border-gray-200">
                    {group.members.map((member) => (
                  <li key={member._id} className="flex flex-col gap-4 p-4 transition-colors duration-150 hover:bg-gray-50/70 sm:flex-row sm:items-center sm:p-5">
                    <div className="flex min-w-0 flex-1 items-center gap-4">
                      {member.photo ? (
                        <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-100">
                          <Image src={member.photo} alt="" fill sizes="48px" className="object-cover object-top" />
                        </div>
                      ) : (
                        <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-soft-terracotta/20 text-base font-semibold text-gilt-gold-strong" aria-hidden="true">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                      <div className="min-w-0">
                        <p className="flex flex-wrap items-center gap-2 font-semibold text-gray-900">
                          <span className="truncate">{member.name}</span>
                          {member.featured && (
                            <span className="rounded-full bg-soft-terracotta/20 px-2 py-0.5 text-xs font-semibold text-gilt-gold-strong">Spotlight</span>
                          )}
                        </p>
                        <p className="mt-0.5 truncate text-sm text-gray-600">
                          {[member.role, member.credentials].filter(Boolean).join(' · ')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={member.published}
                        aria-label={`Published: ${member.name}`}
                        onClick={() => handleTogglePublished(member)}
                        className="inline-flex items-center gap-2 rounded-md py-1 pr-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                      >
                        <span className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 ${member.published ? 'bg-green-600' : 'bg-gray-300'}`} aria-hidden="true">
                          <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${member.published ? 'translate-x-[22px]' : 'translate-x-0.5'}`} />
                        </span>
                        <span className={`w-[72px] text-left text-sm font-medium ${member.published ? 'text-green-700' : 'text-gray-600'}`}>
                          {member.published ? 'Published' : 'Hidden'}
                        </span>
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => openEditForm(member)}
                          aria-label={`Edit ${member.name}`}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-600 transition-colors duration-150 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(member)}
                          aria-label={`Remove ${member.name}`}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-red-600 transition-colors duration-150 hover:bg-red-50 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          <p className="border-t border-gray-200 px-4 py-5 text-center text-sm text-gray-500 sm:px-6">
            Showing all {members.length} {members.length === 1 ? 'member' : 'members'}
          </p>
        </>
      )}
    </section>
  );
}
