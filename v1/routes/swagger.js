const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API VIBE',
      version: '1.0.0',
      description: 'Documentación para tu API',
    },
    servers: [
      {
        url: 'https://thriving-insect-production.up.railway.app/v1/',
      },
    ],
  },
  apis: ['v1/routes/*.routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
