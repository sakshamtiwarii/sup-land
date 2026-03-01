# 🚀 Sup! Quick Setup Guide

Get your coming soon page running in **5 minutes**.

## 📋 Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- MongoDB Atlas account (free) ([Sign Up](https://www.mongodb.com/atlas))

---

## ⚡ Quick Setup (One Command)

```bash
./setup.sh
```

This will:
- ✅ Check Node.js version
- ✅ Install frontend dependencies
- ✅ Install backend dependencies
- ✅ Check environment configuration

---

## 📝 Manual Setup (Step by Step)

### Step 1: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..
```

### Step 2: Configure Environment Variables

#### Backend Configuration

File: `backend/.env`

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sup_coming_soon?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**How to get your MongoDB URI:**

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Click **"Create New Cluster"** (free tier)
4. Wait for cluster to be created (~2-3 minutes)
5. Click **"Connect"** → **"Drivers"** → **"Node.js"**
6. Copy the connection string
7. Replace `username`, `password`, `cluster` with your values

**Important:**
- Create a database user in MongoDB Atlas (Security → Database Access)
- Whitelist your IP (Security → Network Access → Add IP Address)
- Use `0.0.0.0/0` to allow access from anywhere (less secure, okay for development)

#### Frontend Configuration

File: `.env` (in project root)

```env
VITE_API_URL=http://localhost:5000/api
```

This is already set correctly for local development. **No changes needed.**

---

## 🏃 Run the Application

### Option A: Two Terminals

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Option B: One Command (Concurrently)

```bash
npm run dev:full
```

---

## ✅ Verify Setup

1. Open http://localhost:5173 in your browser
2. You should see the Sup! landing page
3. Sign up with a test account
4. You should see the "Coming Soon" confirmation page
5. Check your MongoDB Atlas dashboard → Browse Collections → verify user was saved

---

## 📊 Useful Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend only |
| `cd backend && npm run dev` | Start backend only |
| `npm run dev:full` | Start both together |
| `npm run build` | Build for production |

---

## 🔧 Environment Variables Reference

### Backend (`backend/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGODB_URI` | ✅ Yes | - | MongoDB connection string |
| `PORT` | ❌ No | 5000 | Server port |
| `FRONTEND_URL` | ❌ No | http://localhost:5173 | Frontend URL for CORS |

### Frontend (`.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | ✅ Yes | http://localhost:5000/api | Backend API URL |

---

## 🌍 Production Deployment

### 1. Deploy Backend

**Platforms:** Railway, Render, Heroku, or VPS

1. Push code to GitHub
2. Connect repo to your platform
3. Add environment variables:
   - `MONGODB_URI` (same as local)
   - `FRONTEND_URL` (your deployed frontend URL)

### 2. Update Frontend Environment

Edit `.env`:
```env
VITE_API_URL=https://your-backend-domain.com/api
```

### 3. Deploy Frontend

**Platforms:** Vercel, Netlify, or any static host

1. Build: `npm run build`
2. Deploy `dist` folder

---

## 🆘 Troubleshooting

### "MongoDB connection failed"
```
✓ Check IP whitelist in MongoDB Atlas (Network Access)
✓ Verify username/password are correct
✓ Ensure database user has read/write permissions
```

### "CORS error in browser"
```
✓ Check FRONTEND_URL in backend/.env matches your frontend URL exactly
✓ Include port if running locally (http://localhost:5173)
```

### "Cannot find module"
```
✓ Run npm install in both root and backend folders
✓ Use Node.js 18+
```

### "Port already in use"
```
# Backend
PORT=5001  # Change in backend/.env

# Frontend 
# Vite will auto-pick another port, or specify:
npm run dev -- --port 5174
```

---

## 📧 Next Steps (Pre-Launch)

1. **Collect Signups:** Users sign up on your coming soon page
2. **View Data:** Check MongoDB Atlas dashboard or use `/api/auth/signups`
3. **Export Emails:** When ready to launch, export the email list
4. **Send Launch Email:** Use SendGrid, Mailgun, or your email service
5. **Notify Users:** Mark `notified: true` in database after sending

---

## 💬 Need Help?

- MongoDB Atlas: https://docs.atlas.mongodb.com/
- Express.js: https://expressjs.com/en/guide/routing.html
- Vite: https://vitejs.dev/guide/

---

**Happy building!** 🚀
