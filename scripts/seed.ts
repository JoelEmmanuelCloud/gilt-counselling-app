import mongoose from 'mongoose';
import User from '../lib/models/user';
import Appointment from '../lib/models/appointment';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gilt-counselling';

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected successfully!');

    // Clear existing data
    console.log('Clearing existing users and appointments...');
    await User.deleteMany({});
    await Appointment.deleteMany({});
    console.log('Data cleared!');

    // ==========================================
    // CREATE ADMIN USER
    // ==========================================
    console.log('\n--- Creating Admin User ---');
    const adminUser = new User({
      firstName: 'Gilt',
      lastName: 'Admin',
      email: 'wecare@giltcounselling.com',
      phone: '+234 803 309 4050',
      role: 'admin',
      emailVerified: new Date(),
      gender: 'prefer-not-to-say',
      occupation: 'Administrator',
      address: {
        city: 'Port Harcourt',
        state: 'Rivers',
        country: 'Nigeria',
      },
    });
    await adminUser.save();
    console.log('Admin created: wecare@giltcounselling.com');

    // ==========================================
    // CREATE COUNSELORS
    // ==========================================
    console.log('\n--- Creating Counselors ---');

    const counselor1 = new User({
      firstName: 'Joel',
      lastName: 'Emmanuel',
      email: 'joelcloud65@gmail.com',
      phone: '+234 706 573 4165',
      role: 'counselor',
      emailVerified: new Date(),
      gender: 'male',
      occupation: 'Professional Counselor',
      bio: 'Experienced counselor specializing in youth development, career guidance, and mental health support. Passionate about helping individuals discover their potential and achieve their goals.',
      specializations: [
        'Youth Counselling',
        'Career Counselling',
        'Mental Health & Emotional Wellness',
        'Life Skills & Mentoring',
      ],
      availability: [
        { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' }, // Monday
        { dayOfWeek: 2, startTime: '09:00', endTime: '17:00' }, // Tuesday
        { dayOfWeek: 3, startTime: '09:00', endTime: '17:00' }, // Wednesday
        { dayOfWeek: 4, startTime: '09:00', endTime: '17:00' }, // Thursday
        { dayOfWeek: 5, startTime: '09:00', endTime: '15:00' }, // Friday
      ],
      isAvailable: true,
      address: {
        city: 'Port Harcourt',
        state: 'Rivers',
        country: 'Nigeria',
      },
    });
    await counselor1.save();
    console.log('Counselor created: joelcloud65@gmail.com (Joel Emmanuel)');

    const counselor2 = new User({
      firstName: 'Sarah',
      lastName: 'Adeyemi',
      email: 'sarah.adeyemi@giltcounselling.com',
      phone: '+234 812 345 6789',
      role: 'counselor',
      emailVerified: new Date(),
      gender: 'female',
      occupation: 'Licensed Clinical Counselor',
      bio: 'Dedicated family and relationship counselor with over 10 years of experience. Specializes in couples therapy, parenting support, and family dynamics.',
      specializations: [
        'Family Counselling',
        'Couples Therapy',
        'Parenting & Special Needs Support',
        'Relationship Counselling',
      ],
      availability: [
        { dayOfWeek: 1, startTime: '10:00', endTime: '18:00' }, // Monday
        { dayOfWeek: 2, startTime: '10:00', endTime: '18:00' }, // Tuesday
        { dayOfWeek: 3, startTime: '10:00', endTime: '18:00' }, // Wednesday
        { dayOfWeek: 4, startTime: '10:00', endTime: '18:00' }, // Thursday
        { dayOfWeek: 6, startTime: '09:00', endTime: '14:00' }, // Saturday
      ],
      isAvailable: true,
      address: {
        city: 'Lagos',
        state: 'Lagos',
        country: 'Nigeria',
      },
    });
    await counselor2.save();
    console.log('Counselor created: sarah.adeyemi@giltcounselling.com (Sarah Adeyemi)');

    const counselor3 = new User({
      firstName: 'Michael',
      lastName: 'Okonkwo',
      email: 'michael.okonkwo@giltcounselling.com',
      phone: '+234 803 456 7890',
      role: 'counselor',
      emailVerified: new Date(),
      gender: 'male',
      occupation: 'Business & Career Coach',
      bio: 'Expert in organizational psychology and business coaching. Helps professionals and business owners navigate challenges and achieve peak performance.',
      specializations: [
        'Business Counselling',
        'Academic and Career Counselling',
        'Organizational Staff Training',
        'Executive Coaching',
      ],
      availability: [
        { dayOfWeek: 1, startTime: '08:00', endTime: '16:00' }, // Monday
        { dayOfWeek: 2, startTime: '08:00', endTime: '16:00' }, // Tuesday
        { dayOfWeek: 3, startTime: '08:00', endTime: '16:00' }, // Wednesday
        { dayOfWeek: 4, startTime: '08:00', endTime: '16:00' }, // Thursday
        { dayOfWeek: 5, startTime: '08:00', endTime: '14:00' }, // Friday
      ],
      isAvailable: true,
      address: {
        city: 'Abuja',
        state: 'FCT',
        country: 'Nigeria',
      },
    });
    await counselor3.save();
    console.log('Counselor created: michael.okonkwo@giltcounselling.com (Michael Okonkwo)');

    // ==========================================
    // CREATE REGULAR USERS (CLIENTS)
    // ==========================================
    console.log('\n--- Creating Users/Clients ---');

    const user1 = new User({
      firstName: 'Chinedu',
      lastName: 'Okoro',
      email: 'chinedu.okoro@email.com',
      phone: '+234 810 123 4567',
      role: 'user',
      emailVerified: new Date(),
      gender: 'male',
      dateOfBirth: new Date('1990-05-15'),
      occupation: 'Software Engineer',
      source: 'online',
      preferredContactMethod: 'email',
      address: {
        city: 'Lagos',
        state: 'Lagos',
        country: 'Nigeria',
      },
      emergencyContact: {
        name: 'Ada Okoro',
        relationship: 'Sister',
        phone: '+234 811 234 5678',
      },
    });
    await user1.save();
    console.log('User created: chinedu.okoro@email.com');

    const user2 = new User({
      firstName: 'Amaka',
      lastName: 'Nwosu',
      email: 'amaka.nwosu@email.com',
      phone: '+234 805 678 9012',
      role: 'user',
      emailVerified: new Date(),
      gender: 'female',
      dateOfBirth: new Date('1988-11-22'),
      occupation: 'Marketing Manager',
      source: 'phone',
      preferredContactMethod: 'phone',
      address: {
        city: 'Port Harcourt',
        state: 'Rivers',
        country: 'Nigeria',
      },
      emergencyContact: {
        name: 'Emeka Nwosu',
        relationship: 'Husband',
        phone: '+234 806 789 0123',
      },
    });
    await user2.save();
    console.log('User created: amaka.nwosu@email.com');

    const user3 = new User({
      firstName: 'David',
      lastName: 'Adekunle',
      email: 'david.adekunle@email.com',
      phone: '+234 703 456 7890',
      role: 'user',
      emailVerified: new Date(),
      gender: 'male',
      dateOfBirth: new Date('1995-03-08'),
      occupation: 'University Student',
      source: 'whatsapp',
      preferredContactMethod: 'whatsapp',
      address: {
        city: 'Ibadan',
        state: 'Oyo',
        country: 'Nigeria',
      },
      emergencyContact: {
        name: 'Grace Adekunle',
        relationship: 'Mother',
        phone: '+234 704 567 8901',
      },
    });
    await user3.save();
    console.log('User created: david.adekunle@email.com');

    const user4 = new User({
      firstName: 'Blessing',
      lastName: 'Eze',
      email: 'blessing.eze@email.com',
      phone: '+234 816 789 0123',
      role: 'user',
      emailVerified: new Date(),
      gender: 'female',
      dateOfBirth: new Date('1992-07-30'),
      occupation: 'Entrepreneur',
      source: 'online',
      preferredContactMethod: 'email',
      address: {
        city: 'Enugu',
        state: 'Enugu',
        country: 'Nigeria',
      },
      emergencyContact: {
        name: 'Chisom Eze',
        relationship: 'Brother',
        phone: '+234 817 890 1234',
      },
    });
    await user4.save();
    console.log('User created: blessing.eze@email.com');

    const user5 = new User({
      firstName: 'Oluwaseun',
      lastName: 'Bakare',
      email: 'seun.bakare@email.com',
      phone: '+234 902 345 6789',
      role: 'user',
      emailVerified: new Date(),
      gender: 'male',
      dateOfBirth: new Date('1985-12-10'),
      occupation: 'Business Owner',
      source: 'walk-in',
      preferredContactMethod: 'phone',
      address: {
        city: 'Lagos',
        state: 'Lagos',
        country: 'Nigeria',
      },
      emergencyContact: {
        name: 'Funke Bakare',
        relationship: 'Wife',
        phone: '+234 903 456 7890',
      },
    });
    await user5.save();
    console.log('User created: seun.bakare@email.com');

    const user6 = new User({
      firstName: 'Fatima',
      lastName: 'Ibrahim',
      email: 'fatima.ibrahim@email.com',
      phone: '+234 814 567 8901',
      role: 'user',
      emailVerified: new Date(),
      gender: 'female',
      dateOfBirth: new Date('1998-09-25'),
      occupation: 'Graduate Student',
      source: 'online',
      preferredContactMethod: 'email',
      address: {
        city: 'Kano',
        state: 'Kano',
        country: 'Nigeria',
      },
    });
    await user6.save();
    console.log('User created: fatima.ibrahim@email.com');

    // ==========================================
    // CREATE APPOINTMENTS
    // ==========================================
    console.log('\n--- Creating Appointments ---');

    // Upcoming appointments
    const appointment1 = new Appointment({
      userId: user1._id,
      userName: `${user1.firstName} ${user1.lastName}`,
      userFirstName: user1.firstName,
      userEmail: user1.email,
      userPhone: user1.phone,
      counselorId: counselor1._id,
      counselorName: `${counselor1.firstName} ${counselor1.lastName}`,
      service: 'Mental Health & Emotional Wellness',
      date: '2026-01-20',
      time: '10:00 AM',
      status: 'confirmed',
      notes: 'Dealing with work-related stress and anxiety. Looking for coping strategies.',
    });
    await appointment1.save();
    console.log('Appointment created: Chinedu - Mental Health (Confirmed)');

    const appointment2 = new Appointment({
      userId: user2._id,
      userName: `${user2.firstName} ${user2.lastName}`,
      userFirstName: user2.firstName,
      userEmail: user2.email,
      userPhone: user2.phone,
      counselorId: counselor2._id,
      counselorName: `${counselor2.firstName} ${counselor2.lastName}`,
      service: 'Parenting & Special Needs Support',
      date: '2026-01-21',
      time: '02:00 PM',
      status: 'confirmed',
      notes: 'Need guidance on supporting my child with ADHD in school.',
    });
    await appointment2.save();
    console.log('Appointment created: Amaka - Parenting Support (Confirmed)');

    const appointment3 = new Appointment({
      userId: user3._id,
      userName: `${user3.firstName} ${user3.lastName}`,
      userFirstName: user3.firstName,
      userEmail: user3.email,
      userPhone: user3.phone,
      counselorId: counselor1._id,
      counselorName: `${counselor1.firstName} ${counselor1.lastName}`,
      service: 'Academic and Career Counselling',
      date: '2026-01-22',
      time: '11:00 AM',
      status: 'pending',
      notes: 'Unsure about career path after graduation. Need direction.',
    });
    await appointment3.save();
    console.log('Appointment created: David - Career Counselling (Pending)');

    const appointment4 = new Appointment({
      userId: user4._id,
      userName: `${user4.firstName} ${user4.lastName}`,
      userFirstName: user4.firstName,
      userEmail: user4.email,
      userPhone: user4.phone,
      counselorId: counselor3._id,
      counselorName: `${counselor3.firstName} ${counselor3.lastName}`,
      service: 'Business Counselling',
      date: '2026-01-23',
      time: '09:00 AM',
      status: 'confirmed',
      notes: 'Struggling with business decisions and need strategic guidance.',
      counselorNotes: 'First session scheduled. Will assess business challenges.',
    });
    await appointment4.save();
    console.log('Appointment created: Blessing - Business Counselling (Confirmed)');

    const appointment5 = new Appointment({
      userId: user5._id,
      userName: `${user5.firstName} ${user5.lastName}`,
      userFirstName: user5.firstName,
      userEmail: user5.email,
      userPhone: user5.phone,
      counselorId: counselor2._id,
      counselorName: `${counselor2.firstName} ${counselor2.lastName}`,
      service: 'Couples Therapy',
      date: '2026-01-24',
      time: '04:00 PM',
      status: 'pending',
      notes: 'Marriage communication issues. Wife will also attend.',
    });
    await appointment5.save();
    console.log('Appointment created: Oluwaseun - Couples Therapy (Pending)');

    const appointment6 = new Appointment({
      userId: user6._id,
      userName: `${user6.firstName} ${user6.lastName}`,
      userFirstName: user6.firstName,
      userEmail: user6.email,
      userPhone: user6.phone,
      counselorId: counselor1._id,
      counselorName: `${counselor1.firstName} ${counselor1.lastName}`,
      service: 'Youth Counselling, Life Skills & Mentoring',
      date: '2026-01-25',
      time: '03:00 PM',
      status: 'confirmed',
      notes: 'Looking for mentorship and life skills development.',
    });
    await appointment6.save();
    console.log('Appointment created: Fatima - Youth Counselling (Confirmed)');

    // Past/Completed appointments
    const appointment7 = new Appointment({
      userId: user1._id,
      userName: `${user1.firstName} ${user1.lastName}`,
      userFirstName: user1.firstName,
      userEmail: user1.email,
      userPhone: user1.phone,
      counselorId: counselor1._id,
      counselorName: `${counselor1.firstName} ${counselor1.lastName}`,
      service: 'Mental Health & Emotional Wellness',
      date: '2026-01-10',
      time: '10:00 AM',
      status: 'completed',
      notes: 'Initial consultation for stress management.',
      counselorNotes: 'Client is experiencing moderate work stress. Recommended breathing exercises and follow-up session.',
    });
    await appointment7.save();
    console.log('Appointment created: Chinedu - Mental Health (Completed)');

    const appointment8 = new Appointment({
      userId: user2._id,
      userName: `${user2.firstName} ${user2.lastName}`,
      userFirstName: user2.firstName,
      userEmail: user2.email,
      userPhone: user2.phone,
      counselorId: counselor2._id,
      counselorName: `${counselor2.firstName} ${counselor2.lastName}`,
      service: 'Family Counselling',
      date: '2026-01-08',
      time: '02:00 PM',
      status: 'completed',
      notes: 'Family dynamics discussion.',
      counselorNotes: 'Good progress. Family communication improving. Scheduled parenting support session.',
    });
    await appointment8.save();
    console.log('Appointment created: Amaka - Family Counselling (Completed)');

    const appointment9 = new Appointment({
      userId: user5._id,
      userName: `${user5.firstName} ${user5.lastName}`,
      userFirstName: user5.firstName,
      userEmail: user5.email,
      userPhone: user5.phone,
      counselorId: counselor3._id,
      counselorName: `${counselor3.firstName} ${counselor3.lastName}`,
      service: 'Organizational Staff Training',
      date: '2026-01-05',
      time: '09:00 AM',
      status: 'completed',
      notes: 'Staff training consultation.',
      counselorNotes: 'Conducted needs assessment. Will prepare training program for 20 staff members.',
    });
    await appointment9.save();
    console.log('Appointment created: Oluwaseun - Staff Training (Completed)');

    // Cancelled appointment
    const appointment10 = new Appointment({
      userId: user3._id,
      userName: `${user3.firstName} ${user3.lastName}`,
      userFirstName: user3.firstName,
      userEmail: user3.email,
      userPhone: user3.phone,
      counselorId: counselor1._id,
      counselorName: `${counselor1.firstName} ${counselor1.lastName}`,
      service: 'Youth Counselling, Life Skills & Mentoring',
      date: '2026-01-15',
      time: '11:00 AM',
      status: 'cancelled',
      cancelledBy: 'user',
      notes: 'Initial mentoring session.',
    });
    await appointment10.save();
    console.log('Appointment created: David - Youth Counselling (Cancelled)');

    // More upcoming appointments
    const appointment11 = new Appointment({
      userId: user4._id,
      userName: `${user4.firstName} ${user4.lastName}`,
      userFirstName: user4.firstName,
      userEmail: user4.email,
      userPhone: user4.phone,
      counselorId: counselor3._id,
      counselorName: `${counselor3.firstName} ${counselor3.lastName}`,
      service: 'Business Counselling',
      date: '2026-01-30',
      time: '10:00 AM',
      status: 'pending',
      notes: 'Follow-up session for business strategy.',
    });
    await appointment11.save();
    console.log('Appointment created: Blessing - Business Follow-up (Pending)');

    const appointment12 = new Appointment({
      userId: user1._id,
      userName: `${user1.firstName} ${user1.lastName}`,
      userFirstName: user1.firstName,
      userEmail: user1.email,
      userPhone: user1.phone,
      counselorId: counselor1._id,
      counselorName: `${counselor1.firstName} ${counselor1.lastName}`,
      service: 'Online Counselling',
      date: '2026-02-05',
      time: '06:00 PM',
      status: 'confirmed',
      notes: 'Evening online session - easier with work schedule.',
    });
    await appointment12.save();
    console.log('Appointment created: Chinedu - Online Counselling (Confirmed)');

    // ==========================================
    // SUMMARY
    // ==========================================
    console.log('\n========================================');
    console.log('           SEED COMPLETE');
    console.log('========================================');
    console.log('\nAll users use passwordless OTP authentication.\n');

    console.log('ADMIN:');
    console.log('  - wecare@giltcounselling.com (Gilt Admin)');

    console.log('\nCOUNSELORS:');
    console.log('  - joelcloud65@gmail.com (Joel Emmanuel)');
    console.log('  - sarah.adeyemi@giltcounselling.com (Sarah Adeyemi)');
    console.log('  - michael.okonkwo@giltcounselling.com (Michael Okonkwo)');

    console.log('\nCLIENTS:');
    console.log('  - chinedu.okoro@email.com (Chinedu Okoro)');
    console.log('  - amaka.nwosu@email.com (Amaka Nwosu)');
    console.log('  - david.adekunle@email.com (David Adekunle)');
    console.log('  - blessing.eze@email.com (Blessing Eze)');
    console.log('  - seun.bakare@email.com (Oluwaseun Bakare)');
    console.log('  - fatima.ibrahim@email.com (Fatima Ibrahim)');

    console.log('\nAPPOINTMENTS:');
    console.log('  - 12 total appointments');
    console.log('  - 5 confirmed');
    console.log('  - 3 pending');
    console.log('  - 3 completed');
    console.log('  - 1 cancelled');

    console.log('\n========================================\n');

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
