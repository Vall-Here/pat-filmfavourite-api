const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Daftar Film Favorit',
      version: '1.0.0',
      description: 'Dokumentasi API untuk manajemen film favorit',
    },
    servers: [
      {
        url: 'https://pat-filmfavourite-api-production.up.railway.app/api',
      },
    ],
  },
  apis: ['./docs/**/*.yaml'], 
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};