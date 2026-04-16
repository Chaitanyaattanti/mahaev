# 🚀 Deploy Backend to Render (Mobile Access Fix)

## Problem
- Frontend deployed on GitHub Pages ✅
- Mobile users can't reach datasets (no backend URL)
- Local `localhost:3000` doesn't work remotely

## Solution: Deploy Backend to Render (FREE)

### Step 1: Sign Up & Connect GitHub
1. Go to https://render.com
2. Click **Sign up** (use GitHub auth)
3. Click **New +** → **Web Service**
4. Search for repo: `MAHA-EV-DASHBOARD`
5. Select it and click **Connect**

### Step 2: Configure Service
Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `maha-ev-backend` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node server.js` |
| **Instance Type** | `Free` |

### Step 3: Add Environment Variables
Click **"Advanced"** and add:

```
NODE_ENV = production
FRONTEND_URL = https://chaitanyaattanti.github.io/mahaev/
```

### Step 4: Deploy
- Click **Create Web Service**
- Wait for deployment (2-3 minutes)
- Copy your backend URL (e.g., `https://maha-ev-backend-xxxx.onrender.com`)

### Step 5: Update Frontend Config
After getting your Render URL, update frontend:

```bash
cd frontend

# Update config with your Render URL
# Edit line in src/config.js:
# export const API_URL = 'https://maha-ev-backend-xxxx.onrender.com';

npm run build
npm run deploy
```

---

## Temporary Mobile Fix (No Backend Needed)

If you can't set up Render yet, use local datasets by editing:

**File**: `frontend/src/pages/Datasets.jsx`

```javascript
// Change this:
fetch(`${API_URL}/datasets`)

// To this (temporary mock):
const mockDatasets = [ /* datasets array */ ];
Promise.resolve(mockDatasets).then(data => { ... });
```

---

## Expected Result After Setup

✅ Mobile users can:
- Load Datasets page
- See all 10 datasets
- Download datasets
- Use Battery Predictor

**Current Status**:
- Frontend deployed: https://chaitanyaattanti.github.io/mahaev/ ✅
- Backend config updated ✅
- Needs Render deployment 🔄

---

## Timeline
- Render deployment: **2-3 minutes**
- GitHub Pages update: **2-3 minutes**
- Total time: **~5 minutes**

**Ready to deploy?** Follow the steps above!
