import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CartModule } from '../cart/cart.module';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { DadataModule } from '../dadata/dadata.module';
import { DeliveryAddressModule } from '../delivery-address/delivery-address.module';
import { DeliveryZoneModule } from '../delivery-zone/delivery-zone.module';
import { Cart } from '../cart/entities/cart.entity';
import { OrderItemsController } from './order-items.controller';
import { OrderItemsService } from './order-items.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([Order, OrderItem, Cart]),
    CartModule,
    DadataModule,
    DeliveryZoneModule,
    DeliveryAddressModule,
  ],
  exports: [],
  controllers: [OrdersController, OrderItemsController],
  providers: [OrdersService, OrderItemsService],
})
export class OrdersModule {}
