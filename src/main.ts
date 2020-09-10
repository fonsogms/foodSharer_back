import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('hello');

  app.enableCors({
    origin: ['http://localhost:3000', 'https://foodsharer.herokuapp.com'],
    credentials: true,
  });
  app.use(cookieParser());
  await cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  console.log(process.env.PORT, 'this is the port');
  await app.listen(process.env.PORT, () => {
    console.log('listening to port', process.env.PORT || 5000);
  });
}
bootstrap();
