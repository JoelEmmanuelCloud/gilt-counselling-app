import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Testimonial from '@/lib/models/testimonial';
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const authResult = await requireAdmin();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    await connectDB();

    const query: Record<string, unknown> = {};
    if (category) {
      query.category = category;
    }

    const testimonials = await Testimonial.find(query).sort({
      order: 1,
      createdAt: -1,
    });

    return NextResponse.json(testimonials, { status: 200 });
  } catch (error: any) {
    console.error('Get testimonials error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAdmin();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const body = await request.json();
    const { category } = body;

    if (!category || !['client', 'school', 'community', 'media'].includes(category)) {
      return NextResponse.json(
        { message: 'A valid category is required' },
        { status: 400 }
      );
    }

    if (category === 'client' && (!body.quote || !body.name)) {
      return NextResponse.json(
        { message: 'Quote and name are required for a client testimonial' },
        { status: 400 }
      );
    }

    if (category === 'school' && (!body.school || !Array.isArray(body.quotes) || body.quotes.length === 0)) {
      return NextResponse.json(
        { message: 'School name and at least one quote are required' },
        { status: 400 }
      );
    }

    if ((category === 'community' || category === 'media') && (!body.title || !body.description)) {
      return NextResponse.json(
        { message: 'Title and description are required' },
        { status: 400 }
      );
    }

    await connectDB();

    const testimonial = new Testimonial({
      category,
      published: body.published ?? true,
      order: body.order ?? 0,
      quote: body.quote,
      name: body.name,
      service: body.service,
      date: body.date,
      school: body.school,
      quotes: body.quotes,
      title: body.title,
      organization: body.organization,
      description: body.description,
      images: body.images ?? [],
      videoUrl: body.videoUrl,
    });

    await testimonial.save();

    return NextResponse.json(
      { message: 'Testimonial created successfully', testimonial },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Create testimonial error:', error);
    return NextResponse.json(
      { message: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
