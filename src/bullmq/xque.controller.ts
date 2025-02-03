import { Controller, Post } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bull';

@Controller('xque')
export class xqueController {
  constructor(@InjectQueue('xque') private readonly xqueQ: Queue) {}

  @Post()
  async xqueT1() {
    await this.xqueQ.add('t1p', {
      t1data: 'xque_data->[]',
    });
  }
}
