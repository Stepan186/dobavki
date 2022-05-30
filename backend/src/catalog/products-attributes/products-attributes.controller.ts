import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ProductsAttributesService } from './products-attributes.service';
import { CreateProductsAttributesDto } from './dto/create-products-attributes.dto';

@Controller('products_attributes')
export class ProductsAttributesController {
  constructor(private readonly service: ProductsAttributesService) {}

  @Post()
  create(@Body() dto: CreateProductsAttributesDto) {
    return this.service.create(dto);
  }

  @Get()
  getAll() {
    return this.service.findAll();
  }
}
