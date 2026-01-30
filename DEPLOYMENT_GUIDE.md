# Deployment Guide
## Gilt Counselling Consult - Production Deployment

This guide covers deploying your Gilt Counselling application to production.

---

## Pre-Deployment Checklist

### 1. Environment Variables
- [ ] All required `.env` variables set
- [ ] Production MongoDB URI configured
- [ ] Resend API key added
- [ ] JWT secrets changed from defaults
- [ ] App URL set to production domain

### 2. Database
- [ ] MongoDB Atlas account created (or production MongoDB server)
- [ ] Database indexed properly
- [ ] Admin user created
- [ ] Sample data removed (if any)

### 3. Email System
- [ ] Domain verified in Resend
- [ ] DNS records configured (SPF, DKIM)
- [ ] Email templates tested
- [ ] Magic link emails working

### 4. Security
- [ ] All secrets changed from development
- [ ] HTTPS enabled
- [ ] CORS configured properly
- [ ] Rate limiting enabled (if applicable)

---

## Option 1: Deploy to Vercel (Recommended)

Vercel is the easiest platform for Next.js apps.

### Step 1: Create Vercel Account
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository

### Step 2: Configure Project
1. Framework Preset: Next.js
2. Root Directory: ./
3. Build Command: `npm run build`
4. Output Directory: .next

### Step 3: Environment Variables
Add these in Vercel dashboard:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gilt-counselling
JWT_SECRET=your-production-secret-key
MAGIC_LINK_SECRET=your-production-magic-link-secret
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=wecare@giltcounselling.com
NEXT_PUBLIC_APP_URL=https://giltcounselling.com
WHATSAPP_NUMBER=+2348033094050
```

### Step 4: Deploy
1. Click **Deploy**
2. Wait for build to complete
3. Get deployment URL

### Step 5: Custom Domain
1. Go to Project Settings > Domains
2. Add `giltcounselling.com`
3. Configure DNS:
   ```
   Type: A Record
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## Option 2: Deploy to AWS EC2

For more control and custom configurations.

### Step 1: Launch EC2 Instance
1. Go to AWS Console > EC2
2. Launch Instance
3. Select Ubuntu Server 22.04 LTS
4. Instance type: t2.medium (or larger)
5. Configure security group:
   - SSH (22) - Your IP only
   - HTTP (80) - 0.0.0.0/0
   - HTTPS (443) - 0.0.0.0/0
   - MongoDB (27017) - Only if self-hosting DB

### Step 2: Connect and Setup
```bash
# Connect to instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install MongoDB (if self-hosting)
# Follow: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/
```

### Step 3: Clone and Setup Application
```bash
# Clone repository
git clone https://github.com/yourusername/gilt-counselling-app.git
cd gilt-counselling-app

# Install dependencies
npm install

# Create .env.local
nano .env.local
# Paste your production environment variables

# Build application
npm run build

# Start with PM2
pm2 start npm --name "gilt-counselling" -- start
pm2 startup
pm2 save
```

