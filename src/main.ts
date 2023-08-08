import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const configSwagger = new DocumentBuilder()
    .setTitle('CSV Multithread Backend API')
    .setDescription('CSV Multithread Nest Mongo Loader Backend API')
    .setVersion('1.0')
    .addTag('CSV Multithread')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(3000);
}
bootstrap();
