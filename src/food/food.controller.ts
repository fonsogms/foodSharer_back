import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  Query,
  Req,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { FoodService } from './food.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { FoodDto } from './dto/food.dto';
import { Food } from './food.entity';
import { SearchFoodDto } from './dto/searchFood.dto';
import { v2 as cloudinary } from 'cloudinary';
import { Request } from 'express';
import axios from 'axios';
import { JwtPayload } from 'src/auth/userPayload.interface';
@Controller('api/food')
@UseGuards(AuthGuard())
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Post('/add')
  async add(
    @GetUser() user: User,
    @Body(ValidationPipe) foodDto: FoodDto,
  ): Promise<Food> {
    console.log('work?');
    console.log(foodDto, 'something');
    return this.foodService.add(foodDto, user);
  }
  @Get('/')
  async getAllFood(
    @Query() searchFoodDto: SearchFoodDto,
    @GetUser() user: JwtPayload,
  ): Promise<Food[]> {
    return this.foodService.getAllFood(searchFoodDto, user);
  }

  @Delete('/cloudinary')
  async deleteCloudinary(@Body() data: { id: string[] }) {
    const { id } = data;
    return this.foodService.deleteCloudinary(id);
  }
  @Get('/:id')
  async getFoodById(
    @Param('id') id: number,
    @GetUser() user: JwtPayload,
  ): Promise<Food> {
    return this.foodService.getFoodById(id, user);
  }
  @Delete('/:id')
  async deleteFood(
    @Param('id') id: number,
    @GetUser() user: JwtPayload,
  ): Promise<Food> {
    return this.foodService.delete(id, user);
  }
  @Put('/:id')
  async editFood(
    @GetUser() user: JwtPayload,
    @Body() foodDto: FoodDto,
    @Param('id') id: number,
  ): Promise<Food> {
    return await this.foodService.editFoodById(foodDto, id, user);
  }

  /*  @Post('/cloudinaryUpload')
  @UseInterceptors(FileInterceptor('file'))
  async cloudinaryUpload(
    @UploadedFile() file,
    @GetUser() user: User,
    @Req() req: Request,
  ) {
    console.log(file);
    file.upload_preset = 'foodSharer';
    console.log(req.body);
    try {
      console.log('trying?');
      const fileInfo = await axios.post(
        'https://api.cloudinary.com/v1_1/dgktrtxjv/image/upload',
        file,
      );
      return fileInfo;
    } catch (err) {
      //console.log(err);
      // console.log(Object.keys(err));
      // console.log(err.response.data);
      throw err;
    }
  } */
}
