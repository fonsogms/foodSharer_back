import { Repository, Entity, EntityRepository, getConnection } from 'typeorm';
import { Food } from './food.entity';
import { FoodDto } from './dto/food.dto';
import { User } from 'src/auth/user.entity';
import { JwtPayload } from 'src/auth/userPayload.interface';
import { SearchFoodDto } from './dto/searchFood.dto';
@EntityRepository(Food)
export class FoodRepository extends Repository<Food> {
  async add(foodDto: FoodDto, user: User): Promise<Food> {
    const foodItem = new Food();
    for (let key of Object.keys(foodDto)) {
      foodItem[key] = foodDto[key];
    }
    foodItem.owner = user.id;
    if (!foodItem.expiryDate) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      foodItem.expiryDate = tomorrow.toISOString();
    }
    try {
      const newFood = await foodItem.save();
      delete newFood.owner;
      return newFood;
    } catch (err) {
      throw err;
    }
  }
  async getAllFood(
    searchDto: SearchFoodDto,
    user: JwtPayload,
  ): Promise<Food[]> {
    // SELECT * from(
    //   Select *,2 * 3961 * asin(sqrt((sin(radians((latitude - latitude) / 2))) ^ 2 + cos(radians(latitude)) * cos(radians(latitude)) * (sin(radians((longitude - 1.684253) / 2))) ^ 2)) as distance
    // from
    //   food)as subQuery
    //   WHERE subQuery.distance >0;
    console.log(searchDto);
    const { latitude, longitude, distance } = searchDto;
    const foods = await getConnection()
      .createQueryBuilder()
      .select('*')
      .from(innerQuery => {
        return innerQuery
          .select(
            `*, 2 * 3961 * asin(sqrt((sin(radians((latitude - ${latitude}) / 2))) ^ 2 + cos(radians(${latitude})) * cos(radians(latitude)) * (sin(radians((longitude - ${longitude}) / 2))) ^ 2))`,
            'distance',
          )
          .from(Food, 'food');
      }, 'subQuery')
      .where('distance < :distance', { distance: distance })
      .getRawMany();
    console.log(foods);
    return foods;
  }
}
