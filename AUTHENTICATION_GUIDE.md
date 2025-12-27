# Authentication System - Gilt Counselling Consult

## Overview

This application uses **NextAuth.js** for authentication with multiple sign-in methods:

1. **Email/Password** (Credentials)
2. **Google OAuth** (Social Login)
3. **Email Verification** (Required for new users)
4. **Admin Invitation System** (Controlled admin access)

---

## Authentication Flows

### 1. Regular User Sign Up

**Step-by-step process:**

1. User visits `/auth/signup`
2. User fills in:
   - Full name
   - Email
   - Phone number
   - Password (min 8 characters)
   - Confirms password
   - Agrees to Terms & Privacy Policy
3. System creates user account with `role: 'user'`
4. Sends verification email with 24-hour token
5. User clicks verification link in email
6. Email verified, user can sign in
7. User redirected to dashboard

**Alternative: Google Sign Up**
- Click "Continue with Google"
- Authorize with Google
- Account created automatically with verified email
- Redirected to dashboard

---

### 2. Admin Invitation & Setup

**Admins CANNOT self-register. They must be invited by existing admins.**

**Step-by-step process:**

1. Existing admin logs into `/admin`
2. Admin sends invitation:
   - Navigate to admin panel
   - Click "Invite Admin"
   - Enter email address and name
   - System sends invitation email
3. Invited user receives email with invitation link
4. User clicks link → redirected to `/auth/admin-accept?token=xxx`
5. User fills in:
   - Full name
   - Phone number
   - Password
   - Confirm password
6. System creates admin account with `role: 'admin'`
7. Email automatically verified
8. Admin can sign in immediately

**Security:**
- Invitations expire in 48 hours
- Each invitation token can only be used once
- Only existing admins can send invitations

---

### 3. Sign In Flow

**Multiple sign-in options:**

**Option A: Email/Password**
1. Visit `/auth/signin`
2. Enter email and password
3. System validates credentials
4. Redirects to appropriate dashboard:
   - Admins → `/admin`
   - Users → `/dashboard`

**Option B: Google OAuth**
1. Visit `/auth/signin`
2. Click "Continue with Google"
3. Authorize with Google
4. Automatically signed in
5. Redirects to dashboard

**Option C: Magic Link (Legacy)**
- Still available at `/login` (old page)
- Being phased out in favor of NextAuth

---

### 4. Email Verification

**For email/password signups:**

1. User signs up → verification email sent
2. Email contains unique token link
3. Token valid for 24 hours
4. User clicks link → `/auth/verify-email?token=xxx`
5. System verifies token:
   - If valid → email verified, can sign in
   - If expired → user can request new verification email
   - If invalid → shows error message

**Note:** Google OAuth users skip this step (email pre-verified by Google)

---

## Setup Instructions

### 1. Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

```bash
cp .env.local.example .env.local
```

**Required variables:**

```env
# Database
MONGODB_URI=mongodb://localhost:27017/gilt-counselling

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key  # Generate with: openssl rand -base64 32
AUTH_TRUST_HOST=true

# Google OAuth (see section below)
GOOGLE_CLIENT_ID=your-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-secret

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=hello@giltcounselling.com

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### 2. Google OAuth Setup

**Get Google OAuth credentials:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project or select existing one
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth Client ID**
5. Application type: **Web application**
6. Authorized JavaScript origins:
   ```
   http://localhost:3000
   https://giltcounselling.com
   ```
7. Authorized redirect URIs:
   ```
   http://localhost:3000/api/auth/callback/google
   https://giltcounselling.com/api/auth/callback/google
   ```
8. Copy **Client ID** and **Client Secret**
9. Add to `.env.local`:
   ```env
   GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxx
   ```

---

### 3. Email Service Setup (Resend)

**Get Resend API Key:**

1. Go to [Resend](https://resend.com)
2. Sign up for free account
3. Verify your domain (`giltcounselling.com`)
4. Add DNS records (SPF, DKIM)
5. Get API key from Dashboard
6. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxx
   EMAIL_FROM=hello@giltcounselling.com
   ```

