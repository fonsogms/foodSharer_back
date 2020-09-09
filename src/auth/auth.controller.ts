import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserAuthDto } from './dto/userAuth.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { JwtPayload } from './userPayload.interface';
import { User } from './user.entity';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signUp')
  async singUp(
    @Body(ValidationPipe) userAuthDto: UserAuthDto,
  ): Promise<{ token: string }> {
    return this.authService.signUp(userAuthDto);
  }
  @Post('/signIn')
  async signIn(
    @Body(ValidationPipe) userAuthDto: UserAuthDto,
    @Res() res: any,
  ): Promise<void> {
    console.log('happening?');
    await this.authService.signIn(userAuthDto, res);
  }
  @Post('/loggedin')
  async loggedIn(@Req() req: Request, @Res() res: Response) {
    let token = req.cookies.jid;
    await this.authService.loggedIn(token, req, res);
  }
  @Post('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    await this.authService.logout(req, res);
  }
}
