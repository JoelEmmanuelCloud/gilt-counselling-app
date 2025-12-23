# Gilt Counselling Consult - Professional Web Application

A world-class professional consulting web application for Gilt Counselling Consult, featuring user authentication, appointment booking, and admin dashboard.

## Features

- **User Authentication**: Secure login and registration system with JWT
- **Appointment Booking**: Users can book appointments for various counselling services
- **User Dashboard**: View and manage personal appointments
- **Admin Dashboard**: Comprehensive admin panel to manage all appointments
- **Responsive Design**: Mobile-friendly interface with professional styling
- **Service Showcase**: Display all counselling services offered
- **Contact Information**: Easy access to Nigeria and Canada office locations

## Technology Stack

### Frontend
- React 18 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests
- Context API for state management

### Backend
- Node.js with Express
- JWT for authentication
- bcryptjs for password hashing
- In-memory data storage (easily upgradeable to database)

## Project Structure

```
gilt-counselling-app/
├── client/                 # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── BookAppointment.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── About.tsx
│   │   │   └── Contact.tsx
│   │   ├── context/       # React Context
│   │   │   └── AuthContext.tsx
│   │   ├── types/         # TypeScript types
│   │   │   └── index.ts
│   │   ├── utils/         # Utility functions
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── index.css
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Express backend
│   ├── controllers/
│   │   ├── authController.js
│   │   └── appointmentController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── user.js
│   │   └── appointment.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── appointments.js
│   ├── server.js
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Step 1: Clone or Navigate to the Project
```bash
cd gilt-counselling-app
```

### Step 2: Install Dependencies

You can install all dependencies at once:
```bash
npm run install-all
```

Or install them separately:

**Install root dependencies:**
```bash
npm install
```

**Install client dependencies:**
```bash
cd client
npm install
cd ..
```

**Install server dependencies:**
```bash
cd server
npm install
cd ..
```

## Running the Application

### Option 1: Run Both Frontend and Backend Together (Recommended)
```bash
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend development server on http://localhost:3000

### Option 2: Run Separately

**Run Backend:**
```bash
cd server
npm run dev
```

**Run Frontend (in a new terminal):**
```bash
cd client
npm start
```

## Default Credentials

### Admin Account
- **Email**: admin@gilt.com
- **Password**: admin123

### User Account
- **Email**: user@example.com
- **Password**: user123

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Appointments
- `GET /api/appointments` - Get all appointments (admin) or user's appointments
- `GET /api/appointments/my-appointments` - Get current user's appointments (protected)
- `POST /api/appointments` - Create new appointment
- `PATCH /api/appointments/:id` - Update appointment status (protected)
- `DELETE /api/appointments/:id` - Delete appointment (admin only)

## Brand Colors

The application uses Gilt Counselling's brand colors:
- **Gold**: #D4A855
- **Blue**: #0A7EA4
- **Green**: #6BBE92
- **Orange**: #F5A623

## Core Values

- **Joy**: Bringing positivity to every interaction
- **Optimism**: Believing in potential and possibilities
- **Confidentiality**: Your privacy is our priority
- **Integrity**: Honest and ethical in all we do
- **Inclusion**: Welcoming and respectful to all

## Services Offered

1. Mental Health & Emotional Wellness
2. Educational Consulting
3. School Counselling Consult
4. Academic and Career Counselling
5. Youth Counselling, Life Skills & Mentoring
6. Parenting & Special Needs Support
7. Organizational Staff Training
8. Group Therapy, Outreach & Advocacy
9. Online Counselling
10. Partnerships and More

## Contact Information

### Nigeria Office
- **Address**: 88 Woji road, Vineyard Building, GRA Phase 2, Port Harcourt, Rivers State, Nigeria
- **Phone**:
  - +234 803 309 4050
  - +234 706 573 4165
  - +234 806 211 5372

### Overseas Office
- **Address**: 470 Front St W Toronto, Ontario M5V 0V6, Canada

## Future Enhancements

- Database integration (MongoDB, PostgreSQL, etc.)
- Email notifications for appointments
- SMS reminders
- Payment integration
- Video consultation feature
- Document upload functionality
- Advanced analytics for admin
- Calendar integration
- Multi-language support

## Production Deployment

### Environment Variables
Create `.env` files for both client and server:

**Server `.env`:**
```
PORT=5000
JWT_SECRET=your-secure-secret-key
DATABASE_URL=your-database-url
```

**Client `.env`:**
```
REACT_APP_API_URL=your-production-api-url
```

### Build for Production

**Build Frontend:**
```bash
cd client
npm run build
```

**Start Production Server:**
```bash
cd server
npm start
```

## License

MIT License

## Support

For support, please contact Gilt Counselling Consult through the contact information provided above.
