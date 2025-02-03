import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

@Processor('xque')
export class xqueProcessor {
  private readonly logger = new Logger(xqueProcessor.name);

  @Process('t1p')
  handle_t1p(job: Job) {
    this.logger.debug('Starting t1p...');
    this.logger.debug('t1p completed');
  }
}
