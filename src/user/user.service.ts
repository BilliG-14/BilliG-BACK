/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { RegisterUserDTO } from 'src/auth/dto/registerUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserById(id: Schema.Types.ObjectId) {
    const user = await this.userModel.findOne({ _id: id }, { password: false });
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

  async create(userInfo: RegisterUserDTO) {
    const createdUser = new this.userModel(userInfo);
    return createdUser.save();
  }

  async update(email: string, userInfo: UpdateUserDTO) {
    const updatedUser = await this.userModel.findOneAndUpdate(
      { email },
      userInfo,
      {
        returnOriginal: false,
      },
    );

    const { password, ...result } = updatedUser.toObject();
    return result;
  }

  async deleteUserById(id: Schema.Types.ObjectId) {
    await this.userModel.deleteOne({ _id: id });
  }
}
