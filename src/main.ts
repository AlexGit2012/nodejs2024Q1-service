import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const filePath = join(__dirname, '..', 'doc', 'api.yaml');
  const file = await readFile(filePath, 'utf-8');
  const swaggerDocument = parse(file);
  SwaggerModule.setup('doc', app, swaggerDocument);
  const port = process.env.PORT || 4000; // Process get port from .env
  await app.listen(port);
}
bootstrap();
