# Professional Email Setup Guide
## Gilt Counselling Consult - Custom Domain Email Configuration

This guide will walk you through setting up professional branded email addresses for Gilt Counselling Consult.

---

## Overview

We'll be setting up the following email addresses:
- `wecare@giltcounselling.com` - General inquiries and bookings
- `support@giltcounselling.com` - Client support and assistance
- `notification@giltcounselling.com` - Automated system notifications
- `admin@giltcounselling.com` - Administrative communications

---

## Step 1: Domain Ownership

### Requirements:
- You must own the domain: `giltcounselling.com`
- Access to domain DNS settings (usually through your domain registrar)

### Domain Registrars:
Popular registrars include:
- **Namecheap** (https://www.namecheap.com)
- **GoDaddy** (https://www.godaddy.com)
- **Google Domains** (https://domains.google)
- **Cloudflare** (https://www.cloudflare.com)

---

## Step 2: Choose Email Service Provider

You have three main options:

### Option A: Resend (Recommended for Developers)

**Pros:**
- Designed for developers and applications
- Free tier: 100 emails/day, 3,000 emails/month
- Simple API integration (already implemented in your app)
- Great deliverability rates
- Can send AND receive emails programmatically

**Cons:**
- Not a full email hosting solution (no webmail interface by default)
- Primarily for transactional/automated emails

**Pricing:**
- Free: 100 emails/day
- Pro: $20/month for 50,000 emails/month

**Best for:** Automated notifications, magic links, appointment confirmations

### Option B: Google Workspace (Recommended for Full Email Solution)

**Pros:**
- Professional Gmail interface
- Access emails from any device
- Google Drive, Calendar, Meet included
- 30GB storage per user
- Excellent spam protection
- Mobile apps available

**Cons:**
- Monthly cost per user
- Requires separate API integration for automated emails

**Pricing:**
- Business Starter: $6 USD/user/month
- Business Standard: $12 USD/user/month

**Best for:** Daily email communication, team collaboration

### Option C: Microsoft 365 (Alternative to Google)

**Pros:**
- Professional Outlook interface
- OneDrive, Teams, Office apps included
- 50GB mailbox per user
- Mobile apps available

**Cons:**
- Monthly cost per user
- More complex setup

**Pricing:**
- Business Basic: $6 USD/user/month
- Business Standard: $12.50 USD/user/month

---

## Step 3A: Setup with Resend (For Automated Emails)

### 1. Create Resend Account
1. Go to https://resend.com
2. Sign up with your email
3. Verify your email address

### 2. Add Your Domain
1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter: `giltcounselling.com`

### 3. Configure DNS Records
Resend will provide you with DNS records. Add these to your domain registrar:

**SPF Record** (Type: TXT)
```
Name: @
Value: v=spf1 include:_spf.resend.com ~all
```

**DKIM Record** (Type: TXT)
```
Name: resend._domainkey
Value: [Provided by Resend - unique to your domain]
```

**MX Records** (Type: MX)
```
Priority: 10
Value: mx1.resend.com

Priority: 20
Value: mx2.resend.com
```

### 4. Verify Domain
- Wait 5-15 minutes for DNS propagation
- Click **Verify** in Resend dashboard
- Status should change to "Verified"

### 5. Get API Key
1. Go to **API Keys** in Resend dashboard
2. Click **Create API Key**
3. Name it: "Gilt Counselling Production"
4. Copy the API key (starts with `re_`)
5. Add to your `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
   EMAIL_FROM=wecare@giltcounselling.com
   ```

### 6. Test Email Sending
Run this test in your app:
```bash
npm run dev
```

Then try:
1. Register a new account (test magic link)
2. Book an appointment (test confirmation email)

---

## Step 3B: Setup with Google Workspace (For Full Email)

### 1. Sign Up for Google Workspace
1. Go to https://workspace.google.com
2. Click **Get Started**
3. Enter business name: "Gilt Counselling Consult"
4. Enter domain: `giltcounselling.com`
5. Complete signup process

### 2. Verify Domain Ownership
Google will ask you to add a TXT record:
```
Name: @
Value: google-site-verification=xxxxxxxxxxxxxxxxxxxxx
```

Add this to your DNS settings and verify.

### 3. Configure MX Records
Replace existing MX records with Google's:
```
Priority: 1   Value: aspmx.l.google.com
Priority: 5   Value: alt1.aspmx.l.google.com
Priority: 5   Value: alt2.aspmx.l.google.com
Priority: 10  Value: alt3.aspmx.l.google.com
Priority: 10  Value: alt4.aspmx.l.google.com
```

### 4. Create Email Accounts
In Google Admin Console:
1. Users > Add new user
2. Create these accounts:
   - wecare@giltcounselling.com
   - support@giltcounselling.com
   - admin@giltcounselling.com

### 5. Setup Email Aliases
For `notification@giltcounselling.com`:
1. Go to Users > select wecare@giltcounselling.com
2. User information > Email aliases
3. Add alias: notification

### 6. Access Webmail
- Go to https://mail.google.com
- Sign in with: wecare@giltcounselling.com
- Or use Gmail mobile app

---

## Step 4: Hybrid Setup (Recommended)

For the best of both worlds:

1. **Use Resend for automated emails:**
   - Magic link authentication
   - Appointment confirmations
   - Password resets
   - Automated notifications

2. **Use Google Workspace for manual emails:**
   - Replying to client inquiries
   - Admin communications
   - Team collaboration
   - Reading/organizing emails

### Configuration:
```env
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=notification@giltcounselling.com
```

**DNS Setup:**
- Keep Resend's SPF and DKIM records
- Use Google's MX records
- Both can coexist!

---

## Step 5: Mobile Access

### For Google Workspace:
- **iOS:** Download Gmail app from App Store
- **Android:** Gmail app (usually pre-installed)
- Sign in with your @giltcounselling.com account

### For Microsoft 365:
- Download Outlook mobile app
- Sign in with your @giltcounselling.com account

### For Resend:
- Resend doesn't have a mobile app (it's for automated emails)
- Use Resend dashboard to monitor email delivery

---

## Step 6: Email Forwarding (Optional)

If you want all emails to go to a personal inbox:

### Google Workspace:
1. Admin Console > Users
2. Select user > Email routing
3. Add forwarding address

### Namecheap/Other Registrars:
1. Domain Dashboard > Email Forwarding
2. Add forwarding rule:
   ```
   wecare@giltcounselling.com → yourpersonal@gmail.com
   ```

---

## Step 7: Testing Checklist

Test all functionality:

- [ ] Send test email from Resend dashboard
- [ ] Trigger magic link email (use "magic link" option on login page)
- [ ] Book appointment and receive confirmation email
- [ ] Send email from wecare@giltcounselling.com to personal email
- [ ] Reply from personal email to wecare@giltcounselling.com
- [ ] Check spam folder (emails should NOT be there)
- [ ] Test on mobile device
- [ ] Check email signatures and branding

---

## Step 8: Email Best Practices

### Avoid Spam Filters:
1. **SPF, DKIM, DMARC configured** (handled by Resend/Google)
2. **Warm up your domain** (start with small volumes)
3. **Avoid spam words** (FREE, WINNER, CLICK HERE)
4. **Include unsubscribe link** (for marketing emails)
5. **Don't buy email lists**

### Professional Signature:
Add this to all manual emails:

```
---
[Your Name]
Gilt Counselling Consult
Empowering teens & youths for optimal development

📍 Nigeria: 88 Woji Road, Port Harcourt
📍 Canada: 470 Front St W, Toronto
📞 +234 803 309 4050
🌐 www.giltcounselling.com
```

---

## Troubleshooting

### Emails going to spam:
- Check SPF, DKIM, DMARC records
- Use mail-tester.com to test email score
- Ensure "from" address matches domain

### DNS not updating:
- Wait 24-48 hours for full propagation
- Use dnschecker.org to verify records
- Clear browser cache

### Can't receive emails:
- Verify MX records are correct
- Check priority values
- Ensure old MX records are removed

### Resend emails not sending:
- Verify domain status in Resend dashboard
- Check API key is correct in .env.local
- Review Resend logs for errors

---

## Cost Summary

### Minimal Setup (Resend Only):
- **Cost:** $0/month (free tier)
- **Emails:** 3,000/month
- **Use case:** Automated emails only

### Small Business Setup (Google Workspace):
- **Cost:** $18/month (3 users at $6 each)
- **Users:** hello@, support@, admin@
- **Storage:** 30GB per user
- **Use case:** Full email + automation

### Enterprise Setup (Google + Resend):
- **Cost:** $18/month + $20/month = $38/month
- **Emails:** Unlimited manual + 50,000 automated
- **Use case:** High volume professional use

---

## Support

### Resend Support:
- Documentation: https://resend.com/docs
- Email: support@resend.com

### Google Workspace Support:
- Help Center: https://support.google.com/a
- Phone: Available with paid plans
- Chat: Available 24/7

---

## Next Steps

After email setup is complete:

1. Update `.env.local` with Resend API key
2. Test magic link authentication
3. Test appointment confirmation emails
4. Train staff on email usage
5. Set up email templates and signatures
6. Monitor email deliverability

---

**Last Updated:** December 25, 2025
**Status:** Ready for Implementation
