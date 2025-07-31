# 🚀 Deployment Guide

This guide will help you deploy your Student Management Frontend to various platforms.

## 📋 Prerequisites

- Node.js 18+ installed
- Git repository set up
- Backend API running and accessible

## 🔧 Environment Setup

### Development Environment
Create a `.env.local` file in your project root:
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NODE_ENV=development
```

### Production Environment
Set these environment variables in your hosting platform:
```bash
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
NODE_ENV=production
```

## 🎯 Deployment Options

### 1. Vercel (Recommended)

**Steps:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Set environment variables in Vercel dashboard
6. Deploy!

**Environment Variables in Vercel:**
- Go to Project Settings → Environment Variables
- Add `NEXT_PUBLIC_API_URL` with your backend URL
- Add `NODE_ENV=production`

### 2. Netlify

**Steps:**
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Set environment variables in Netlify dashboard
7. Deploy!

### 3. Railway

**Steps:**
1. Push your code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Set environment variables
6. Deploy!

### 4. Docker Deployment

**Build the Docker image:**
```bash
docker build -t student-management-frontend .
```

**Run the container:**
```bash
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://your-backend-api.com/api student-management-frontend
```

### 5. Manual Deployment

**Build the application:**
```bash
npm install
npm run build
npm start
```

## 🔑 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Your backend API URL | `https://api.example.com/api` |
| `NODE_ENV` | Environment mode | `production` |

## 🧪 Testing Deployment

1. **Build Test:**
   ```bash
   npm run build
   ```

2. **Local Production Test:**
   ```bash
   npm run build
   npm start
   ```

3. **Docker Test:**
   ```bash
   docker build -t test-app .
   docker run -p 3000:3000 test-app
   ```

## 🐛 Troubleshooting

### Common Issues:

1. **Build Fails:**
   - Check Node.js version (18+ required)
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

2. **Environment Variables Not Working:**
   - Ensure variables start with `NEXT_PUBLIC_` for client-side access
   - Restart deployment after adding environment variables

3. **API Connection Issues:**
   - Verify backend API is running and accessible
   - Check CORS settings on backend
   - Test API endpoints directly

4. **404 Errors:**
   - Ensure proper redirects are configured
   - Check if using client-side routing correctly

## 📊 Monitoring

### Vercel Analytics:
- Built-in analytics in Vercel dashboard
- Performance monitoring
- Error tracking

### Netlify Analytics:
- Built-in analytics in Netlify dashboard
- Form submissions tracking
- Performance insights

## 🔒 Security Considerations

1. **Environment Variables:**
   - Never commit `.env` files to Git
   - Use platform-specific environment variable management

2. **API Security:**
   - Ensure HTTPS for production APIs
   - Implement proper CORS policies
   - Use secure authentication

3. **Content Security Policy:**
   - Consider adding CSP headers
   - Validate all user inputs

## 📈 Performance Optimization

1. **Build Optimization:**
   - Use production build: `npm run build`
   - Enable compression in hosting platform
   - Optimize images and assets

2. **Runtime Optimization:**
   - Implement proper caching strategies
   - Use CDN for static assets
   - Monitor bundle size

## 🆘 Support

If you encounter issues:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review platform-specific deployment guides
3. Check browser console for client-side errors
4. Verify API connectivity

## 🎉 Success Checklist

- [ ] Application builds successfully
- [ ] Environment variables are set correctly
- [ ] API endpoints are accessible
- [ ] Authentication works properly
- [ ] All features function as expected
- [ ] Performance is acceptable
- [ ] Error handling is in place

---

**Happy Deploying! 🚀** 