import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Blog Pessoal')
  .setDescription('Projeto Blog Pessoal')
  .setContact("Vinicius Ribeiro de Oliveira","https://github.com/viniciusoliveira-27","viniciusoliveira.270304@gmail.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00'

  // habilitando globalmente a validação de dados
  app.useGlobalPipes( new ValidationPipe());

  //Habilita CORS na Aplicação (Aceito requisições de qualquer lugar) URL
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
