import { IsJSON, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateShopDto {
  @IsString()
  name: string;

  @IsNumber()
  city: number;

  @IsObject()
  schedule;
}
