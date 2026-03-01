@echo off
REM ============================================
REM Sup! Setup Script for Windows
REM Automates the initial setup process
REM ============================================

echo 🚀 Welcome to Sup! Setup
echo ========================
echo.

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org/
    exit /b 1
)

for /f "tokens=1 delims=." %%a in ('node -v') do set NODE_MAJOR=%%a
set NODE_MAJOR=%NODE_MAJOR:v=%

if %NODE_MAJOR% LSS 18 (
    echo ❌ Node.js version 18+ required
    exit /b 1
)

echo ✓ Node.js found

REM Install frontend dependencies
echo.
echo 📦 Installing frontend dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    exit /b 1
)
echo ✓ Frontend dependencies installed

REM Install backend dependencies
echo.
echo 📦 Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    exit /b 1
)
echo ✓ Backend dependencies installed

cd ..

echo.
echo ========================
echo 🎉 Setup Complete!
echo ========================
echo.
echo 📝 To start the application:
echo.
echo   Terminal 1 - Backend:
echo     cd backend ^&^& npm run dev
echo.
echo   Terminal 2 - Frontend:
echo     npm run dev
echo.
echo 🌐 Then open http://localhost:5173 in your browser
echo.
echo ⚠️  IMPORTANT: Edit backend/.env and add your MongoDB URI
echo.
pause
