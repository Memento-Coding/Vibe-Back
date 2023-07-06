const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API VIBE',
      version: '1.0.0',
      description: 'Documentation for your API',
    },
    servers: [
      {
        url: 'https://thriving-insect-production.up.railway.app/v1/',
        description: 'Entorno de produccion de apis',
        // url: 'http://localhost:8080/v1/',
        // description: 'Entorno de desarrollo de apis'
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['v1/routes/*.routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
