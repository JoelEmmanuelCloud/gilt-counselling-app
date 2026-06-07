import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import {
  getArticleById,
  generateUniqueSlug,
  estimateReadTime,
} from '@/lib/models/article';

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  const authResult = await requireAdmin(request);
  if (authResult.error) {
    return NextResponse.json({ message: authResult.error }, { status: authResult.status });
  }

  try {
    const { id } = await params;
    await connectDB();
    const article = await getArticleById(id);
    if (!article) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return NextResponse.json({ message: 'Failed to fetch article' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const authResult = await requireAdmin(request);
  if (authResult.error) {
    return NextResponse.json({ message: authResult.error }, { status: authResult.status });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    await connectDB();
    const article = await getArticleById(id);
    if (!article) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }

    if (body.title !== undefined && body.title !== article.title) {
      article.title = body.title;
      article.slug = await generateUniqueSlug(body.title, id);
    }
    if (body.excerpt !== undefined) article.excerpt = body.excerpt;
    if (body.category !== undefined) article.category = body.category;
    if (body.author !== undefined) article.author = body.author;
    if (body.image !== undefined) article.image = body.image;
    if (body.content !== undefined) {
      article.content = body.content;
      article.readTime = estimateReadTime(body.content);
    }
    if (body.published !== undefined) article.published = body.published;
    if (body.publishedAt !== undefined) article.publishedAt = new Date(body.publishedAt);

    await article.save();
    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error('Failed to update article:', error);
    return NextResponse.json({ message: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const authResult = await requireAdmin(request);
  if (authResult.error) {
    return NextResponse.json({ message: authResult.error }, { status: authResult.status });
  }

  try {
    const { id } = await params;
    await connectDB();
    const article = await getArticleById(id);
    if (!article) {
      return NextResponse.json({ message: 'Article not found' }, { status: 404 });
    }
    await article.deleteOne();
    return NextResponse.json({ message: 'Article deleted' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete article:', error);
    return NextResponse.json({ message: 'Failed to delete article' }, { status: 500 });
  }
}
