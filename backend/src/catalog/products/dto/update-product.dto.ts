import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsString()
  brand: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsNumber()
  image: number;
}
