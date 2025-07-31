const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user data
const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  role: "student",
  phone: "123-456-7890"
};

// Mock authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // For mock purposes, accept any token
  next();
};

// Routes
app.get('/api/users/me', authenticateToken, (req, res) => {
  res.json({ user: mockUser });
});

app.put('/api/users/me', authenticateToken, (req, res) => {
  const updatedUser = { ...mockUser, ...req.body };
  res.json({ user: updatedUser });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'admin@example.com' && password === 'admin123') {
    res.json({
      token: 'mock-jwt-token-admin',
      user: { ...mockUser, role: 'admin' }
    });
  } else if (email === 'student@example.com' && password === 'student123') {
    res.json({
      token: 'mock-jwt-token-student',
      user: mockUser
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  res.json({
    token: 'mock-jwt-token-new-user',
    user: { id: '2', name, email, role: 'student' }
  });
});

// Student routes
app.get('/api/students', authenticateToken, (req, res) => {
  res.json({
    students: [
      { id: '1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' }
    ]
  });
});

app.get('/api/students/:id', authenticateToken, (req, res) => {
  res.json({
    id: req.params.id,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '123-456-7890'
  });
});

app.post('/api/students', authenticateToken, (req, res) => {
  res.json({ message: 'Student created successfully', student: req.body });
});

app.put('/api/students/:id', authenticateToken, (req, res) => {
  res.json({ message: 'Student updated successfully', student: req.body });
});

app.delete('/api/students/:id', authenticateToken, (req, res) => {
  res.json({ message: 'Student deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Mock server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('- POST /api/auth/login');
  console.log('- POST /api/auth/register');
  console.log('- GET /api/users/me');
  console.log('- PUT /api/users/me');
  console.log('- GET /api/students');
  console.log('- GET /api/students/:id');
  console.log('- POST /api/students');
  console.log('- PUT /api/students/:id');
  console.log('- DELETE /api/students/:id');
}); 