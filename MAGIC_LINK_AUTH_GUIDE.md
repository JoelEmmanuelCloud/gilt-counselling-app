# Magic Link + Google OAuth Authentication

## Overview

Gilt Counselling Consult uses a **passwordless authentication system** for users:

1. **Magic Link** - Email-based passwordless authentication (primary method)
2. **Google OAuth** - Social login with Google (alternative method)

**No passwords required for regular users!**

Admins use passwords (created via invitation system).

---

## 🎯 User Authentication Flow

### Option 1: Sign In with Magic Link (Passwordless)

**User Experience:**

1. User visits `/auth/signin`
2. Enters email address
3. Clicks "Send Magic Link"
4. Receives email with sign-in link
5. Clicks link in email
6. Automatically signed in → redirected to dashboard

**Benefits:**
- ✅ No password to remember
- ✅ More secure (no password to steal)
- ✅ Faster sign-in
- ✅ Better UX

### Option 2: Sign In with Google

**User Experience:**

1. User visits `/auth/signin`
2. Clicks "Continue with Google"
3. Authorizes with Google account
4. Automatically signed in → redirected to dashboard

**Benefits:**
- ✅ One-click sign-in
- ✅ Uses existing Google account
- ✅ Trusted authentication

---

## 📝 User Registration Flow

### Creating a New Account

**User Experience:**

1. User visits `/auth/signup`
2. Fills in:
   - Full Name
   - Email Address
   - Phone Number
3. Agrees to Terms & Privacy Policy
4. Clicks "Create Account" (or "Continue with Google")
5. Account created → Welcome email sent
6. Redirected to sign-in page
7. Uses magic link or Google to sign in

**Note:** No email verification needed! Users can sign in immediately using magic link.

---

## 🔐 How Magic Links Work

### Technical Flow

1. **User requests magic link:**
   ```javascript
   signIn("email", { email: "user@example.com" })
   ```

2. **NextAuth generates secure token:**
   - Creates unique token
   - Stores in database
   - Links to user email
   - Sets 24-hour expiry

3. **Email sent with magic link:**
   ```
   https://giltcounselling.com/api/auth/callback/email?token=abc123&email=user@example.com
   ```

4. **User clicks link:**
   - NextAuth validates token
   - Checks expiry
   - Verifies email match
   - Creates session
   - Redirects to dashboard

5. **Token is deleted:**
   - One-time use only
   - Cannot be reused

### Security Features

- ✅ Tokens expire in 24 hours
- ✅ One-time use only
- ✅ Cryptographically secure
- ✅ Tied to specific email
- ✅ HTTPS required in production
- ✅ CSRF protection built-in

---

## 🚀 Setup Instructions

### 1. Install Dependencies (Already Done)

```bash
npm install next-auth@latest @auth/mongodb-adapter
```

### 2. Configure Environment Variables

Add to `.env.local`:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key  # Generate with: openssl rand -base64 32
AUTH_TRUST_HOST=true

# Google OAuth (Optional but Recommended)
GOOGLE_CLIENT_ID=your-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxxx

# Email Service (Resend) - REQUIRED for Magic Links
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=hello@giltcounselling.com

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set Up Email Service (Resend)

**Why Resend?**
- Free tier: 3,000 emails/month
- Easy setup
- Great deliverability
- Beautiful email templates

**Steps:**

