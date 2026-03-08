# 🚀 How to Login as Admin - Quick Guide

## Step 1: Create Account

1. **Open browser:** http://localhost:3000
2. **Click:** "Sign Up" (top right)
3. **Fill form:**
   ```
   Name: Admin User
   Email: admin@restaurant.com
   Password: Admin123!
   Phone: 1234567890
   ```
4. **Click:** "Sign Up"

## Step 2: Upgrade to Admin Role

### Option A: Using MongoDB Compass (Easiest - GUI)

1. **Download MongoDB Compass** (if not installed):
   - https://www.mongodb.com/try/download/compass
   - Install and open

2. **Connect to database:**
   - Connection string: `mongodb://localhost:27017`
   - Click "Connect"

3. **Navigate to:**
   - Database: `restaurant`
   - Collection: `users`

4. **Find your user:**
   - Look for email: `admin@restaurant.com`

5. **Edit document:**
   - Click the pencil icon (Edit)
   - Find the line: `"role": "user"`
   - Change to: `"role": "admin"`
   - Click "Update"

6. **Done!** ✅

---

### Option B: Using MongoDB Shell (Command Line)

```powershell
# Open MongoDB shell
mongosh

# Switch to restaurant database
use restaurant

# Update user role to admin
db.users.updateOne(
  { email: "admin@restaurant.com" },
  { $set: { role: "admin" } }
)

# Verify the change
db.users.findOne({ email: "admin@restaurant.com" })

# Should show: role: "admin"

# Exit
exit
```

---

## Step 3: Login as Admin

1. **Go to:** http://localhost:3000/login
2. **Enter credentials:**
   ```
   Email: admin@restaurant.com
   Password: Admin123!
   ```
3. **Click:** "Login"
4. **You should see:** "Admin Dashboard" link in navbar
5. **Click:** "Admin Dashboard"

---

## Admin Dashboard Features

Once logged in as admin, you can:

### 📊 **Dashboard** (http://localhost:3000/admin/dashboard)
- View statistics (total users, orders, reservations, revenue)
- See recent orders and their status
- Quick access to all management pages

### 👥 **Manage Users** (http://localhost:3000/admin/users)
- View all registered users
- Delete users
- Change user roles (user ↔ admin)

### 🍕 **Manage Menu** (http://localhost:3000/admin/menu)
- Add new menu items with images
- Edit existing items (name, price, description, image)
- Delete items
- Toggle availability
- Categories: Pizza, Burgers, BBQ, Fast Food, Drinks, Desserts

### 📦 **Manage Orders** (http://localhost:3000/admin/orders)
- View all customer orders
- Update order status:
  - Pending → Confirmed → Preparing → Out for Delivery → Delivered
  - Or: Cancelled
- View order details (items, customer, address, total)

### 📅 **Manage Reservations** (http://localhost:3000/admin/reservations)
- View all table reservations
- Update reservation status:
  - Pending → Confirmed → Completed
  - Or: Cancelled
- See reservation details (date, time, guests, table number)

### 🖼️ **Manage Gallery** (http://localhost:3000/admin/gallery)
- Upload new images
- Delete images
- Categories: Food, Interior, Events

---

## Step 4: Add Sample Data (Optional)

Run the seed script to populate your database with sample menu items and gallery images:

```powershell
cd backend
node seed.js
```

This will add:
- ✅ 12 Menu items (Pizza, Burgers, BBQ, Drinks, Desserts)
- ✅ 8 Gallery images (Food, Interior, Events)

**Note:** All images use free stock photos from Unsplash (no upload needed initially)

---

## Quick Test Flow

### Test Admin Functions:

1. **Add a menu item:**
   - Admin Dashboard → Manage Menu → "+ Add New Item"
   - Upload an image (or use URL)
   - Fill details → Create

2. **Check it on menu:**
   - Visit: http://localhost:3000/menu
   - Your item should appear!

3. **Test as customer:**
   - Logout from admin
   - Login as regular user (or create new account)
   - Order the item you just added
   - Make a table reservation

4. **Manage as admin:**
   - Login back as admin
   - Go to Manage Orders → Update order status
   - Go to Manage Reservations → Confirm reservation

---

## Credentials Summary

### Admin Account
```
Email: admin@restaurant.com
Password: Admin123!
Role: admin
```

### Test User Account (create separately)
```
Email: user@test.com
Password: User123!
Role: user
```

---

## Troubleshooting

### "Admin Dashboard" link not showing
- ✅ Make sure you upgraded role to "admin" in database
- ✅ Logout and login again
- ✅ Clear browser cache (Ctrl+Shift+Delete)

### Can't update user role in MongoDB
- ✅ Make sure MongoDB Compass is connected
- ✅ Make sure you're in correct database (`restaurant`)
- ✅ Make sure you're in correct collection (`users`)
- ✅ Try using MongoDB shell method instead

### Forgot admin password
**Reset via MongoDB:**
```javascript
// In mongosh:
use restaurant

// Option 1: Update password (will need to be hashed)
// Better option: Delete and recreate account via signup

// Delete user
db.users.deleteOne({ email: "admin@restaurant.com" })

// Now go to /signup and create account again
// Then upgrade to admin role
```

---

## Next Steps

1. ✅ Login as admin
2. ✅ Run seed script (optional): `node backend/seed.js`
3. ✅ Add more menu items via admin panel
4. ✅ Upload gallery images
5. ✅ Test ordering as regular user
6. ✅ Manage orders and reservations as admin

---

**🎉 You're now an admin! Start managing your restaurant!**

For more details, see:
- [GETTING_STARTED.md](GETTING_STARTED.md) - Complete startup guide
- [README.md](README.md) - Full documentation
- [CLOUDINARY_SETUP.md](CLOUDINARY_SETUP.md) - Image upload setup
