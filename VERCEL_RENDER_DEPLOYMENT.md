# Deployment Guide: Vercel & Render

## Project Confirmation

✅ **Backend**: Node.js / Express.js  
✅ **Frontend**: React 18  
✅ **Database**: MongoDB Atlas (Connected)

---

## 📋 Pre-Deployment Setup

### 1. Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Hotel booking application"
git branch -M main
git remote add origin https://github.com/PruthviAlva/hotel.git
git push -u origin main
```

### 2. Review Repository Structure

```
hotel/
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   ├── .env.example
│   ├── .env.production
│   └── render.yaml ✨
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── .env.example
│   ├── .env.production ✨
│   └── vercel.json ✨
│
└── README.md
```

### Files to Remove (Optional Cleanup)
- `setup.bat` - Not needed for deployed app
- `setup.sh` - Not needed for deployed app
- `SETUP.md` - Local setup guide (can keep for reference)
- `DEPLOYMENT.md` - Keep or remove based on preference
- `.github/` - If empty or not needed

---

## 🚀 BACKEND DEPLOYMENT (Render)

### Step 1: Connect Repository to Render

1. Go to [render.com](https://render.com)
2. Sign up / Log in with GitHub
3. Click **"New"** → **"Web Service"**
4. Connect your GitHub repository: `PruthviAlva/hotel`
5. Select **Branch**: `main`

### Step 2: Configure Backend Service

| Setting | Value |
|---------|-------|
| **Name** | `hotel-booking-api` |
| **Root Directory** | `backend` |
| **Runtime** | Node |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | Free (or Paid if preferred) |

### Step 3: Set Environment Variables

In Render Dashboard → Service Settings → Environment Variables:

```
MONGODB_URI=mongodb+srv://alvapruthvi_db_user:pUHw9mzTb52ddXtM@cluster0.6dtg6zy.mongodb.net/?appName=Cluster0
JWT_SECRET=your_production_secret_key_change_this_to_something_secure
JWT_EXPIRE=7d
NODE_ENV=production
PORT=5000
```

### Step 4: Deploy

- Render will automatically deploy when you click "Deploy"
- Check deployment logs for errors
- Once deployed, you'll get a URL like: `https://hotel-booking-api.onrender.com`

### Render Service URL
**Update this in your frontend configuration:**
```
https://hotel-booking-api.onrender.com
```

---

## 🎨 FRONTEND DEPLOYMENT (Vercel)

### Step 1: Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up / Log in with GitHub
3. Click **"Add New"** → **"Project"**
4. Select repository: `PruthviAlva/hotel`
5. Configure project

### Step 2: Configure Frontend Settings

| Setting | Value |
|---------|-------|
| **Framework** | React |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Install Command** | `npm install` |
| **Output Directory** | `build` |

### Step 3: Set Environment Variables

In Vercel → Project Settings → Environment Variables:

```
REACT_APP_API_URL=https://hotel-booking-api.onrender.com
```

*This connects your frontend to the Render backend*

### Step 4: Deploy

- Click **"Deploy"**
- Wait for deployment to complete
- You'll get a URL like: `https://hotel-booking.vercel.app`

---

## 🔗 Environment Configuration Summary

### Backend (.env.production)
```env
PORT=5000
MONGODB_URI=mongodb+srv://alvapruthvi_db_user:pUHw9mzTb52ddXtM@cluster0.6dtg6zy.mongodb.net/?appName=Cluster0
JWT_SECRET=your_production_secret_key_change_this
JWT_EXPIRE=7d
NODE_ENV=production
```

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://hotel-booking-api.onrender.com
```

---

## ✅ Deployment Checklist

### Backend (Render)
- [ ] Repository pushed to GitHub
- [ ] `render.yaml` configured in backend folder
- [ ] Render service created and connected
- [ ] MongoDB URI set in environment variables
- [ ] JWT_SECRET configured securely
- [ ] Backend deployed successfully
- [ ] API health check: `curl https://hotel-booking-api.onrender.com/`

### Frontend (Vercel)
- [ ] `vercel.json` configured in frontend folder
- [ ] Vercel project created and connected
- [ ] REACT_APP_API_URL environment variable set
- [ ] Frontend deployed successfully
- [ ] Test API calls from deployed frontend

---

## 🧪 Post-Deployment Testing

### 1. Test API Endpoints

```bash
# Test backend health
curl https://hotel-booking-api.onrender.com/

# Test login endpoint
curl -X POST https://hotel-booking-api.onrender.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@hotel.com","password":"admin123"}'
```

### 2. Test Frontend

- Visit your Vercel URL: `https://hotel-booking.vercel.app`
- Try logging in
- Search for hotels
- Complete a test booking

### 3. Check Logs

**Render Logs:**
- Render Dashboard → Your Service → Logs

**Vercel Logs:**
- Vercel Dashboard → Your Project → Deployments → Function Logs

---

## 🔐 Security Best Practices

### ✅ DO:
- Change `JWT_SECRET` to a strong, random string
- Use environment variables for all secrets
- Enable HTTPS (both Render and Vercel handle this)
- Regularly update dependencies
- Monitor deployed application logs

### ❌ DON'T:
- Commit `.env` files to GitHub
- Hardcode secret keys in code
- Expose API keys in frontend code
- Use `localhost` in production

---

## 🆘 Troubleshooting

### Backend Won't Deploy on Render

**Problem**: Build fails  
**Solution**: Check logs, ensure `backend/package.json` exists

**Problem**: Connection timeout  
**Solution**: Wait 30+ seconds (free tier can be slow)

### Frontend Won't Deploy on Vercel

**Problem**: Build fails  
**Solution**: Check `frontend/package.json` dependencies

**Problem**: API calls fail  
**Solution**: Verify `REACT_APP_API_URL` environment variable

### MongoDB Connection Issues

**Problem**: Can't connect to MongoDB  
**Solution**: 
- Verify connection string is correct
- Check Mongo Atlas IP whitelist includes Render's IP (usually 0.0.0.0/0)

**To whitelist all IPs in MongoDB Atlas:**
1. Go to MongoDB Atlas → Network Access
2. Add IP Address: `0.0.0.0/0`
3. Confirm

### CORS Errors

**Problem**: Frontend can't reach backend  
**Solution**: Ensure backend has CORS enabled (it does by default)

---

## 📦 Files Created for Deployment

| File | Purpose |
|------|---------|
| `backend/render.yaml` | Render deployment configuration |
| `frontend/vercel.json` | Vercel deployment configuration |
| `backend/.env.production` | Production environment variables |
| `frontend/.env.production` | Frontend production config |

---

## 🚢 Deployment URLs

After deployment, you'll have:

- **Backend API**: `https://hotel-booking-api.onrender.com`
- **Frontend**: `https://hotel-booking.vercel.app`
- **MongoDB**: `mongodb+srv://alvapruthvi_db_user:...` (via Render)

---

## 📈 Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Vercel  
3. ✅ Test all features
4. ✅ Monitor logs for errors
5. 🎉 Share your deployed app!

---

## 🎯 Quick Reference

### Access Deployed App
```
https://hotel-booking.vercel.app
```

### Access API Documentation
```
https://hotel-booking-api.onrender.com/
```

### Test Admin Credentials
```
Email: admin@hotel.com
Password: admin123
```

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://www.mongodb.com/docs/atlas/
- **GitHub**: https://github.com/PruthviAlva/hotel

---

**Happy Deploying! 🚀**
