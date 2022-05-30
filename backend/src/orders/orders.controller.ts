import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { uuid } from 'aws-sdk/clients/customerprofiles';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(dto);
  }

  @Delete(':id')
  delete(@Param() id: uuid) {
    return this.ordersService.deleteOneOrder(id);
  }

  @Put(':id')
  update(@Param() id: uuid, @Body() dto: UpdateOrderDto) {
    return this.ordersService.updateOrder(id, dto);
  }

  @Get()
  get() {
    return this.ordersService.getAll();
  }
}
