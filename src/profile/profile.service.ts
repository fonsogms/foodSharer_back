import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/auth/userPayload.interface';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileDto } from './dto/profile.dto';
import { Food } from 'src/food/food.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async getUserProfile(user: JwtPayload): Promise<User> {
    const profile = await this.userRepository.findOne({ id: user.id });
    delete profile.salt;
    delete profile.password;
    delete profile.food;
    return profile;
  }
  async editProfile(user: JwtPayload, profileDto: ProfileDto) {
    const profile = await this.userRepository.findOne({ id: user.id });
    for (let key of Object.keys(profileDto)) {
      profile[key] = profileDto[key];
    }

    await profile.save();
    delete profile.password;
    delete profile.salt;
    return profile;
  }
  async getUserProfileFood(user: JwtPayload): Promise<Food[]> {
    const profile = await this.userRepository.findOne({ id: user.id });

    return profile.food;
  }
}
