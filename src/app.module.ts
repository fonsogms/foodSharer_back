import { Module } from '@nestjs/common';
import { FoodModule } from './food/food.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typerorm.config';
import { PassportModule } from '@nestjs/passport';
import { ProfileModule } from './profile/profile.module';
import { UploadModule } from './upload/upload.module';
import 'dotenv/config';

@Module({
  imports: [
    FoodModule,
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig()),
    PassportModule,
    ProfileModule,
    UploadModule,
  ],
})
export class AppModule {}
