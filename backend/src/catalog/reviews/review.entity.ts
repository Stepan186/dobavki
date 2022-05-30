import {
  BaseEntity,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { User } from '../../users/user.entity';
import { Product } from '../products/entities/product.entity';

@Entity()
export class Review extends BaseEntity<Review, 'id'> {
  @PrimaryKey()
  id: number;

  @Property({ length: 5000 })
  description: string;

  @ManyToOne(() => Product)
  product: Product;

  @OneToOne(() => User)
  user: User;
}
