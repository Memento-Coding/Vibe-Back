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
        url: 'http://localhost:3030/v1/',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID del evento',
            },
            nombre: {
              type: 'string',
              description: 'Nombre del evento',
            },
            descripcion: {
              type: 'string',
              description: 'Descripción del evento',
            },
            fecha_hora: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha y hora del evento',
            },
          },
        },
        Song: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID de la canción',
            },
            nombre: {
              type: 'string',
              description: 'Nombre de la canción',
            },
            artista: {
              type: 'string',
              description: 'Artista de la canción',
            },
            foto: {
              type: 'string',
              description: 'URL de la foto de la canción',
            },
          },
        },
      },
    },
  },
  apis: ['v1/routes/*.routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
