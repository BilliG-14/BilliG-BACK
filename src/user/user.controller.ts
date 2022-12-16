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
import { Schema } from 'mongoose';
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
    const user = await this.userService.getUserById(
      new Schema.Types.ObjectId(id),
    );
    return user;
  }

  @Patch()
  async updateUser(@Req() request, @Body() userInfo: UpdateUserDTO) {
    const user = await this.userService.update(request.user.email, userInfo);
    return user;
  }

  @Delete()
  async deleteUser(@Req() request) {
    await this.userService.deleteUserById(request.user._id);
  }
}
