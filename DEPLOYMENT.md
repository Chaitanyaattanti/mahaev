# 🚀 MAHA-EV Dashboard - Deployment Checklist

## Pre-Deployment Checklist

### Git Setup
- [ ] All changes committed to GitHub
- [ ] Branch: `main` (or your deployment branch)
- [ ] Remote URL: `https://github.com/chaitanyaattanti/MAHA-EV-DASHBOARD`

### Backend (Node.js Server)
- [ ] `backend/package.json` has `start` script: `node server.js`
- [ ] Environment: `NODE_ENV=production`
- [ ] CORS configured for: `https://chaitanyaattanti.github.io/`
- [ ] All dependencies installed locally (tested)

### Frontend (React + Vite)
- [ ] `frontend/vite.config.js` has `base: '/mahaev/'`
- [ ] Build output: `frontend/dist`
- [ ] `gh-pages` package installed
- [ ] Environment: `VITE_API_URL` will be set automatically

---

## Deployment Steps

### Step 1️⃣: Deploy Backend to Render

**Option A: Automatic Deploy via render.yaml (Recommended)**
```bash
# Just push to GitHub, Render auto-deploys via render.yaml
git push origin main
```

**Option B: Manual Setup**
1. Go to https://render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo: `chaitanyaattanti/MAHA-EV-DASHBOARD`
4. Configure:
   - **Name**: `maha-ev-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   ```
   NODE_ENV=production
   FRONTEND_URL=https://chaitanyaattanti.github.io/MAHA-EV-DASHBOARD
   ```

6. Click **"Create Web Service"** and wait for deployment
7. **Copy your backend URL** (e.g., `https://maha-ev-backend-xxxx.onrender.com`)

### Step 2️⃣: Update Frontend Config

```bash
cd frontend

# Create production environment file
cat > .env.production << EOF
VITE_API_URL=https://maha-ev-backend-xxxx.onrender.com
EOF

# Replace with your actual Render backend URL
```

### Step 3️⃣: Build Frontend

```bash
cd frontend

# Install dependencies (if not already)
npm install

# Build production bundle
npm run build

# Deploy to GitHub Pages
npm run deploy
```

Or use the automated script:
```bash
bash deploy.sh
```

### Step 4️⃣: Verify Deployment

**Frontend**:
- Visit: https://chaitanyaattanti.github.io/MAHA-EV-DASHBOARD
- Should load in 2-3 minutes after deploy

**Backend**:
- Health check: `https://maha-ev-backend-xxxx.onrender.com/health`
- Should return: `{"status":"ok","service":"MAHA-EV Chatbot API","version":"1.0"}`

**Datasets Loading**:
- Navigate to `/Datasets` page
- Should show all 10 datasets

---

## Troubleshooting

### ❌ Frontend shows "Cannot read datasets"
**Issue**: Backend URL not configured in frontend
**Fix**: 
```bash
cd frontend
# Check .env.production exists
cat .env.production

# If empty or missing, update it with correct backend URL
echo "VITE_API_URL=https://your-backend-url.onrender.com" > .env.production
npm run build && npm run deploy
```

### ❌ Backend deployment fails
**Issue**: Missing dependencies or wrong start command
**Fix**:
- Check `backend/package.json` has all required dependencies
- Verify `npm start` runs without errors locally:
  ```bash
  cd backend && npm start
  ```

### ❌ CORS errors in browser console
**Issue**: Frontend URL not whitelisted in backend CORS
**Fix**: Update `backend/server.js` CORS config:
```javascript
app.use(cors({
  origin: [
    'https://chaitanyaattanti.github.io', 
    'http://localhost:5173'
  ],
  credentials: true
}));
```

### ❌ GitHub Pages shows 404
**Issue**: Site not enabled or wrong repository settings
**Fix**:
1. Go to https://github.com/chaitanyaattanti/MAHA-EV-DASHBOARD/settings
2. Scroll to **"Pages"**
3. Select: **"Deploy from a branch"**
4. Branch: `gh-pages` / `/ (root)`
5. Click Save

---

## Current Status

| Component | Status | URL |
|-----------|--------|-----|
| Frontend Repo | ✓ GitHub | https://github.com/chaitanyaattanti/MAHA-EV-DASHBOARD |
| Frontend Build | ✓ Ready | `npm run build` |
| Frontend Deploy | ✓ Ready | `npm run deploy` |
| Backend Code | ✓ Ready | `/backend` |
| Backend Deploy | ✓ Ready | Render (via render.yaml) |
| Environment Vars | ✓ Configured | render.yaml |

---

## Quick Deploy Command
```bash
# From root directory
bash deploy.sh
```

This will guide you through all steps interactively.

---

**Note**: After deploying, Render free tier may take 20-30 seconds to respond to first request (cold start).
