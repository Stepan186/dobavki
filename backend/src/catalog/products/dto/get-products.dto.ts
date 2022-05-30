import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetProductsDto {
  @IsOptional()
  readonly limit? = 10;

  @IsOptional()
  readonly offset? = 0;

  @IsOptional()
  @IsString()
  readonly categorySlug: string;
}
