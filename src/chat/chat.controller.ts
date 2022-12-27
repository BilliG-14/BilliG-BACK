import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import JwtAuthGuard from 'src/auth/guard/jwt-auth.guard';
import { ChatService } from './chat.service';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class ChatController {
  constructor(readonly chatService: ChatService) {}

  @Get()
  async getChatsByUser(@Req() { user: { _id } }) {
    const chatsAtHost = await this.chatService.getManyAtHost(_id);
    const chatsAtGuest = await this.chatService.getManyAtGuest(_id);
    return [
      ...chatsAtHost.map(({ _id, guest, chats }) => ({
        _id,
        another: guest,
        chats,
      })),
      ...chatsAtGuest.map(({ _id, host, chats }) => ({
        _id,
        another: host,
        chats,
      })),
    ];
  }

  @Get(':id')
  async getChatById(@Param('id') id: string, @Req() { user: { _id } }) {
    const chat = await this.chatService.getOneByChatId(id);
    if (chat?.host?._id.toString() === _id.toString()) {
      const { _id, guest, chats } = chat.toObject();
      return { _id, another: guest, chats };
    } else {
      const { _id, host, chats } = chat.toObject();
      return { _id, another: host, chats };
    }
  }

  @Post()
  async createChat(@Req() { user }, @Body() body: { guest: string }) {
    const chat = await this.chatService.create({
      host: user._id,
      guest: body.guest,
    });
    const { _id, guest } = chat.toObject();
    return { _id, another: guest };
  }
}
