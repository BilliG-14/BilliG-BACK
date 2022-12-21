import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { RegisterUserDTO } from './auth/dto/registerUser.dto';
import JwtAuthGuard from './auth/guard/jwt-auth.guard';
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
    response.setHeader('Set-Cookie', refresh);
    return response.send({ ...user, token: access });
  }

  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  async refreshUser(@Req() requestWithUser, @Res() response) {
    const { user } = requestWithUser;
    const { access, refresh } = this.authService.createToken({
      id: user._id,
    });
    response.setHeader('Set-Cookie', refresh);
    return response.send({ ...user, token: access });
  }
}
