'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@/components/ui/Card';
import { useToast } from '@/components/ui/Toast';
import AdminImageUpload from '@/components/admin/AdminImageUpload';

interface Article {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  content: string;
  readTime: string;
  published: boolean;
  publishedAt: string;
}

const CATEGORIES = ['Mental Health', 'Teen Development', 'Family', 'Parenting', 'Self-Care', 'General'];

const emptyForm = {
  title: '',
  excerpt: '',
  category: 'Mental Health',
  author: 'Gilt Counselling Consult',
  image: '',
  content: '',
  published: true,
};

export default function ArticleManager() {
  const toast = useToast();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);

  const authHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/admin/articles', authHeaders());
      setArticles(res.data);
    } catch (error) {
      console.error('Failed to fetch articles', error);
      toast.error('Failed to load articles.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const handleNew = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEdit = (article: Article) => {
    setForm({
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      author: article.author,
      image: article.image,
      content: article.content,
      published: article.published,
    });
    setEditingId(article._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      toast.error('Title and content are required.');
      return;
    }
    setSubmitting(true);
    try {
      if (editingId) {
        await axios.patch(`/api/admin/articles/${editingId}`, form, authHeaders());
        toast.success('Article updated.');
      } else {
        await axios.post('/api/admin/articles', form, authHeaders());
        toast.success('Article published.');
      }
      resetForm();
      fetchArticles();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save article.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublished = async (article: Article) => {
    try {
      await axios.patch(
        `/api/admin/articles/${article._id}`,
        { published: !article.published },
        authHeaders()
      );
      fetchArticles();
    } catch (error) {
      console.error('Failed to update article', error);
      toast.error('Failed to update article.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Permanently delete this article?')) return;
    try {
      await axios.delete(`/api/admin/articles/${id}`, authHeaders());
      toast.success('Article deleted.');
      fetchArticles();
    } catch (error) {
      console.error('Failed to delete article', error);
      toast.error('Failed to delete article.');
    }
  };

  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="heading-md">Articles</h2>
          <p className="text-gray-600 text-sm mt-1">{articles.length} article{articles.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          onClick={() => (showForm ? resetForm() : handleNew())}
          className="px-4 py-2 bg-gilt-gold text-white rounded-lg hover:bg-gilt-orange transition"
        >
          {showForm ? 'Cancel' : '+ New Article'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 p-6 bg-warm-cream rounded-lg">
          <h3 className="font-semibold text-lg mb-4">{editingId ? 'Edit Article' : 'New Article'}</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
            <AdminImageUpload
              folder="articles"
              currentImageUrl={form.image || undefined}
              onImageUploaded={(url) => setForm({ ...form, image: url })}
              onImageRemoved={() => setForm({ ...form, image: '' })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Title *"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="px-4 py-2 border rounded-lg md:col-span-2"
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
            <input
              type="text"
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="px-4 py-2 border rounded-lg"
            />
          </div>

          <textarea
            placeholder="Short excerpt / summary"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border rounded-lg mb-4"
          />

          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            placeholder="Write the article here. Basic HTML is supported (e.g. <h2>Heading</h2>, <p>paragraph</p>, <ul><li>item</li></ul>)."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={14}
            className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Tip: wrap paragraphs in &lt;p&gt;…&lt;/p&gt; and use &lt;h2&gt; for section headings. Read time is calculated automatically.
          </p>

          <label className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) => setForm({ ...form, published: e.target.checked })}
            />
            <span className="text-sm text-gray-700">Published (visible on the public site)</span>
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="mt-4 px-6 py-2 bg-gilt-gold text-white rounded-lg hover:bg-gilt-orange transition disabled:opacity-50"
          >
            {submitting ? 'Saving...' : editingId ? 'Update Article' : 'Publish Article'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-soft-gold mb-4"></div>
          <p className="text-gray-600">Loading articles...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-12 bg-warm-cream rounded-lg">
          <p className="text-gray-600">No articles yet. Create your first article above.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-light-grey">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-light-grey">
              {articles.map((article) => (
                <tr key={article._id} className="hover:bg-warm-cream transition-colors">
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-gray-900">{article.title}</div>
                    <div className="text-xs text-gray-500">/blog/{article.slug}</div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">{article.category}</td>
                  <td className="px-4 py-4">
                    <button
                      onClick={() => handleTogglePublished(article)}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        article.published
                          ? 'bg-olive-green bg-opacity-10 text-olive-green'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {article.published ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(article)}
                        className="text-soft-gold hover:text-gilt-orange font-medium text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article._id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
