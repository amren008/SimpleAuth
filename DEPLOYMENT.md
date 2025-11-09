# Deployment Guide

This guide will help you deploy SimpleAuth to production.

## Architecture

- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Render PostgreSQL

## Prerequisites

- GitHub account
- Vercel account (sign up at vercel.com)
- Render account (sign up at render.com)

---

## Step 1: Deploy Database on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `simpleauth-db`
   - **Database**: `authdb`
   - **User**: `postgres` (auto-generated)
   - **Region**: Choose closest to you
   - **Plan**: **Free**
4. Click **"Create Database"**
5. Wait for database to be ready
6. **Copy the Internal Database URL** (starts with `postgresql://`)

---

## Step 2: Deploy Backend on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `amren008/SimpleAuth`
4. Configure:

   **Basic Settings:**
   - **Name**: `simpleauth-api`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `api`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: **Free**

5. **Environment Variables** - Click "Advanced" and add:

   ```
   PORT=3000
   NODE_ENV=production
   DATABASE_URL=<paste-internal-database-url-from-step-1>
   JWT_SECRET=<generate-random-string-here>
   FRONTEND_URL=<your-vercel-url>
   ```

   To generate JWT_SECRET, you can use:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

6. Click **"Create Web Service"**
7. Wait for deployment to complete
8. **Copy your backend URL** (e.g., `https://simpleauth-api.onrender.com`)

---

## Step 3: Initialize Database Schema

After backend is deployed, you need to create the users table:

1. Go to your Render database dashboard
2. Click **"Connect"** → Copy the **PSQL Command**
3. Run in your terminal:
   ```bash
   psql <paste-connection-string-here>
   ```

4. Create the users table:
   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     username VARCHAR(255) UNIQUE NOT NULL,
     email VARCHAR(255) UNIQUE NOT NULL,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

5. Verify table creation:
   ```sql
   \dt
   SELECT * FROM users;
   ```

6. Exit: `\q`

---

## Step 4: Update Frontend Environment Variables

1. Go to your Vercel dashboard
2. Select your SimpleAuth project
3. Go to **Settings** → **Environment Variables**
4. Add:
   ```
   VITE_API_URL=<your-render-backend-url>
   ```
   Example: `VITE_API_URL=https://simpleauth-api.onrender.com`

5. **Redeploy** your frontend:
   - Go to **Deployments** tab
   - Click on the latest deployment
   - Click **"Redeploy"**

---

## Step 5: Update Frontend Code (Local)

Update the API URL in your frontend code:

1. Edit `web/src/api/auth.ts`:
   ```typescript
   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
   ```

2. Commit and push:
   ```bash
   git add .
   git commit -m "Update API URL for production"
   git push
   ```

Vercel will automatically redeploy.

---

## Step 6: Update CORS Configuration

Make sure your backend allows your Vercel frontend URL:

1. The CORS configuration in `api/src/index.ts` already includes:
   ```typescript
   const allowedOrigins = [
     "http://localhost:5173",
     process.env.FRONTEND_URL || "https://simple-auth-wheat.vercel.app",
   ];
   ```

2. Ensure `FRONTEND_URL` environment variable in Render matches your actual Vercel URL

---

## Step 7: Test Your Deployment

1. Visit your Vercel frontend URL
2. Try signing up with a new account
3. Log in with your credentials
4. Access the dashboard
5. Test logout functionality

---

## Troubleshooting

### Backend Issues

**Check Render Logs:**
1. Go to Render dashboard
2. Select your web service
3. Click "Logs" tab

**Common Issues:**
- Database connection error: Check `DATABASE_URL` is correct
- CORS errors: Verify `FRONTEND_URL` matches your Vercel URL
- Build fails: Check `api/package.json` has correct build script

### Frontend Issues

**Check Vercel Logs:**
1. Go to Vercel dashboard
2. Select deployment
3. Click "View Function Logs"

**Common Issues:**
- API errors: Verify `VITE_API_URL` is set correctly
- CORS errors: Check backend CORS configuration

### Database Issues

**Connect to database:**
```bash
psql <connection-string>
```

**Check tables:**
```sql
\dt
```

**Check users:**
```sql
SELECT * FROM users;
```

---

## Free Tier Limitations

**Render Free Tier:**
- Backend sleeps after 15 minutes of inactivity
- First request after sleep may take 30-60 seconds
- 750 hours/month free
- 500 MB database storage

**Vercel Free Tier:**
- 100 GB bandwidth/month
- Unlimited deployments
- Automatic HTTPS

---

## Production URLs

After deployment, your URLs will be:

- **Frontend**: `https://<your-project>.vercel.app`
- **Backend**: `https://simpleauth-api.onrender.com`
- **Database**: Internal to Render

---

## Monitoring

**Render:**
- View logs in real-time
- Monitor resource usage
- Check deployment status

**Vercel:**
- Analytics dashboard
- Deployment history
- Performance metrics

---

## Future Improvements

1. Add custom domain name
2. Set up monitoring and alerts
3. Implement rate limiting
4. Add database backups
5. Set up CI/CD pipeline
6. Upgrade to paid tiers for better performance

---

## Support

For issues:
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- GitHub Issues: https://github.com/amren008/SimpleAuth/issues
