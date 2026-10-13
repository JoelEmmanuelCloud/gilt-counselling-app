import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import StaffMember from '@/lib/models/staffMember';
import { requireAdmin } from '@/lib/auth';
import { parseStaffInput } from '@/lib/staffInput';

export async function GET() {
  const authResult = await requireAdmin();
  if (authResult.error) {
    return NextResponse.json({ message: authResult.error }, { status: authResult.status });
  }

  try {
    await connectDB();
    const members = await StaffMember.find({}).sort({ featured: -1, order: 1, createdAt: 1 });
    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    console.error('Admin get staff error:', error);
    return NextResponse.json({ message: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authResult = await requireAdmin();
  if (authResult.error) {
    return NextResponse.json({ message: authResult.error }, { status: authResult.status });
  }

  try {
    const { data, error } = parseStaffInput(await request.json().catch(() => null), { partial: false });
    if (error || !data) {
      return NextResponse.json({ message: error }, { status: 400 });
    }

    await connectDB();
    const member = await StaffMember.create(data);
    return NextResponse.json({ message: 'Team member added', member }, { status: 201 });
  } catch (error) {
    console.error('Create staff error:', error);
    return NextResponse.json({ message: 'Failed to add team member' }, { status: 500 });
  }
}
