import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Brand } from './brand.entity';
import { EntityRepository } from '@mikro-orm/core';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { GetBrandsDto } from './dto/get-brands.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandsRepository: EntityRepository<Brand>,
  ) {}

  async createBrand(dto: CreateBrandDto) {
    const brand = this.brandsRepository.create(dto);
    await this.brandsRepository.persistAndFlush(brand);
    return brand;
  }

  async getBrands(dto: GetBrandsDto) {
    return await this.brandsRepository.findAndCount({}, dto);
  }

  async getBrand(brandGuid: string) {
    return await this.brandsRepository.findOne(brandGuid);
  }

  async updateBrand(brandGuid: string, dto: UpdateBrandDto) {
    const brand = await this.brandsRepository.findOne(brandGuid);
    brand.assign(dto);
    await this.brandsRepository.flush();
    return brand;
  }

  async deleteBrand(brandGuid: string) {
    await this.brandsRepository.nativeDelete(brandGuid);
  }
}
