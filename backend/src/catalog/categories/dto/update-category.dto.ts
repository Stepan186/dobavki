import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  ordering: number;

  @IsOptional()
  @IsNumber()
  image: number;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  metaTitle: string;

  @IsOptional()
  @IsString()
  metaDescription: string;

  @IsBoolean()
  isPopular: boolean;
}
