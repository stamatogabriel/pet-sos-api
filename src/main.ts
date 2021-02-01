import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('SOS Pets')
    .setDescription('The SOS Pets API description')
    .setVersion('1.0')
    .addTag('sos-pets')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  
  SwaggerModule.setup('swagger', app, document);

  app.use(helmet());

  app.enableCors();

  await app.listen(process.env.PORT);
}
bootstrap();
