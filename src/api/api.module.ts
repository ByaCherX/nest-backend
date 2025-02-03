// test-n API

import { DynamicModule, MiddlewareConsumer, Module, NestModule, Provider, Scope } from '@nestjs/common';
import { ApiService } from './api.service'; //? Service
import { ApiController } from './api.controller';
import { ApiMiddleware } from './api.middleware'; //_ Middleware

//? Sub-modules
import { xApiModule } from './xapi/xapi.module';

const apiservice: Provider<ApiService> = {
  provide: ApiService,
  useFactory: (options: Record<string, boolean>) => {
    const apiservice = new ApiService(options)
    //apiservice.mutex = "0xE3C10D8F"  //![unsafe]: FORCE MUTEX
    return apiservice
  },
  inject: [
    { token: 'MUTEX_OP', optional: false }
  ],
  scope: Scope.DEFAULT,
  //durable: true
}


@Module({})
export class ApiModule implements NestModule {
  constructor() {
    // ApiService builded and Injected <<
  }

  static register(options: Record<string, boolean>): DynamicModule {
    return  {
      module: ApiModule,
      providers: [
        {
          provide: 'MUTEX_OP',
          useValue: options
        },
        apiservice
      ],
      controllers: [ApiController],
      imports: [xApiModule],
      exports: [apiservice]
    }
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ApiMiddleware).forRoutes('/api');
  }
}
