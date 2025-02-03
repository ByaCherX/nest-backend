import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';     // Controller
import { AppService } from './app.service';           // Service

//? Middleware
import { AppMiddleware } from './app.middleware';     // Middleware

//? Modules
import { CoreModule } from './core/core.module';      // Core
import { ApiModule } from './api/api.module';         // API
import { UsersModule } from './users/users.module';   // User
import { DataBase } from './db/db.module';            // DataBase
import { AuthModule } from './auth/auth.module';      // Auth
import { TasksModule } from './tasks/tasks.module';   // CRON
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';  // Throttler
import { createCache } from 'cache-manager';
import { SocketModule } from './socket/socket.module';
import { TerminusModule } from '@nestjs/terminus'
import { rpcModule } from './rpc/rpc.module';


/** App Module
 *
 ** How the app works
 * Middleware   | > Layer
 * Guard        | > Auth/Security
 * Interceptor  | > CallHandler
 * Pipe         | > Validation
 * Controller   | > Router
 * Service      | > Provider
 * Filter       | > ExceptionFilter (AnyTime)
 * 
 */
@Module({
  imports: [
    CoreModule,
    ApiModule.register({mutex: true, rlock: false}),
    UsersModule,
    DataBase,
    AuthModule,
    CacheModule.register({ttl: 10000}),
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot([{
      name: 'Global_Rate_Limit',
      ttl: 1000,
      limit: 3
    }]),
    //rpcModule,
    //SocketModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppMiddleware).forRoutes('/')
  }
  constructor(private appService: AppService) {
    appService.eventEmit.addListener('val', (val)=>{console.log(val)})
  }

  static reg() { return 'app_reg' }
}