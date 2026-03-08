# Quick Start Guide - Restaurant Management System

## Step 1: Install MongoDB

### Option A: MongoDB Community Edition (Local)

1. **Download MongoDB:**
   - Visit: https://www.mongodb.com/try/download/community
   - Select: Windows, Latest Version
   - Download and install

2. **Start MongoDB:**
   ```powershell
   # MongoDB should auto-start as a service
   # To verify:
   Get-Service -Name MongoDB
   
   # If not running:
   net start MongoDB
   ```

### Option B: MongoDB Atlas (Cloud - Free)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster (M0 Free tier)
4. Get connection string
5. Update `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/restaurant
   ```

---

## Step 2: Start Backend Server

```powershell
cd backend
npm run dev
```

**Expected Output:**
```
Connected to MongoDB
Server running on port 5000
```

---

## Step 3: Start Frontend

```powershell
# In a NEW terminal
cd frontend
npm start
```

**App opens at:** http://localhost:3000

---

## Step 4: Create Admin Account

### Method 1: Sign Up & Upgrade (Easiest)

1. **Go to:** http://localhost:3000/signup
2. **Create account:**
   - Name: Admin User
   - Email: admin@restaurant.com
   - Password: Admin123!
   - Phone: 1234567890
3. **Upgrade to admin in MongoDB:**

   **Option A: MongoDB Compass (GUI)**
   - Download: https://www.mongodb.com/try/download/compass
   - Connect to: `mongodb://localhost:27017`
   - Database: `restaurant`
   - Collection: `users`
   - Find your user by email
   - Edit → Change `"role": "user"` to `"role": "admin"`
   - Update

   **Option B: MongoDB Shell**
   ```powershell
   # Open MongoDB shell
   mongosh
   
   # Switch to database
   use restaurant
   
   # Update user role
   db.users.updateOne(
     { email: "admin@restaurant.com" },
     { $set: { role: "admin" } }
   )
   
   # Verify
   db.users.findOne({ email: "admin@restaurant.com" })
   ```

4. **Logout and login again** - Admin dashboard now available!

---

## Step 5: Admin Login

1. **Go to:** http://localhost:3000/login
2. **Login with:**
   - Email: admin@restaurant.com
   - Password: Admin123!
3. **Click:** "Admin Dashboard" in navbar
4. **You're in!** 🎉

---

## Step 6: Add Sample Menu Items

1. **In Admin Dashboard → Manage Menu**
2. **Click:** "+ Add New Item"
3. **For each item, upload an image:**
   - Download free food images from:
     - https://unsplash.com/s/photos/food
     - https://pexels.com/search/food/
   - Or use your own images

### Quick Sample Items:

**Pizza Category:**
- **Name:** Margherita Pizza
- **Description:** Classic pizza with tomato sauce, mozzarella, and fresh basil
- **Price:** 12.99
- **Category:** Pizza
- **Upload image** (find on Unsplash)

**Burgers Category:**
- **Name:** Classic Burger
- **Description:** Juicy beef patty with lettuce, tomato, and special sauce
- **Price:** 9.99
- **Category:** Burgers

**BBQ Category:**
- **Name:** BBQ Ribs
- **Description:** Slow-cooked ribs with smoky BBQ sauce
- **Price:** 18.99
- **Category:** BBQ

**Drinks Category:**
- **Name:** Fresh Lemonade
- **Description:** Freshly squeezed lemon juice with mint
- **Price:** 3.99
- **Category:** Drinks

**Desserts Category:**
- **Name:** Chocolate Cake
- **Description:** Rich chocolate cake with ganache frosting
- **Price:** 6.99
- **Category:** Desserts

---

## Step 7: Add Gallery Images

1. **In Admin Dashboard → Manage Gallery**
2. **Click:** "+ Upload Image"
3. **Upload images for:**
   - **Food** - Dish photos
   - **Interior** - Restaurant interior photos
   - **Events** - Special events, celebrations

**Free Image Sources:**
- Unsplash: https://unsplash.com
- Pexels: https://pexels.com
- Pixabay: https://pixabay.com

---

## Default Accounts Summary

### Regular User (Test)
```
Email: user@test.com
Password: User123!
Role: user
```
*Create via signup page*

### Admin User
```
Email: admin@restaurant.com
Password: Admin123!
Role: admin
```
*Create via signup, then upgrade role in MongoDB*

---

## Troubleshooting

### Backend won't start

**Error:** "MongoDB connection error"
**Solution:**
```powershell
# Check if MongoDB is running
Get-Service -Name MongoDB

# If not running
net start MongoDB

# Or install MongoDB if not installed
# Download from: https://www.mongodb.com/try/download/community
```

**Error:** "Port 5000 already in use"
**Solution:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual number)
taskkill /PID <PID> /F
```

### Frontend won't start

**Error:** "Port 3000 already in use"
**Solution:**
```powershell
# Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Can't upload images

**Issue:** Image upload fails

**Solution:**
1. Make sure Cloudinary is configured in `backend/.env`
2. Get free account: https://cloudinary.com/users/register/free
3. Add credentials to `.env`:
   ```env
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Restart backend server

### Can't see admin dashboard

**Issue:** Admin Dashboard link not showing

**Solution:**
1. Make sure user role is "admin" in database
2. Logout and login again
3. Check MongoDB:
   ```javascript
   db.users.findOne({ email: "admin@restaurant.com" })
   // Should show: role: "admin"
   ```

---

## Quick Commands Reference

```powershell
# Backend
cd backend
npm install          # Install dependencies (first time)
npm run dev          # Start development server

# Frontend
cd frontend
npm install          # Install dependencies (first time)
npm start            # Start React app

# MongoDB
net start MongoDB    # Start MongoDB service
net stop MongoDB     # Stop MongoDB service
mongosh              # Open MongoDB shell

# Both (in separate terminals)
# Terminal 1:
cd backend; npm run dev

# Terminal 2:
cd frontend; npm start
```

---

## Application Structure

```
http://localhost:3000/           → Home page
http://localhost:3000/menu       → Browse menu
http://localhost:3000/gallery    → View gallery
http://localhost:3000/about      → About us
http://localhost:3000/contact    → Contact
http://localhost:3000/login      → Login
http://localhost:3000/signup     → Sign up

# User Dashboard (after login)
http://localhost:3000/user/dashboard
http://localhost:3000/user/profile
http://localhost:3000/user/order
http://localhost:3000/user/cart
http://localhost:3000/user/reservations
http://localhost:3000/user/orders/history
http://localhost:3000/user/reservations/history

# Admin Dashboard (admin only)
http://localhost:3000/admin/dashboard
http://localhost:3000/admin/users
http://localhost:3000/admin/menu
http://localhost:3000/admin/orders
http://localhost:3000/admin/reservations
http://localhost:3000/admin/gallery
```

---

## Next Steps

1. ✅ Install MongoDB
2. ✅ Start backend (`npm run dev`)
3. ✅ Start frontend (`npm start`)
4. ✅ Create admin account
5. ✅ Add menu items with images
6. ✅ Add gallery images
7. ✅ Test user flow (signup, order, reservation)
8. ✅ Test admin flow (manage users, orders, menu)

**Need help?** Check:
- [README.md](README.md) - Full documentation
- [CLOUDINARY_SETUP.md](CLOUDINARY_SETUP.md) - Image upload setup
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deploy to production

---

**🎉 You're all set! Enjoy your restaurant management system!**
