import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Shop } from './shop.entity';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private shopRepository: EntityRepository<Shop>,
  ) {}

  async createShop(dto) {
    const shop = this.shopRepository.create(dto);
    await this.shopRepository.persistAndFlush(shop);
    return shop;
  }

  async getAll() {
    return this.shopRepository.findAll();
  }
}
