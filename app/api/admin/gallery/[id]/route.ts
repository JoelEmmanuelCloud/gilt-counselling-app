import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import { updateGalleryItem, deleteGalleryItem } from '@/lib/models/gallery';

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const authResult = await requireAdmin(request);
  if (authResult.error) {
    return NextResponse.json({ message: authResult.error }, { status: authResult.status });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const updates: Record<string, any> = {};
    ['title', 'description', 'imageUrl', 'category', 'order'].forEach((key) => {
      if (body[key] !== undefined) updates[key] = body[key];
    });

    await connectDB();
    const updated = await updateGalleryItem(id, updates);
    if (!updated) {
      return NextResponse.json({ message: 'Gallery item not found' }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error('Failed to update gallery item:', error);
    return NextResponse.json({ message: 'Failed to update gallery item' }, { status: 500 });
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
    const deleted = await deleteGalleryItem(id);
    if (!deleted) {
      return NextResponse.json({ message: 'Gallery item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Gallery item deleted' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete gallery item:', error);
    return NextResponse.json({ message: 'Failed to delete gallery item' }, { status: 500 });
  }
}
