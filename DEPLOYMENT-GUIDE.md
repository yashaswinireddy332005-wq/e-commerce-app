# 🚀 Deployment Guide - MERN E-Commerce App

## Overview

Your project is now on GitHub. To get it live like the reference link, you need:

1. **Frontend** → GitHub Pages / Vercel / Netlify (Port 3000)
2. **Backend** → Render / Heroku / Railway (Port 8000)
3. **Database** → MongoDB Atlas (Cloud)

---

## Quick Deployment Options

### Option A: Deploy on Vercel (RECOMMENDED ⭐)

**Fastest & Easiest Setup**

#### Frontend Deployment:

1. **Go to Vercel.com** → Sign in with GitHub
2. **Click "New Project"**
3. **Select your GitHub repo**: `e-commerce-app`
4. **Configure**:
   - Framework Preset: `Create React App`
   - Root Directory: `.` (root)
   - Build Command: `npm run build`
   - Output Directory: `build`

5. **Environment Variables**:
   ```
   REACT_APP_API_BASE_URL=https://your-backend-url.com/api
   REACT_APP_API_USE_PROXY=false
   ```

6. **Deploy** → You'll get a live URL like:
   ```
   https://e-commerce-app-xyz.vercel.app
   ```

#### Backend Deployment:

1. **Go to Render.com** → Connect GitHub
2. **Create New → Web Service**
3. **Select repo**: `e-commerce-app`
4. **Configure**:
   - Name: `e-commerce-backend`
   - Environment: `Node`
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Root Directory: leave blank

5. **Environment Variables** (add these):
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   JWT_SECRET=your-secret-key-here
   PORT=8000
   ```

6. **Deploy** → Gets URL like:
   ```
   https://e-commerce-backend-xyz.onrender.com
   ```

---

### Option B: GitHub Pages + Render

**Free Frontend Hosting**

#### Frontend → GitHub Pages:

1. **Update `package.json`**:
   ```json
   {
     "homepage": "https://yashaswinireddy332005-wq.github.io/e-commerce-app/",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     },
     "devDependencies": {
       "gh-pages": "^5.0.0"
     }
   }
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **In GitHub repo settings**:
   - Go to Settings → Pages
   - Source: Deploy from branch (main/master)
   - Branch: gh-pages

5. **Get live URL**: `https://yashaswinireddy332005-wq.github.io/e-commerce-app/`

#### Backend → Render (same as Option A)

---

### Option C: Docker + Cloud

**For Production Scale**

1. **Build Docker image**:
   ```bash
   docker-compose build
   docker-compose up
   ```

2. **Push to Docker Hub**:
   ```bash
   docker tag e-commerce-app your-username/e-commerce-app
   docker push your-username/e-commerce-app
   ```

3. **Deploy to**:
   - **Railway.app** (simple)
   - **AWS ECS** (enterprise)
   - **DigitalOcean App Platform**

---

## Environment Variables Setup

### Frontend (.env.local or .env)

```env
REACT_APP_API_BASE_URL=https://your-backend-url.com/api
REACT_APP_API_USE_PROXY=false
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Backend (.env)

```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your-super-secret-key-123

# Server
PORT=8000
NODE_ENV=production

# Vector Databases
PINECONE_API_KEY=your-pinecone-key
PINECONE_INDEX_NAME=products

# Stripe (if using payments)
STRIPE_SECRET_KEY=sk_live_xxxxx

# Google AI
GOOGLE_AI_KEY=your-google-ai-key

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-password
```

---

## MongoDB Atlas Setup (Cloud Database)

**Already Done! But here's the steps:**

1. **Go to MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
2. **Create Free Cluster**
3. **Create Database User** with password
4. **Get Connection String**:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```
5. **Add to backend .env**:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

✅ Your MongoDB is already set up locally on `localhost:27017`

---

## Step-by-Step: Deploy to Vercel + Render

### Step 1: Prepare Project

```bash
# Ensure you're in project root
cd MERN-Stack-Ecommerce-App

# Commit all changes
git add .
git commit -m "Ready for deployment"
git push origin master
```

### Step 2: Get MongoDB Connection String

```bash
# If using local MongoDB:
localhost:27017

# If using MongoDB Atlas (cloud):
mongodb+srv://user:password@cluster.mongodb.net/ecommerce
```

