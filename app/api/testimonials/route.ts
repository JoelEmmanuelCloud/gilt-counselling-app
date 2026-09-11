import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/lib/models/testimonial';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    await connectDB();

    const query: Record<string, unknown> = { published: true };
    if (category) {
      query.category = category;
    }

    const testimonials = await Testimonial.find(query).sort({
      order: 1,
      createdAt: -1,
    });

    return NextResponse.json(testimonials, { status: 200 });
  } catch (error: any) {
    console.error('Get public testimonials error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}
