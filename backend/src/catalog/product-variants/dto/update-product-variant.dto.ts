import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductAttribute } from '../../products-attributes/product-attribute.entity';

export class UpdateProductVariantDto {
  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsString()
  brand: string;

  @IsBoolean()
  isNew: boolean;

  @IsNumber()
  price: number;

  @IsBoolean()
  isPopular: boolean;

  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  image: number;

  @IsOptional()
  @IsArray()
  productAttribute: ProductAttribute;
}
