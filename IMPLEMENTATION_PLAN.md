# Gilt Counselling Consult - Implementation Plan

## Phase 1: Authentication & Email System (Priority: Critical)

### 1.1 Magic Link Authentication
- [ ] Install Resend for email delivery
- [ ] Create MagicLink model (token, email, expires, used)
- [ ] Create magic link generation API route
- [ ] Create magic link verification API route
- [ ] Update login page to support magic links
- [ ] Add email templates for magic links
- [ ] Keep JWT as backup/session management

### 1.2 Professional Email Setup
- [ ] Domain email addresses setup guide:
  - wecare@giltcounselling.com
  - support@giltcounselling.com
  - notification@giltcounselling.com
- [ ] Email service configuration (Resend/SendGrid)
- [ ] Email templates for all communications

## Phase 2: Enhanced Admin Features (Priority: High)

### 2.1 Client Management System
- [ ] Enhanced User model with additional fields:
  - Profile photo
  - Address (Nigeria/Canada)
  - Emergency contact
  - Medical/counselling history
  - Payment history
  - Session notes (admin only)
  - Client source (online/phone/WhatsApp/walk-in)
- [ ] Admin client list view with search/filter
- [ ] Client detail view with full history
- [ ] Client creation form for walk-ins/phone bookings

### 2.2 Admin-Assisted Booking
- [ ] Admin booking interface
- [ ] Select existing client or create new
- [ ] Service selection
- [ ] Date/time picker with availability
- [ ] Booking source tracking (phone/WhatsApp/walk-in/online)
- [ ] Notes field for context
- [ ] Automatic email confirmation to client

### 2.3 Appointment Management
- [ ] Calendar view for appointments
- [ ] Drag-and-drop rescheduling
- [ ] Bulk operations (confirm, cancel, reschedule)
- [ ] Appointment status workflow
- [ ] Session notes and documentation
- [ ] Attendance tracking

### 2.4 Service & Availability Management
- [ ] Service types configuration
- [ ] Pricing management
- [ ] Counselor availability settings
- [ ] Holiday/blocked dates
- [ ] Session duration settings
- [ ] Capacity management

## Phase 3: Payment Integration (Priority: High)

### 3.1 Paystack Integration
- [ ] Install Paystack SDK
- [ ] Create Payment model
- [ ] Payment initialization endpoint
- [ ] Payment verification webhook
- [ ] Payment history in user dashboard
- [ ] Payment history in admin dashboard
- [ ] Invoice generation
- [ ] Receipt email automation

### 3.2 Payment Features
- [ ] Multiple payment methods support
- [ ] Nigerian and international payments
- [ ] Payment tracking and reconciliation
- [ ] Refund management
- [ ] Payment reminders

## Phase 4: Communication System (Priority: Medium)

### 4.1 Email Notifications
- [ ] Booking confirmations
- [ ] Payment receipts
- [ ] Appointment reminders (24hr, 1hr before)
- [ ] Cancellation notifications
- [ ] Welcome emails
- [ ] Newsletter system

### 4.2 WhatsApp Integration
- [ ] WhatsApp click-to-chat buttons
- [ ] WhatsApp contact links in navbar
- [ ] Quick inquiry templates

### 4.3 SMS Notifications (Optional)
- [ ] Appointment reminders via SMS
- [ ] Payment confirmations via SMS

## Phase 5: Content Management (Priority: Medium)

### 5.1 Blog System
- [ ] Blog post model
- [ ] Admin blog creation/editing interface
- [ ] Rich text editor
- [ ] Image upload
- [ ] Categories and tags
- [ ] Published/draft status
- [ ] SEO metadata
- [ ] Public blog listing and detail pages

### 5.2 Testimonials Management
- [ ] Testimonial model
- [ ] Admin testimonial management
- [ ] Approval workflow
- [ ] Display on homepage/testimonials page

### 5.3 Resources Section
- [ ] Downloadable resources
- [ ] Educational materials
- [ ] Video content support

## Phase 6: Client Portal Enhancement (Priority: Medium)

