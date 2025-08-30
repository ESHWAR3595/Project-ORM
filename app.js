const express = require('express');
const { Sequelize } = require('sequelize');

// Import models
const db = require('./models');

// Import routes
const userRoutes = require('./routes/userRoutes');

// Import Swagger
const { swaggerUi, swaggerSpec } = require('./swagger/swagger');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/users', userRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Welcome to ORM Learning Project!',
    endpoints: {
      'GET /api/users': 'Get all users',
      'POST /api/users': 'Create a new user',
      'GET /api-docs': 'Swagger API Documentation'
    },
    documentation: 'http://localhost:3000/api-docs'
  });
});

async function testConnection() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    process.exit(1);
  }
}

async function startServer() {
  console.log('🚀 Starting ORM Learning Project...');
  await testConnection();
  
  app.listen(PORT, () => {
    console.log(`🌐 Server running on http://localhost:${PORT}`);
    console.log(`📝 API Documentation:`);
    console.log(`   GET  http://localhost:${PORT}/api/users`);
    console.log(`   POST http://localhost:${PORT}/api/users`);
  });
}

startServer();