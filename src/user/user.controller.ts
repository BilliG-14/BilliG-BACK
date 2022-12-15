import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get()
  getUser() {
    return this.userService.get();
  }

  @Post('register')
  async createUser(@Body() userInfo: CreateUserDTO) {
    const createdUser = await this.userService.create(userInfo);
    return createdUser;
  }
}
