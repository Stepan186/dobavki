import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateOrderDto } from './dto/create-order.dto';
import { CartService } from '../cart/cart.service';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CartItemService } from '../cart/cart-item.service';
import { EntityRepository } from '@mikro-orm/postgresql';
import { DadataService } from '../dadata/dadata.service';
import { DeliveryAddressService } from '../delivery-address/delivery-address.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { uuid } from 'aws-sdk/clients/customerprofiles';
import { Cart } from '../cart/entities/cart.entity';
import { DeliveryZonesService } from '../delivery-zone/delivery-zones.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: EntityRepository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: EntityRepository<OrderItem>,
    @InjectRepository(Cart) private cartRepository: EntityRepository<Cart>,
    private cartItemService: CartItemService,
    private cartService: CartService,
    private dadataService: DadataService,
    private deliverAddressService: DeliveryAddressService,
    private deliveryZonesService: DeliveryZonesService,
  ) {}

  async deleteOneOrder(orderId: uuid) {
    await this.orderRepository.nativeDelete(orderId);
  }

  async createOrder(dto: CreateOrderDto) {
    let zone = null;
    let deliveryAddress = null;
    let deliveryPrice = 0;
    const cart = await this.cartService.getOne(dto.cart);
    let total = cart.total;
    if (cart.cartItems.length < 1) {
      throw new HttpException(
        'В корзине должен быть хотя бы 1 товар',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (dto.receivingType === 'delivery') {
      const address = `${dto.deliveryAddress.city} ${dto.deliveryAddress.street} ${dto.deliveryAddress.house}`;
      const data = await this.dadataService.getCoords(address);
      zone = await this.deliveryZonesService.findByCoords(data.coords);
      deliveryAddress = await this.deliverAddressService.createDeliveryAddress(
        dto.deliveryAddress,
        data.postalCode,
        data.coords,
      );
      if (cart.total < zone.freeDeliveryFrom) {
        total += zone.deliveryPrice;
        deliveryPrice = zone.deliveryPrice;
      }
    }
    const order = this.orderRepository.create({
      user: cart.user,
      firstName: dto.firstName,
      phone: dto.phone,
      comment: dto.comment,
      shop: dto.shop,
      paymentType: dto.paymentType,
      receivingType: dto.receivingType,
      cart: cart.id,
      total: total,
      deliveryPrice: deliveryPrice,
      deliveryAddress: deliveryAddress,
    });
    const items = cart.cartItems.getItems().map((i) =>
      this.orderItemRepository.create({
        variant: i.variant,
        count: i.count,
        price: i.variant.price,
        order: order.id,
      }),
    );

    order.items.set(items);
    await this.orderItemRepository.persistAndFlush(items);
    await this.orderRepository.persistAndFlush(order);
    // await this.cartItemService.clearCart(cart.id);
    return order;
  }

  async updateOrder(orderId: uuid, dto: UpdateOrderDto) {
    const order = await this.orderRepository.findOne(orderId);
    order.assign(dto);
    await this.orderRepository.flush();
    return order;
  }

  async getAll() {
    return await this.orderRepository.findAll();
  }
}
