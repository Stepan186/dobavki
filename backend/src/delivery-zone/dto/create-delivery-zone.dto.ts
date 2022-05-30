import { IsArray, IsJSON, IsNumber, IsObject, IsString } from 'class-validator';

export class CreateDeliveryZoneDto {
  @IsString()
  city: string;

  @IsString()
  name: string;

  @IsNumber()
  deliveryPrice: number;

  @IsNumber()
  freeDeliveryFrom: number;

  @IsString()
  color: string;

  @IsArray()
  geometry: [number];
}
