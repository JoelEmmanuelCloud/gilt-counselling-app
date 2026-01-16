import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import Appointment from '@/lib/models/appointment';
import { requireAdmin } from '@/lib/auth';

// GET admin dashboard statistics
export async function GET(request: NextRequest) {
  const authResult = await requireAdmin();

  if (authResult.error) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  try {
    await connectDB();

    // Get today's date range
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];

    // Get this week's date range
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    // Get this month's date range
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    // Parallel queries for better performance
    const [
      totalUsers,
      totalCounselors,
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      completedAppointments,
      cancelledAppointments,
      todayAppointments,
      recentUsers,
      recentAppointments,
    ] = await Promise.all([
      User.countDocuments({ role: 'user' }),
      User.countDocuments({ role: 'counselor' }),
      Appointment.countDocuments({}),
      Appointment.countDocuments({ status: 'pending' }),
      Appointment.countDocuments({ status: 'confirmed' }),
      Appointment.countDocuments({ status: 'completed' }),
      Appointment.countDocuments({ status: 'cancelled' }),
      Appointment.countDocuments({ date: todayStr }),
      User.find({ role: 'user' })
        .select('name email createdAt source')
        .sort({ createdAt: -1 })
        .limit(5),
      Appointment.find({})
        .select('userName service date time status createdAt')
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    // Get today's appointments with details
    const todayAppointmentDetails = await Appointment.find({ date: todayStr })
      .select('userName userEmail service time status')
      .sort({ time: 1 });

    // Monthly appointment trend (last 6 months)
    const monthlyTrend = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
      const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

      const count = await Appointment.countDocuments({
        createdAt: { $gte: monthStart, $lte: monthEnd },
      });

      monthlyTrend.push({
        month: monthStart.toLocaleString('default', { month: 'short' }),
        year: monthStart.getFullYear(),
        count,
      });
    }

    // User source distribution
    const userSources = await User.aggregate([
      { $match: { role: 'user' } },
      { $group: { _id: '$source', count: { $sum: 1 } } },
    ]);

    const sourceDistribution = userSources.reduce((acc: any, item: any) => {
      acc[item._id || 'online'] = item.count;
      return acc;
    }, {});

    return NextResponse.json({
      overview: {
        totalUsers,
        totalCounselors,
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        completedAppointments,
        cancelledAppointments,
        todayAppointments: todayAppointments,
      },
      todayAppointmentDetails,
      recentUsers,
      recentAppointments,
      monthlyTrend,
      sourceDistribution,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Get admin stats error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}
