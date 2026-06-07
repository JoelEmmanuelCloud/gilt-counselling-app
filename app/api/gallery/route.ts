import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { getAllGalleryItems } from '@/lib/models/gallery';

export const dynamic = 'force-dynamic';

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
