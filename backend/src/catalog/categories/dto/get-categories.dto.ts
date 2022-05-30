import { IsNumber } from 'class-validator';

export class GetCategoriesDto {
  @IsNumber()
  limit: number;

  @IsNumber()
  offset: number;
}
