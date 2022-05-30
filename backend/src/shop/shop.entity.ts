import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { City } from '../cities/city.entity';
import { v4 } from 'uuid';

@Entity()
export class Shop extends BaseEntity<Shop, 'guid'> {
  @PrimaryKey()
  guid: string = v4();
  [PrimaryKeyType]: string;

  @Property()
  name: string;

  @Property({ nullable: true })
  schedule: string;

  @ManyToOne(() => City, { nullable: true })
  city: City;
}
