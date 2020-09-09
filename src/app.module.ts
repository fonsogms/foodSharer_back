import { Module } from '@nestjs/common';
import { FoodModule } from './food/food.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typerorm.config';
import { PassportModule } from '@nestjs/passport';
import { ProfileModule } from './profile/profile.module';
@Module({
  imports: [
    FoodModule,
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig()),
    PassportModule,
    ProfileModule,
  ],
})
export class AppModule {}
