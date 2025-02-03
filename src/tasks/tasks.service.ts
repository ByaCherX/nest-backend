import { Injectable, Logger } from '@nestjs/common';
import {
  Cron,
  CronExpression,
  Interval,
  SchedulerRegistry,
  Timeout,
} from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron('*/5 * * * * *', { name: 'notifications' })
  handleCron() {
    this.logger.debug('Cron Time Runner Called');
  }

  @Timeout(16000)
  handleTimeout() {
    this.logger.warn('Nestjs Tasks Service <Stopping>');

    const job = this.schedulerRegistry.getCronJob('notifications');
    job.stop();
    console.log(job.lastDate());
  }
  @Timeout(28000)
  handleTimeoutStart() {
    this.logger.warn('Nestjs Tasks Service <Starting>');

    const job = this.schedulerRegistry.getCronJob('notifications');
    job.start();
    console.log('job started');
  }
}
