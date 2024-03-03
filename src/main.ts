import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppExceptionFilter } from '@core/filters';

import { AppModule } from './app.module';

function swaggerConfigure(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('ISO-4271')
    .setDescription('ISO-4271 Dates API')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app
    .setGlobalPrefix('api')
    .useGlobalPipes(new ValidationPipe())
    .useGlobalFilters(new AppExceptionFilter());
  swaggerConfigure(app);
  await app.listen(configService.get('PORT') || 4000);
}

bootstrap();
