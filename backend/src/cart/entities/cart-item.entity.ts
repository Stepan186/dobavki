import {
  BaseEntity,
  Entity,
  Formula,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Cart } from './cart.entity';
import { Product } from '../../catalog/products/entities/product.entity';
import { ProductVariant } from '../../catalog/product-variants/entities/product-variant.entity';

@Entity()
export class CartItem extends BaseEntity<CartItem, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  count: number;

  @ManyToOne(() => ProductVariant, { nullable: true })
  variant: ProductVariant;

  @ManyToOne(() => Product)
  product: Product;

  @ManyToOne(() => Cart, { onDelete: 'cascade' })
  cart: Cart;

  @Property({ persist: false })
  get total() {
    return this.variant.price * this.count;
  }
}
