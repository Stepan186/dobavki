import { IsAlpha, IsArray, IsNumber, IsString } from 'class-validator';

export class CreateDeliveryAddressDto {
  @IsString()
  city: string;

  @IsString()
  street: string;

  @IsString()
  house: string;

  @IsString()
  apartment: string;

  @IsString()
  floor: string;

  @IsString()
  porch: string;

  // @IsString()
  // postalCode: string;

  @IsArray()
  @IsNumber()
  user: number;
}
