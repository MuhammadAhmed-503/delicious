# Deployment Guide

This guide will help you deploy the Restaurant Management System to production using Vercel for both backend and frontend.

## Prerequisites

- GitHub account
- MongoDB Atlas account (free tier available)
- Vercel account (free tier available)
- Cloudinary account (for image uploads)

## Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free M0 tier is sufficient for testing)
3. Create a database user with username and password
4. Whitelist IP addresses:
   - For testing: `0.0.0.0/0` (allow all)
   - For production: Add Vercel's IP ranges or use `0.0.0.0/0`
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.mongodb.net/restaurant?retryWrites=true&w=majority
   ```

## Step 2: Setup Cloudinary (for Image Uploads)

1. Go to [Cloudinary](https://cloudinary.com/users/register/free) and create a free account
2. Get your credentials from the dashboard:
   - Cloud Name
   - API Key
   - API Secret
3. Keep these credentials handy for deployment

> **Note:** See [CLOUDINARY_SETUP.md](CLOUDINARY_SETUP.md) for detailed setup instructions

## Step 3: Push Code to GitHub

1. Initialize git repository (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub

3. Push your code:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git branch -M main
   git push -u origin main
   ```

## Step 4: Deploy Backend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)

2. Click **"Add New"** → **"Project"**

3. Import your GitHub repository

4. Configure the project:
   - **Project Name:** `restaurant-backend` (or your preferred name)
   - **Framework Preset:** Other
   - **Root Directory:** `backend`
   - **Build Command:** Leave empty or `npm install`
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install`

5. Add Environment Variables (click "Environment Variables"):
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/restaurant?retryWrites=true&w=majority
   JWT_SECRET=your_super_secure_random_secret_min_32_characters
   JWT_EXPIRE=7d
   NODE_ENV=production
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

6. Click **"Deploy"**

7. Once deployed, copy your backend URL (e.g., `https://restaurant-backend.vercel.app`)

## Step 5: Deploy Frontend to Vercel

1. Go back to [Vercel Dashboard](https://vercel.com/dashboard)

2. Click **"Add New"** → **"Project"** again

3. Import the **SAME GitHub repository**

4. Configure the project:
   - **Project Name:** `restaurant-frontend` (or your preferred name)
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`

5. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.vercel.app/api
   ```
   ⚠️ **Important:** Replace `your-backend-url` with the actual backend URL from Step 4

6. Click **"Deploy"**

7. Once deployed, you'll get your frontend URL (e.g., `https://restaurant-frontend.vercel.app`)

## Step 6: Create Admin User

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

## Alternative: Deploy Backend to Render or Railway

If you prefer alternative hosting for the backend:

### Render
1. Go to [Render](https://render.com)
2. Create a new Web Service
3. Connect GitHub repository
4. Set root directory to `backend`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add the same environment variables

### Railway
1. Go to [Railway](https://railway.app)
2. Create a new project
3. Deploy from GitHub
4. Set root directory to `backend`
5. Add the same environment variables
6. Railway will automatically detect Node.js and deploy

## Troubleshooting

### Backend Not Responding
- Check Vercel function logs in the deployment dashboard
- Verify all environment variables are set correctly
- Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Serverless functions have a timeout limit (10s on free plan)

### CORS Issues
If you encounter CORS errors, verify your backend `server.js` has:

```javascript
const cors = require('cors');
app.use(cors({
  origin: ['https://your-frontend-domain.vercel.app', 'http://localhost:3000'],
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

### For Vercel (Both Frontend & Backend)
1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain:
   - Frontend: `www.yourrestaurant.com` or `yourrestaurant.com`
   - Backend: `api.yourrestaurant.com`
4. Configure DNS records as instructed by Vercel
5. Update the `REACT_APP_API_URL` environment variable in frontend to use your custom API domain

## Monitoring

- **Vercel (Backend & Frontend):** 
  - Real-time logs in deployment dashboard
  - Function logs for serverless backend
  - Analytics and performance metrics
  - Deployment history
- **MongoDB Atlas:** 
  - Database monitoring
  - Performance metrics
  - Alerts and notifications

## Security Recommendations

1. Use strong JWT_SECRET (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
2. Update CORS origin to your specific frontend domain (remove wildcards in production)
3. Use HTTPS only (Vercel provides this automatically)
4. Regularly update dependencies: `npm audit fix`
5. Implement proper input validation
6. Use MongoDB Atlas IP whitelist - for Vercel use `0.0.0.0/0` (serverless functions use dynamic IPs)
7. Never commit `.env` files to GitHub
8. Rotate JWT_SECRET periodically

## Cost Estimation (Free Tier)

- **MongoDB Atlas:** Free (M0 tier, 512 MB storage)
- **Vercel Frontend:** Free (Hobby plan, 100 GB bandwidth/month)
- **Vercel Backend:** Free (Hobby plan, 100 GB bandwidth/month, serverless functions)
- **Cloudinary:** Free (25 credits/month, ~25 GB storage + bandwidth)

**Total:** $0/month for development and testing!

### Free Tier Limitations
- Vercel: 100 GB bandwidth, serverless function timeout of 10s
- MongoDB Atlas: 512 MB storage
- Cloudinary: 25 monthly credits

For production with higher traffic, consider upgrading to paid plans.

## Support

For issues during deployment:
- Check service logs
- Verify environment variables
- Test API endpoints directly
- Check browser console for errors

## Updating Your App

### Automatic Deployment (Recommended)
1. Make changes locally and test
2. Commit changes: `git add . && git commit -m "Your commit message"`
3. Push to GitHub: `git push`
4. Vercel will automatically detect changes and redeploy both backend and frontend
5. Check deployment status in Vercel dashboard

### Manual Redeployment
1. Go to Vercel dashboard
2. Select your project (backend or frontend)
3. Click "Deployments" tab
4. Click the three dots on the latest deployment
5. Click "Redeploy"

### Environment Variable Updates
- After changing environment variables, you must redeploy manually
- Go to Settings → Environment Variables → Edit
- After saving, trigger a new deployment

---

**Congratulations!** Your restaurant management system is now live on Vercel! 🎉

Visit your frontend URL and start managing your restaurant online!

## Quick Reference

### Important URLs After Deployment
- Frontend: `https://your-frontend-name.vercel.app`
- Backend API: `https://your-backend-name.vercel.app/api`
- MongoDB: MongoDB Atlas dashboard
- Cloudinary: Cloudinary dashboard

### Common Commands
```bash
# Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Test Backend API
curl https://your-backend-name.vercel.app/api/health

# Push updates
git add .
git commit -m "Update description"
git push
```

### Need Help?
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Cloudinary Docs: https://cloudinary.com/documentation
