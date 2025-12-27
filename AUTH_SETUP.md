# Authentication Setup Guide

## Overview

The Gilt Counselling application uses JWT-based authentication with role-based access control (RBAC) for users and administrators.

## Demo Accounts

After running the seed script, you can log in with these accounts:

### Admin Account
- **Email**: `admin@gilt.com`
- **Password**: `admin123`
- **Access**: Admin Dashboard, all features

### User Accounts
1. **Email**: `user@example.com`
   - **Password**: `user123`
   - **Access**: User Dashboard, book appointments, view own appointments

2. **Email**: `jane@example.com`
   - **Password**: `jane123`
   - **Access**: User Dashboard, book appointments, view own appointments

## Running the Seed Script

To populate the database with demo users and sample appointments:

```bash
npm run seed
```

This will:
- Clear existing users and appointments
- Create admin and regular user accounts
- Create sample appointments for testing
- Display login credentials in the console

## Authentication Flow

### 1. User Registration (`/register`)
- Users fill out registration form with name, email, phone, and password
- Password is hashed using bcrypt before storage
- New users are assigned the `user` role by default
- JWT token is generated and stored in localStorage
- User is redirected to `/dashboard`

### 2. User Login (`/login`)
- Users enter email and password
- Credentials are validated against hashed password in database
- JWT token is generated and stored in localStorage
- **Admin users** are redirected to `/admin`
- **Regular users** are redirected to `/dashboard`

### 3. Protected Routes
The `ProtectedRoute` component (components/ProtectedRoute.tsx) handles route protection:

```tsx
// Regular protected route
<ProtectedRoute>
  <DashboardContent />
</ProtectedRoute>

// Admin-only route
<ProtectedRoute adminOnly>
  <AdminDashboardContent />
</ProtectedRoute>
```

Features:
- Loading state while checking authentication
- Automatic redirect to `/login` if not authenticated
- Access denied page for non-admin users trying to access admin routes
- Smooth user experience with proper state management

## API Route Protection

### Require Authentication
Use the `requireAuth` helper for routes that need any authenticated user:

```typescript
import { requireAuth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const authResult = await requireAuth(request);

  if ('error' in authResult) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  const { user } = authResult;
  // Use authenticated user data
}
```

### Require Admin Access
Use the `requireAdmin` helper for admin-only routes:

```typescript
import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const authResult = await requireAdmin(request);

  if ('error' in authResult) {
    return NextResponse.json(
      { message: authResult.error },
      { status: authResult.status }
    );
  }

  const { user } = authResult;
  // Admin-only operations
}
```

## Database Models

### User Model
Located at: `lib/models/user.ts`

Fields:
- `name`: string (required)
- `email`: string (required, unique, validated)
- `phone`: string (required)
- `password`: string (required, hashed, min 6 characters)
- `role`: 'user' | 'admin' (default: 'user')
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-generated)

Password Hashing:
- Automatic bcrypt hashing before save
- Salt rounds: 10
- Password comparison method: `user.comparePassword(password)`

### Appointment Model
Located at: `lib/models/appointment.ts`

Fields:
- `userId`: ObjectId (reference to User)
- `userName`: string
- `userEmail`: string
- `userPhone`: string
- `service`: string
- `date`: string
- `time`: string
- `status`: 'pending' | 'confirmed' | 'cancelled' | 'completed'
- `notes`: string (optional)
- `createdAt`: Date
- `updatedAt`: Date

## API Endpoints

### Authentication Routes

#### POST `/api/auth/register`
Register a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+234 123 456 7890"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+234 123 456 7890",
    "role": "user"
  }
}
```

#### POST `/api/auth/login`
Login with existing account

**Request Body:**
```json
{
  "email": "admin@gilt.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "name": "Admin User",
    "email": "admin@gilt.com",
    "phone": "+234 803 309 4050",
    "role": "admin"
  }
}
```

#### GET `/api/auth/me`
Get current authenticated user

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "user": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+234 123 456 7890",
    "role": "user"
  }
}
```

### Appointment Routes

#### GET `/api/appointments`
Get all appointments (Admin only)

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

#### GET `/api/appointments/my-appointments`
Get current user's appointments

**Headers:**
```
Authorization: Bearer <jwt-token>
```

#### POST `/api/appointments`
Create new appointment

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "service": "Individual Counseling",
  "date": "2025-12-30",
  "time": "10:00 AM",
  "notes": "First session"
}
```

#### PATCH `/api/appointments/:id`
Update appointment status

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "status": "confirmed"
}
```

#### DELETE `/api/appointments/:id`
Delete appointment (Admin only)

**Headers:**
```
Authorization: Bearer <admin-jwt-token>
```

## Frontend Components

### AuthContext
Located at: `lib/AuthContext.tsx`

Provides authentication state and methods throughout the app:

```tsx
const { user, login, register, logout, token } = useAuth();
```

Methods:
- `login(email, password)`: Authenticate user and store token
- `register(name, email, password, phone)`: Create new account
- `logout()`: Clear authentication state
- `user`: Current user object or null
- `token`: Current JWT token or null

### ProtectedRoute Component
Located at: `components/ProtectedRoute.tsx`

Wraps pages that require authentication:

```tsx
// User dashboard (any authenticated user)
<ProtectedRoute>
  <DashboardContent />
</ProtectedRoute>

// Admin dashboard (admin only)
<ProtectedRoute adminOnly>
  <AdminDashboardContent />
</ProtectedRoute>
```

## Environment Variables

Required in `.env.local`:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/gilt-counselling

# JWT Secret (change in production!)
JWT_SECRET=your-super-secret-jwt-key-change-me-in-production
```

## Security Best Practices

1. **Password Security**
   - Passwords are hashed with bcrypt (10 salt rounds)
   - Minimum 6 characters required
   - Never stored or transmitted in plain text

2. **JWT Tokens**
   - 7-day expiration
   - Stored in localStorage (consider httpOnly cookies for production)
   - Include user ID in payload

3. **API Protection**
   - All protected routes verify JWT token
   - Role-based access control for admin routes
   - Proper error messages without exposing system details

4. **Production Recommendations**
   - Use strong, random JWT_SECRET
   - Implement refresh tokens
   - Use httpOnly cookies instead of localStorage
   - Add rate limiting
   - Implement CSRF protection
   - Use HTTPS only
   - Add security headers

## Testing the Authentication Flow

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Visit** http://localhost:3000/login

3. **Test Admin Login**:
   - Email: `admin@gilt.com`
   - Password: `admin123`
   - Should redirect to `/admin` with full appointment management

4. **Test User Login**:
   - Email: `user@example.com`
   - Password: `user123`
   - Should redirect to `/dashboard` with personal appointments

5. **Test Registration**:
   - Navigate to `/register`
   - Create a new account
   - Should automatically log in and redirect to `/dashboard`

6. **Test Protected Routes**:
   - Try accessing `/admin` without logging in → redirects to `/login`
   - Try accessing `/admin` as regular user → shows access denied
   - Try accessing `/dashboard` without logging in → redirects to `/login`

## Troubleshooting

### "Not authenticated" errors
- Check if JWT token is in localStorage
- Verify token hasn't expired
- Ensure Authorization header is set correctly

### "Access denied" for admin routes
- Verify user role in database is 'admin'
- Check ProtectedRoute has `adminOnly` prop
- Clear localStorage and re-login

### Database connection errors
- Verify MongoDB is running
- Check MONGODB_URI in `.env.local`
- Run `npm run seed` to reset data

### Password issues
- Minimum 6 characters required
- Special characters are allowed
- Reset by running seed script or updating directly in database
