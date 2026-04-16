// Environment-aware API URL configuration
// Production: Use environment variable or deployed backend
// Development: Use localhost
const isProduction = import.meta.env.MODE === 'production' && window.location.hostname !== 'localhost';

export const API_URL = import.meta.env.VITE_API_URL || 
  (isProduction ? 'https://maha-ev-backend.onrender.com' : 'http://localhost:3000');
