import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://foodsharer.herokuapp.com',
      'https://foodsharer-2642b.web.app',
      'https://master.ds4i4rarwawut.amplifyapp.com',
    ],
    credentials: true,
  });
  app.use(cookieParser());
  // await cloudinary.config({
  //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  //   api_key: process.env.CLOUDINARY_API_KEY,
  //   api_secret: process.env.CLOUDINARY_API_SECRET,
  // });

  console.log('CLOUDINARY CLOUD NAME', process.env.CLOUDINARY_CLOUD_NAME);
  await app.listen(process.env.PORT, () => {
    console.log('listening to port', process.env.PORT || 5000);
  });
}
bootstrap();
