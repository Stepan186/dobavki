import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItemsService } from './order-items.service';

@Controller('order-items')
export class OrderItemsController {
  constructor(private orderItemService: OrderItemsService) {}

  @Put(':id')
  update(@Param() orderItemId: number, @Body() dto: UpdateOrderItemDto) {
    return this.orderItemService.updateOrderItem(orderItemId, dto);
  }

  @Delete(':id')
  delete(@Param() id: number) {
    return this.orderItemService.delete(id);
  }
}
