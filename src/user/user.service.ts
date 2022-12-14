import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dto/createUser.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  get() {
    return this.userModel.find({});
  }

  create(userInfo: CreateUserDTO) {
    const createdUser = new this.userModel(userInfo);
    return createdUser.save();
  }
}