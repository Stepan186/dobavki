import { IsNumber } from 'class-validator';

export class CreateStockDto {
  @IsNumber()
  product: number;

  @IsNumber()
  city: number;
}
