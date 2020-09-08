import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodRepository } from './food.repository';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([FoodRepository])],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
