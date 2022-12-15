import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';

import { CreateUserDTO } from './dto/createUser.dto';
import { User, UserDocument } from './schemas/user.schema';
import { LoginUserDTO } from './dto/loginUser.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  public async get() {
    const users = await this.userModel.find({});
    return users;
  }

  public async create(userInfo: CreateUserDTO) {
    const passwordHashed = await bcrypt.hash(userInfo.password, 10);
    const userInfoModified = {
      ...userInfo,
      password: passwordHashed,
    };
    const createdUser = new this.userModel(userInfoModified);
    return createdUser.save();
  }

  async login(userInfo: LoginUserDTO) {
    const user = await this.getUserByEmail(userInfo.email);
    const isPasswordMatching = await bcrypt.compare(
      userInfo.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException('잘못된 비밀번호입니다', HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
