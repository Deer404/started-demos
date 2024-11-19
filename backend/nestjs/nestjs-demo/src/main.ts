import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from './env';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  await app.listen(env.PORT ?? 3000);
}
bootstrap();
