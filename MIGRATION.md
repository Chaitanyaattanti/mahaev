# Migration to Hardcoded Datasets

## Summary of Changes

This version removes the MySQL database dependency and uses hardcoded datasets instead.

## What Was Removed

1. **Database Connection** (`backend/db.js`) - MySQL connection pool configuration
2. **MySQL Dependency** - `mysql2` package removed from `package.json`
3. **Database Files**:
   - `database_backup.sql` - Database schema and data
   - `update_descriptions.sql` - SQL update script
   - `update_urls.sql` - SQL update script

## What Was Modified

### backend/server.js
- Removed `require("./db")` import
- Removed database query logic
- Added hardcoded `datasets` array with 4 datasets:
  1. LG 18650HG2 Li-ion Battery Data
  2. Mechanically Induced Thermal Runaway
  3. Mechanically Induced Thermal Runaway (V1)
  4. CALCE Battery Data
- Simplified `/datasets` endpoint to return hardcoded array

### backend/package.json
- Removed `mysql2` dependency

## Benefits

✅ **Simpler Deployment** - No database setup required  
✅ **Faster** - No database queries, instant response  
✅ **Lower Cost** - No database hosting needed  
✅ **Easier Maintenance** - Edit datasets directly in code  
✅ **No Connection Issues** - No database connectivity problems  

## How to Update Datasets

To add, remove, or modify datasets, edit the `datasets` array in `backend/server.js`:

```javascript
const datasets = [
  {
    dataset_name: "Dataset Name",
    dataset_description: "Detailed description...",
    dataset_source: "Source citation",
    dataset_url: "https://download-link.com"
  },
  // Add more datasets here
];
```

## Environment Variables No Longer Needed

You can remove these from your `.env` files:
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`

## Environment Variables Still Needed

**Backend:**
- `PORT` - Server port (default: 3000)
- `FRONTEND_URL` - Frontend URL for CORS (default: http://localhost:5173)

**Frontend:**
- `VITE_API_URL` - Backend API URL

## Testing

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Start server:
   ```bash
   npm start
   ```

3. Test endpoint:
   ```bash
   curl http://localhost:3000/datasets
   ```

Expected response: JSON array with 4 datasets

## Rollback Instructions

If you need to revert to the MySQL version:

1. Restore files from git history:
   - `backend/db.js`
   - `database_backup.sql`
   
2. Add `mysql2` back to dependencies:
   ```bash
   npm install mysql2
   ```

3. Restore original `server.js` logic from git history

4. Set up MySQL database and import `database_backup.sql`

5. Configure database environment variables
