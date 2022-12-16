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
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/guard/jwt-auth.guard';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
@ApiTags('유저 API')
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
  @ApiResponse({ type: UpdateUserDTO })
  async updateUser(@Req() request, @Body() userInfo: UpdateUserDTO) {
    const user = await this.userService.update(request.user._id, userInfo);
    return user;
  }

  @Delete()
  async deleteUser(@Req() request) {
    await this.userService.deleteUserById(request.user._id);
  }
}
