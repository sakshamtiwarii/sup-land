import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load env from backend folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../backend/.env') });

// Startup validation — logs are visible in Vercel Function Logs
if (!process.env.MONGODB_URI) {
  console.error('❌ FATAL: MONGODB_URI environment variable is not set. Set it in the Vercel dashboard.');
}
if (!process.env.GOOGLE_CLIENT_ID) {
  console.warn('⚠️  GOOGLE_CLIENT_ID not set — Google OAuth will fail.');
}

// Import backend modules
import connectDB from '../backend/config/db.js';
import authRoutes from '../backend/src/routes/auth.routes.js';
import suggestionRoutes from '../backend/src/routes/suggestion.routes.js';
import volunteerRoutes from '../backend/src/routes/volunteer.routes.js';

// Connect to MongoDB
connectDB();


const app = express();

// Trust proxy for accurate IP detection behind reverse proxies (required for rate limiting)
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false,
  crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
}));

// Compression middleware
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Stricter rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // 10 attempts per hour
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again later.'
  },
  skipSuccessfulRequests: true,
});

// Apply general rate limiter to all routes
app.use(limiter);

// CORS configuration - allow same origin and specified origins
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));

// Apply stricter rate limit to auth routes
app.use('/api/auth/signup', authLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/google', authLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/volunteers', volunteerRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Sup! backend is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  // Log only in development
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error:', err.message);
  }

  // Handle CORS errors
  if (err.message === 'Not allowed by CORS') {
    return res.status(403).json({
      success: false,
      message: 'Access denied'
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production'
      ? 'Something went wrong!'
      : err.message
  });
});

// Export for Vercel serverless
export default app;