1. Go to [Resend.com](https://resend.com)
2. Create free account
3. Verify your email
4. Get API key from dashboard
5. Add to `.env.local`:
   ```env
   RESEND_API_KEY=re_abcd1234xyz5678
   ```

**For Development (Without Custom Domain):**
```env
EMAIL_FROM=onboarding@resend.dev  # Resend test email
```

**For Production (With Custom Domain):**

1. Add domain in Resend dashboard: `giltcounselling.com`
2. Add DNS records (provided by Resend):
   - MX records
   - TXT records (SPF, DKIM)
3. Wait for verification (24-48 hours)
4. Update `.env.local`:
   ```env
   EMAIL_FROM=hello@giltcounselling.com
   ```

### 4. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Copy output and add to `.env.local`:
```env
NEXTAUTH_SECRET=paste-generated-secret-here
```

### 5. Optional: Set Up Google OAuth

**Get Google OAuth Credentials:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project: "Gilt Counselling"
3. Enable Google+ API
4. Create OAuth Client ID:
   - Application type: Web application
   - Authorized JavaScript origins:
     ```
     http://localhost:3000
     https://giltcounselling.com
     ```
   - Authorized redirect URIs:
     ```
     http://localhost:3000/api/auth/callback/google
     https://giltcounselling.com/api/auth/callback/google
     ```
5. Copy Client ID and Secret
6. Add to `.env.local`

---

## 📂 Pages & Routes

### Public Pages

| Page | URL | Description |
|------|-----|-------------|
| Sign In | `/auth/signin` | Enter email for magic link or use Google |
| Sign Up | `/auth/signup` | Create new account (passwordless) |
| Verify Request | `/auth/verify-request` | Confirmation page after requesting magic link |

### API Routes

| Route | Method | Description |
|-------|--------|-------------|
| `/api/auth/[...nextauth]` | GET, POST | NextAuth.js handler (magic link + Google) |
| `/api/auth/signup` | POST | Create new user account (no password) |

---

## 🧪 Testing the System

### Test User Sign Up

1. Start dev server:
   ```bash
   npm run dev
   ```

2. Navigate to sign up:
   ```bash
   open http://localhost:3000/auth/signup
   ```

3. Fill in form:
   - Name: Test User
   - Email: test@example.com
   - Phone: +234 800 000 0000

4. Click "Create Account"

5. Success message appears

6. Redirected to sign-in page

### Test Magic Link Sign In

1. Navigate to sign in:
   ```bash
   open http://localhost:3000/auth/signin
   ```

2. Enter email: `test@example.com`

3. Click "Send Magic Link"

4. Check email (or server console in dev mode)

5. Click magic link in email

6. Automatically signed in

7. Redirected to `/dashboard`

### Test Google OAuth

1. Navigate to sign in:
   ```bash
   open http://localhost:3000/auth/signin
   ```

2. Click "Continue with Google"

3. Choose Google account

4. Authorize access

5. Automatically signed in

6. Redirected to `/dashboard`

---

## 📧 Email Templates

### Magic Link Email

Sent when user requests to sign in:

**Subject:** "Sign in to Gilt Counselling Consult"

**Content:**
- Branded header with Gilt colors
- Personalized greeting
- Clear "Sign In" button
- Link expiry notice (24 hours)
- Contact information
- Office locations

### Welcome Email

Sent when new user creates account:

**Subject:** "Welcome to Gilt Counselling Consult!"

**Content:**
- Welcome message
- Account creation confirmation
- Instructions for signing in with magic link
- "Sign In Now" button
- Services overview
- Contact information

---

## 🔒 Security Best Practices

### Development

- ✅ Use Resend test mode (`EMAIL_FROM=onboarding@resend.dev`)
- ✅ Never commit `.env.local` to Git
- ✅ Use different Google OAuth credentials for dev/prod
- ✅ Test magic links in multiple email clients

### Production

- ✅ Use strong `NEXTAUTH_SECRET` (generate with openssl)
- ✅ Enable HTTPS (required for magic links to work properly)
- ✅ Use custom domain email (`hello@giltcounselling.com`)
- ✅ Set up SPF, DKIM, and DMARC DNS records
- ✅ Monitor failed sign-in attempts
- ✅ Implement rate limiting on magic link requests
- ✅ Set up email deliverability monitoring

### Magic Link Security

- ✅ Links expire in 24 hours
- ✅ One-time use only
- ✅ Cannot be forwarded to another email
- ✅ Validates email matches token
- ✅ HTTPS prevents token interception
- ✅ HttpOnly cookies prevent XSS

---

## 🎨 Customization

### Email Template Customization

Edit magic link email template in:
```
lib/auth.config.nextauth.ts
```

Look for `EmailProvider` configuration:
```typescript
EmailProvider({
  async sendVerificationRequest({ identifier: email, url, provider }) {
    // Customize HTML email template here
  }
})
```

### Sign In Page Customization

Edit sign-in page at:
```
app/auth/signin/page.tsx
```

Customize:
- Colors
- Branding
- Copy/text
- Layout
- Additional fields

---

## ❓ Troubleshooting

### Magic Link Not Received

**Possible causes:**
1. Email in spam folder
2. Invalid `RESEND_API_KEY`
3. Domain not verified in Resend
4. Email server blocking Resend

**Solutions:**
1. Check spam/junk folder
2. Verify API key is correct
3. Check Resend dashboard for email logs
4. Use `onboarding@resend.dev` for testing
5. Check server logs for errors

### Magic Link Expired

**Error:** "Invalid or expired token"

**Solutions:**
1. Request new magic link
2. Check token expiry (24 hours default)
3. Verify system time is correct

### Google OAuth Not Working

**Possible causes:**
1. Invalid credentials
2. Redirect URI mismatch
3. Google+ API not enabled

**Solutions:**
1. Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
2. Check redirect URIs in Google Console match exactly
3. Enable Google+ API in Google Cloud Console
4. Clear cookies and try in incognito mode

### "Email configuration not found"

**Error:** NextAuth can't send emails

**Solutions:**
1. Verify `RESEND_API_KEY` is set in `.env.local`
2. Verify `EMAIL_FROM` is set
3. Check Resend API key is valid
4. Restart dev server after adding env vars

---

## 📊 Comparison: Magic Link vs Password

| Feature | Magic Link | Password |
|---------|------------|----------|
| User remembers | Email only | Email + Password |
| Security | High | Medium-High |
| Password reset | Not needed | Required |
| Phishing risk | Low | High |
| Brute force risk | None | Possible |
| User friction | Low | Medium |
| Setup complexity | Medium | Low |
| Cost | Email sending | None |

---

## 🔄 Migration from Password Auth

If you have existing users with passwords:

### Option 1: Gradual Migration

1. Keep both auth methods
2. Add magic link alongside password login
3. Encourage users to use magic link
4. Eventually deprecate password login

### Option 2: Force Migration

1. Remove password login entirely
2. Send email to all users about change
3. Users sign in with magic link only
4. Keep password hashes in database for admins

### Recommended Approach

**For Gilt Counselling:**
- New users: Magic link + Google OAuth only (current implementation)
- Admins: Passwords (via invitation system)
- Legacy users: If you have existing users with passwords, implement Option 1

---

## 🎯 User Education

### Help Users Understand Magic Links

**Sample messaging:**

> **What is a magic link?**
>
> A magic link is a special link we send to your email that automatically signs you in. No password needed!
>
> **How to sign in:**
> 1. Enter your email address
> 2. Check your inbox
> 3. Click the link we sent you
> 4. You're in!
>
> **Is it secure?**
>
> Yes! Magic links are more secure than passwords because:
> - The link expires after 24 hours
> - It can only be used once
> - Only someone with access to your email can use it
> - No password to forget or steal

### Common User Questions

**Q: Why don't you use passwords?**
A: Magic links are more secure and easier to use. You don't have to remember a password, and there's no risk of your password being stolen.

**Q: What if I don't receive the email?**
A: Check your spam folder. If you still don't see it, request a new magic link. Make sure to use the same email address you signed up with.

**Q: Can I share the magic link with someone else?**
A: No, magic links are tied to your email address and can only be used by you. They also expire after 24 hours.

**Q: What if the link expires?**
A: Simply request a new magic link from the sign-in page. Links expire after 24 hours for security.

---

## ✅ Implementation Checklist

- [x] NextAuth.js installed and configured
- [x] Email provider (Resend) set up
- [x] Google OAuth provider configured
- [x] Magic link email template created
- [x] Sign-in page built (magic link + Google)
- [x] Sign-up page built (passwordless)
- [x] Verify-request page created
- [x] Welcome email template created
- [ ] Environment variables configured (.env.local)
- [ ] Resend API key obtained
- [ ] Custom domain verified in Resend
- [ ] Google OAuth credentials obtained
- [ ] Tested magic link sign-in
- [ ] Tested Google OAuth sign-in
- [ ] Tested user registration
- [ ] Email deliverability tested

---

## 📚 Additional Resources

### Documentation
- [NextAuth.js Docs](https://next-auth.js.org/)
- [Email Provider Docs](https://next-auth.js.org/providers/email)
- [Resend Documentation](https://resend.com/docs)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)

### Related Files
- `lib/auth.config.nextauth.ts` - NextAuth configuration
- `app/auth/signin/page.tsx` - Sign-in page
- `app/auth/signup/page.tsx` - Sign-up page
- `app/auth/verify-request/page.tsx` - Magic link sent confirmation
- `app/api/auth/signup/route.ts` - User registration API

---

## 🎉 Summary

You now have a modern, passwordless authentication system:

✅ **Magic Link Authentication** - Secure, passwordless sign-in
✅ **Google OAuth** - One-click social login
✅ **Beautiful Email Templates** - Branded, professional emails
✅ **User-Friendly Flow** - Simple, intuitive UX
✅ **High Security** - Token-based, time-limited, one-time use
✅ **No Password Reset** - Because there are no passwords!
✅ **Mobile Optimized** - Works perfectly on all devices

**Status:** ✅ Ready to use (after environment setup)

**Next Steps:**
1. Get Resend API key
2. Configure environment variables
3. Test magic link authentication
4. Deploy to production

---

**Last Updated:** December 26, 2025
**Auth System:** NextAuth.js + Magic Links + Google OAuth
**Passwordless:** Yes (for users)
**Admin Auth:** Password-based (via invitation)
