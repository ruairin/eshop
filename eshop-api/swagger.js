const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for EShop App',
    version: '1.0.0',
    description: 'REST API using Express for serving data for the eshop application'
  },
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./controllers/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerSpec: swaggerSpec
}