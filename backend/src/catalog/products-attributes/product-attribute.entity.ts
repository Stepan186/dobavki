import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Attribute } from '../attributes/attribute.entity';
import { Product } from '../products/entities/product.entity';

@Entity()
export class ProductAttribute extends BaseEntity<ProductAttribute, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  value: string | number;

  @Property()
  isChoisable: boolean;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Attribute)
  attribute: Attribute;
}
