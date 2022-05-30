import {
  BaseEntity,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { Upload } from '../../uploads/entities/uploud.entity';
import { v4 } from 'uuid';
@Entity()
export class Category extends BaseEntity<Category, 'guid'> {
  @PrimaryKey()
  guid: string = v4();
  [PrimaryKeyType]: string;

  @Property()
  name!: string;

  @Property({ nullable: true })
  ordering!: number;

  @ManyToOne(() => Upload, { nullable: true })
  image?: Upload;

  @ManyToOne(() => Category, { nullable: true })
  parent: Category;

  @OneToMany(() => Category, (c) => c.parent)
  children = new Collection<Category>(this);

  @Property({ default: false })
  isPopular: boolean;

  @Property({ unique: true })
  slug: string;

  @Property({ nullable: true })
  metaTitle: string;

  @Property({ nullable: true })
  metaDescription: string;

  @Property({ onUpdate: () => new Date() })
  updateAt: Date = new Date();
}
