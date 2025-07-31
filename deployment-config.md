# Deployment Configuration

## Environment Variables

Create a `.env.local` file for development:
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NODE_ENV=development
```

For production, set these environment variables in your hosting platform:
```
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
NODE_ENV=production
```

## Build Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

## Deployment Platforms

### Vercel (Recommended)
1. Connect your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Set environment variables

### Railway
1. Connect your repository
2. Set environment variables
3. Deploy automatically

## Backend Requirements

Your backend API should be running and accessible at the URL specified in `NEXT_PUBLIC_API_URL`.

## Mock Server (Development)

For development, you can use the provided mock server:

```bash
# Install mock server dependencies
npm install express cors

# Start mock server
node mock-server.js
```

The mock server will run on `http://localhost:3001` and provide all necessary API endpoints. 