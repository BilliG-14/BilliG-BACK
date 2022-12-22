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
    response.setHeader('Set-Cookie', `refresh=${refresh}`);
    return response.send({ ...user, token: access });
  }

  @Get('refresh')
  async refreshUser(@Req() request, @Res() response) {
    const cookies = request.headers.cookie;
    console.log(cookies);

    const cookieArr = cookies
      .split(';')
      .filter((el: string) => el.indexOf('refresh') >= 0)[0];
    console.log(cookieArr);

    if (!cookieArr) {
      throw new HttpException('토큰이 없습니다', HttpStatus.UNAUTHORIZED);
    }

    const token = cookieArr.split('=')[1];
    console.log(token);

    const jwtDecoded = jwt.verify(
      token,
      process.env.JWT_SECRETKEY ?? 'secretkey',
    );

    console.log(token);
    const id = (<{ id: string }>jwtDecoded).id;
    const { access, refresh } = this.authService.createToken({ id });
    response.setHeader('Set-Cookie', refresh);
    return response.send({ userId: id, token: access });
  }
}
