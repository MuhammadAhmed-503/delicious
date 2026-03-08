# Deployment Guide

This guide will help you deploy the Restaurant Management System to production.

## Prerequisites

- GitHub account
- MongoDB Atlas account (free tier available)
- Vercel account (for frontend)
- Render or Railway account (for backend)

## Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free M0 tier is sufficient for testing)
3. Create a database user with username and password
4. Whitelist IP addresses (0.0.0.0/0 for development, specific IPs for production)
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/restaurant?retryWrites=true&w=majority
   ```

## Step 1.5: Setup Cloudinary (for Image Uploads)

1. Go to [Cloudinary](https://cloudinary.com/users/register/free) and create a free account
2. Get your credentials from the dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Keep these credentials handy for backend deployment

> **Note:** See [CLOUDINARY_SETUP.md](CLOUDINARY_SETUP.md) for detailed setup instructions

## Step 2: Deploy Backend to Render

1. Push your code to GitHub repository

2. Go to [Render](https://render.com) and create a new Web Service

3. Connect your GitHub repository

4. Configure the service:
   - **Name:** restaurant-backend
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

5. Add Environment Variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_super_secure_random_secret
   JWT_EXPIRE=7d
   NODE_ENV=production
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

6. Deploy and copy your backend URL (e.g., `https://restaurant-backend.onrender.com`)

## Step 3: Deploy Frontend to Vercel

1. Go to [Vercel](https://vercel.com) and import your GitHub repository

2. Configure the project:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

3. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```

4. Deploy

## Step 4: Create Admin User

1. Open your deployed frontend application
2. Sign up with a new account
3. Connect to your MongoDB Atlas database
4. Update the user's role to 'admin':

```javascript
// In MongoDB Atlas Data Explorer
// Find your database > users collection
// Edit the user document and change role from 'user' to 'admin'

// Or use MongoDB shell:
db.users.updateOne(
  { email: "admin@restaurant.com" },
  { $set: { role: "admin" } }
)
```

## Step 5: Add Sample Data (Optional)

You can add sample food items, gallery images, etc. through the admin dashboard after logging in as admin.

### Sample Food Items

1. Login as admin
2. Go to Admin Dashboard > Manage Menu
3. Add items with these categories:
   - Pizza
   - Burgers
   - BBQ
   - Fast Food
   - Drinks
   - Desserts

Use free image URLs from:
- [Unsplash](https://unsplash.com)
- [Pexels](https://pexels.com)
- [Pixabay](https://pixabay.com)

## Alternative: Deploy Backend to Railway

If you prefer Railway over Render:

1. Go to [Railway](https://railway.app)
2. Create a new project
3. Deploy from GitHub
4. Set root directory to `backend`
5. Add the same environment variables
6. Railway will automatically detect Node.js and deploy

## Troubleshooting

### CORS Issues
If you encounter CORS errors, update your backend server.js:

```javascript
const cors = require('cors');
app.use(cors({
  origin: 'https://your-frontend-domain.vercel.app',
  credentials: true
}));
```

### MongoDB Connection Issues
- Check if IP whitelist includes 0.0.0.0/0
- Verify username and password in connection string
- Ensure database name is correct

### Environment Variables Not Working
- Redeploy after adding/changing environment variables
- Check variable names match exactly (case-sensitive)
- No quotes needed around values in deployment platforms

## Post-Deployment Checklist

- ✅ Backend server is running
- ✅ Frontend is accessible
- ✅ Can create new user account
- ✅ Login works
- ✅ Admin dashboard accessible (after creating admin user)
- ✅ Can add menu items
- ✅ Can create orders
- ✅ Can make reservations
- ✅ Can upload gallery images

## Custom Domain (Optional)

### For Vercel (Frontend)
1. Go to your project settings
2. Add your custom domain
3. Configure DNS records as instructed

### For Render (Backend)
1. Go to your service settings
2. Add custom domain
3. Update DNS records

## Monitoring

- **Render:** Built-in logs and metrics
- **Vercel:** Analytics and deployment logs
- **MongoDB Atlas:** Database monitoring and alerts

## Security Recommendations

1. Use strong JWT_SECRET (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
2. Enable rate limiting for API endpoints
3. Use HTTPS only
4. Regularly update dependencies
5. Implement proper input validation
6. Use MongoDB Atlas IP whitelist properly in production

## Cost Estimation (Free Tier)

- **MongoDB Atlas:** Free (M0 tier, 512 MB storage)
- **Vercel:** Free (hobby plan)
- **Render:** Free with limitations (spins down after 15 min of inactivity)
- **Railway:** $5 credit/month on free plan

**Total:** $0/month for development and testing!

## Support

For issues during deployment:
- Check service logs
- Verify environment variables
- Test API endpoints directly
- Check browser console for errors

## Updating Your App

1. Make changes locally
2. Push to GitHub
3. Vercel and Render will auto-deploy from GitHub
4. Or manually trigger redeployment

---

**Congratulations!** Your restaurant management system is now live! 🎉

Visit your frontend URL and start managing your restaurant online!
