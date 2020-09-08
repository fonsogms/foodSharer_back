import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserAuthDto } from './dto/userAuth.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './userPayload.interface';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}
  async signUp(userAuthDto: UserAuthDto): Promise<{ token: string }> {
    const user = await this.userRepository.signUp(userAuthDto);
    const payload: JwtPayload = { username: user.username, id: user.id };
    const token = this.jwtService.sign(payload);
    return { token };
  }
  async signIn(userAuthDto: UserAuthDto, res: Response): Promise<void> {
    console.log('new changes?');

    const user = await this.userRepository.validateUserPassword(userAuthDto);
    const payload: JwtPayload = { username: user.username, id: user.id };
    const token = this.jwtService.sign(payload);
    if (!user) {
      throw new UnauthorizedException('Wrong credentials');
    } else {
      res.cookie('jid', token, {
        httpOnly: true,
        path: '/api/auth/loggedin',
        sameSite: 'none',
        secure: true,
      });
      res.json({ token });
    }
  }
  async loggedIn(token, req, res) {
    if (!token) {
      console.log('whats going on?');
      throw new UnauthorizedException();
    }

    let payload: JwtPayload | null = null;
    try {
      payload = await this.jwtService.verify(token);
    } catch (err) {
      console.log(err);
      throw err;
    }
    const { username, id } = payload;
    const user: User = await this.userRepository.findOne({
      username: username,
      id,
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }

    token = this.jwtService.sign({ username: user.username, id: id });
    console.log('new changes?');
    res.cookie('jid', token, {
      httpOnly: true,
      path: '/api/auth/loggedin',
      sameSite: 'none',
      secure: true,
    });
    res.json({ token });
  }
  async logout(req: Request, res: Response) {
    console.log('new changes?');

    res.cookie('jid', '', {
      httpOnly: true,
      path: '/api/auth/loggedin',
      sameSite: 'none',
      secure: true,
    });
    res.json('ok');
  }
  async getUserProfile(user: JwtPayload): Promise<User> {
    const profile = await this.userRepository.findOne({ id: user.id });
    delete profile.salt;
    delete profile.password;
    return profile;
  }
}
