import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsDto } from './dto/get-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.service.createProduct(dto);
  }

  @Get()
  getAll(@Query() dto: GetProductsDto) {
    return this.service.getProducts(dto);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.getProduct(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.deleteProduct(id);
  }

  @Patch(':guid')
  update(@Param('guid') guid: string, @Body() dto: UpdateProductDto) {
    return this.service.updateProduct(guid, dto);
  }
}
