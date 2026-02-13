#!/bin/bash

# Free Deployment Script - GitHub Pages + Render
# ================================================

echo "🚀 MAHA EV Dashboard - Free Deployment Setup"
echo "=============================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}STEP 1: Deploy Backend to Render${NC}"
echo "-----------------------------------"
echo ""
echo "1. Go to https://render.com and sign up (free)"
echo "2. Click 'New +' → 'Web Service'"
echo "3. Connect your GitHub repository: Chaitanyaattanti/MAHA-EV-DASHBOARD"
echo "4. Configure:"
echo "   - Name: maha-ev-backend"
echo "   - Root Directory: backend"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo "   - Instance Type: Free"
echo ""
echo "5. Add Environment Variable:"
echo "   - Key: FRONTEND_URL"
echo "   - Value: https://chaitanyaattanti.github.io/MAHA-EV-DASHBOARD"
echo ""
echo "6. Click 'Create Web Service' and wait for deployment"
echo "7. Copy your backend URL (e.g., https://maha-ev-backend.onrender.com)"
echo ""
read -p "Press Enter when backend is deployed and you have the URL..."

echo ""
echo -e "${YELLOW}Enter your Render backend URL:${NC}"
read BACKEND_URL

# Update frontend config
echo ""
echo -e "${BLUE}Updating frontend configuration...${NC}"
cat > frontend/.env.production << EOF
VITE_API_URL=$BACKEND_URL
EOF

echo ""
echo -e "${GREEN}✓ Frontend configured with backend URL${NC}"
echo ""

echo -e "${BLUE}STEP 2: Deploy Frontend to GitHub Pages${NC}"
echo "----------------------------------------"
echo ""
echo "Preparing to deploy frontend..."
echo ""

cd frontend

# Build the frontend
echo "Building frontend..."
npm run build

echo ""
echo "Deploying to GitHub Pages..."
npm run deploy

echo ""
echo -e "${GREEN}✓ Deployment complete!${NC}"
echo ""
echo "================================================"
echo -e "${GREEN}🎉 Your app is now live!${NC}"
echo ""
echo "Frontend URL: https://chaitanyaattanti.github.io/MAHA-EV-DASHBOARD"
echo "Backend URL: $BACKEND_URL"
echo ""
echo "Note: GitHub Pages may take 2-3 minutes to update"
echo "================================================"
