# Student Management System - Frontend

A modern React/Next.js frontend for a student management system with authentication, user profiles, and admin dashboard.

## Features

- 🔐 Authentication (Login/Register)
- 👤 User Profile Management
- 🎓 Student Management (Admin)
- 📊 Admin Dashboard
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive Design

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd student-management-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:3001/api" > .env.local
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Setup

### Mock Backend Server

For development, use the provided mock server:

```bash
# Install mock server dependencies
npm install express cors

# Start mock server
node mock-server.js
```

The mock server runs on `http://localhost:3001` and provides all necessary API endpoints.

### Test Credentials

- **Admin**: email: `admin@example.com`, password: `admin123`
- **Student**: email: `student@example.com`, password: `student123`

## Deployment

### Environment Variables

Set these environment variables in your hosting platform:

```
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
NODE_ENV=production
```

### Build Commands

```bash
npm run build
npm start
```

### Deployment Platforms

- **Vercel** (Recommended): Connect GitHub repo, set env vars, auto-deploy
- **Netlify**: Connect repo, build command: `npm run build`
- **Railway**: Connect repo, set env vars

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin dashboard pages
│   ├── auth/              # Authentication pages
│   └── profile/           # User profile page
├── components/            # Reusable components
│   ├── admin/            # Admin-specific components
│   ├── auth/             # Authentication components
│   ├── common/           # Shared components
│   └── profile/          # Profile components
├── lib/                  # Utilities and API functions
│   ├── api/             # API client functions
│   └── constants.ts     # App constants
└── types/               # TypeScript type definitions
```

## API Endpoints

The application expects these API endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/users/me` - Get current user
- `PUT /api/users/me` - Update current user
- `GET /api/students` - Get all students (admin)
- `GET /api/students/:id` - Get student details (admin)
- `POST /api/students` - Create student (admin)
- `PUT /api/students/:id` - Update student (admin)
- `DELETE /api/students/:id` - Delete student (admin)

## Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Heroicons** - Icons

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License


