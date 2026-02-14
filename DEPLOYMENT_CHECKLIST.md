# Backend Deployment Checklist

Use this checklist to ensure smooth deployment to Render.

## Pre-Deployment Checklist

### Code & Configuration
- [ ] All code committed and pushed to Git repository
- [ ] `.env` file is NOT committed (check `.gitignore`)
- [ ] `.env.example` exists with all required variables
- [ ] `package.json` has correct `start` script
- [ ] Dependencies are up to date (`npm install`)
- [ ] Code runs locally without errors (`npm start`)

### Database
- [ ] MongoDB database is set up (MongoDB Atlas recommended)
- [ ] MongoDB allows connections from anywhere (0.0.0.0/0) for Render
- [ ] Database user has read/write permissions
- [ ] MONGO_URI is ready to use

### Environment Variables
Prepare these values (you'll need them in Render):
- [ ] `MONGO_URI` - Your MongoDB connection string
- [ ] `JWT_SECRET` - A strong random secret (32+ characters)
- [ ] `GOOGLE_CLIENT_ID` - Your Google OAuth client ID
- [ ] `PORT` - Will be set by Render (10000)

### Repository
- [ ] Code is in GitHub, GitLab, or Bitbucket
- [ ] Repository is accessible to Render
- [ ] Branch to deploy is identified (e.g., `main` or `srujan`)

## Deployment Steps

### 1. Create Render Account
- [ ] Sign up at https://render.com
- [ ] Verify email address
- [ ] Connect GitHub/GitLab account

### 2. Create Web Service
- [ ] Click "New +" → "Web Service"
- [ ] Select your repository
- [ ] Choose correct branch

### 3. Configure Service
Fill in these settings:
- [ ] **Name**: `backend-pcg` (or your choice)
- [ ] **Environment**: `Node`
- [ ] **Region**: Choose closest to users
- [ ] **Root Directory**: `backend-pcg` (if monorepo) or leave empty
- [ ] **Build Command**: `npm install`
- [ ] **Start Command**: `npm start`
- [ ] **Plan**: Free (or paid for production)

### 4. Set Environment Variables
Add these in the "Environment" section:
- [ ] `MONGO_URI` = (your MongoDB connection string)
- [ ] `JWT_SECRET` = (your secret token)
- [ ] `GOOGLE_CLIENT_ID` = (your Google client ID)

### 5. Deploy
- [ ] Click "Create Web Service"
- [ ] Wait for build to complete (5-10 minutes)
- [ ] Check logs for any errors

## Post-Deployment Checklist

### Verify Deployment
- [ ] Service shows as "Live" in Render dashboard
- [ ] No errors in the logs
- [ ] Copy the service URL (e.g., `https://backend-pcg.onrender.com`)

### Test API
Test these endpoints (replace URL with yours):

```bash
# Basic health check
curl https://backend-pcg.onrender.com/

# Test auth endpoint
curl https://backend-pcg.onrender.com/api/auth/health
```

- [ ] API responds successfully
- [ ] No 500 errors
- [ ] MongoDB connection works

### Update Frontend
- [ ] Update frontend `.env` with new backend URL
- [ ] Test frontend → backend connection
- [ ] Test login functionality
- [ ] Test ticket creation

### CORS Configuration
If you get CORS errors:
- [ ] Update `app.js` with frontend URL
- [ ] Redeploy backend
- [ ] Clear browser cache and test again

## Monitoring Setup

### Render Dashboard
- [ ] Bookmark your service URL
- [ ] Set up log monitoring
- [ ] Review metrics (CPU, Memory)
- [ ] Check deployment events

### Optional: Set Up Alerts
- [ ] Configure email notifications for failures
- [ ] Set up uptime monitoring (e.g., UptimeRobot)
- [ ] Create status page for users

## Troubleshooting

### If Build Fails
1. Check Render logs for error message
2. Verify `package.json` is correct
3. Test build locally: `npm install && npm start`
4. Check Node version compatibility

### If Service Won't Start
1. Check environment variables are set correctly
2. Verify MONGO_URI is accessible
3. Check MongoDB Atlas IP whitelist
4. Review startup logs in Render

### If API Returns 500 Errors
1. Check Render logs for error details
2. Verify MongoDB connection
3. Check all environment variables are set
4. Test database queries

### If Frontend Can't Connect
1. Verify frontend has correct backend URL
2. Check CORS settings in `app.js`
3. Verify API endpoints are correct
4. Check browser console for errors

## Production Readiness

### Before Going Live
- [ ] Test all API endpoints
- [ ] Verify authentication works
- [ ] Test ticket CRUD operations
- [ ] Load test with expected traffic
- [ ] Set up database backups
- [ ] Configure logging and monitoring
- [ ] Review security settings
- [ ] Set up SSL (automatic on Render)

### Security Review
- [ ] All secrets are in environment variables
- [ ] JWT_SECRET is strong and unique
- [ ] MongoDB password is strong
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled (if needed)
- [ ] Input validation is working

### Performance
- [ ] Database indexes are created
- [ ] Query performance is acceptable
- [ ] Response times are reasonable
- [ ] Consider upgrading from free tier if needed

## Continuous Deployment

### Enable Auto-Deploy
- [ ] Push to branch triggers automatic deployment
- [ ] Test the auto-deploy process
- [ ] Set up staging environment (optional)

### Deployment Workflow
1. Make changes locally
2. Test thoroughly
3. Commit and push to Git
4. Render auto-deploys
5. Monitor logs for issues
6. Test deployed version

## Maintenance

### Regular Tasks
- [ ] Monitor error logs weekly
- [ ] Review performance metrics
- [ ] Update dependencies monthly
- [ ] Rotate secrets quarterly
- [ ] Backup database regularly
- [ ] Review and optimize queries

### Scaling Considerations
- [ ] Monitor free tier usage (750 hours/month)
- [ ] Plan for upgrade if traffic increases
- [ ] Consider horizontal scaling if needed
- [ ] Set up load balancing (for high traffic)

## Resources

- Render Docs: https://render.com/docs
- MongoDB Atlas: https://www.mongodb.com/atlas
- Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices

## Notes

Date deployed: __________
Deployed by: __________
Backend URL: __________
MongoDB cluster: __________
Plan: Free / Starter / Standard

---

✅ **Deployment Complete!** 

Your backend is now live and ready to serve your frontend application.
