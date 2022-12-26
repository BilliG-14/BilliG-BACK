import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  namespace: 'chat',
  transports: ['websocket', 'polling'],
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayInit {
  private readonly logger = new Logger();

  afterInit(server: any) {
    this.logger.log('Websocket initialized');
  }

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('enter')
  connectSomeone(@MessageBody() data: string, @ConnectedSocket() client) {
    const [nickname, room] = data;
    this.logger.log(`${nickname}님이 코드: ${room}방에 접속했습니다.`);
    client.emit(`enter${room}`, `${nickname}님이 입장했습니다.`);
  }

  @SubscribeMessage('send')
  sendMessage(@MessageBody() data: string, @ConnectedSocket() client) {
    const [room, name, message] = data;
    this.logger.log(`${room}방 ${name}님의 메시지: ${message}`);
    client.emit(`message${room}`, { name, message });
  }
}
