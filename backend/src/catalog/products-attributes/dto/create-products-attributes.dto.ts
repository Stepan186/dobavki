import { Allow, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateProductsAttributesDto {
  @IsString()
  product: string;

  @IsNumber()
  attribute: number;

  @Allow()
  value: string;

  @IsBoolean()
  isChoisable: boolean;
}
