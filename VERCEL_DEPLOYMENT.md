# 🚀 Vercel Deployment Guide

Deploy both frontend and backend on Vercel with a single project!

## 📋 Prerequisites

- [Vercel account](https://vercel.com/signup) (free)
- [GitHub repository](https://github.com) with your code
- [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

---

## 🔧 Step 1: Prepare Your Code

### 1.1 Environment Variables

Create `backend/.env` with your production values:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sup_coming_soon?retryWrites=true&w=majority

# Optional: For CORS if you have custom domains
FRONTEND_URL=https://your-domain.vercel.app

# Optional: Google OAuth
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com

# Optional: Email notifications
ADMIN_EMAIL=your@email.com
GMAIL_USER=your@email.com
GMAIL_APP_PASSWORD=your-app-password
```

**Important:** 
- Never commit this file! It's already in `.gitignore`
- We'll add these to Vercel dashboard, not in the code

### 1.2 Verify Project Structure

Your project should look like this:
```
├── api/                    # Serverless API functions
│   └── index.js           # Main API handler
├── backend/               # Backend source code
│   ├── config/
│   ├── src/
│   ├── .env              # Your secrets (not committed)
│   └── ...
├── src/                   # Frontend React app
├── vercel.json           # Vercel configuration
├── package.json          # Frontend dependencies
└── ...
```

---

## 🚀 Step 2: Deploy to Vercel

### Option A: Vercel Dashboard (Easiest)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

3. **Click "Add New Project"**

4. **Import your GitHub repository**
   - Find and select your repo
   - Click "Import"

5. **Configure Project:**
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

6. **Add Environment Variables** (in the Environment Variables section):
   
   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | Your MongoDB connection string |
   | `GOOGLE_CLIENT_ID` | (Optional) Your Google OAuth client ID |
   | `ADMIN_EMAIL` | (Optional) Your admin email |
   | `GMAIL_USER` | (Optional) Gmail for notifications |
   | `GMAIL_APP_PASSWORD` | (Optional) Gmail app password |

7. **Click "Deploy"**

8. **Wait for build to complete** (~2-3 minutes)

### Option B: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Set environment variables:**
   ```bash
   vercel env add MONGODB_URI
   # Enter your MongoDB connection string when prompted
   
   vercel env add GOOGLE_CLIENT_ID
   # Enter your Google Client ID
   ```

5. **Redeploy:**
   ```bash
   vercel --prod
   ```

---

## ✅ Step 3: Verify Deployment

### Test the API

Visit: `https://your-project.vercel.app/api/health`

You should see:
```json
{
  "status": "OK",
  "message": "Sup! backend is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

### Test the Frontend

1. Visit: `https://your-project.vercel.app`
2. Try signing up
3. Check MongoDB Atlas to confirm data was saved

---

## 🔐 Environment Variables Reference

### Required
| Variable | Description | Where to get |
|----------|-------------|--------------|
| `MONGODB_URI` | MongoDB connection string | MongoDB Atlas → Connect → Drivers → Node.js |

### Optional (for features)
| Variable | Description | Where to get |
|----------|-------------|--------------|
| `GOOGLE_CLIENT_ID` | Google Sign-In | Google Cloud Console → APIs → Credentials |
| `ADMIN_EMAIL` | Where to send notifications | Your email |
| `GMAIL_USER` | Gmail account for sending | Your Gmail |
| `GMAIL_APP_PASSWORD` | Gmail app password | Google Account → Security → App Passwords |

---

## 🔄 How It Works

```
┌─────────────────────────────────────────────────────────┐
│                    Vercel Project                        │
│  ┌─────────────────┐        ┌──────────────────────┐   │
│  │   Frontend      │        │   Backend (API)      │   │
│  │   (Vite/React)  │◄──────►│   (Express)          │   │
│  │                 │        │                      │   │
│  │   /             │        │   /api/*             │   │
│  │   /about        │        │   /api/auth          │   │
│  │   /contact      │        │   /api/suggestions   │   │
│  └─────────────────┘        └──────────────────────┘   │
│           │                            │                │
│           └────────────┬───────────────┘                │
│                        │                                │
│                   Same Domain                           │
│              https://yoursite.vercel.app                │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  MongoDB Atlas  │
                    │   (Database)    │
                    └─────────────────┘
```

**Benefits of this setup:**
- ✅ Single domain (no CORS issues)
- ✅ Single deployment
- ✅ Free SSL certificate
- ✅ Global CDN for frontend
- ✅ Serverless backend (scales automatically)

---

## 🔧 Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `FRONTEND_URL` environment variable with your custom domain
5. Redeploy

---

## 🐛 Troubleshooting

### Build Failed

**Error:** "Module not found" or "Cannot find package"

**Fix:**
```bash
# Make sure backend dependencies are installed
npm install

# Add backend dependencies to root package.json
npm install express cors helmet express-rate-limit compression mongoose bcryptjs express-validator nodemailer google-auth-library dotenv
```

### API Returns 404

**Check:** `vercel.json` should be at project root with:
```json
{
  "routes": [
    { "src": "/api/(.*)", "dest": "api/index.js" },
    { "src": "/[^.]+", "dest": "/" }
  ]
}
```

### MongoDB Connection Timeout

**Fix:**
1. Check MongoDB Atlas → Network Access
2. Add `0.0.0.0/0` (Allow from anywhere) OR
3. Add Vercel's IP ranges (they change, so "Allow from anywhere" is easier)

### CORS Errors

**Fix:** Since frontend and backend are on same domain, CORS shouldn't be an issue. But if you see errors:
1. Check browser console for exact error
2. Verify `FRONTEND_URL` environment variable matches your actual domain

### "Function invocation failed" on API routes

**Fix:** Check Vercel Function Logs:
1. Vercel Dashboard → Your Project → Functions
2. Look for error messages
3. Common issue: Missing environment variables

---

## 📝 Local Development

```bash
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend
npm run dev
```

Or use concurrently:
```bash
npm run dev:full
```

---

## 🎉 Success!

Your Sup! app is now live on Vercel with:
- ⚡ Blazing fast frontend (CDN)
- 🔒 Secure backend (serverless)
- 🌍 Global edge network
- 💾 MongoDB Atlas database
- 📱 Fully responsive

**Share your URL and start collecting signups!** 🚀

---

## 📞 Support

If you get stuck:
1. Check Vercel logs: Dashboard → Your Project → Functions → Logs
2. Check MongoDB Atlas: Database → Collections
3. Test API directly: `https://your-site.vercel.app/api/health`
