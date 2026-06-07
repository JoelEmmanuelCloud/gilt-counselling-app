import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { getAllGalleryItems, createGalleryItem } from '@/lib/models/gallery';

export async function GET() {
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
      createdBy: null,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Failed to create gallery item:', error);
    return NextResponse.json({ message: 'Failed to create gallery item' }, { status: 500 });
  }
}
