import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  brand: string;

  @IsNumber()
  image: number;

  @IsOptional()
  @IsNumber()
  price: number;
}
