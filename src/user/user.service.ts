import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDTO } from './dto/createUser.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException(
        '사용자가 존재하지 않습니다',
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  public async get() {
    const users = await this.userModel.find({});
    return users;
  }

  public async create(userInfo: CreateUserDTO) {
    const createdUser = new this.userModel(userInfo);
    return createdUser.save();
  }
}
