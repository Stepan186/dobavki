import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItem } from './entities/cart-item.entity';
import { CartService } from './cart.service';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private repositoryCartItem: EntityRepository<CartItem>,
    private readonly cartService: CartService,
  ) {}

  async addItem(dto: CreateCartItemDto) {
    const cartItem = this.repositoryCartItem.create(dto);
    await this.repositoryCartItem.persistAndFlush(cartItem);
    return await this.cartService.getOne(dto.cart);
  }

  async removeItem(cartItemId: number) {
    const item = await this.repositoryCartItem.findOne(cartItemId);
    await this.repositoryCartItem.removeAndFlush(item);
    return await this.cartService.getOne(item.cart.id);
  }

  async getItems() {
    return this.repositoryCartItem.findAll();
  }

  async clearCart(cartId: string) {
    await this.repositoryCartItem.nativeDelete({ cart: cartId });
    return await this.cartService.getOne(cartId);
  }
}
