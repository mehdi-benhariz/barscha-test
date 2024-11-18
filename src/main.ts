import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSecurityConfig } from './startup/security.config';
import { initSwaggerConfig } from './startup/swagger.cofig';
import { initGlobalConfig } from './startup/global.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initSecurityConfig(app);
  initSwaggerConfig(app);
  initGlobalConfig(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
