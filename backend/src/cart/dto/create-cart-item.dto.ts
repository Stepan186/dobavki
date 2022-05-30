import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCartItemDto {
  @IsNumber()
  count: number;

  @IsString()
  product: string;

  @IsOptional()
  @IsString()
  variant: string;

  @IsString()
  cart: string;
}