### 6.1 User Profile
- [ ] Profile photo upload
- [ ] Personal information editing
- [ ] Password change
- [ ] Email preferences
- [ ] Session history
- [ ] Payment history
- [ ] Upcoming appointments

### 6.2 Session Management
- [ ] View session notes (client-appropriate)
- [ ] Rate and review sessions
- [ ] Book follow-up sessions
- [ ] Download receipts

## Phase 7: Reporting & Analytics (Priority: Low)

### 7.1 Admin Reports
- [ ] Appointment statistics
- [ ] Revenue reports
- [ ] Client acquisition sources
- [ ] Service popularity
- [ ] Counselor utilization
- [ ] Payment collection rates

### 7.2 Client Reports
- [ ] Session summary
- [ ] Progress tracking
- [ ] Payment history exports

## Phase 8: Advanced Features (Priority: Low)

### 8.1 Virtual Counselling
- [ ] Video call integration (Zoom/Google Meet)
- [ ] Secure document sharing
- [ ] Session recording (with consent)

### 8.2 Multi-language Support
- [ ] English (default)
- [ ] Potential for other languages

### 8.3 Mobile App
- [ ] React Native mobile app (future consideration)

## Implementation Priority Order

### Week 1-2: Core Infrastructure
1. Magic link authentication
2. Email service setup (Resend)
3. Enhanced user model
4. Admin client management

### Week 3-4: Booking System
5. Admin-assisted booking
6. Calendar view
7. Appointment management
8. Service configuration

### Week 5-6: Payments
9. Paystack integration
10. Payment tracking
11. Invoice/receipt system

### Week 7-8: Communications
12. Email notifications
13. WhatsApp integration
14. Reminder system

### Week 9-10: Content
15. Blog system
16. Testimonials
17. Resources section

### Week 11-12: Enhancement & Polish
18. User profile enhancement
19. Reports and analytics
20. Testing and refinement

## Technical Stack

### Backend
- Next.js 15 API Routes
- MongoDB with Mongoose
- JWT + Magic Links for auth
- Resend for emails
- Paystack for payments

### Frontend
- Next.js 15 (App Router)
- React 19
- TailwindCSS
- TypeScript

### Email Service
- Resend (recommended) or SendGrid
- Custom email templates
- Transactional emails

### Payment
- Paystack SDK
- Webhook handling
- Payment verification

## Security Considerations

- [ ] HTTPS enforcement
- [ ] Rate limiting on auth endpoints
- [ ] CSRF protection
- [ ] Input validation and sanitization
- [ ] Secure password storage (bcrypt)
- [ ] Magic link expiration (15 minutes)
- [ ] Admin action logging
- [ ] Data encryption for sensitive info
- [ ] GDPR compliance considerations
- [ ] Session management
- [ ] API key security

## Environment Variables Needed

```env
# Database
MONGODB_URI=

# Authentication
JWT_SECRET=
MAGIC_LINK_SECRET=

# Email (Resend)
RESEND_API_KEY=
EMAIL_FROM=wecare@giltcounselling.com

# Payment (Paystack)
PAYSTACK_SECRET_KEY=
PAYSTACK_PUBLIC_KEY=
PAYSTACK_WEBHOOK_SECRET=

# WhatsApp
WHATSAPP_NUMBER=+2348033094050

# App
NEXT_PUBLIC_APP_URL=https://giltcounselling.com
NODE_ENV=production
```

## Database Models Summary

1. **User** - Extended with profile, address, emergency contact, source
2. **MagicLink** - Token, email, expiry, used status
3. **Appointment** - Enhanced with source, session notes, attendance
4. **Payment** - Transaction records, status, Paystack reference
5. **Service** - Service types, pricing, duration, availability
6. **BlogPost** - Title, content, author, category, status, SEO
7. **Testimonial** - Client name, content, rating, approved status
8. **EmailTemplate** - Reusable email templates
9. **Notification** - Email/SMS notification queue
10. **AuditLog** - Admin action tracking

## Next Steps

Starting with Phase 1: Magic Link Authentication and Email Setup
