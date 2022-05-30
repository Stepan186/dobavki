import { IsOptional } from 'class-validator';

export class GetBrandsDto {
  @IsOptional()
  readonly limit? = 10;

  @IsOptional()
  readonly offset? = 0;
}
