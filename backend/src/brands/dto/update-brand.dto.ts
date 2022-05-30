import { IsNumber, IsString } from 'class-validator';

export class UpdateBrandDto {
  @IsString()
  name: string;

  @IsNumber()
  image: number;
}
