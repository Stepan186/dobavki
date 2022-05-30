import { Module } from '@nestjs/common';
import { SynchronizationController } from './synchronization.controller';
import { SynchronizationService } from './synchronization.service';

@Module({
  imports: [],
  exports: [],
  providers: [SynchronizationService],
  controllers: [SynchronizationController],
})
export class SynchronizationModule {}
