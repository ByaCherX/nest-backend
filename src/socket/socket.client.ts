import { Injectable, OnModuleInit } from "@nestjs/common";

//@ts-ignore
import { Socket, io } from "socket.io-client";  

@Injectable()
export class SocketClient implements OnModuleInit {
  public socketClient: Socket;
  
  constructor() {
    
    this.socketClient = io('ws://localhost:3001',{
      //auth: ["auth-token"],
      //extraHeaders: {"wssh":"test"},
      //query: {"wss_ht":0}
    })
  }

  onModuleInit() {
    this.registerConsumerEvents()
  }

  private registerConsumerEvents() {
    this.socketClient.on('connect', () => {});
    this.socketClient.on('hello', (arg)=>console.log('0> ',arg))
    this.socketClient.on('events', (arg)=>{ console.log(arg) })
    setTimeout(()=>{ this.socketClient.emit('events', "somevar") },2000)
    //this.socketClient.emit('ping')
  }
}