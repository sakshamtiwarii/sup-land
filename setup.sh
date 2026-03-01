#!/bin/bash

# ============================================
# Sup! Setup Script
# Automates the initial setup process
# ============================================

echo "🚀 Welcome to Sup! Setup"
echo "========================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version 18+ required. Found: $(node -v)${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node -v) found${NC}"

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

cd ..

# Check if .env files are configured
echo ""
echo "🔧 Checking environment configuration..."

BACKEND_ENV_CONFIGURED=false
FRONTEND_ENV_CONFIGURED=false

# Check backend env
if grep -q "mongodb+srv://" backend/.env 2>/dev/null; then
    echo -e "${GREEN}✓ Backend .env is configured${NC}"
    BACKEND_ENV_CONFIGURED=true
else
    echo -e "${YELLOW}⚠ Backend .env needs MongoDB URI${NC}"
fi

# Check frontend env  
if grep -q "VITE_API_URL=" .env 2>/dev/null; then
    echo -e "${GREEN}✓ Frontend .env is configured${NC}"
    FRONTEND_ENV_CONFIGURED=true
else
    echo -e "${YELLOW}⚠ Frontend .env needs configuration${NC}"
fi

echo ""
echo "========================"
echo "🎉 Setup Complete!"
echo "========================"
echo ""

if [ "$BACKEND_ENV_CONFIGURED" = false ]; then
    echo -e "${YELLOW}⚠ ACTION REQUIRED:${NC}"
    echo "1. Sign up at https://www.mongodb.com/atlas (free)"
    echo "2. Create a cluster and get your connection string"
    echo "3. Edit backend/.env and add your MONGODB_URI"
    echo ""
    echo "Example:"
    echo "MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sup_coming_soon?retryWrites=true&w=majority"
    echo ""
fi

echo "📝 To start the application:"
echo ""
echo "  Terminal 1 - Backend:"
echo "    cd backend && npm run dev"
echo ""
echo "  Terminal 2 - Frontend:"
echo "    npm run dev"
echo ""
echo "  Or run both together (requires concurrently):"
echo "    npm run dev:full"
echo ""
echo "🌐 Then open http://localhost:5173 in your browser"
echo ""
