import { InjectRepository } from '@mikro-orm/nestjs';
import { Body, Injectable, Post } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsDto } from './dto/get-products.dto';
import { FilterQuery } from '@mikro-orm/core';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repo: EntityRepository<Product>,
  ) {}

  async createProduct(dto: CreateProductDto) {
    const product = this.repo.create(dto);
    await this.repo.persistAndFlush(product);
    return product;
  }

  async getProducts(dto: GetProductsDto) {
    const where: FilterQuery<Product> = {
      $and: [],
    };
    if (dto.categorySlug) {
      where.$and.push({ category: { slug: dto.categorySlug } });
    }
    return await this.repo.findAndCount(where, {
      populate: ['variants'],
      limit: dto.limit,
      offset: dto.offset,
    });
  }

  async getProduct(productGuid: string) {
    return await this.repo.findOne(productGuid, { populate: ['variants'] });
  }

  async deleteProduct(productGuid: string) {
    await this.repo.nativeDelete(productGuid);
  }

  async updateProduct(productGuid: string, dto: UpdateProductDto) {
    const product = await this.repo.findOne(productGuid);
    product.assign(dto);
    await this.repo.flush();
    return product;
  }
}
