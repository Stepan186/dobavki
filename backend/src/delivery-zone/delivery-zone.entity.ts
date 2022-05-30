import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { City } from '../cities/city.entity';

@Entity()
export class DeliveryZone extends BaseEntity<DeliveryZone, 'id'> {
  @PrimaryKey()
  id: number;

  @ManyToOne(() => City)
  city: City;

  @Property()
  name: string;

  @Property()
  deliveryPrice: number;

  @Property()
  freeDeliveryFrom: number;

  @Property({ type: 'jsonb' })
  geometry: [number];

  @Property()
  color: string;
}
