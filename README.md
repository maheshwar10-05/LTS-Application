# Automation Test Store - Complete E-Commerce Application

A full-stack e-commerce application duplicate of automationteststore.com built with React, Node.js, and PostgreSQL.

## 📋 Project Structure

```
automation-mirror/
├── backend/
│   ├── config/
│   │   ├── db.js                 # PostgreSQL connection pool
│   │   ├── database.js           # Database initialization & table creation
│   │   └── seed.js               # Database seeding with sample data
│   ├── controllers/
│   │   ├── authController.js     # User authentication logic
│   │   ├── productController.js  # Product management logic
│   │   ├── cartController.js     # Shopping cart logic
│   │   └── orderController.js    # Order management logic
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT authentication middleware
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── productRoutes.js      # Product endpoints
│   │   ├── cartRoutes.js         # Cart endpoints
│   │   └── orderRoutes.js        # Order endpoints
│   ├── .env                       # Environment variables
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server setup
│
└── frontend/
    ├── src/
    │   ├── components/           # Reusable components
    │   ├── context/
    │   │   ├── AuthContext.jsx   # Authentication state management
    │   │   └── CartContext.jsx   # Shopping cart state management
    │   ├── pages/
    │   │   ├── Home.jsx          # Home page
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Register.jsx      # Registration page
    │   │   ├── Products.jsx      # Products listing page
    │   │   ├── Cart.jsx          # Shopping cart page
    │   │   └── Orders.jsx        # Order history page
    │   ├── services/
    │   │   └── api.js            # API service with axios
    │   ├── styles/
    │   │   ├── Auth.css          # Authentication pages styling
    │   │   ├── Products.css      # Products page styling
    │   │   ├── Cart.css          # Cart page styling
    │   │   ├── Orders.css        # Orders page styling
    │   │   └── Home.css          # Home page styling
    │   ├── App.jsx               # Main app component
    │   ├── main.jsx              # React entry point
    │   └── index.css             # Global styles
    └── package.json              # Frontend dependencies
```

## 🚀 Features

### User Management
- ✅ User registration with email validation
- ✅ User login with JWT authentication
- ✅ User profile management
- ✅ Secure password hashing with bcryptjs

### Product Management
- ✅ Browse all products
- ✅ View featured products
- ✅ View bestsellers
- ✅ View special offers
- ✅ Product filtering by category
- ✅ Search functionality

### Shopping Cart
- ✅ Add products to cart
- ✅ Update item quantities
- ✅ Remove items from cart
- ✅ View cart total
- ✅ Clear entire cart

### Orders
- ✅ Place orders from cart
- ✅ View order history
- ✅ Track order status
- ✅ View order details with items

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **API Documentation**: RESTful API

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router v7
- **HTTP Client**: Axios
- **Styling**: CSS3
- **State Management**: React Context API

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- npm or yarn

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with your configuration
# (Update database credentials as needed)
cat > .env << EOF
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=automation_test_store
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
EOF

# Start the backend server
npm run dev
```

The backend server will run on `http://localhost:5000`

### 2. Database Setup

Before starting the backend:

```bash
# Create PostgreSQL database
createdb automation_test_store

# Or using psql:
psql -U postgres -c "CREATE DATABASE automation_test_store;"
```

When the backend starts, it will automatically:
- Create all necessary tables
- Seed the database with sample products, categories, and manufacturers

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products with pagination
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/featured` - Get featured products
- `GET /api/products/bestsellers` - Get bestselling products
- `GET /api/products/specials` - Get special offer products
- `GET /api/products/categories` - Get all categories
- `GET /api/products/manufacturers` - Get all manufacturers

### Shopping Cart (Protected)
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:itemId` - Update cart item quantity
- `DELETE /api/cart/:itemId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Orders (Protected)
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:orderId` - Get order details
- `PUT /api/orders/:orderId` - Update order status

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. User registers/logs in
2. Server returns JWT token
3. Client stores token in localStorage
4. Token is sent in Authorization header for protected routes
5. Token format: `Bearer <token>`

## 📊 Database Schema

### Users Table
```sql
id, first_name, last_name, email, password, phone, address, city, country, postal_code, created_at, updated_at
```

### Products Table
```sql
id, name, description, price, original_price, stock_quantity, category_id, manufacturer_id, is_featured, is_bestseller, is_special, image_url, created_at, updated_at
```

### Cart Items Table
```sql
id, user_id, product_id, quantity, created_at, updated_at
```

### Orders Table
```sql
id, user_id, total_amount, status, shipping_address, shipping_city, shipping_country, shipping_postal_code, created_at, updated_at
```

### Order Items Table
```sql
id, order_id, product_id, quantity, price, created_at
```

## 🧪 Testing

### Test User Accounts
The database is seeded with sample data. You can use any email/password to test:

```
Email: test@example.com
Password: password123
```

Or register a new account through the registration form.

## 🎯 Usage Guide

1. **Home Page**: View store information and featured products
2. **Browse Products**: View all products, featured items, bestsellers, and special offers
3. **Register/Login**: Create an account or login
4. **Add to Cart**: Click "Add to Cart" on any product
5. **View Cart**: Review items in cart, update quantities
6. **Checkout**: Place order with shipping information
7. **View Orders**: See order history and status

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=automation_test_store
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
```

## 🚨 Important Notes

- This is an educational project for automation testing
- No real payments are processed
- All data is for demonstration purposes
- Use strong JWT_SECRET in production
- Always use HTTPS in production
- Never commit .env files with real credentials

## 🐛 Troubleshooting

### Database Connection Error
- Ensure PostgreSQL is running
- Verify database credentials in .env
- Check if database exists: `createdb automation_test_store`

### Frontend not connecting to Backend
- Ensure backend is running on http://localhost:5000
- Check API base URL in `frontend/src/services/api.js`
- Check CORS settings in backend

### Port Already in Use
- Backend: `lsof -i :5000` then `kill -9 <PID>`
- Frontend: `lsof -i :5173` then `kill -9 <PID>`

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [JWT Guide](https://jwt.io/)
- [React Router Documentation](https://reactrouter.com/)

## 📄 License

Educational project - Use freely for learning purposes.

## ✨ Future Enhancements

- Product reviews and ratings
- Wishlist functionality
- Payment gateway integration
- Email notifications
- Admin dashboard
- Advanced search and filters
- Social sharing features
- Mobile app version

---

**Built for automation testing practice and educational purposes!**