**Email templates included for:**
- Welcome & email verification
- Admin invitations
- Password reset (future)
- Appointment confirmations

---

### 4. Database Setup

No changes needed! The User model already supports:
- Email verification (`emailVerified`, `verificationToken`, `verificationTokenExpiry`)
- OAuth (`image` field for Google profile photo)
- Admin roles (`role: 'admin' | 'user'`)

---

## API Routes

### Public Routes (No Auth Required)

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/[...nextauth]` | GET, POST | NextAuth.js handler |
| `/api/auth/signup` | POST | Create new user account |
| `/api/auth/verify-email` | POST | Verify email address |
| `/api/auth/admin-verify-invite` | GET | Verify admin invitation |
| `/api/auth/admin-accept` | POST | Accept admin invitation |

### Protected Routes (Auth Required)

| Route | Method | Role | Description |
|-------|--------|------|-------------|
| `/api/profile` | GET, PATCH | User | Get/update user profile |
| `/api/profile/change-password` | POST | User | Change password |
| `/api/admin/clients` | GET, POST | Admin | Manage clients |
| `/api/admin/invite` | POST | Admin | Send admin invitation |

---

## Frontend Pages

### Public Pages
- `/auth/signin` - Sign in with email/Google
- `/auth/signup` - Create user account
- `/auth/verify-email` - Email verification
- `/auth/admin-accept` - Accept admin invitation

### Protected Pages
- `/dashboard` - User dashboard
- `/admin` - Admin dashboard
- `/profile` - User profile management

---

## Security Features

### Password Security
- Minimum 8 characters required
- Hashed with bcrypt (10 salt rounds)
- Never stored in plain text

### Token Security
- Email verification tokens: 24-hour expiry
- Admin invitation tokens: 48-hour expiry
- JWT session tokens: 7-day expiry
- All tokens are UUIDs (cryptographically random)

### Session Management
- NextAuth.js handles sessions
- JWT strategy with secure cookies
- Automatic session refresh
- HttpOnly cookies (XSS protection)

### Role-Based Access Control (RBAC)
- Middleware protects admin routes
- API routes verify user role
- Frontend components check permissions

---

## User Roles

### Regular User (`role: 'user'`)
**Can:**
- Create account via signup
- Sign in with Google
- Book appointments
- View/update profile
- View appointment history

**Cannot:**
- Access admin dashboard
- Manage other users
- Send admin invitations

### Admin (`role: 'admin'`)
**Can:**
- Everything users can do
- Access admin dashboard
- View all clients and appointments
- Create bookings for clients (phone/walk-in)
- Manage client records
- Add session notes
- Invite new admins

**Cannot:**
- Self-register (must be invited)

---

## Common Workflows

### Creating the First Admin

Since admins can't self-register, you need to manually create the first admin:

**Option 1: Database Seed Script**
```bash
npm run seed  # Creates admin@gilt.com with password: admin123
```

**Option 2: Manual MongoDB Update**
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin", emailVerified: new Date() } }
)
```

**Option 3: Update via Mongoose**
```javascript
const user = await User.findOne({ email: "your-email@example.com" });
user.role = "admin";
user.emailVerified = new Date();
await user.save();
```

---

### Inviting Additional Admins

1. Sign in as existing admin
2. Go to Admin Dashboard
3. Click "Invite Admin" (to be added to UI)
4. Or use API directly:
   ```bash
   curl -X POST http://localhost:3000/api/admin/invite \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"email": "newadmin@example.com", "name": "New Admin"}'
   ```

---

### Password Reset Flow (To Be Implemented)

1. User clicks "Forgot Password" on sign-in page
2. Enter email address
3. System sends password reset email
4. User clicks link with reset token
5. User enters new password
6. Password updated, user can sign in

**Files to create:**
- `/app/auth/forgot-password/page.tsx`
- `/app/auth/reset-password/page.tsx`
- `/app/api/auth/forgot-password/route.ts`
- `/app/api/auth/reset-password/route.ts`

