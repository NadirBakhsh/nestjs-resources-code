import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger configuration
  const config = new DocumentBuilder()
  .setTitle('APIs Documentation Example of Blog App')
  .setDescription('Use the base Api URL to access the APIs http://localhost:3000')
  .setVersion('1.0')
  .addServer('http://localhost:3000')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  app.enableCors();
  app.useGlobalInterceptors(new DataResponseInterceptor());
  await app.listen(3000);
}
bootstrap();
