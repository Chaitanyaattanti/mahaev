# MAHA EV Dashboard

A web application for displaying battery research datasets and information.

## Features

- Dataset browsing with detailed descriptions
- Download links for datasets
- Team information
- Contact page
- Deliverables section

## Architecture

### Backend
- **Framework**: Express.js
- **Data**: Hardcoded datasets (no database required)
- **Port**: 3000 (configurable via PORT env variable)

### Frontend
- **Framework**: React + Vite
- **Styling**: Inline CSS
- **Port**: 5173 (development)

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (optional):
   ```
   PORT=3000
   FRONTEND_URL=http://localhost:5173
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```
   VITE_API_URL=http://localhost:3000
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

## Datasets

The application includes 4 hardcoded datasets:

1. **LG 18650HG2 Li-ion Battery Data** - Comprehensive testing data from McMaster University
2. **Mechanically Induced Thermal Runaway** - Safety testing data examining thermal runaway behavior
3. **Mechanically Induced Thermal Runaway (V1)** - Initial version of thermal runaway data
4. **CALCE Battery Data** - Battery testing datasets from University of Maryland

To add or modify datasets, edit the `datasets` array in `backend/server.js`.

## Deployment

Both frontend and backend are configured for Railway deployment with `railway.json` files.

### Environment Variables for Production

**Backend:**
- `PORT` - Server port (default: 3000)
- `FRONTEND_URL` - Frontend URL for CORS

**Frontend:**
- `VITE_API_URL` - Backend API URL

## Project Structure

```
MAHA-EV-DASHBOARD/
├── backend/
│   ├── server.js           # Express server with hardcoded datasets
│   ├── package.json
│   └── railway.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Datasets.jsx
│   │   │   ├── Team.jsx
│   │   │   ├── Deliverables.jsx
│   │   │   └── Contact.jsx
│   │   ├── App.jsx
│   │   └── config.js
│   ├── package.json
│   └── railway.json
└── README.md
```

## API Endpoints

- `GET /` - API status and information
- `GET /datasets` - Get all datasets
- `GET /download/:filename` - Download local dataset files

## License

ISC
