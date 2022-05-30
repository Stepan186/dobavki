import { IsArray, IsOptional, IsString } from 'class-validator';
import { DeliveryZone } from '../../delivery-zone/delivery-zone.entity';

export class CreateCityDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  deliveryZones: DeliveryZone[];

  @IsOptional()
  @IsString()
  slug: string;
}
