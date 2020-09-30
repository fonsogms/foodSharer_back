import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { parser } from './utils/cloudinary.config';

@Module({
  controllers: [UploadController],
})
export class UploadModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(parser.single('image')).forRoutes(UploadController);
  }
}

