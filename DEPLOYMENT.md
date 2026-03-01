# 🚀 Production Deployment Guide

Complete guide to deploy Sup! to production.

## 📋 Pre-Deployment Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Environment variables prepared (`.env.example` files filled)
- [ ] Google OAuth credentials created (if using Google Sign-In)
- [ ] Email service configured (optional)
- [ ] Domain name purchased (optional, platforms provide free domains)
- [ ] GitHub repository with your code

---

## 🗄️ Step 1: MongoDB Atlas Setup

### Create Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign up/login
2. Create a new project
3. Build a Database → Choose "M0 Free" tier
4. Select your preferred region (choose one close to your users)
5. Click "Create Cluster"

### Configure Security
1. **Database Access** → Add New Database User
   - Choose "Password" authentication
   - Create a strong username and password
   - Set privileges to "Read and write to any database"
   - Click "Add User"

2. **Network Access** → Add IP Address
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0) for easy deployment
   - **OR** add specific IPs if you know them
   - Click "Confirm"

### Get Connection String
1. Go to **Database** → Click "Connect" on your cluster
2. Choose "Drivers"
3. Select "Node.js" and copy the connection string
4. Replace `<password>` with your database user's password
5. Save this for later!

---

## 🔐 Step 2: Environment Variables

### Backend (`backend/.env`)

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sup_coming_soon?retryWrites=true&w=majority

# Server
PORT=5000
NODE_ENV=production

# Frontend URLs (comma-separated if multiple)
FRONTEND_URL=https://your-frontend-domain.com

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com

# Email (optional)
ADMIN_EMAIL=your@email.com
GMAIL_USER=your@email.com
GMAIL_APP_PASSWORD=your-app-password
```

### Frontend (`.env`)

```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

---

## 🖥️ Step 3: Deploy Backend

### Option A: Railway (Recommended - Easy & Free Tier)

1. Go to [Railway](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub account and select your repository
4. Railway will auto-detect it's a Node.js project
5. Go to **Variables** tab and add all your environment variables
6. Click "Deploy"
7. Once deployed, copy the domain (e.g., `https://sup-backend.up.railway.app`)

**Railway-specific notes:**
- Railway provides the `PORT` variable automatically
- Add `NODE_ENV=production`
- Free tier: $5 credit/month (enough for small projects)

### Option B: Render (Free Forever)

1. Go to [Render](https://render.com) and sign up
2. Click "New Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: sup-backend
   - **Environment**: Node
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables in the "Environment" section
6. Click "Create Web Service"
7. Wait for deployment and copy the URL

**Render-specific notes:**
- Free tier spins down after 15 min of inactivity (cold start ~30s)
- Add your credit card for always-on instances (free)

### Option C: Vercel (Serverless)

1. Create `backend/vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

2. Go to [Vercel](https://vercel.com) and import your repo
3. Set root directory to `backend`
4. Add environment variables
5. Deploy

---

## 🎨 Step 4: Deploy Frontend

### Option A: Vercel (Recommended)

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   - `VITE_API_URL`: Your backend URL + `/api`
6. Click "Deploy"

### Option B: Netlify

1. Go to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select your repo
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add environment variables in Site Settings
6. Deploy

### Option C: Cloudflare Pages

1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Click "Create a project"
3. Connect to Git
4. Configure:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Add environment variables
6. Deploy

---

## 🔗 Step 5: Connect Frontend & Backend

1. Copy your **frontend domain** (e.g., `https://sup-frontend.vercel.app`)
2. Go to your **backend dashboard** (Railway/Render)
3. Update `FRONTEND_URL` environment variable with your frontend domain
4. Redeploy backend if needed

### Test the Connection

```bash
# Test backend health
curl https://your-backend-domain.com/api/health

# Should return:
# {"status":"OK","message":"Sup! backend is running"}
```

---

## 🔐 Step 6: Google OAuth Setup (Optional)

If you want Google Sign-In:

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Select your OAuth 2.0 Client ID
3. Click "Edit"
4. Add Authorized JavaScript Origins:
   ```
   https://your-frontend-domain.com
   ```
5. Save

---

## ✅ Step 7: Post-Deployment Testing

### Test Signup Flow
1. Visit your deployed frontend
2. Try signing up with email/password
3. Check MongoDB Atlas to confirm data was saved
4. Try Google Sign-In (if configured)

### Test Suggestions
1. Submit a suggestion (anonymous)
2. Submit a suggestion with name/email
3. Check MongoDB for saved data

### Test Volunteer Application
1. Fill out volunteer form
2. Submit and verify data in MongoDB

---

## 🔒 Security Checklist

- [ ] `NODE_ENV=production` is set on backend
- [ ] MongoDB IP whitelist configured (or 0.0.0.0/0 for flexibility)
- [ ] CORS configured with correct frontend URL
- [ ] Rate limiting is active (default: 100 req/15min)
- [ ] Helmet security headers enabled
- [ ] No sensitive data in GitHub repo
- [ ] `.env` files in `.gitignore`

---

## 🐛 Troubleshooting

### CORS Errors
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```
**Fix**: Update `FRONTEND_URL` in backend environment variables to match your frontend domain exactly.

### MongoDB Connection Failed
**Fix**: 
- Check IP whitelist in MongoDB Atlas Network Access
- Verify connection string format
- Ensure password is URL-encoded if it has special characters

### 404 Not Found
**Fix**: 
- Backend: Ensure `/api` prefix is in the URL
- Frontend: Check `VITE_API_URL` ends with `/api`

### Rate Limiting (429 Too Many Requests)
**Fix**: This is expected behavior. Wait 15 minutes or adjust limits in `server.js`.

### Cold Start Issues (Render Free Tier)
**Fix**: First request after inactivity will be slow (~30s). Consider upgrading or using Railway.

---

## 💰 Cost Estimates (Monthly)

| Service | Free Tier | Paid (Basic) |
|---------|-----------|--------------|
| MongoDB Atlas | 512MB storage | $9+/month |
| Railway | $5 credit | $5+/month |
| Render | Always free (with card) | $7/month |
| Vercel | 100GB bandwidth | $20/month |
| Netlify | 100GB bandwidth | $19/month |
| Google OAuth | Free | Free |

**Recommended free setup:** MongoDB Atlas + Render + Vercel = **$0/month**

---

## 📞 Support

If you encounter issues:
1. Check the logs in your deployment platform dashboard
2. Test API endpoints with curl or Postman
3. Verify environment variables are set correctly
4. Check MongoDB Atlas logs for connection issues

---

## 🎉 You're Live!

Your Sup! coming soon page is now deployed and ready to collect signups!

**Next Steps:**
- Share your URL with potential users
- Monitor signups in MongoDB Atlas
- Set up email notifications for new signups
- Prepare for your official launch! 🚀
