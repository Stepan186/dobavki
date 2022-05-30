import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { Upload } from '../uploads/entities/uploud.entity';
import { v4 } from 'uuid';

@Entity()
export class Brand extends BaseEntity<Brand, 'guid'> {
  @PrimaryKey()
  guid: string = v4();
  [PrimaryKeyType]: string;

  @Property()
  name!: string;

  @ManyToOne(() => Upload, { nullable: true, eager: true })
  image: number;
}
