import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Server } from 'socket.io';
import { Chat, ChatDocument } from './schemas/chat.schema';

@WebSocketGateway({
  namespace: 'chat',
  transports: ['websocket', 'polling'],
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit {
  private readonly logger = new Logger();
  constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) {}

  afterInit() {
    this.logger.log('Websocket initialized');
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('enter')
  connectSomeone(@MessageBody() data: string) {
    const [nickname, room] = data;
    this.logger.log(`${nickname}님이 코드: ${room}방에 접속했습니다.`);
    this.server.emit(`enter${room}`, `${nickname}님이 입장했습니다.`);
  }

  @SubscribeMessage('send')
  async sendMessage(@MessageBody() data: string) {
    const [room, name, message] = data;
    this.logger.log(`${room}방 ${name}님의 메시지: ${message}`);
    this.server.emit(`message${room}`, { name, message });
  }
}
