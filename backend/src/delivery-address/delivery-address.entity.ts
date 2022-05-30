import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from '../users/user.entity';

@Entity()
export class DeliveryAddress extends BaseEntity<DeliveryAddress, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  city: string;

  @Property()
  street: string;

  @Property()
  house: string;

  @Property()
  apartment: string;

  @Property()
  floor: string;

  @Property({ nullable: true })
  porch: string;

  @Property()
  postalCode: string;

  @Property({ type: 'jsonb' })
  coords: [number, number];

  @ManyToOne(() => User, { nullable: true })
  user: User;
}
