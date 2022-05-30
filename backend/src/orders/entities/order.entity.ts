import {
  BaseEntity,
  Cascade,
  Collection,
  Entity,
  Enum,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { OrderItem } from './order-item.entity';
import { DeliveryAddress } from '../../delivery-address/delivery-address.entity';
import { Shop } from '../../shop/shop.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { User } from '../../users/user.entity';
import { uuid } from 'aws-sdk/clients/customerprofiles';

export enum PaymentType {
  CARD = 'card',
  CASH = 'cash',
  ONLINE = 'online',
  INVOICE = 'invoice',
}

export enum ReceivingType {
  PICKUP = 'pickup',
  DELIVERY = 'delivery',
}

export enum Status {
  NEW = 'new',
  WORK = 'work',
  DELIVERY = 'delivery',
  PICKUP = 'pickup',
  DONE = 'done',
}

@Entity()
export class Order extends BaseEntity<Order, 'id'> {
  @PrimaryKey()
  id: string;

  @Property()
  firstName: string;

  @Property()
  phone: string;

  @Property({ nullable: true })
  comment: string;

  @Enum()
  paymentType: PaymentType;

  @Enum()
  receivingType: ReceivingType;

  @Enum({ default: Status.NEW })
  status: Status;

  @ManyToOne({ nullable: true })
  deliveryAddress: DeliveryAddress;

  @Property({ nullable: true })
  deliveryPrice: number;

  @ManyToOne(() => Shop, { nullable: true })
  shop: Shop;

  @Property()
  createdAt: Date = new Date();

  @ManyToOne(() => Cart)
  cart: Cart;

  @ManyToOne(() => User, { nullable: true })
  user: User;

  @OneToMany(() => OrderItem, (i) => i.order, {
    cascade: [Cascade.REMOVE],
  })
  items = new Collection<OrderItem>(this);

  @Property({ persist: false })
  get total() {
    return this.items.getItems().reduce((acc, i) => acc + i.total, 0);
  }
}
