#!/bin/bash

# Typewriter Testing Suite - Local Setup Script

echo "🚀 Setting up Typewriter Testing Suite locally..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ $NODE_VERSION -lt 18 ]; then
    echo "❌ Node.js version 18+ required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Install the main package we're testing
echo "📦 Installing typewriter-text-effect package..."
npm install typewriter-text-effect

# Build the project
echo "🔨 Building the application..."
npm run build

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start development server:"
echo "  npm run dev"
echo ""
echo "To start production server:"
echo "  npm start"
echo ""
echo "The application will be available at:"
echo "  Development: http://localhost:5000"
echo "  Production:  http://localhost:3000"
echo ""
echo "Happy testing! 🧪"