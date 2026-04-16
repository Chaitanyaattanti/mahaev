// Detect if accessing from production or local network
const getAPIUrl = () => {
  // Production: GitHub Pages domain
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    // For production, API should be deployed on a public server
    // (Render URL must match your actual service URL)
    return import.meta.env.VITE_API_URL || 'https://mahaev.onrender.com';
  }
  // Local development: Try multiple URLs with fallback strategy
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Default to localhost for local development
  return 'http://localhost:3000';
};

export const API_URL = getAPIUrl();

// List of fallback API URLs to try if primary fails (for offline resilience)
export const FALLBACK_API_URLS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://mahaev.onrender.com'
];
