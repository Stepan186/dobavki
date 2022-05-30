import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { PaymentType, ReceivingType } from '../entities/order.entity';
import { Type } from 'class-transformer';

export class DeliveryDto {
  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsString()
  house: string;

  @IsString()
  apartment: string;

  @IsString()
  floor: string;

  @IsString()
  porch: string;
}

export class CreateOrderDto {
  @IsString()
  firstName: string;

  @ValidateIf((o) => o.receivingType == ReceivingType.DELIVERY)
  @Type(() => DeliveryDto)
  @ValidateNested()
  deliveryAddress: DeliveryDto;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  comment: string;

  @IsIn(Object.values(PaymentType))
  paymentType: PaymentType;

  @IsIn(Object.values(ReceivingType))
  receivingType: ReceivingType;

  @IsString()
  cart: string;

  @ValidateIf((o) => o.receivingType == ReceivingType.PICKUP)
  @IsString()
  shop: string;
}
