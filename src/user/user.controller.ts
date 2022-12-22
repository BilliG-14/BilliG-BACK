import { S3Client } from '@aws-sdk/client-s3';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import * as path from 'path';
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

  @Get('me')
  async getMe(@Req() request) {
    return request.user;
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    return user;
  }

  @Patch('image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multerS3({
        s3: new S3Client({
          region: 'ap-northeast-2',
          credentials: {
            accessKeyId: 'AKIAY5IXVITKPDRY6G4T',
            secretAccessKey: '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',
          },
        }),
        bucket: 'billige',
        key(_req, file, done) {
          const ext = path.extname(file.originalname);
          const basename = path.basename(file.originalname, ext);
          done(null, `${Date.now()}_${basename}${ext}`);
        },
      }),
      limits: {},
    }),
  )
  async updateImage(
    @Req() request,
    @UploadedFile() imageUrl: Express.MulterS3.File,
  ) {
    if (!imageUrl) {
      throw new BadRequestException(
        '이미지 저장을 시도하였으나, 첨부사진이 존재하지 않습니다.',
      );
    }
    const user = await this.userService.update(
      request.user._id,
      {
        image: imageUrl.location,
      },
      '_id image',
    );
    return user;
  }

  @Patch()
  async updateMe(@Req() request, @Body() userInfo: UpdateUserDTO) {
    const user = await this.userService.update(request.user._id, userInfo);
    return user;
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() userInfo: UpdateUserDTO) {
    const user = await this.userService.update(
      id,
      userInfo,
      '_id suspension role',
    );
    return user;
  }

  @Delete()
  async deleteMe(@Req() request) {
    await this.userService.deleteUserById(request.user._id);
  }
}
