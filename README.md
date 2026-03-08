# Full Stack MERN Restaurant Reservation and Food Ordering System

A complete production-ready MERN stack web application for restaurant management with table reservations and online food ordering.

## 🚀 Features

### Customer Features
- Browse restaurant menu by categories
- Add items to cart and place orders
- Reserve tables with date, time, and guest count
- View order and reservation history
- User authentication and profile management

### Admin Features
- Comprehensive dashboard with statistics
- Manage users (view, delete, change roles)
- Manage menu items (add, edit, delete)
- View and update order status
- Handle table reservations
- Manage gallery images

## 🛠️ Technology Stack

**Frontend:**
- React.js
- Tailwind CSS
- React Router DOM
- Axios
- React Toastify
- Context API for state management

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Cloudinary for image storage
- Multer for file uploads

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## ⚙️ Installation & Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/restaurant
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> **Note:** To enable image uploads, you need to create a free Cloudinary account. See [CLOUDINARY_SETUP.md](CLOUDINARY_SETUP.md) for detailed setup instructions.

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend application:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🎨 Design Theme

- **Primary Color:** Red (#DC2626)
- **Accent Color:** Yellow (#FBBF24)
- **Text Color:** White on colored backgrounds
- **Background:** Light and clean
- **Features:** Smooth animations and mobile-first responsive design

## 👥 User Roles

### Customer/User
- Sign up and log in
- Browse menu
- Add to cart and place orders
- Reserve tables
- View order/reservation history

### Admin
- Access admin dashboard
- Manage users, menu, orders, reservations
- View analytics and statistics
- Manage gallery images

## 📱 Key Sections

### Public Pages
- Home
- Menu
- Gallery
- About
- Contact
- Login/Signup

### User Dashboard
- Profile
- Order Food
- Shopping Cart
- Table Reservation
- Order History
- Reservation History

### Admin Dashboard
- Overview with statistics
- User Management
- Menu Management
- Order Management
- Reservation Management
- Gallery Management

## 🔐 Authentication

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes for users and admins
- Role-based access control (RBAC)

## 📦 Database Models

- **User:** name, email, password, phone, role
- **Food:** name, description, price, category, image, availability
- **Order:** userId, items, totalPrice, deliveryAddress, status
- **Reservation:** userId, name, phone, email, guests, tableNumber, date, time, status
- **Gallery:** imageUrl, title, category

## 🌐 API Routes

### Authentication
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - User login
- GET `/api/auth/me` - Get current user

### Menu
- GET `/api/menu` - Get all menu items
- POST `/api/menu` - Create menu item (Admin)
- PUT `/api/menu/:id` - Update menu item (Admin)
- DELETE `/api/menu/:id` - Delete menu item (Admin)

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders` - Get all orders (Admin)
- PUT `/api/orders/:id/status` - Update order status (Admin)

### Reservations
- POST `/api/reservations` - Create reservation
- GET `/api/reservations` - Get all reservations (Admin)
- PUT `/api/reservations/:id` - Update reservation status (Admin)

### Gallery
- GET `/api/gallery` - Get all images
- POST `/api/gallery` - Upload image (Admin)
- DELETE `/api/gallery/:id` - Delete image (Admin)

### Admin
- GET `/api/admin/stats` - Get dashboard statistics
- GET `/api/admin/users` - Get all users
- PUT `/api/admin/users/:id/role` - Update user role
- DELETE `/api/admin/users/:id` - Delete user

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variable: `REACT_APP_API_URL`
4. Deploy

### Backend (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render or Railway
3. Set environment variables (PORT, MONGODB_URI, JWT_SECRET, etc.)
4. Deploy

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Get connection string
3. Update `MONGODB_URI` in backend `.env`

## 🎯 Special Features

- **24/7 Service:** Restaurant is open 24 hours
- **Table Numbers:** Included in reservation form
- **Real-time Updates:** Order and reservation status tracking
- **Responsive Design:** Mobile-first approach
- **Loading States:** Smooth loading animations
- **Toast Notifications:** User-friendly feedback
- **Protected Routes:** Secure access control

## 📝 Default Admin Account

To create an admin user, register normally and then update the user's role in the database:

```javascript
// In MongoDB
db.users.updateOne(
  { email: "admin@restaurant.com" },
  { $set: { role: "admin" } }
)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Created with ❤️ for restaurant management

## 📞 Support

For support, email support@delicious.com or create an issue in the repository.

---

**Note:** Remember to change the JWT_SECRET and use environment variables in production!
