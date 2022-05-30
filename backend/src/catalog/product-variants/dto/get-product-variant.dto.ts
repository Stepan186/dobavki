import { IsDecimal, IsObject, IsString } from 'class-validator';
import { Brand } from '../../../brands/brand.entity';
import { Category } from '../../categories/category.entity';

export class GetProductVariantDto {
  @IsString()
  title: string;

  @IsObject()
  category: Category;

  @IsDecimal()
  salePrace: number;

  @IsDecimal()
  price: number;

  @IsString()
  description: string;

  @IsObject()
  brand: Brand;
}
