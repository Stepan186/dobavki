import { IsOptional, IsString } from 'class-validator';
export class UpdateCityDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  slug: string;
}
