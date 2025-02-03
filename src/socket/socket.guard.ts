import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Logger } from "@nestjs/common";


@Injectable()
export class socketGuard implements CanActivate {
  canActivate(context: ExecutionContext): any {
    const ws_client = context.switchToWs().getClient()
    const ws_data   = context.switchToWs().getData()

    Logger.debug(ws_client.handshake.headers, 'ws')

    return true
  }
}