---

## Testing

### Test User Sign Up

```bash
# 1. Start dev server
npm run dev

# 2. Navigate to signup page
open http://localhost:3000/auth/signup

# 3. Fill in form with test data
# 4. Check email/console for verification link
# 5. Click verification link
# 6. Sign in at /auth/signin
```

### Test Google OAuth

```bash
# 1. Ensure Google OAuth credentials are set
# 2. Start dev server
npm run dev

# 3. Navigate to signin page
open http://localhost:3000/auth/signin

# 4. Click "Continue with Google"
# 5. Authorize with Google account
# 6. Should redirect to dashboard
```

### Test Admin Invitation

```bash
# 1. Sign in as admin (admin@gilt.com / admin123)
# 2. Send invitation via API or UI
# 3. Check email for invitation link
# 4. Click link to accept invitation
# 5. Create admin account
# 6. Sign in with new admin credentials
```

---

## Troubleshooting

### "Invalid credentials" error
- Check email/password are correct
- Verify user exists in database
- Check if email is verified (for email/password signups)

### Google OAuth not working
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set
- Check authorized redirect URIs in Google Console
- Ensure `NEXTAUTH_URL` matches your app URL

### Email not sending
- Verify `RESEND_API_KEY` is correct
- Check domain is verified in Resend dashboard
- Look for errors in server logs
- Check spam folder

### Admin invitation expired
- Invitations expire in 48 hours
- Request a new invitation from an admin
- Check `AdminInvite` collection for active invites

### Session expired
- Sessions last 7 days
- Sign in again to get new session
- Check `NEXTAUTH_SECRET` is set correctly

---

## Migration from Old Auth System

If you have existing users from the old JWT-based system:

### They can continue to use:
- `/login` (old login page)
- Email/password authentication
- Magic link authentication (if implemented)

### To migrate users to NextAuth:
1. Users sign in via `/auth/signin` instead of `/login`
2. Their existing credentials work
3. NextAuth creates session for them
4. No database changes needed

### Gradual migration:
- Keep both `/login` and `/auth/signin` active
- Redirect `/login` → `/auth/signin` after testing
- Update all links to use `/auth/signin`
- Eventually remove old `/login` page

---

## Best Practices

### Development
- Use test email service in development (Resend test mode)
- Don't commit `.env.local` to Git
- Use different Google OAuth credentials for dev/prod
- Test all auth flows before deploying

### Production
- Use strong `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
- Enable HTTPS (required for Google OAuth)
- Use MongoDB Atlas (not local MongoDB)
- Set up email domain with proper DNS records
- Monitor failed sign-in attempts
- Implement rate limiting on auth endpoints

### Security
- Never log passwords or tokens
- Validate all user inputs
- Sanitize email addresses
- Use CSRF protection (built into NextAuth)
- Enable 2FA for admin accounts (future)

---

## Future Enhancements

### Planned Features
1. **Password Reset Flow** - Forgot password functionality
2. **2FA (Two-Factor Authentication)** - OTP for admin accounts
3. **Social Login Extensions** - Facebook, Apple, Microsoft
4. **Account Linking** - Link multiple sign-in methods
5. **Session Management UI** - View active sessions, sign out all
6. **Audit Logs** - Track admin actions
7. **IP Whitelisting** - Restrict admin access by IP
8. **Biometric Auth** - Fingerprint/Face ID for mobile

---

## Support

### Documentation
- NextAuth.js Docs: https://next-auth.js.org/
- Google OAuth Setup: https://developers.google.com/identity/protocols/oauth2
- Resend Docs: https://resend.com/docs

### Questions?
- Check implementation in `/lib/auth.config.nextauth.ts`
- Review API routes in `/app/api/auth/`
- Test authentication flows in development

---

**Last Updated:** December 26, 2025
**Version:** 1.0.0
**Auth System:** NextAuth.js v5
