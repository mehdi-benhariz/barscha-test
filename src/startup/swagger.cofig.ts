import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function initSwaggerConfig(app: INestApplication) {
  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('Technical Test API')
    .setDescription('Technical Test API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter your JWT token',
        in: 'header',
      },
      'bearer',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      security: [{ bearer: [] }],
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'API Documentation',
  });

  console.log('Swagger UI set up successfully at /api-docs');
}
