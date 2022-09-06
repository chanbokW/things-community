import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './global/common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // HttpException Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  //swagger
  const option = new DocumentBuilder()
    .setTitle('띵스 플로우')
    .setDescription('Thingsflow Api')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, option);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
