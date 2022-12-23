import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { RegisterUserDTO } from './auth/dto/registerUser.dto';
import { LocalAuthGuard } from './auth/guard/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('register')
  async registerUser(@Body() userInfo: RegisterUserDTO) {
    const createdUser = await this.authService.creatUserHashed(userInfo);
    return createdUser;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async loginUser(@Req() requestWithUser, @Res() response) {
    const { user } = requestWithUser;
    const { access, refresh } = this.authService.createToken({
      id: user._id,
    });
    response.cookie('refresh', refresh, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1,
    });
    return response.send({ ...user, token: access });
  }

  @Get('refresh')
  async refreshUser(@Req() request, @Res() response) {
    const cookies = request?.cookies?.refresh;
    if (!cookies) {
      throw new HttpException('토큰이 없습니다', HttpStatus.BAD_REQUEST);
    }

    const jwtDecoded = jwt.verify(
      cookies,
      process.env.JWT_SECRETKEY ?? 'secretkey',
    );

    const id = (<{ id: string }>jwtDecoded).id;
    const { access, refresh } = this.authService.createToken({ id });
    response.cookie('refresh', refresh, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1,
    });
    return response.send({ userId: id, token: access });
  }

  @Post('checkEmail')
  async checkEmail(@Body() { email }: { email: string }) {
    const user = await this.authService.checkUserEmail(email);
    return { userId: user ? user._id : null };
  }
}
