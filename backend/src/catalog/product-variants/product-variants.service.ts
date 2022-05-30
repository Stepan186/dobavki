import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { HttpService } from '@nestjs/axios';
import { ProductVariant } from './entities/product-variant.entity';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectRepository(ProductVariant)
    private productsVariantRepository: EntityRepository<ProductVariant>,
    private axios: HttpService,
  ) {}

  async createProductVariants(dto: CreateProductVariantDto) {
    const productVariant = this.productsVariantRepository.create(dto);
    await this.productsVariantRepository.persistAndFlush(productVariant);
    return productVariant;
  }

  async getProductVariant(productGuid: string) {
    return await this.productsVariantRepository.findOne({ guid: productGuid });
  }

  async getProductVariants() {
    return this.productsVariantRepository.findAll();
  }

  async deleteProductVariant(productGuid: string) {
    await this.productsVariantRepository.nativeDelete({ guid: productGuid });
  }

  async updateProductVariant(
    productGuid: string,
    dto: UpdateProductVariantDto,
  ) {
    const productVariant = await this.productsVariantRepository.findOne({
      guid: productGuid,
    });
    productVariant.assign(dto);
    await this.productsVariantRepository.flush();
    return productVariant;
  }
}
