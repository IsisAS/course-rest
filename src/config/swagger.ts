import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Course REST API',
      version: '1.0.0',
      description: 'API para gerenciamento de cursos e matrículas',
      contact: {
        name: 'API Support',
        email: 'support@courseapi.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:4000/api',
        description: 'Servidor de desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único do usuário'
            },
            name: {
              type: 'string',
              description: 'Nome do usuário'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            }
          }
        },
        Course: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único do curso'
            },
            title: {
              type: 'string',
              description: 'Título do curso'
            },
            description: {
              type: 'string',
              description: 'Descrição do curso'
            },
            instructor: {
              type: 'string',
              description: 'Instrutor do curso'
            },
            duration: {
              type: 'number',
              description: 'Duração em horas'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            }
          }
        },
        Enrollment: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único da matrícula'
            },
            userId: {
              type: 'string',
              description: 'ID do usuário'
            },
            courseId: {
              type: 'string',
              description: 'ID do curso'
            },
            enrolledAt: {
              type: 'string',
              format: 'date-time',
              description: 'Data da matrícula'
            },
            status: {
              type: 'string',
              enum: ['active', 'completed', 'cancelled'],
              description: 'Status da matrícula'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro'
            },
            status: {
              type: 'number',
              description: 'Código de status HTTP'
            }
          }
        }
      }
    }
  },
  apis: [
    './src/core/**/*.routes.ts',
    './src/core/**/*.ts'
  ]
};

export const specs = swaggerJsdoc(options);
export default options;