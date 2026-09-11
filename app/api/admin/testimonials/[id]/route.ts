import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/lib/models/testimonial';
import { requireAdmin } from '@/lib/auth';
import { del } from '@vercel/blob';

const ALLOWED_FIELDS = [
  'published',
  'order',
  'quote',
  'name',
  'service',
  'date',
  'school',
  'quotes',
  'title',
  'organization',
  'description',
  'images',
  'videoUrl',
];

async function deleteBlobImages(urls: string[]) {
  await Promise.all(
    urls
      .filter((url) => url && url.includes('.public.blob.vercel-storage.com'))
      .map((url) =>
        del(url).catch((error) => {
          console.error('Failed to delete blob image:', url, error);
        })
      )
  );
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { id } = await params;
    const body = await request.json();

    await connectDB();

    const existing = await Testimonial.findById(id);
    if (!existing) {
      return NextResponse.json(
        { message: 'Testimonial not found' },
        { status: 404 }
      );
    }

    const updates: Record<string, unknown> = {};
    for (const field of ALLOWED_FIELDS) {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    }

    if (updates.images) {
      const previousImages: string[] = existing.images || [];
      const nextImages: string[] = updates.images as string[];
      const removedImages = previousImages.filter((url) => !nextImages.includes(url));
      if (removedImages.length > 0) {
        await deleteBlobImages(removedImages);
      }
    }

    const testimonial = await Testimonial.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return NextResponse.json(
      { message: 'Testimonial updated successfully', testimonial },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update testimonial error:', error);
    return NextResponse.json(
      { message: 'Failed to update testimonial' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAdmin();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { id } = await params;
    await connectDB();

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json(
        { message: 'Testimonial not found' },
        { status: 404 }
      );
    }

    if (testimonial.images && testimonial.images.length > 0) {
      await deleteBlobImages(testimonial.images);
    }

    await Testimonial.findByIdAndDelete(id);

    return NextResponse.json(
      { message: 'Testimonial deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete testimonial error:', error);
    return NextResponse.json(
      { message: 'Failed to delete testimonial' },
      { status: 500 }
    );
  }
}
