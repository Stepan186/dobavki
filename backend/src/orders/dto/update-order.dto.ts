import {
  IsArray,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { PaymentType, ReceivingType, Status } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Cart } from '../../cart/entities/cart.entity';

export class UpdateOrderDto {
  @IsString()
  firstName: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  comment: string;

  @IsIn(Object.values(PaymentType))
  paymentType: PaymentType;

  @IsIn(Object.values(ReceivingType))
  receivingType: ReceivingType;

  @IsIn(Object.values(Status))
  status: Status;

  @IsString()
  cart: Cart;

  @ValidateIf((o) => o.receivingType == ReceivingType.PICKUP)
  @IsString()
  shop: string;

  @IsArray()
  items: OrderItem[];
}
