import { OnModuleInit, UseGuards } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, 
  WebSocketServer, WsResponse } from '@nestjs/websockets';
import { from, Observable, map } from 'rxjs';
import { Server } from 'socket.io';
import { WebSocketServer as wsServer } from 'ws';
import { socketGuard } from './socket.guard';

@UseGuards(socketGuard)
@WebSocketGateway({
  cors: {origin: '*'},
  path: '/',
})
export class SocketGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    // Middleware
    this.server.use(async (socket, next) => {
      next()
    })
    this.server.on('connection', (socket) => {
      console.log(socket.id)
      //socket.join('room1')
      
      socket.on('disconnect', () => {
        console.log(socket.id,'disconnected')
      })
      //socket.on("ping", (callback) => { callback() })
    })
    //setTimeout(()=>{ this.server.to('room1').emit('hello', 0) },5000)
  }

  @SubscribeMessage('ping')
  onMessage() {}

  @SubscribeMessage('events')
  eventHandle(@MessageBody() data: number): Observable<WsResponse<number>> {
    const event: string = "events"
    const response = [1,2,3];
    
    return from(response).pipe(
      map(data => ({ event, data }))
    )
  }

  @SubscribeMessage('msg')
  message(@MessageBody('id') data: number) {
    console.log(data)
  }
}

/** Hyper Tunnel @Experimental */
@WebSocketGateway({
  cors: {origin: '*'},
  path: '/ws',
})
export class HT_Gateway implements OnModuleInit {
  @WebSocketServer()
  server: wsServer

  onModuleInit() {
    //! socket is client >>>
    this.server.on('connection', (socket) => {
      console.log('connected some one')
      //socket.emit('message', "wss-standart")
    })
  }

  @SubscribeMessage('ping')
  onMessage(@MessageBody() body: any) {
    console.log(body)
  }
}