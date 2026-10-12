import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { del } from '@vercel/blob';
import connectDB from '@/lib/mongodb';
import StaffMember from '@/lib/models/staffMember';
import { requireAdmin } from '@/lib/auth';
import { isBlobUrl, parseStaffInput } from '@/lib/staffInput';

async function deleteBlobPhoto(url: string | undefined) {
  if (!isBlobUrl(url)) return;
  try {
    await del(url);
  } catch (error) {
    console.error('Failed to delete staff photo:', url, error);
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireAdmin();
  if (authResult.error) {
    return NextResponse.json({ message: authResult.error }, { status: authResult.status });
  }

  try {
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
    }

    const { data, error } = parseStaffInput(await request.json(), { partial: true });
    if (error || !data) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    await connectDB();
    const existing = await StaffMember.findById(id);
    if (!existing) {
      return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
    }

    const member = await StaffMember.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (data.photo !== undefined && data.photo !== existing.photo) {
      await deleteBlobPhoto(existing.photo);
    }

    return NextResponse.json({ message: 'Team member updated', member }, { status: 200 });
  } catch (error) {
    console.error('Update staff error:', error);
    return NextResponse.json({ message: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const authResult = await requireAdmin();
  if (authResult.error) {
    return NextResponse.json({ message: authResult.error }, { status: authResult.status });
  }

  try {
    const { id } = await params;
    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
    }

    await connectDB();
    const member = await StaffMember.findByIdAndDelete(id);
    if (!member) {
      return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
    }

    await deleteBlobPhoto(member.photo);
    return NextResponse.json({ message: 'Team member removed' }, { status: 200 });
  } catch (error) {
    console.error('Delete staff error:', error);
    return NextResponse.json({ message: 'Failed to remove team member' }, { status: 500 });
  }
}
