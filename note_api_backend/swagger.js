const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My Express API',
      version: '1.0.0',
      description: 'A simple Express API documented with Swagger',
    },
    components: {
      schemas: {
        Note: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Shopping List' },
            content: { type: 'string', example: 'Milk, Eggs, Bread' },
            createdAt: { type: 'string', format: 'date-time', example: '2024-02-12T14:34:00Z' },
            updatedAt: { type: 'string', format: 'date-time', example: '2024-02-12T14:34:00Z' }
          },
          required: ['id', 'title', 'createdAt', 'updatedAt']
        }
      }
    }
  },
  apis: ['./src/routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
