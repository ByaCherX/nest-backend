import { DynamicModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { coreMiddleware } from './core.middleware';



@Module({
  imports: [],
  controllers: [CoreController],
  providers: [CoreService],
  exports: [],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(coreMiddleware).forRoutes('core')
  }

  static register(options): DynamicModule {
    return {
      imports: [],
      module: CoreModule,
      providers: [],
      exports: [],
    };
  }
}