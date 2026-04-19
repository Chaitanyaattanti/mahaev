# Production Setup Guide

## Current Deployment Status

| Component | Location | Status |
|-----------|----------|--------|
| **Frontend** | https://chaitanyaattanti.github.io/mahaev/ | ✅ GitHub Pages |
| **Backend** | https://maha-ev-backend.onrender.com | ✅ Render (Free Tier) |
| **Datasets** | Fallback + API | ✅ Auto-failover |

---

## How It Works Now

### Flow:
1. User visits GitHub Pages frontend
2. Frontend tries to fetch datasets from Render backend (15s timeout)
3. **If Render responds** → Show real datasets from API
4. **If Render times out/offline** → Show fallback datasets (hardcoded)
5. **Users always see datasets** ✅

---

## Render Backend Issues

### Problem: Free Tier Spins Down
Render's free tier automatically stops after **15 minutes of inactivity** and takes ~30s to wake up.

### Solutions (in order of effort):

#### **Option 1: Keep It Awake (FREE)** ✅ Recommended
Add a cron job to ping the backend every 10 minutes:

```bash
# Add to your laptop cron (crontab -e):
*/10 * * * * curl -s https://maha-ev-backend.onrender.com/ > /dev/null 2>&1
```

Or use a free service like **Uptime Robot**:
- Visit: https://uptimerobot.com/
- Add monitor for: `https://maha-ev-backend.onrender.com/`
- Interval: 5 minutes
- Keep-alive: Yes

#### **Option 2: Upgrade Render Plan** ($7/month)
- Upgrade to **Paid Plan** to remove auto-sleep
- Backend always responsive
- Better performance

#### **Option 3: Current Setup (Hybrid)**
- Keep Render backend running (may sleep)
- Frontend will use fallback datasets when offline
- Users won't see errors, just cached data

---

## Updating Code

### Frontend Changes
```bash
cd frontend
npm run build
cd ..
git add frontend/dist
git commit -m "deploy: update frontend"
git push
```
Changes live within **2-3 minutes** on GitHub Pages.

### Backend Changes
Just push to your Render repository. Render auto-deploys on push.

---

## Monitoring

### Check if Backend is Running:
```bash
curl https://maha-ev-backend.onrender.com/datasets
```

Should return JSON with 10 datasets.

### Check Frontend:
```bash
curl https://chaitanyaattanti.github.io/mahaev/datasets | grep "dataset_name" | head -1
```

---

## Debug Console

Open browser DevTools (F12) → Console tab to see:
- `✅ Datasets loaded from API` = Backend working
- `⚠️ Failed to load datasets from backend` = Using fallback

---

## Important Notes

✅ **Frontend is always reliable** - Never goes down (GitHub Pages)
⚠️ **Backend may sleep** - Render free tier auto-stops
✅ **Fallback always works** - Users never see "No datasets"
✅ **No broken state** - Graceful degradation

**You're all set! No need to run anything locally.** 🚀