### Step 3: Deploy Backend to Render

1. Go to **Render.com**
2. Sign in with GitHub
3. **New → Web Service**
4. Select `e-commerce-app` repo
5. Fill in:
   - **Name**: `e-commerce-api`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

6. Add **Environment Variables**:
   ```
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=generate-a-random-secret-key
   PORT=8000
   NODE_ENV=production
   PINECONE_API_KEY=your-key
   GOOGLE_AI_KEY=your-key
   ```

7. Click **Deploy**
8. Wait 3-5 minutes, get your backend URL:
   ```
   https://e-commerce-api-xyz.onrender.com
   ```

### Step 4: Deploy Frontend to Vercel

1. Go to **Vercel.com**
2. Sign in with GitHub
3. **Add New → Project**
4. Select `e-commerce-app` repo
5. **Override** settings:
   - Root Directory: `.` (root)
   - Build Command: `npm run build`
   - Output Directory: `build`

6. Add **Environment Variables**:
   ```
   REACT_APP_API_BASE_URL=https://e-commerce-api-xyz.onrender.com/api
   REACT_APP_API_USE_PROXY=false
   ```

7. Click **Deploy**
8. Get your frontend URL:
   ```
   https://e-commerce-app-xyz.vercel.app
   ```

### Step 5: Update Backend API URL (if using GitHub Pages)

If deploying frontend to GitHub Pages instead of Vercel:

```bash
# Update package.json
"homepage": "https://yashaswinireddy332005-wq.github.io/e-commerce-app/"

# Install gh-pages
npm install --save-dev gh-pages

# Update scripts in package.json
"predeploy": "npm run build && cp -r build/* public/",
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

---

## Accessing Your Live App

After deployment:

**Frontend**: 
```
https://e-commerce-app-xyz.vercel.app
or
https://yashaswinireddy332005-wq.github.io/e-commerce-app/
```

**Backend API**:
```
https://e-commerce-api-xyz.onrender.com/api
```

**Database**: 
```
MongoDB Atlas (Cloud)
```

---

## Testing Deployment

### 1. Test Frontend is Live
```
Open: https://your-frontend-url
Should see: E-commerce homepage with products
```

### 2. Test Backend API
```
curl https://your-backend-url/api/products

Should return: JSON array of products
```

### 3. Test Full Flow
```
1. Open frontend URL
2. Register/Login
3. Add to cart
4. Check MongoDB Atlas dashboard → ecommerce.carts collection
5. Verify cart items appear!
```

---

## Troubleshooting

### "Cannot find module" error
```bash
# Make sure backend dependencies are installed
cd backend && npm install
```

### "MongoNetworkError"
```
• Check MONGO_URI is correct
• Verify MongoDB Atlas IP whitelist (allow 0.0.0.0/0)
• Check database user credentials
```

### "CORS errors"
```
Update backend index.js:
app.use(cors({
  origin: 'https://your-frontend-url',
  credentials: true
}))
```

### Frontend can't reach backend
```
• Verify REACT_APP_API_BASE_URL env var
• Check backend is running (check Render logs)
• Ensure backend URL is correct
```

---

## Reference Deployment

Your target look like:
```
https://yashaswinireddy332005-wq.github.io/e-commerce-app/?v=5c24744#/shop
```

Breaking it down:
- `yashaswinireddy332005-wq.github.io` = GitHub username
- `/e-commerce-app/` = GitHub Pages path
- `?v=5c24744` = Cache-busting version
- `#/shop` = Hash routing (React Router)

Your deployed version will look like:
```
https://e-commerce-app-xyz.vercel.app/#/shop
or
https://yashaswinireddy332005-wq.github.io/e-commerce-app/#/shop
```

---

## Next Steps

1. ✅ **Push code to GitHub** (Done!)
2. 🔧 **Set up MongoDB Atlas** (if not using local)
3. 🚀 **Deploy backend to Render**
4. 🎨 **Deploy frontend to Vercel**
5. ✨ **Test live deployment**
6. 🎉 **Share your app!**

**Total time**: 15-20 minutes

---

## Support

If you need help:
1. Check Render/Vercel logs for errors
2. Verify environment variables
3. Check MongoDB connection string
4. Ensure API endpoint is correct in frontend

**Good luck deploying! 🚀**
