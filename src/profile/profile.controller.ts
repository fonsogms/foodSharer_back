import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtPayload } from 'src/auth/userPayload.interface';
import { User } from 'src/auth/user.entity';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile.dto';
import { Food } from 'src/food/food.entity';

@Controller('api/profile')
@UseGuards(AuthGuard())
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Get('/')
  async getUserProfile(@GetUser() user: JwtPayload): Promise<User> {
    return await this.profileService.getUserProfile(user);
  }
  @Get('/food')
  async getUserProfileFood(@GetUser() user: JwtPayload): Promise<Food[]> {
    return await this.profileService.getUserProfileFood(user);
  }
  @Post('/')
  async editProfile(
    @GetUser() user: JwtPayload,
    @Body() profileDto: ProfileDto,
  ) {
    return await this.profileService.editProfile(user, profileDto);
  }
}
