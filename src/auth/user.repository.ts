import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { UserAuthDto } from './dto/userAuth.dto';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(
    userAuthDto: UserAuthDto,
  ): Promise<{ username: string; id: number }> {
    const { username, password } = userAuthDto;
    const user = new User();
    const salt = await bcrypt.genSalt();
    user.username = username;
    user.password = await bcrypt.hash(password, salt);
    user.salt = salt;
    user.address = '';
    user.latitude = 0;
    user.longitude = 0;
    console.log(user, 'this is the user');
    try {
      console.log('happening?');
      const createdUser = await user.save();
      console.log('happening?');

      return { username: createdUser.username, id: createdUser.id };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
  async validateUserPassword(userAuthDto: UserAuthDto): Promise<User | null> {
    const { username, password } = userAuthDto;
    const user = await this.findOne({ username });
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    }
    if (user && (await user.validatePassword(password))) {
      console.log('this');
      return user;
    } else {
      console.log('or this');
      return null;
    }
  }
}
