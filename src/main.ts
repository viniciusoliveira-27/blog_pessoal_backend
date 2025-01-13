import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // habilitando globalmente a validação de dados
  app.useGlobalPipes( new ValidationPipe());

  //Habilita CORS na Aplicação (Aceito requisições de qualquer lugar) URL
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
