import {
  BaseEntity,
  Cascade,
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { DeliveryZone } from '../delivery-zone/delivery-zone.entity';
import { v4 } from 'uuid';

@Entity()
export class City extends BaseEntity<City, 'guid'> {
  @PrimaryKey()
  guid: string = v4();
  [PrimaryKeyType]: string;

  @Property()
  name!: string;

  @Property({ unique: true })
  slug: string;

  @OneToMany(() => DeliveryZone, 'city', {
    cascade: [Cascade.ALL],
  })
  deliveryZones = new Collection<DeliveryZone>(this);
}
