import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import { requireAdmin } from '@/lib/auth';

// GET single client details (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authResult = await requireAdmin();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    await connectDB();

    const client = await User.findById(id);

    if (!client) {
      return NextResponse.json(
        { message: 'Client not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(client, { status: 200 });
  } catch (error: any) {
    console.error('Get client error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch client' },
      { status: 500 }
    );
  }
}

// PATCH update client (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authResult = await requireAdmin();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const body = await request.json();

    // Remove fields that shouldn't be updated this way
    const { role, _id, ...updateData } = body;

    await connectDB();

    const client = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!client) {
      return NextResponse.json(
        { message: 'Client not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: 'Client updated successfully',
        client,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update client error:', error);
    return NextResponse.json(
      { message: 'Failed to update client' },
      { status: 500 }
    );
  }
}

// POST add session note (admin only)
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const authResult = await requireAdmin();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    const { note } = await request.json();

    if (!note) {
      return NextResponse.json(
        { message: 'Note is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const client = await User.findById(id);

    if (!client) {
      return NextResponse.json(
        { message: 'Client not found' },
        { status: 404 }
      );
    }

    // Add session note
    client.sessionNotes = client.sessionNotes || [];
    client.sessionNotes.push({
      date: new Date(),
      note,
      createdBy: authResult.user?.email || 'Admin',
    });

    await client.save();

    return NextResponse.json(
      {
        message: 'Session note added successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Add session note error:', error);
    return NextResponse.json(
      { message: 'Failed to add session note' },
      { status: 500 }
    );
  }
}
