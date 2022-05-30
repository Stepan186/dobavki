import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DeliveryZone } from './delivery-zone.entity';
import { DeliveryZonesService } from './delivery-zones.service';
import { DeliveryZonesController } from './delivery-zones.controller';

@Module({
  imports: [MikroOrmModule.forFeature([DeliveryZone])],
  exports: [DeliveryZonesService],
  providers: [DeliveryZonesService],
  controllers: [DeliveryZonesController],
})
export class DeliveryZoneModule {}
