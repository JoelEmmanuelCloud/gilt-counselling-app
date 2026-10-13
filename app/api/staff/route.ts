import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import StaffMember from '@/lib/models/staffMember';

export async function GET() {
  try {
    await connectDB();
    const members = await StaffMember.find({ published: true })
      .select('name role title credentials bio photo featured order')
      .sort({ featured: -1, order: 1, createdAt: 1 });
    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    console.error('Get staff error:', error);
    return NextResponse.json({ message: 'Failed to fetch team members' }, { status: 500 });
  }
}
