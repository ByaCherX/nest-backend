import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { xqueProcessor } from './xque.service';
import { xqueController } from './xque.controller';

//? Processor

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'xque',
    }),
  ],
  providers: [xqueProcessor],
  controllers: [xqueController],
})
export class xqueModule {}
