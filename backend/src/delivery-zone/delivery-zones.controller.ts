import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDeliveryZoneDto } from './dto/create-delivery-zone.dto';
import { DeliveryZonesService } from './delivery-zones.service';

@Controller('delivery-zones')
export class DeliveryZonesController {
  constructor(private readonly deliveryZoneService: DeliveryZonesService) {}

  @Post()
  create(@Body() dto: CreateDeliveryZoneDto) {
    return this.deliveryZoneService.createZone(dto);
  }

  @Get()
  getAll() {
    return this.deliveryZoneService.getZones();
  }
}
