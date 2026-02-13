# Free Deployment Guide

## Option 1: Railway (Recommended - Easiest)

Railway offers free hosting with $5 monthly credit (enough for small projects).

### Deploy Backend to Railway:

1. **Install Railway CLI:**
   ```bash
   npm i -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Deploy Backend:**
   ```bash
   cd backend
   railway init
   railway up
   ```

4. **Set Environment Variables:**
   ```bash
   railway variables set FRONTEND_URL=your-frontend-url
   ```

5. **Get Backend URL:**
   ```bash
   railway domain
   ```
   Copy the URL (e.g., `https://your-app.railway.app`)

### Deploy Frontend to Railway:

1. **Deploy Frontend:**
   ```bash
   cd frontend
   railway init
   railway up
   ```

2. **Set Environment Variables:**
   ```bash
   railway variables set VITE_API_URL=your-backend-url
   ```

3. **Get Frontend URL:**
   ```bash
   railway domain
   ```

---

## Option 2: Vercel (Frontend) + Render (Backend)

### Deploy Frontend to Vercel (100% Free):

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variable:**
   ```bash
   vercel env add VITE_API_URL
   ```
   Enter your backend URL

4. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

### Deploy Backend to Render (Free Tier):

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add Environment Variable:
   - `FRONTEND_URL`: Your Vercel URL
6. Click "Create Web Service"

---

## Option 3: Netlify (Frontend) + Fly.io (Backend)

### Deploy Frontend to Netlify:

1. **Install Netlify CLI:**
   ```bash
   npm i -g netlify-cli
   ```

2. **Build and Deploy:**
   ```bash
   cd frontend
   npm run build
   netlify deploy --prod
   ```

3. **Set Environment Variable:**
   In Netlify dashboard → Site settings → Environment variables:
   - `VITE_API_URL`: Your backend URL

### Deploy Backend to Fly.io:

1. **Install Fly CLI:**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login:**
   ```bash
   fly auth login
   ```

3. **Deploy:**
   ```bash
   cd backend
   fly launch
   fly deploy
   ```

---

## Option 4: GitHub Pages (Frontend Only) + Railway (Backend)

### Deploy Backend to Railway:
(See Option 1 above)

### Deploy Frontend to GitHub Pages:

1. **Update vite.config.js:**
   ```javascript
   export default {
     base: '/MAHA-EV-DASHBOARD/',
   }
   ```

2. **Add deploy script to package.json:**
   ```json
   "scripts": {
     "deploy": "vite build && gh-pages -d dist"
   }
   ```

3. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. Enable GitHub Pages in repo settings (gh-pages branch)

---

## Quickest Method: Railway for Both

This is the easiest and fastest way:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy Backend
cd backend
railway init
railway up
railway domain  # Get URL

# Deploy Frontend  
cd ../frontend
railway init
railway variables set VITE_API_URL=<backend-url-from-above>
railway up
railway domain  # Get URL

# Update Backend CORS
cd ../backend
railway variables set FRONTEND_URL=<frontend-url-from-above>
```

---

## Important Notes:

1. **CORS Configuration**: Make sure backend `FRONTEND_URL` matches your deployed frontend URL
2. **Build Command**: Frontend needs `npm run build` for production
3. **Environment Variables**: Set them in each platform's dashboard
4. **Free Tier Limits**:
   - Railway: $5/month credit (~500 hours)
   - Vercel: 100GB bandwidth
   - Netlify: 100GB bandwidth
   - Render: 750 hours/month (free tier)

---

## Recommended: Railway (Both)

**Pros:**
- Already configured (railway.json exists)
- Easy CLI
- Automatic deployments
- Free tier included
- Handles both frontend and backend

**Steps:**
1. Install Railway CLI: `npm i -g @railway/cli`
2. Run: `railway login`
3. Deploy backend first, get URL
4. Deploy frontend with backend URL
5. Done! ✅
