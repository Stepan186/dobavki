import {
  BaseEntity,
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Order } from './order.entity';
import { ProductVariant } from '../../catalog/product-variants/entities/product-variant.entity';
import { Product } from '../../catalog/products/entities/product.entity';

@Entity()
export class OrderItem extends BaseEntity<OrderItem, 'id'> {
  @PrimaryKey()
  id: number;

  @Property()
  count: number;

  @Property()
  price: number;

  @ManyToOne(() => ProductVariant)
  variant: ProductVariant;

  @ManyToOne(() => Order)
  order: Order;

  @Property({ persist: false })
  get total() {
    return this.variant.price * this.count;
  }
}
