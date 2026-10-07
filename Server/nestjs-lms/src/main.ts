import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  console.log('Mongo URI:', process.env.MONGODB_URL);
  const app = await NestFactory.create(AppModule);
   app.useGlobalPipes(new ValidationPipe());
  const port =   await app.listen(process.env.PORT ?? 3000);
    console.log('🚀 Server running on',port);
}
bootstrap();
