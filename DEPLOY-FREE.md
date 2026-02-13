# Free Deployment Guide - GitHub Pages + Render

## Overview
- **Frontend:** GitHub Pages (100% free forever)
- **Backend:** Render (750 hours/month free)

---

## Step 1: Deploy Backend to Render

### Option A: Via Render Dashboard (Easiest)

1. **Go to https://render.com** and sign up (use GitHub to sign in)

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository:**
   - Repository: `Chaitanyaattanti/MAHA-EV-DASHBOARD`

4. **Configure the service:**
   ```
   Name: maha-ev-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

5. **Add Environment Variable:**
   - Click "Advanced" → "Add Environment Variable"
   - Key: `FRONTEND_URL`
   - Value: `https://chaitanyaattanti.github.io/MAHA-EV-DASHBOARD`

6. **Click "Create Web Service"**
   - Wait 2-3 minutes for deployment
   - Copy your backend URL (e.g., `https://maha-ev-backend.onrender.com`)

### Option B: Via Render Blueprint (Automated)

Create `render.yaml` in your project root (already done):
```yaml
services:
  - type: web
    name: maha-ev-backend
    env: node
    rootDir: backend
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: FRONTEND_URL
        value: https://chaitanyaattanti.github.io/MAHA-EV-DASHBOARD
```

Then:
1. Go to https://dashboard.render.com/blueprints
2. Connect your GitHub repo
3. Apply blueprint

---

## Step 2: Deploy Frontend to GitHub Pages

### Quick Method (Recommended):

1. **Update frontend config with your backend URL:**
   ```bash
   cd frontend
   echo "VITE_API_URL=https://your-backend-url.onrender.com" > .env.production
   ```

2. **Deploy to GitHub Pages:**
   ```bash
   npm run deploy
   ```

That's it! Your frontend will be live at:
`https://chaitanyaattanti.github.io/MAHA-EV-DASHBOARD`

### Manual Method:

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Push to gh-pages branch:**
   ```bash
   git add dist -f
   git commit -m "Deploy to GitHub Pages"
   git subtree push --prefix frontend/dist origin gh-pages
   ```

3. **Enable GitHub Pages:**
   - Go to your repo → Settings → Pages
   - Source: Deploy from branch
   - Branch: `gh-pages` / `root`
   - Save

---

## Step 3: Update Backend CORS (After Frontend Deployment)

Once your frontend is live, update the backend environment variable:

1. Go to Render dashboard → Your service → Environment
2. Update `FRONTEND_URL` to: `https://chaitanyaattanti.github.io/MAHA-EV-DASHBOARD`
3. Save changes (triggers auto-redeploy)

---

## Complete Deployment Commands

```bash
# 1. Deploy Backend to Render (via dashboard or blueprint)
#    Get your backend URL: https://your-app.onrender.com

# 2. Configure Frontend
cd /Users/chaitanyaattanti/version-2/MAHA-EV-DASHBOARD/frontend
echo "VITE_API_URL=https://your-backend-url.onrender.com" > .env.production

# 3. Deploy Frontend to GitHub Pages
npm run deploy

# Done! ✅
```

---

## Your Live URLs

- **Frontend:** https://chaitanyaattanti.github.io/MAHA-EV-DASHBOARD
- **Backend:** https://your-app-name.onrender.com

---

## Important Notes

### GitHub Pages
- ✅ 100% free forever
- ✅ Automatic HTTPS
- ✅ Fast CDN delivery
- ⏱️ Updates in 2-3 minutes

### Render Free Tier
- ✅ 750 hours/month (enough for 24/7)
- ✅ Auto-deploy from GitHub
- ⚠️ Spins down after 15 min inactivity
- ⚠️ First request takes 30-60 seconds (cold start)

### Cold Start Fix
To keep backend always active, you can:
1. Use a free uptime monitor (e.g., UptimeRobot)
2. Ping your backend every 10 minutes
3. Upgrade to Render paid plan ($7/month for always-on)

---

## Troubleshooting

### Frontend shows blank page
- Check browser console for errors
- Verify `VITE_API_URL` in `.env.production`
- Make sure GitHub Pages is enabled

### CORS errors
- Verify `FRONTEND_URL` in Render matches your GitHub Pages URL
- Include `/MAHA-EV-DASHBOARD` in the path

### Backend not responding
- Render free tier spins down after 15 min
- First request will be slow (cold start)
- Check Render logs for errors

---

## Alternative: Deploy Script

Run the automated deployment script:

```bash
chmod +x deploy.sh
./deploy.sh
```

This script will:
1. Guide you through Render setup
2. Automatically configure frontend
3. Build and deploy to GitHub Pages

---

## Updating Your Deployment

### Update Frontend:
```bash
cd frontend
npm run deploy
```

### Update Backend:
Just push to GitHub - Render auto-deploys!
```bash
git add .
git commit -m "Update backend"
git push origin main
```

---

## Cost Breakdown

| Service | Free Tier | Your Usage | Cost |
|---------|-----------|------------|------|
| GitHub Pages | Unlimited | Static site | $0 |
| Render | 750 hrs/month | ~720 hrs | $0 |
| **Total** | | | **$0/month** |

🎉 **Completely free hosting!**
