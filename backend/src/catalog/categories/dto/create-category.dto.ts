import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Category } from '../category.entity';

export class CreateCategoryDto {
  @IsString()
  name!: string;

  @IsInt()
  ordering!: number;

  @IsOptional()
  @IsInt()
  image?: number;

  @IsOptional()
  @IsArray()
  @Type(() => CreateCategoryDto)
  @ValidateNested({ each: true })
  children: Category[];
}
