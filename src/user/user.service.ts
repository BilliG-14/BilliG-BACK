/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserById(_id: string) {
    const user = await this.userModel.findOne({ _id }, { password: false });
    if (!user) {
      throw new HttpException(
        '사용자가 존재하지 않습니다',
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException(
        '사용자가 존재하지 않습니다',
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async getMany() {
    const users = await this.userModel.find({}, { password: false });
    return users;
  }

  async create(userInfo: User) {
    const createdUser = new this.userModel(userInfo);
    return createdUser.save();
  }

  async update(_id: string, userInfo: UpdateUserDTO) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id },
      userInfo,
      {
        returnOriginal: false,
      },
    );

    const { password, ...result } = updatedUser.toObject();
    return result;
  }

  async deleteUserById(_id: string) {
    await this.userModel.deleteOne({ _id });
  }
}
