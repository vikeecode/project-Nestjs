import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('Mongo URI:', process.env.MONGODB_URL);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
    console.log('🚀 Server running on http://localhost:3000');
}
bootstrap();
