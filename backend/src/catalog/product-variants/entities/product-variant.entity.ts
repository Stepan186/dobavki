import {
  BaseEntity,
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { Upload } from '../../../uploads/entities/uploud.entity';
import { Stock } from '../../../stocks/entities/stock.entity';
import { v4 } from 'uuid';
import { Product } from '../../products/entities/product.entity';

@Entity()
export class ProductVariant extends BaseEntity<ProductVariant, 'guid'> {
  @PrimaryKey()
  guid: string = v4();
  [PrimaryKeyType]: string;

  @Property()
  title!: string;

  @Property({ nullable: true })
  salePrice: number;

  @Property({ default: false })
  isNew!: boolean;

  @Property({ default: false })
  isPopular: boolean;

  @Property()
  price!: number;

  @ManyToOne(() => Upload, { nullable: true })
  image: number;

  @OneToMany(() => Stock, (stock) => stock.variant, { orphanRemoval: true })
  stocks = new Collection<Stock>(this);

  @ManyToOne(() => Product, { cascade: [Cascade.REMOVE] })
  product: Product;

  @Property({ onUpdate: () => new Date() })
  updateAt: Date = new Date();
}
