import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categorieService: CategoriesService) {}

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categorieService.createCategory(dto);
  }

  @Get()
  getAll() {
    return this.categorieService.getCategories();
  }

  @Get(':id')
  getOne(@Param() categoryId: string) {
    return this.categorieService.getCategory(categoryId);
  }

  @Delete(':id')
  delete(@Param() id: string) {
    return this.categorieService.deleteCategory(id);
  }

  @Patch(':guid')
  update(@Param('guid') guid: string, @Body() dto: UpdateCategoryDto) {
    return this.categorieService.updateCategory(guid, dto);
  }
}
