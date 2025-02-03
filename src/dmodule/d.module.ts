import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigService } from './d.service';

@Module({})
export class DymModule {
  static register(options: Record<string, any>): DynamicModule {
    return {
      module: DymModule,
      providers: [ConfigService],
      exports: [ConfigService],
    };
  }
}
