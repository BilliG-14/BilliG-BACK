import { Controller, Get, UseGuards } from '@nestjs/common';
import JwtAuthGuard from 'src/auth/guard/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser() {
    const users = await this.userService.get();
    return users;
  }
}