### Step 4: Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/giltcounselling
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name giltcounselling.com www.giltcounselling.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/giltcounselling /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Step 5: Setup SSL with Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d giltcounselling.com -d www.giltcounselling.com
```

---

## Option 3: Deploy to DigitalOcean App Platform

Simpler than EC2, with automatic scaling.

### Step 1: Create Account
1. Go to https://www.digitalocean.com
2. Sign up and verify email

### Step 2: Create App
1. Click **Create** > **Apps**
2. Connect GitHub repository
3. Select branch: `main`
4. Detect Next.js automatically

### Step 3: Configure
1. Environment Variables: Add all from `.env.local`
2. Instance Size: Basic ($12/month)
3. Region: Closest to users (US/Europe)

### Step 4: Add Database
1. Add MongoDB Component
2. Or connect to external MongoDB Atlas

### Step 5: Deploy
1. Review and Create
2. Wait for deployment
3. Get app URL

### Step 6: Custom Domain
1. Settings > Domains
2. Add `giltcounselling.com`
3. Configure DNS as instructed

---

## Database Setup (MongoDB Atlas)

### Step 1: Create Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up (free tier available)

### Step 2: Create Cluster
1. Build a Database
2. Choose: Shared (Free tier)
3. Cloud Provider: AWS
4. Region: Closest to your app server

### Step 3: Setup Security
1. Database Access:
   - Create database user
   - Username: `gilt-admin`
   - Password: (generate strong password)

2. Network Access:
   - Add IP: `0.0.0.0/0` (allow all)
   - Or add specific server IPs

### Step 4: Get Connection String
1. Click **Connect**
2. Choose **Connect your application**
3. Copy connection string:
   ```
   mongodb+srv://gilt-admin:<password>@cluster0.xxxxx.mongodb.net/gilt-counselling
   ```

### Step 5: Seed Production Data
```bash
# On your server
export MONGODB_URI="mongodb+srv://gilt-admin:password@cluster.mongodb.net/gilt-counselling"
npm run seed
```

---

## Post-Deployment Steps

### 1. Test Everything
- [ ] Homepage loads
- [ ] User registration works
- [ ] User login works
- [ ] Magic link authentication works
- [ ] Book appointment works
- [ ] Admin dashboard accessible
- [ ] Client management works
- [ ] Admin-assisted booking works
- [ ] Emails are being sent
- [ ] Profile editing works

### 2. Monitoring Setup
1. **Vercel:** Built-in analytics
2. **AWS:** CloudWatch
3. **DigitalOcean:** Built-in monitoring

### 3. Setup Backups
For MongoDB Atlas:
- Backups are automatic (enabled by default)
- Configure backup schedule in Atlas dashboard

For Self-hosted MongoDB:
```bash
# Daily backup cron job
0 2 * * * mongodump --uri="mongodb://localhost:27017/gilt-counselling" --out=/backups/$(date +\%Y\%m\%d)
```

### 4. Error Tracking
Consider adding Sentry for error tracking:

```bash
npm install @sentry/nextjs
```

Configure in `next.config.js`:
```javascript
const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig({
  // your existing config
}, {
  silent: true,
  org: "gilt-counselling",
  project: "webapp",
});
```

---

## Maintenance

### Regular Updates
```bash
# Connect to server
ssh ubuntu@your-server

# Pull latest changes
cd gilt-counselling-app
git pull

# Install dependencies
npm install

# Build
npm run build

# Restart PM2
pm2 restart gilt-counselling
```

### Database Maintenance
- Monitor database size in Atlas dashboard
- Review slow queries
- Create indexes as needed
- Archive old appointments

### SSL Certificate Renewal
```bash
# Certbot renews automatically, but you can test:
sudo certbot renew --dry-run
```

---

## Scaling Considerations

### When to Scale Up:
- **100+ clients:** Move to paid MongoDB tier
- **1000+ emails/month:** Upgrade Resend plan
- **High traffic:** Add load balancer
- **Multiple admins:** Consider separate admin server

### Load Balancing (AWS)
1. Create Application Load Balancer
2. Add EC2 instances to target group
3. Configure health checks
4. Update DNS to point to load balancer

---

## Troubleshooting

### App won't build:
```bash
# Clear cache
rm -rf .next
npm run build
```

### Database connection fails:
- Check MongoDB URI format
- Verify IP whitelist in Atlas
- Test connection with MongoDB Compass

### Emails not sending:
- Verify Resend API key
- Check domain verification status
- Review Resend logs

### SSL certificate issues:
```bash
sudo certbot renew --force-renewal
sudo systemctl restart nginx
```

---

## Cost Breakdown (Monthly)

### Minimal Setup (Vercel):
- Vercel Hosting: $0 (free tier)
- MongoDB Atlas: $0 (free tier)
- Resend: $0 (free tier)
- **Total: $0/month** (good for testing/launch)

### Small Business (Production):
- Vercel Pro: $20/month
- MongoDB Atlas M10: $57/month
- Resend Pro: $20/month
- Google Workspace: $18/month (3 users)
- Domain: $12/year
- **Total: ~$115/month**

### Enterprise (High Traffic):
- AWS EC2 t3.large: $68/month
- MongoDB Atlas M30: $225/month
- Resend Business: $80/month
- Google Workspace: $36/month (6 users)
- CloudFront CDN: $20/month
- **Total: ~$429/month**

---

## Support & Resources

- **Vercel:** https://vercel.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **Resend:** https://resend.com/docs
- **Next.js:** https://nextjs.org/docs

---

**Last Updated:** December 25, 2025
**Status:** Ready for Production
