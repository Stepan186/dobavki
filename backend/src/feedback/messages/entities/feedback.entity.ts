import { BaseEntity, Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { User } from '../../../users/user.entity';

@Entity()
export class Feedback extends BaseEntity<Feedback, 'id'> {
  @PrimaryKey()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => User)
  manager: User;
}
