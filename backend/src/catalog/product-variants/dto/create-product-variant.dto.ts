import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Category } from '../../categories/category.entity';
import { ProductAttribute } from '../../products-attributes/product-attribute.entity';

export class StockDto {
  @IsNumber()
  remains: number;
}

export class CreateProductVariantDto {
  @IsString()
  title: string;

  @IsString()
  category: Category;

  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsBoolean()
  isNew: boolean;

  @IsNumber()
  price: number;

  @IsOptional()
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

  @Type(() => StockDto)
  @ValidateNested({ each: true })
  stocks: StockDto;

  @IsString()
  product: string;
}
