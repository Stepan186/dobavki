import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Message } from './messages/entities/message.entity';
import { Feedback } from './messages/entities/feedback.entity';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';

@Module({
  imports: [MikroOrmModule.forFeature([Feedback, Message])],
  exports: [],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class FeedbackModule {}
