# Sup! Backend Setup Guide

This guide will walk you through setting up the Node.js backend with MongoDB Atlas for the Sup! coming soon page.

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── src/
│   ├── controllers/
│   │   └── auth.controller.js   # Auth logic (signup, login)
│   ├── models/
│   │   └── User.js              # User schema
│   └── routes/
│       └── auth.routes.js       # API routes
├── .env                   # Environment variables (create this)
├── .env.example           # Template for env vars
├── package.json
└── server.js              # Express server entry point
```

## 🚀 Quick Start

### 1. Install Backend Dependencies

```bash
# From project root
cd backend
npm install

# Or use the shortcut from root
npm run backend:install
```

### 2. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a new cluster (free tier is fine)
3. Click "Connect" → "Drivers" → "Node.js"
4. Copy the connection string
5. Create a database user (remember the username and password)
6. Add your IP to the Network Access whitelist (or use `0.0.0.0/0` for all IPs during development)

### 3. Configure Environment Variables

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/sup_coming_soon?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Note:** Replace `your_username`, `your_password`, and `your_cluster` with your actual values.

### 4. Start the Backend

```bash
# From backend folder
npm run dev

# Or from project root
npm run backend
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected: ac-xxx.mongodb.net
```

### 5. Start the Frontend (in a new terminal)

```bash
# From project root
npm run dev
```

### 6. Run Both Together (optional)

```bash
# From project root (requires `concurrently` installed)
npm run dev:full
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register for early access |
| POST | `/api/auth/login` | Login (for returning users) |
| GET | `/api/auth/check-email/:email` | Check if email exists |
| GET | `/api/auth/check-username/:username` | Check if username exists |
| GET | `/api/auth/signups` | Get all signups (admin) |
| GET | `/api/auth/stats` | Get signup statistics |
| GET | `/api/health` | Health check |

### Example API Requests

#### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

#### Get Stats
```bash
curl http://localhost:5000/api/auth/stats
```

## 🗄️ Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  fullName: String,           // Required, max 100 chars
  username: String,           // Required, unique, 3-30 chars
  email: String,              // Required, unique, valid email
  password: String,           // Required, hashed with bcrypt (12 rounds)
  signupSource: String,       // Default: "coming_soon_page"
  notified: Boolean,          // Default: false
  emailConsent: Boolean,      // Default: true
  createdAt: Date,            // Auto-generated
  updatedAt: Date             // Auto-generated
}
```

## 🎨 Frontend Integration

The frontend automatically connects to the backend:

1. **Signup**: New users are saved to MongoDB and shown the Coming Soon page
2. **Login**: Returning users can log in and see the Coming Soon page
3. **Session**: User data is stored in localStorage for persistence
4. **Logout**: Users can sign out to return to the landing page

## 🔒 Security Features

- ✅ Passwords hashed with bcrypt (12 salt rounds)
- ✅ Email validation with regex
- ✅ Username validation (alphanumeric + underscores only)
- ✅ CORS configured for frontend origin
- ✅ Input validation with express-validator
- ✅ MongoDB injection protection via Mongoose

## 🚀 Deployment

### Backend Deployment (Railway/Render/Heroku)

1. Push code to GitHub
2. Connect your repo to Railway/Render/Heroku
3. Add environment variables in the dashboard:
   - `MONGODB_URI`
   - `FRONTEND_URL` (your deployed frontend URL)
   - `PORT` (usually auto-set by platform)

### Frontend Deployment

Update `.env` with your backend URL:
```env
VITE_API_URL=https://your-backend-url.com/api
```

Then build:
```bash
npm run build
```

## 📊 Viewing Your Early Access List

### Via API
```bash
# Get all signups
curl http://localhost:5000/api/auth/signups

# Get stats
curl http://localhost:5000/api/auth/stats
```

### Via MongoDB Atlas
1. Go to your cluster in MongoDB Atlas
2. Click "Browse Collections"
3. Select `sup_coming_soon` database
4. View the `users` collection

## 🛠️ Troubleshooting

### "MongoDB connection failed"
- Check your IP is whitelisted in MongoDB Atlas Network Access
- Verify your connection string is correct
- Ensure username/password are URL-encoded if they contain special characters

### "CORS error"
- Verify `FRONTEND_URL` in backend `.env` matches your frontend URL exactly
- Include the port if running locally (e.g., `http://localhost:5173`)

### "Cannot find module"
- Run `npm install` in both root and backend folders
- Ensure you're using Node.js 18+

## 📧 Next Steps for Launch

When you're ready to launch:

1. **Export User List**: Use `/api/auth/signups` to get all emails
2. **Send Launch Email**: Use a service like SendGrid, Mailgun, or AWS SES
3. **Mark as Notified**: Update `notified: true` for users who received the email
4. **Build Full App**: Replace the Coming Soon page with your actual product

---

**Need help?** Check the MongoDB Atlas docs or Node.js Express docs for more details.
