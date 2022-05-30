import {
  BaseEntity,
  Cascade,
  Entity,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { ProductVariant } from '../../catalog/product-variants/entities/product-variant.entity';
import { Shop } from '../../shop/shop.entity';

@Entity()
export class Stock extends BaseEntity<Stock, 'variant' | 'shop'> {
  // @PrimaryKey()
  // guid: string = v4();
  // [PrimaryKeyType]: string;

  @ManyToOne(() => ProductVariant, {
    nullable: true,
    primary: true,
    cascade: [Cascade.REMOVE],
  })
  variant: ProductVariant;

  @ManyToOne(() => Shop, { primary: true })
  shop: Shop;

  @Property()
  remains: number;

  @Property({ onUpdate: () => new Date() })
  updateAt: Date = new Date();
}
