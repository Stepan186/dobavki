import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateDeliveryAddressDto } from './dto/create-delivery-address.dto';
import { DeliveryAddressService } from './delivery-address.service';

@Controller('delivery-address')
export class DeliveryAddressController {
  constructor(
    private readonly deliveryAddressService: DeliveryAddressService,
  ) {}

  // @Post()
  // create(@Body() dto: CreateDeliveryAddressDto) {
  //   return this.deliveryAddressService.createDeliveryAddress(
  //     dto,
  //     postalCode,
  //     coords,
  //   );
  // }

  @Get()
  get() {
    return this.deliveryAddressService.getAll();
  }
}
