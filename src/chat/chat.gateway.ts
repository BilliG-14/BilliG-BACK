import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway(5001, { namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('enter')
  connectSomeone(@MessageBody() data: string, @ConnectedSocket() client) {
    const [nickname, room] = data;
    console.log(`${nickname}님이 코드: ${room}방에 접속했습니다.`);
    client.emit(`enter${room}`, `${nickname}님이 입장했습니다.`);
  }

  @SubscribeMessage('message')
  sendMessage(@MessageBody() data: string, @ConnectedSocket() client) {
    const [room, name, message] = data;
    client.emit(`message${room}`, [name, message]);
  }
}
