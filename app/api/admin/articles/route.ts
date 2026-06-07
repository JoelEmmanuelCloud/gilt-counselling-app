import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article, {
  getAllArticles,
  generateUniqueSlug,
  estimateReadTime,
} from '@/lib/models/article';

export async function GET() {
  try {
    await connectDB();
    const articles = await getAllArticles();
    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return NextResponse.json({ message: 'Failed to fetch articles' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, excerpt, category, author, image, content, published, publishedAt } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: 'Title and content are required' },
        { status: 400 }
      );
    }

    await connectDB();
    const slug = await generateUniqueSlug(title);

    const article = new Article({
      slug,
      title,
      excerpt: excerpt || '',
      category: category || 'General',
      author: author || 'Gilt Counselling Consult',
      image: image || '',
      content,
      readTime: estimateReadTime(content),
      published: published !== false,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      createdBy: null,
    });
    await article.save();

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('Failed to create article:', error);
    return NextResponse.json({ message: 'Failed to create article' }, { status: 500 });
  }
}
