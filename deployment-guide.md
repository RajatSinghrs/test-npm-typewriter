# Local Development & Manual Deployment Guide

## Getting the Code Locally

### Method 1: Download from Replit
1. In your Replit project, click the three dots menu
2. Select "Download as zip"
3. Extract the zip file on your local machine

### Method 2: Git Clone (if connected to GitHub)
```bash
git clone <your-github-repo-url>
cd typewriter-testing-suite
```

## Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
- Server runs on `http://localhost:5000`
- Hot reload enabled for development

## Manual Deployment Options

### Option 1: Netlify (Static Site)
1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist/public` folder
   - Configure redirects for SPA: Create `_redirects` file with `/* /index.html 200`

### Option 2: Vercel (Static Site)
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   npm run build
   vercel --prod
   ```

### Option 3: Railway (Full Stack)
1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Deploy**
   ```bash
   railway login
   railway init
   railway up
   ```

3. **Configure Environment**
   ```bash
   railway variables set NODE_ENV=production
   ```

### Option 4: Render (Full Stack)
1. **Connect to Render**
   - Go to [render.com](https://render.com)
   - Connect your GitHub repo or upload files

2. **Configure Build**
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Environment: `NODE_ENV=production`

### Option 5: DigitalOcean App Platform
1. **Create App**
   - Go to DigitalOcean App Platform
   - Connect repository or upload

2. **Configure**
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - Environment Variables: `NODE_ENV=production`

### Option 6: AWS EC2 (VPS)
1. **Launch EC2 Instance**
   ```bash
   # Connect to instance
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

2. **Setup Environment**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs nginx pm2
   ```

3. **Deploy Application**
   ```bash
   # Upload files (use scp or git)
   scp -i your-key.pem -r . ubuntu@your-instance-ip:/var/www/typewriter-testing/
   
   # Install and build
   cd /var/www/typewriter-testing/
   npm install
   npm run build
   
   # Start with PM2
   pm2 start npm --name "typewriter-testing" -- start
   pm2 startup
   pm2 save
   ```

4. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/sites-available/typewriter-testing
   ```
   
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```
   
   ```bash
   sudo ln -s /etc/nginx/sites-available/typewriter-testing /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Option 7: Docker Deployment
1. **Build Docker Image**
   ```bash
   docker build -t typewriter-testing .
   ```

2. **Run Container**
   ```bash
   docker run -p 3000:3000 typewriter-testing
   ```

3. **Using Docker Compose**
   ```bash
   docker-compose up -d
   ```

## Environment Variables

Set these for production deployment:
```bash
NODE_ENV=production
PORT=3000  # or your preferred port
```

## Verification After Deployment

1. **Check Application Health**
   - Visit your deployed URL
   - Verify all sections load correctly
   - Test typewriter animations work

2. **Test Key Features**
   - Basic functionality tests
   - Method testing panel
   - Performance monitoring
   - Export functionality

3. **Monitor Performance**
   - Check server logs
   - Monitor resource usage
   - Test under load

## Troubleshooting

### Common Issues
- **Build Fails**: Check Node.js version (18+)
- **Port Issues**: Ensure PORT environment variable is set
- **Package Errors**: Run `npm install typewriter-text-effect`
- **CORS Issues**: Configure proper headers for API calls

### Support
- Check browser console for JavaScript errors
- Verify all dependencies are installed
- Ensure production environment variables are set
- Test locally before deploying