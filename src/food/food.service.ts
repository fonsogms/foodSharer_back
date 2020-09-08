import { Injectable, NotFoundException } from '@nestjs/common';
import { FoodDto } from './dto/food.dto';
import { User } from 'src/auth/user.entity';
import { FoodRepository } from './food.repository';
import { Food } from './food.entity';
import { v2 as cloudinary } from 'cloudinary';
import { JwtPayload } from 'src/auth/userPayload.interface';
import { SearchFoodDto } from './dto/searchFood.dto';

@Injectable()
export class FoodService {
  constructor(private foodRepository: FoodRepository) {}
  async add(foodDto: FoodDto, user: User): Promise<Food> {
    return this.foodRepository.add(foodDto, user);
  }
  async getAllFood(
    searchDto: SearchFoodDto,
    user: JwtPayload,
  ): Promise<Food[]> {
    return this.foodRepository.getAllFood(searchDto, user);
  }

  async getFoodById(id: number, user: JwtPayload): Promise<Food> {
    const food = await this.foodRepository.findOne({
      where: { id: id, owner: user.id },
    });
    if (!food) {
      throw new NotFoundException('Food not Found :(');
    }
    return food;
  }
  async delete(id: number, user: JwtPayload): Promise<Food> {
    const foundFood = await this.getFoodById(id, user);
    const public_ids = foundFood.pictures.map(picture => {
      return picture.public_id;
    });
    const image_Deletion = await this.deleteCloudinary(public_ids);
    const deletion = await this.foodRepository.delete({
      id: id,
    });

    return foundFood;
  }
  async editFoodById(
    foodDto: FoodDto,
    id: number,
    user: JwtPayload,
  ): Promise<Food> {
    const foundFood = await this.getFoodById(id, user);
    for (let key of Object.keys(foodDto)) {
      if (foodDto[key]) {
        foundFood[key] = foodDto[key];
      }
    }
    await foundFood.save();
    return foundFood;
  }
  async deleteCloudinary(ids: string[]): Promise<boolean> {
    try {
      const res = await cloudinary.api.delete_resources([...ids]);
      console.log(res);
      return true;
    } catch (err) {
      throw err;
    }
  }
}
