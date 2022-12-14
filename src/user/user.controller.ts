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

  @Post()
  createUser(@Body() userInfo: CreateUserDTO) {
    return this.userService.create(userInfo);
  }
}
