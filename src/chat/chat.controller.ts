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
    const chats = await this.chatService.getManyByUserId(_id);
    return chats;
  }

  @Get(':id')
  async getChatById(@Param('id') id: string) {
    const chat = await this.chatService.getOneByChatId(id);
    return chat;
  }

  @Post()
  async createChat(
    @Req() { user: { _id } },
    @Body() { guest }: { guest: string },
  ) {
    const chat = await this.chatService.create({
      host: _id,
      guest: guest,
    });
    return chat;
  }
}
