import { IsNumber, IsString } from 'class-validator';

export class UpdateOrderItemDto {
  @IsNumber()
  count: number;

  @IsNumber()
  price: number;

  @IsString()
  product: string;
}
