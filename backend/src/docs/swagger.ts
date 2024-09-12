const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Shipper API",
      description: "Shipper API Information",
      contact: {
        name: "Simo Akmi",
      },
      version: "v1",
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          schema: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export default swaggerOptions;
