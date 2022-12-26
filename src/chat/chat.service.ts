import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Chat, ChatDocument } from './schemas/chat.schema';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  async getManyByUserId(id: string) {
    const chats = await this.chatModel
      .find({ $or: [{ host: id }, { guest: id }] }, { chats: false })
      .populate('host guest', 'nickName name', User.name);
    return chats;
  }

  async getOneByChatId(_id: string) {
    const chat = await this.chatModel
      .findOne({ _id })
      .populate('host guest', 'nickName name', User.name);
    return chat;
  }

  async create(chatInfo: Chat) {
    const chat = await this.chatModel.create(chatInfo);
    return chat;
  }
}
