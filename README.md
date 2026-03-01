# Sup! - Coming Soon Page

A beautiful coming soon landing page with Node.js backend and MongoDB Atlas for collecting early access signups.

![Sup! Preview](./preview.png)

## ✨ Features

- 🎨 Beautiful dark-themed UI with violet/fuchsia gradients
- 📝 Early access signup with email collection
- 🔐 Secure authentication with bcrypt password hashing
- 🗄️ MongoDB Atlas database
- 📊 Admin API to view signup statistics
- 📱 Fully responsive design
- ⚡ React + TypeScript + Vite + Express

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([Download](https://nodejs.org/))
- MongoDB Atlas account (free) ([Sign Up](https://www.mongodb.com/atlas))

### One-Command Setup

```bash
# Mac/Linux
./setup.sh

# Windows
setup.bat
```

Then follow the prompts to configure MongoDB.

### Manual Setup

```bash
# 1. Install dependencies
npm install
cd backend && npm install && cd ..

# 2. Configure environment variables
# Edit backend/.env - Add your MongoDB connection string
# Edit .env - Already configured for local development

# 3. Start the servers
npm run dev:full
```

**📖 Detailed Setup Guide:** [SETUP.md](./SETUP.md)

## 📁 Project Structure

```
├── src/                      # Frontend React app
│   ├── app/
│   │   ├── components/
│   │   │   ├── welcome/      # Landing page sections
│   │   │   │   ├── AuthForm.tsx
│   │   │   │   ├── ComingSoon.tsx
│   │   │   │   ├── Hero.tsx
│   │   │   │   └── Features.tsx
│   │   │   └── ui/           # shadcn/ui components
│   │   └── services/
│   │       └── api.ts        # API client
│   └── ...
├── backend/                  # Node.js + Express backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   └── server.js
├── .env                      # Frontend environment
├── backend/.env              # Backend environment
├── setup.sh                  # Mac/Linux setup script
├── setup.bat                 # Windows setup script
└── SETUP.md                  # Detailed setup guide
```

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register for early access |
| POST | `/api/auth/login` | Login for returning users |
| POST | `/api/auth/google` | Google OAuth login/signup |
| GET | `/api/auth/stats` | Get signup statistics |
| GET | `/api/auth/signups` | List all signups |
| GET | `/api/auth/check-email/:email` | Check if email exists |
| GET | `/api/auth/check-username/:username` | Check if username exists |

### Suggestions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/suggestions` | Submit a suggestion (anonymous or identified) |
| GET | `/api/suggestions` | List all suggestions |
| GET | `/api/suggestions/stats` | Get suggestion statistics |
| PUT | `/api/suggestions/:id` | Update suggestion status (admin) |
| DELETE | `/api/suggestions/:id` | Delete a suggestion (admin) |

### Volunteers
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/volunteers` | Submit volunteer application |
| GET | `/api/volunteers` | List all volunteer applications |
| GET | `/api/volunteers/stats` | Get volunteer statistics |
| PUT | `/api/volunteers/:id` | Update volunteer status (admin) |
| DELETE | `/api/volunteers/:id` | Delete a volunteer application (admin) |

### System
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |

## 🗄️ Environment Variables

### Backend (`backend/.env`)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/sup_coming_soon?retryWrites=true&w=majority
PORT=5000
FRONTEND_URL=http://localhost:5173

# Email Configuration (optional - for notifications)
ADMIN_EMAIL=your@email.com
GMAIL_USER=your@email.com
GMAIL_APP_PASSWORD=your_app_password
```

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend dev server |
| `npm run backend` | Start backend dev server |
| `npm run dev:full` | Start both frontend & backend |
| `npm run build` | Build for production |
| `./setup.sh` | Run automated setup (Mac/Linux) |
| `setup.bat` | Run automated setup (Windows) |

## 🎨 User Flow

1. **Landing Page** → User sees beautiful signup form
2. **Sign Up** → Data saved to MongoDB Atlas
3. **Coming Soon Page** → Shows confirmation with user's name
4. **Session Persistence** → User stays logged in via localStorage
5. **Admin Access** → View all signups via API or MongoDB dashboard

## 📊 Viewing Your Early Access List

**API:**
```bash
curl http://localhost:5000/api/auth/stats
curl http://localhost:5000/api/auth/signups
```

**MongoDB Atlas Dashboard:**
1. Go to your cluster → Browse Collections
2. Database: `sup_coming_soon`
3. Collections:
   - `users` - Registered users
   - `suggestions` - User suggestions and feedback
   - `volunteers` - Volunteer applications

## 🌍 Deployment

### Backend (Railway/Render/Heroku)

1. Push to GitHub
2. Connect repo to platform
3. Add environment variables:
   - `MONGODB_URI`
   - `FRONTEND_URL` (your deployed frontend)

### Frontend (Vercel/Netlify)

1. Update `.env` with production API URL:
   ```env
   VITE_API_URL=https://your-backend.com/api
   ```
2. Build: `npm run build`
3. Deploy `dist` folder

See [SETUP.md](./SETUP.md) for detailed deployment instructions.

## 📧 Pre-Launch Checklist

- [ ] Set up MongoDB Atlas cluster
- [ ] Configure `backend/.env` with MongoDB URI
- [ ] Run `./setup.sh` to install dependencies
- [ ] Test signup flow locally
- [ ] Deploy backend
- [ ] Update `.env` with production API URL
- [ ] Deploy frontend
- [ ] Test production signup
- [ ] Set up email service (SendGrid/Mailgun) for launch notifications

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Check IP whitelist in Atlas Network Access |
| CORS error | Verify `FRONTEND_URL` in backend/.env |
| Port already in use | Change `PORT` in backend/.env |
| Cannot find module | Run `npm install` in both folders |

See [SETUP.md](./SETUP.md) for more troubleshooting.

## 📧 Email Notifications

The backend can send email notifications when someone submits a suggestion or volunteer application.

### Setup Options:

**Option 1: Gmail (Easiest)**
1. Enable 2-factor authentication on your Google account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Add to `backend/.env`:
```env
ADMIN_EMAIL=your@gmail.com
GMAIL_USER=your@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

**Option 2: SendGrid (Production)**
```env
ADMIN_EMAIL=your@email.com
SENDGRID_API_KEY=SG.xxx...
```

### What You'll Receive:
- **Suggestions**: Email with the suggestion text, sender info (if not anonymous), and timestamp
- **Volunteers**: Email with applicant details, skills, availability, and their message
- Both include styled HTML emails + plain text fallback

## 📄 License

This project includes components from [shadcn/ui](https://ui.shadcn.com/) used under [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).

---

**Ready to collect early access signups?** Run `./setup.sh` and get started! 🚀
# sup-land
