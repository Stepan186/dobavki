import {
  BaseEntity,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from '../../users/user.entity';
import { CartItem } from './cart-item.entity';
import { v4 } from 'uuid';

@Entity()
export class Cart extends BaseEntity<Cart, 'id'> {
  @PrimaryKey()
  id: string = v4();

  @ManyToOne(() => User, { nullable: true })
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems = new Collection<CartItem>(this);

  @Property({ persist: false })
  get total() {
    return this.cartItems.getItems().reduce((acc, i) => acc + i.total, 0);
  }
}
