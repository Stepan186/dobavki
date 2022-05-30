import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Upload } from '../../uploads/entities/uploud.entity';

@Entity({ tableName: 'promos' })
export class Promo extends BaseEntity<Promo, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @ManyToOne(() => Upload, { eager: true, nullable: true })
  image: Upload;
}
