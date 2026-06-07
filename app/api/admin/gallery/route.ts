import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import { getAllGalleryItems, createGalleryItem } from '@/lib/models/gallery';

export async function GET(request: NextRequest) {
  const authResult = await requireAdmin(request);
  if (authResult.error) {
    return NextResponse.json({ message: authResult.error }, { status: authResult.status });
  }

  try {
    await connectDB();
    const items = await getAllGalleryItems();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch gallery items:', error);
    return NextResponse.json({ message: 'Failed to fetch gallery items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAdmin(request);
  if (authResult.error) {
    return NextResponse.json({ message: authResult.error }, { status: authResult.status });
  }

  try {
    const body = await request.json();
    const { title, description, imageUrl, category, order } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { message: 'Title and image are required' },
        { status: 400 }
      );
    }

    await connectDB();
    const item = await createGalleryItem({
      title,
      description: description || '',
      imageUrl,
      category: category || 'General',
      order: typeof order === 'number' ? order : 0,
      createdBy: authResult.user?.id || null,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Failed to create gallery item:', error);
    return NextResponse.json({ message: 'Failed to create gallery item' }, { status: 500 });
  }
}
