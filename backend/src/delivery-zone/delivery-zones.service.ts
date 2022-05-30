import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { DeliveryZone } from './delivery-zone.entity';
import * as pointInPolygon from 'point-in-polygon';
import { CreateDeliveryZoneDto } from './dto/create-delivery-zone.dto';

@Injectable()
export class DeliveryZonesService {
  constructor(
    @InjectRepository(DeliveryZone)
    private deliveryZoneRepository: EntityRepository<DeliveryZone>,
  ) {}

  async createZone(dto: CreateDeliveryZoneDto) {
    const deliveryZone = this.deliveryZoneRepository.create(dto);
    await this.deliveryZoneRepository.persistAndFlush(deliveryZone);
    return deliveryZone;
  }

  async getZones() {
    return this.deliveryZoneRepository.findAll();
  }

  async findByCoords(coords: number[]): Promise<DeliveryZone | null> {
    const zones = await this.deliveryZoneRepository.findAll();
    for (const zone of zones) {
      if (pointInPolygon(coords, zone.geometry[0])) {
        return zone;
      }
    }
  }
}
