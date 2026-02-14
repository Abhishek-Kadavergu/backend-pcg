# Deploy Backend to Render

This guide will help you deploy the backend-pcg Node.js/Express application to Render.

## Prerequisites

1. A [Render account](https://render.com) (free tier available)
2. Your backend code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. MongoDB connection URI (MongoDB Atlas or other cloud MongoDB service)

## Environment Variables

You'll need to set these environment variables in Render:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:password@cluster.mongodb.net/dbname` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secret-token-here` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | `your-google-client-id.apps.googleusercontent.com` |
| `PORT` | Server port (auto-set by Render) | `10000` |

## Deployment Methods

### Method 1: Using Render Dashboard (Recommended)

1. **Log in to Render**
   - Go to [https://dashboard.render.com](https://dashboard.render.com)
   - Sign in with your GitHub/GitLab account

2. **Create a New Web Service**
   - Click "New +" button
   - Select "Web Service"

3. **Connect Your Repository**
   - Connect your Git account if not already connected
   - Select the repository containing your backend code
   - Select the `backend-pcg` directory or root if this is a standalone repo

4. **Configure the Service**
   - **Name**: `backend-pcg` (or your preferred name)
   - **Environment**: `Node`
   - **Region**: Choose closest to your users
   - **Branch**: `main` or `srujan` (whichever you want to deploy)
   - **Root Directory**: `backend-pcg` (if deploying from a monorepo)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. **Set Environment Variables**
   Click "Advanced" and add these environment variables:
   ```
   MONGO_URI=mongodb+srv://periketiviveksai04:UzHIlhpGyuRAo1kR@media.red0g.mongodb.net/hackathon?retryWrites=true&w=majority&appName=media
   JWT_SECRET=mysecrettoken18
   GOOGLE_CLIENT_ID=571075156881-i9isam8en6nbraglr1lk34a6j2rqi55u.apps.googleusercontent.com
   ```

6. **Choose Plan**
   - Select "Free" plan for testing
   - Note: Free tier services spin down after 15 minutes of inactivity

7. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - You'll get a URL like: `https://backend-pcg.onrender.com`

### Method 2: Using render.yaml (Infrastructure as Code)

1. The `render.yaml` file is already created in your backend-pcg directory

2. **Create a Blueprint**
   - Go to Render Dashboard
   - Click "New +" → "Blueprint"
   - Connect your repository
   - Render will automatically detect the `render.yaml` file

3. **Set Secret Environment Variables**
   - In the Blueprint setup, you'll be prompted to add:
     - `MONGO_URI`
     - `JWT_SECRET`
     - `GOOGLE_CLIENT_ID`

4. **Deploy**
   - Click "Apply" to deploy
   - Future updates will auto-deploy when you push to your branch

## Post-Deployment

### Get Your Backend URL
After deployment, Render provides a URL like:
```
https://backend-pcg.onrender.com
```

### Update Frontend Configuration
Update your frontend ([pcg_frontend](../pcg_frontend)) to use the Render backend URL:

1. Open `pcg_frontend/.env.local` or configuration file
2. Update the API URL:
   ```
   NEXT_PUBLIC_API_URL=https://backend-pcg.onrender.com
   ```

### Test Your Deployment
```bash
# Health check (if you have one)
curl https://backend-pcg.onrender.com/

# Test auth endpoint
curl https://backend-pcg.onrender.com/api/auth/health
```

## Continuous Deployment

Render automatically redeploys when you push to your connected branch:

```bash
git add .
git commit -m "Update backend"
git push origin main
```

## Monitoring

1. **View Logs**
   - Go to your service in Render Dashboard
   - Click "Logs" tab to see real-time logs

2. **Metrics**
   - View CPU, Memory usage in the "Metrics" tab

3. **Events**
   - Check deployment history in "Events" tab

## Common Issues

### Issue: Build Fails
**Solution**: Check that all dependencies are in `package.json`
```bash
npm install
npm start  # Test locally first
```

### Issue: MongoDB Connection Fails
**Solution**: 
- Verify MONGO_URI is correct
- Check MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Ensure MongoDB user has proper permissions

### Issue: Service Unavailable (503)
**Solution**: 
- Free tier spins down after inactivity
- First request takes 30-60 seconds to wake up
- Consider upgrading to paid plan for always-on service

### Issue: CORS Errors
**Solution**: Update CORS configuration in `app.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

## Scaling

### Upgrade from Free Tier
- Free tier: 0.1 CPU, 512MB RAM
- Starter: $7/mo - Always on, more resources
- Standard: $25/mo - Dedicated resources

### Environment-Specific Deploys
Create multiple services for different environments:
- `backend-pcg-dev` (development)
- `backend-pcg-staging` (staging)
- `backend-pcg-prod` (production)

## Security Best Practices

1. **Never commit .env file**
   - Already in `.gitignore`
   - Always set secrets in Render Dashboard

2. **Rotate Secrets Regularly**
   - Update JWT_SECRET periodically
   - Use strong, random values

3. **MongoDB Security**
   - Use strong passwords
   - Limit IP whitelist when possible
   - Enable MongoDB audit logs

## Support

- Render Docs: https://render.com/docs
- Community: https://community.render.com
- Status: https://status.render.com

## Next Steps

1. Deploy frontend to Vercel/Netlify
2. Set up custom domain
3. Enable HTTPS (automatic on Render)
4. Set up monitoring and alerts
5. Configure backup strategy for MongoDB
