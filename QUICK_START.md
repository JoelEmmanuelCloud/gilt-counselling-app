# Quick Start Guide - Gilt Counselling App

## Installation (3 Simple Steps)

1. **Navigate to project folder:**
   ```bash
   cd gilt-counselling-app
   ```

2. **Install all dependencies:**
   ```bash
   npm run install-all
   ```

3. **Start the application:**
   ```bash
   npm run dev
   ```

The application will open at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Login Credentials

**Admin Account:**
- Email: admin@gilt.com
- Password: admin123

**Regular User:**
- Email: user@example.com
- Password: user123

## Main Features

1. **Homepage** - View services and company information
2. **Book Appointment** - Schedule appointments (no login required)
3. **User Dashboard** - View your appointments (login required)
4. **Admin Dashboard** - Manage all appointments (admin only)
5. **Services Page** - Browse all counselling services
6. **About Page** - Learn about Gilt Counselling
7. **Contact Page** - Get in touch

## Image Placeholders

All image placeholders are marked with text like:
- [Hero Image Placeholder]
- [About Image Placeholder]

Replace these with actual images by:
1. Adding images to `client/public/images/`
2. Updating the placeholder divs with `<img>` tags

## Next Steps for Production

1. Replace in-memory storage with a real database (MongoDB, PostgreSQL)
2. Add actual images to replace placeholders
3. Configure email notifications
4. Set up proper environment variables
5. Deploy to hosting service (Vercel, Netlify, AWS, etc.)

## Need Help?

Check the main README.md for detailed documentation.
