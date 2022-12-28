import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { Chat, ChatDocument } from './schemas/chat.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async getManyAtHost(id: string) {
    const chats = await this.chatModel
      .find({ host: id }, { chats: false })
      .populate<{ guest: UserDocument }>('guest', 'name nickName', User.name);
    return chats.filter(({ guest }) => !!guest?.name);
  }

  async getManyAtGuest(id: string) {
    const chats = await this.chatModel
      .find({ guest: id }, { chats: false })
      .populate<{ host: UserDocument }>('host', 'name nickName', User.name);
    return chats.filter(({ host }) => !!host?.name);
  }

  async getOneByUsers(reqUser: string, another: string) {
    const chat = await this.chatModel
      .findOne({
        $or: [
          { host: reqUser, guest: another },
          { host: another, guest: reqUser },
        ],
      })
      .populate<{ host: UserDocument; guest: UserDocument }>(
        'host guest',
        'nickName name',
        User.name,
      );
    return chat?.host?.name && chat?.guest?.name ? chat : null;
  }

  async getOneByChatId(_id: string) {
    const chat = await this.chatModel
      .findOne({ _id })
      .populate<{ host: UserDocument; guest: UserDocument }>(
        'host guest',
        'nickName name',
        User.name,
      );

    if (chat.host?.name && chat.guest?.name) {
      return chat;
    } else {
      throw new HttpException('유저가 없습니다', HttpStatus.NOT_FOUND);
    }
  }

  async create(chatInfo: Chat) {
    const chat = await this.chatModel.create(chatInfo);
    return chat;
  }
}
