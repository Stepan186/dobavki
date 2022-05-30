import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './category.entity';
import { GetCategoriesDto } from './dto/get-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: EntityRepository<Category>,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(dto);
    await this.categoriesRepository.persistAndFlush(category);
    return category;
  }

  async getCategories() {
    return await this.categoriesRepository.findAll({
      orderBy: { name: 'ASC' },
      populate: ['image'],
    });
  }

  async getCategory(categoryId: string) {
    return this.categoriesRepository.findOne(
      { guid: categoryId },
      { populate: ['children'] },
    );
  }

  async deleteCategory(categoryId) {
    await this.categoriesRepository.nativeDelete(categoryId);
  }

  async updateCategory(categoryId: string, dto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOne({
      guid: categoryId,
    });
    category.assign(dto);
    await this.categoriesRepository.flush();
    return category;
  }
}
