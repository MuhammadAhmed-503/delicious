# Vercel Deployment Checklist ✅

Quick checklist for deploying both backend and frontend to Vercel.

## Pre-Deployment Setup

### 1. MongoDB Atlas (Database)
- [ ] Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- [ ] Create a new cluster (free M0 tier)
- [ ] Create database user with password
- [ ] Set IP whitelist to `0.0.0.0/0` (allow all)
- [ ] Copy connection string: `mongodb+srv://username:password@cluster.mongodb.net/restaurant?retryWrites=true&w=majority`

### 2. Cloudinary (Images)
- [ ] Create Cloudinary account at https://cloudinary.com
- [ ] Note down from dashboard:
  - [ ] Cloud Name
  - [ ] API Key  
  - [ ] API Secret

### 3. GitHub
- [ ] Create GitHub account if you don't have one
- [ ] Create new repository
- [ ] Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/your-repo.git
git branch -M main
git push -u origin main
```

## Backend Deployment (Vercel)

### 4. Deploy Backend to Vercel
- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New" → "Project"
- [ ] Import your GitHub repository
- [ ] Configure:
  - [ ] Project Name: `restaurant-backend`
  - [ ] Framework: Other
  - [ ] Root Directory: `backend`
  - [ ] Leave Build Command empty
  - [ ] Leave Output Directory empty

### 5. Add Backend Environment Variables
Click "Environment Variables" and add:

- [ ] `MONGODB_URI` = Your MongoDB connection string
- [ ] `JWT_SECRET` = Generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- [ ] `JWT_EXPIRE` = `7d`
- [ ] `NODE_ENV` = `production`
- [ ] `CLOUDINARY_CLOUD_NAME` = Your Cloudinary cloud name
- [ ] `CLOUDINARY_API_KEY` = Your Cloudinary API key
- [ ] `CLOUDINARY_API_SECRET` = Your Cloudinary API secret

### 6. Deploy Backend
- [ ] Click "Deploy" button
- [ ] Wait for deployment to complete
- [ ] **Copy your backend URL** (e.g., `https://restaurant-backend-xyz.vercel.app`)

## Frontend Deployment (Vercel)

### 7. Deploy Frontend to Vercel
- [ ] Go back to https://vercel.com/dashboard
- [ ] Click "Add New" → "Project" again
- [ ] Import the **SAME** GitHub repository
- [ ] Configure:
  - [ ] Project Name: `restaurant-frontend`
  - [ ] Framework: Create React App
  - [ ] Root Directory: `frontend`
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `build`

### 8. Add Frontend Environment Variable
- [ ] `REACT_APP_API_URL` = `https://your-backend-url.vercel.app/api`
  - ⚠️ Replace with your actual backend URL from step 6
  - ⚠️ Make sure to add `/api` at the end

### 9. Deploy Frontend
- [ ] Click "Deploy" button
- [ ] Wait for deployment to complete
- [ ] **Copy your frontend URL** (e.g., `https://restaurant-frontend-xyz.vercel.app`)

## Post-Deployment Setup

### 10. Create Admin User
- [ ] Visit your frontend URL
- [ ] Click "Sign Up"
- [ ] Create an account with your email
- [ ] Go to MongoDB Atlas → Database → Browse Collections
- [ ] Find your database → `users` collection
- [ ] Click on your user document
- [ ] Edit: Change `"role": "user"` to `"role": "admin"`
- [ ] Save the document

### 11. Test Your Application
- [ ] Open frontend URL
- [ ] Test user signup and login: `https://your-frontend.vercel.app`
- [ ] Test backend API health: `https://your-backend.vercel.app/api/health`
- [ ] Login as admin
- [ ] Add a menu item to test image upload
- [ ] Create a test order
- [ ] Create a test reservation
- [ ] Check gallery upload works

## Troubleshooting

### If Backend Returns 500 Error:
1. Check Vercel backend logs in dashboard
2. Verify MongoDB connection string is correct
3. Ensure all environment variables are set
4. Check MongoDB IP whitelist includes `0.0.0.0/0`

### If Frontend Can't Connect to Backend:
1. Check `REACT_APP_API_URL` includes `/api` at the end
2. Verify backend URL is correct
3. Check CORS settings in backend `server.js`
4. Redeploy frontend after changing environment variables

### If Images Don't Upload:
1. Verify Cloudinary credentials are correct
2. Check backend logs for errors
3. Test with a small image first

### If You Need to Redeploy:
- Vercel auto-deploys when you push to GitHub
- Or manually: Vercel Dashboard → Project → Deployments → Redeploy

## Important Notes

✅ **Both projects use the SAME GitHub repository** - just different root directories

✅ **Free tier limits:**
- Vercel: 100 GB bandwidth/month per project
- MongoDB Atlas: 512 MB storage
- Cloudinary: 25 credits/month (~25 GB)

✅ **Auto-deployment:** Push to GitHub = automatic deployment to Vercel

✅ **Environment variables:** Changes require manual redeployment

## Your Deployment URLs

Write down your URLs here:

- **Frontend:** _______________________________________________
- **Backend:** _______________________________________________
- **MongoDB:** _______________________________________________
- **GitHub Repo:** _______________________________________________

## Next Steps

- [ ] Set up custom domain (optional)
- [ ] Add SSL certificate (Vercel provides free SSL automatically)
- [ ] Add sample menu items
- [ ] Upload gallery images
- [ ] Share your restaurant website!

---

🎉 **Congratulations!** Your restaurant management system is live!

For detailed instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)
