import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DeliveryAddressService } from './delivery-address.service';
import { DeliveryAddressController } from './delivery-address.controller';
import { DeliveryAddress } from './delivery-address.entity';

@Module({
  imports: [MikroOrmModule.forFeature([DeliveryAddress])],
  exports: [DeliveryAddressService],
  providers: [DeliveryAddressService],
  controllers: [DeliveryAddressController],
})
export class DeliveryAddressModule {}
