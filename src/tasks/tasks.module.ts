import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  providers: [TasksService],
  imports: [ScheduleModule.forRoot()]
})
export class TasksModule {}
