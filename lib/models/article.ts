import mongoose, { Schema } from 'mongoose';

export interface IArticle {
  _id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  content: string;
  readTime: string;
  publishedAt: Date;
  published: boolean;
  createdBy?: mongoose.Types.ObjectId | string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const ArticleSchema = new Schema(
  {
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    excerpt: {
      type: String,
      default: '',
      trim: true,
    },
    category: {
      type: String,
      default: 'General',
      trim: true,
    },
    author: {
      type: String,
      default: 'Gilt Counselling Consult',
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    readTime: {
      type: String,
      default: '',
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    published: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

let Article: any;
if (mongoose.models.Article) {
  Article = mongoose.models.Article;
} else {
  Article = mongoose.model('Article', ArticleSchema);
}

export default Article;

// Estimate read time from HTML content at ~200 words per minute.
export const estimateReadTime = (html: string): string => {
  const text = (html || '').replace(/<[^>]*>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
};

// Build a URL-friendly slug from a title.
export const slugify = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

// Generate a slug guaranteed to be unique in the collection.
export const generateUniqueSlug = async (title: string, excludeId?: string): Promise<string> => {
  const base = slugify(title) || 'article';
  let slug = base;
  let counter = 1;
  while (true) {
    const existing = await Article.findOne({ slug });
    if (!existing || (excludeId && existing._id.toString() === excludeId)) {
      return slug;
    }
    counter += 1;
    slug = `${base}-${counter}`;
  }
};

// Plain shape consumed by the public blog UI.
export interface SerializedArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  content: string;
  readTime: string;
  published: boolean;
  isoDate: string;
  date: string;
}

// Shape an Article document into the plain object the public blog UI expects.
export const serializeArticle = (doc: any): SerializedArticle => ({
  slug: doc.slug,
  title: doc.title,
  excerpt: doc.excerpt,
  category: doc.category,
  author: doc.author,
  image: doc.image,
  content: doc.content,
  readTime: doc.readTime,
  published: doc.published,
  isoDate: new Date(doc.publishedAt).toISOString().split('T')[0],
  date: new Date(doc.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }),
});

export const getPublishedArticles = async (): Promise<SerializedArticle[]> => {
  const docs = await Article.find({ published: true }).sort({ publishedAt: -1 });
  return docs.map(serializeArticle);
};

export const getArticleBySlug = async (slug: string): Promise<SerializedArticle | null> => {
  const doc = await Article.findOne({ slug, published: true });
  return doc ? serializeArticle(doc) : null;
};

export const getAllArticles = async () => {
  return await Article.find().sort({ publishedAt: -1 });
};

export const getArticleById = async (id: string) => {
  return await Article.findById(id);
};
