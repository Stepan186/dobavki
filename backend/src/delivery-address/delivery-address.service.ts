import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { DeliveryAddress } from './delivery-address.entity';

@Injectable()
export class DeliveryAddressService {
  constructor(
    @InjectRepository(DeliveryAddress)
    private deliveryAddressRepository: EntityRepository<DeliveryAddress>,
  ) {}

  async createDeliveryAddress(dto, postalCode, coords) {
    const deliveryAddress = await this.deliveryAddressRepository.create({
      ...dto,
      postalCode: postalCode,
      coords: coords,
    });
    await this.deliveryAddressRepository.persistAndFlush(deliveryAddress);
    return deliveryAddress;
  }

  async getAll() {
    return this.deliveryAddressRepository.findAll();
  }
}
