import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function start() {
  const PORT = process.env.PORT || 3030;

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.use(cookieParser());

  const config = new DocumentBuilder()
    // .addSecurity('basic', {
    //   type: 'http',
    //   scheme: 'basic',
    // })
    .addBearerAuth()
    // .addCookieAuth('optional-session-id')
    .setTitle('iTicket')
    .setDescription('REST API')
    .setVersion('1.0.0')
    .addTag('NodeJS, NestJS, Postgres, sequilize')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => {
    console.log(`\nServer has been on ${PORT} port...`);
  });
}
start();
