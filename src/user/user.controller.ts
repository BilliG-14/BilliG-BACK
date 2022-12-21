import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import JwtAuthGuard from 'src/auth/guard/jwt-auth.guard';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get()
  async getUsers() {
    const users = await this.userService.getMany();
    return users;
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    return user;
  }

  @Patch()
  async updateMe(@Req() request, @Body() userInfo: UpdateUserDTO) {
    const user = await this.userService.update(request.user._id, userInfo);
    return user;
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() userInfo: UpdateUserDTO) {
    const user = await this.userService.update(id, userInfo);
    return user;
  }

  @Delete()
  async deleteMe(@Req() request) {
    await this.userService.deleteUserById(request.user._id);
  }
}
