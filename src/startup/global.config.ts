import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

export function initGlobalConfig(app) {
  const { httpAdapter } = app.get(HttpAdapterHost);
  app
    .useGlobalFilters
    // new HttpExceptionFilter(),
    // new PrismaClientExceptionFilter(httpAdapter),
    ();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,
    }),
  );
}
