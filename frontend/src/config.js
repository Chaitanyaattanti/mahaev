// Detect if accessing from production or local network
const getAPIUrl = () => {
  // Production: GitHub Pages domain
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    // For production, API should be deployed on a public server (will use fallback datasets if unavailable)
    return import.meta.env.VITE_API_URL || 'https://maha-ev-backend.onrender.com';
  }
  // Local development: use local network IP for mobile + desktop same link access
  return 'http://10.7.12.61:3000';
};

export const API_URL = getAPIUrl();
