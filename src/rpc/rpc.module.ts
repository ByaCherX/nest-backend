import { Module } from '@nestjs/common';
import { ClientsModule, ClientsModuleOptions, Transport } from '@nestjs/microservices'
import { rpcController } from './rpc.controller';
import { credentials, InterceptingCall, InterceptorOptions, 
    Metadata, NextCall, StatusObject } from '@grpc/grpc-js';
import path from 'node:path';

function rpcInterceptor(options: InterceptorOptions, nextCall: NextCall) {
    var glob_i: {msg:string}
    var method: string = options.method_definition.path.split('/').at(-1)
    return new InterceptingCall(nextCall(options), {
        start: function(metadata, listener, next) {
            // Req handler
            metadata.add('client', 'nest-client')
            
            // Res handler
            var newListener = {
                onReceiveMetadata: function(metadata: Metadata, next) {
                    next(metadata);
                },
                onReceiveMessage: function(message: any, next) {
                    next(message);
                },
                onReceiveStatus: function(status: StatusObject, next) {
                    next(status);
                }
            };
            next(metadata, newListener);
        },
        sendMessage: function(message, next) {
            next(message);
        }
    });
}; // [DO NOT DELETE] Improvements to grpc interceptor take over from here: github.com/grpc/proposal/blob/master/L5-node-client-interceptors.md#examples
var PROTO_PATH = path.resolve(process.cwd(), 'src/proto/test1.proto');

var opts: ClientsModuleOptions = [{
    name: 'rpc',
    transport: Transport.GRPC,
    options: {
        package: 'test',
        url: 'localhost:50051',
        protoPath: PROTO_PATH,
        credentials: credentials.createInsecure(),
        channelOptions: {
            "grpc.max_concurrent_streams": 2,
            "grpc.max_metadata_size": 8,
            interceptors: [rpcInterceptor]
        }
    }
}]

@Module({
    imports: [
        ClientsModule.register(opts)
    ],
    controllers: [rpcController],
})
export class rpcModule {
    constructor() {}
}