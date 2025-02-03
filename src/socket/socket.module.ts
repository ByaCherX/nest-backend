import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketClient } from './socket.client';

@Module({
  providers: [SocketGateway, SocketClient],
})
export class SocketModule {}