import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { OrderItem } from './entities/order-item.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: EntityRepository<OrderItem>,
  ) {}

  async create(dto: CreateOrderDto) {
    const orderItem = this.orderItemRepository.create(dto);
    await this.orderItemRepository.persistAndFlush(orderItem);
    return orderItem;
  }

  async updateOrderItem(orderItemId: number, dto: UpdateOrderItemDto) {
    const orderItem = await this.orderItemRepository.findOne(orderItemId, {
      populate: ['variant'],
    });
    orderItem.assign(dto);
    await this.orderItemRepository.flush();
    return orderItem;
  }

  async delete(orderItemId: number) {
    await this.orderItemRepository.nativeDelete(orderItemId);
  }
}
