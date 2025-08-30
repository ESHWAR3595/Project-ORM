const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ORM Learning Project API',
    version: '1.0.0',
    description: 'A simple API for learning ORMs with Node.js, Express, and Sequelize',
    contact: {
      name: 'ORM Learning Project',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

// Options for swagger-jsdoc
const swaggerOptions = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: [
    './routes/*.js',
    './controllers/*.js',
    './docs/*.yaml'
  ],
};

// Generate swagger specification
const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
