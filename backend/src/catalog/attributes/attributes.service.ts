import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Attribute } from './attribute.entity';
import { EntityRepository } from '@mikro-orm/core';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

@Injectable()
export class AttributesService {
  constructor(
    @InjectRepository(Attribute)
    private attributesRepository: EntityRepository<Attribute>,
  ) {}

  async createAttribute(dto) {
    const attribute = this.attributesRepository.create(dto);
    await this.attributesRepository.persistAndFlush(attribute);
    return attribute;
  }

  async getAttribute(attributeId) {
    return await this.attributesRepository.findOne(attributeId);
  }

  async getAttributes() {
    return await this.attributesRepository.findAll();
  }

  async deleteAttribute(attributeId) {
    await this.attributesRepository.nativeDelete(attributeId);
  }

  async updateAttribute(attributeId, dto) {
    const attribute = await this.attributesRepository.findOne(attributeId);
    attribute.assign(dto);
    await this.attributesRepository.persist(attribute);
    return attribute;
  }
}
