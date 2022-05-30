import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: EntityRepository<Cart>,
  ) {}

  async createCart(dto: CreateCartDto) {
    const cart = this.cartRepository.create(dto);
    await this.cartRepository.persistAndFlush(cart);
    return cart;
  }

  async getCarts() {
    return await this.cartRepository.findAll();
  }

  async getOne(cartId: string) {
    return await this.cartRepository.findOne(cartId, {
      populate: ['cartItems', 'cartItems.total', 'cartItems.product'],
    });
  }

  // async getOrCreate(cartId: number) {
  //   let cart = await this.cartRepository.findOne(cartId);
  //   if (!cart) {
  //     cart = this.cartRepository.create(cartId);
  //     await this.cartRepository.persistAndFlush(cart);
  //   }
  //   return cart;
  // }

  // async getOrCreate(cartId: number, dto: CreateCartDto) {
  //   let cart = await this.cartRepository.findOne(cartId);
  //   if (!cart) {
  //     cart = await this.cartRepository.create(dto);
  //     await this.cartRepository.persistAndFlush(cart);
  //   }
  //   return cart;
  // }

  // async addCartItem(dto: CreateCartItemDto) {
  //   const cart = await this.cartRepository.findOne(dto.cart);
  //   let itemsPrice = 0;
  //   for (let i = 0; i < cart.cartItems.length; i++) {
  //     itemsPrice = itemsPrice + cart.cartItems[i].price;
  //   }
  //   cart.total = itemsPrice;
  //   await this.cartRepository.flush();
  //   return cart;
  // }
  //
  // async deleteCartItem(cartId) {
  //   const cart = await this.cartRepository.findOne(cartId, { refresh: true });
  //   let itemsPrice = 0;
  //   console.log(cart.cartItems);
  //   for (let i = 0; i < cart.cartItems.length; i++) {
  //     itemsPrice = itemsPrice + cart.cartItems[i].price;
  //   }
  //   cart.total = itemsPrice;
  //
  //   await this.cartRepository.flush();
  //   return cart;
  // }
}
