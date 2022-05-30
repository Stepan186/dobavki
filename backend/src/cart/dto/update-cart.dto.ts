import { IsArray } from 'class-validator';
import { CartItem } from '../entities/cart-item.entity';

export class UpdateCartDto {
  @IsArray()
  cartItems: CartItem[];
}
