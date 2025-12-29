import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { requireAuth } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';

export async function POST(request: NextRequest) {
  const authResult = await requireAuth();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  if (!authResult.user) {
    return NextResponse.json(
      { message: 'User not found' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('profilePhoto') as File;

    if (!file) {
      return NextResponse.json(
        { message: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: 'Invalid file type. Only JPEG, PNG, and WebP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { message: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'profiles');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const timestamp = Date.now();
    const userId = (authResult.user.email || 'user').split('@')[0];
    const ext = file.name.split('.').pop();
    const filename = `${userId}-${timestamp}.${ext}`;
    const filepath = path.join(uploadsDir, filename);

    // Save file
    await writeFile(filepath, buffer);

    // Update user profile in database
    await connectDB();
    const photoUrl = `/uploads/profiles/${filename}`;

    await User.findOneAndUpdate(
      { email: authResult.user.email },
      { $set: { profilePhoto: photoUrl } },
      { new: true }
    );

    return NextResponse.json({
      message: 'Profile photo uploaded successfully',
      photoUrl,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Failed to upload profile photo' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const authResult = await requireAuth();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  if (!authResult.user) {
    return NextResponse.json(
      { message: 'User not found' },
      { status: 401 }
    );
  }

  try {
    await connectDB();

    await User.findOneAndUpdate(
      { email: authResult.user.email },
      { $unset: { profilePhoto: "" } },
      { new: true }
    );

    return NextResponse.json({
      message: 'Profile photo removed successfully',
    }, { status: 200 });
  } catch (error: any) {
    console.error('Delete photo error:', error);
    return NextResponse.json(
      { message: 'Failed to remove profile photo' },
      { status: 500 }
    );
  }
}
