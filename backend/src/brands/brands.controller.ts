import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { GetBrandsDto } from './dto/get-brands.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly service: BrandsService) {}

  @Post()
  create(@Body() dto: CreateBrandDto) {
    return this.service.createBrand(dto);
  }

  @Get()
  getAll(@Body() dto: GetBrandsDto) {
    return this.service.getBrands(dto);
  }

  @Get(':id')
  getOne(@Param() id: string) {
    return this.service.getBrand(id);
  }

  @Put(':id')
  update(@Param() id: string, @Body() dto: UpdateBrandDto) {
    return this.service.updateBrand(id, dto);
  }

  @Delete(':id')
  delete(@Param() id: string) {
    return this.service.deleteBrand(id);
  }
}
