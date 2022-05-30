import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from '../../../users/user.entity';
import { Feedback } from './feedback.entity';

@Entity()
export class Message extends BaseEntity<Message, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  body: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Feedback)
  feedback: Feedback;
}
