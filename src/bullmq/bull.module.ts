import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { xqueModule } from './xque.module';

@Module({
  imports: [
    BullModule.forRoot({ redis: { host: 'localhost', port: 6379 } }),
    xqueModule, //_ xque_module (queue process ?)
  ],
})
export class rBullModule {}
