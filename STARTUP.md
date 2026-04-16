# 🚀 MAHA-EV Dashboard - Startup Guide

## Prerequisites
- Node.js installed
- Both `backend/` and `frontend/` have `node_modules` installed

## Starting the Application

### Option 1: Start Both Servers Manually (Recommended for Development)

**Terminal 1 - Backend Server (Port 3000):**
```bash
cd backend
node server.js
# You should see: 🚀 Server running at http://localhost:3000
```

**Terminal 2 - Frontend Dev Server (Port 5173):**
```bash
cd frontend
npm run dev
# You should see: ➜  Local:   http://localhost:5173/mahaev/
```

### Option 2: Verify Servers Are Running
Check that both are accessible:
```bash
# Backend health check
curl http://localhost:3000/health

# Frontend check
curl http://localhost:5173/mahaev/
```

## Troubleshooting

### ❌ "No datasets available" message on Datasets page
- **Cause**: Backend server is not running
- **Fix**: Start backend with `node server.js` in the `backend/` directory

### ❌ Cannot connect to backend API
- **Cause**: Backend running on wrong port or frontend config incorrect
- **Check**: 
  - Backend should be on `http://localhost:3000`
  - Frontend config in [frontend/src/config.js](frontend/src/config.js) should have `API_URL = 'http://localhost:3000'`

### ❌ Frontend not loading
- **Cause**: Frontend dev server not running
- **Fix**: Start with `npm run dev` in the `frontend/` directory

## Application URLs

After both servers are running:
- **Frontend**: http://localhost:5173/mahaev/
- **Backend API**: http://localhost:3000
- **Datasets API**: http://localhost:3000/datasets
- **Battery Predictor API**: http://localhost:3000/predict

## Common Ports Used
- **3000**: Node.js Backend Server
- **5173**: Vite Frontend Dev Server
- **5000**: Flask Chatbot API (alternative, not used by default)

---

**Remember**: Always start the **backend first**, then the **frontend** for best results.
