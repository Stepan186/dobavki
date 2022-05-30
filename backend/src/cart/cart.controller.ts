import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartItemService } from './cart-item.service';

@Controller('carts')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    public cartItemService: CartItemService,
  ) {}

  @Post()
  create(@Body() dto: CreateCartDto) {
    return this.cartService.createCart(dto);
  }

  // @Put(':cartId')
  // update(@Param('cartId') cartId: number, @Body() dto: UpdateCartDto) {
  //   return this.cartService.updateCart(dto, cartId);
  // }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.cartService.getOne(id);
  }

  @Delete(':id')
  update(@Param() cartId: string) {
    return this.cartItemService.clearCart(cartId);
  }
}
