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
import { UserService } from './user/user.service';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private userService: UserService,
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

  @Post('logout')
  async logoutUser(@Res() response) {
    response.clearCookie('refresh');
    return response.send({});
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

  @Get('lost')
  async resetPassword(
    @Body() { email, phoneNumber }: { email: string; phoneNumber: string },
  ) {
    const lostUser = await this.userService.getUserByEmail(email);
    if (lostUser.phoneNumber == phoneNumber) {
      await this.userService.update(lostUser._id.toString(), {
        password: await bcrypt.hash('1234', 10),
      });
      return '비밀번호 초기화에 성공했습니다.';
    } else {
      throw new HttpException('입력한 정보와 일치하는 유저가 없습니다.', 498);
    }
  }

  @Post('checkEmail')
  async checkEmail(@Body() { email }: { email: string }) {
    const user = await this.authService.checkUserEmail(email);
    return { userId: user ? user._id : null };
  }
}
