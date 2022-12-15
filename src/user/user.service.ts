import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';

import { CreateUserDTO } from './dto/createUser.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  get() {
    return this.userModel.find({});
  }

  async create(userInfo: CreateUserDTO) {
    const passwordHashed = await bcrypt.hash(userInfo.password, 10);
    const userInfoModified = {
      ...userInfo,
      password: passwordHashed,
    };
    const createdUser = new this.userModel(userInfoModified);
    return createdUser.save();
  }
}
