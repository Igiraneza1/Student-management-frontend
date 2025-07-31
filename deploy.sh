#!/bin/bash

# Student Management Frontend Deployment Script

echo "🚀 Starting deployment process..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo ""
    echo "🎉 Your application is ready for deployment!"
    echo ""
    echo "📋 Next steps:"
    echo "1. For Vercel: Push to GitHub and connect to Vercel"
    echo "2. For Netlify: Push to GitHub and connect to Netlify"
    echo "3. For Docker: Run 'docker build -t student-management-frontend .'"
    echo "4. For manual deployment: Run 'npm start'"
    echo ""
    echo "🔑 Don't forget to set environment variables:"
    echo "   NEXT_PUBLIC_API_URL=https://your-backend-api.com/api"
    echo "   NODE_ENV=production"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi 