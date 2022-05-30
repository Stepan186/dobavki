import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SynchronizationService } from './synchronization.service';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { ProductVariantsService } from './product-variants.service';
import { UpdateProductVariantDto } from './dto/update-product-variant.dto';

@Controller('product-variants')
export class ProductVariantsController {
  constructor(
    private readonly service: ProductVariantsService,
    private readonly synchService: SynchronizationService,
  ) {}

  @Post()
  create(@Body() dto: CreateProductVariantDto) {
    return this.service.createProductVariants(dto);
  }

  @Get(':id')
  getOne(@Param() id: string) {
    return this.service.getProductVariant(id);
  }

  @Get()
  getAll() {
    return this.service.getProductVariants();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.deleteProductVariant(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductVariantDto) {
    return this.service.updateProductVariant(id, dto);
  }

  @Post('syncProducts1C')
  getProductsFrom1C() {
    return this.synchService.syncProducts1C();
  }

  @Post('syncCategories1C')
  synchronizationByCategories() {
    return this.synchService.syncCategories1C();
  }

  @Post('syncUsers1C')
  synchronizationByUsers() {
    return this.synchService.syncUsers1C();
  }
}
