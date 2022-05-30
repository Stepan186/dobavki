import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Controller('cart-items')
export class CartItemController {
  constructor(private readonly service: CartItemService) {}

  @Post()
  create(@Body() dto: CreateCartItemDto) {
    return this.service.addItem(dto);
  }

  @Delete(':id')
  delete(@Param() id: number) {
    return this.service.removeItem(id);
  }
}
