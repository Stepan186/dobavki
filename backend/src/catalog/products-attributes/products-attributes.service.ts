import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { ProductAttribute } from './product-attribute.entity';

@Injectable()
export class ProductsAttributesService {
  constructor(
    @InjectRepository(ProductAttribute)
    private productAttributeRepository: EntityRepository<ProductAttribute>,
  ) {}

  async create(dto) {
    const productAttribute = this.productAttributeRepository.create(dto);
    await this.productAttributeRepository.persistAndFlush(productAttribute);
    return productAttribute;
  }

  async findAll() {
    return this.productAttributeRepository.findAll();
  }
}
