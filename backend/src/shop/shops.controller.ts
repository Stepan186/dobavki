import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { ShopsService } from './shops.service';

@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  create(@Body() dto: CreateShopDto) {
    return this.shopsService.createShop(dto);
  }

  @Get()
  get() {
    return this.shopsService.getAll();
  }
}
