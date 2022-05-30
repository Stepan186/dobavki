import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Attribute } from './attributes/attribute.entity';
import { Review } from './reviews/review.entity';
import { AttributesController } from './attributes/attributes.controller';
import { AttributesService } from './attributes/attributes.service';
import { CategoriesService } from './categories/categories.service';
import { ProductsAttributesService } from './products-attributes/products-attributes.service';
import { ReviewsService } from './reviews/reviews.service';
import { CategoriesController } from './categories/categories.controller';
import { ProductsAttributesController } from './products-attributes/products-attributes.controller';
import { ReviewsController } from './reviews/reviews.controller';
import { HttpModule } from '@nestjs/axios';
import { SynchronizationService } from './product-variants/synchronization.service';
import { Category } from './categories/category.entity';
import { ProductAttribute } from './products-attributes/product-attribute.entity';
import { Brand } from '../brands/brand.entity';
import { City } from '../cities/city.entity';
import { ProductVariant } from './product-variants/entities/product-variant.entity';
import { Product } from './products/entities/product.entity';
import { ProductsService } from './products/products.service';
import { ProductVariantsService } from './product-variants/product-variants.service';
import { ProductsController } from './products/products.controller';
import { ProductVariantsController } from './product-variants/product-variants.controller';
import { Shop } from '../shop/shop.entity';
import { Stock } from '../stocks/entities/stock.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Attribute,
      Category,
      ProductAttribute,
      Review,
      ProductVariant,
      Product,
      Brand,
      Shop,
      Stock,
      User,
    ]),
    HttpModule,
  ],
  exports: [],
  providers: [
    AttributesService,
    CategoriesService,
    ProductVariantsService,
    ProductsAttributesService,
    ReviewsService,
    SynchronizationService,
    ProductsService,
  ],
  controllers: [
    AttributesController,
    CategoriesController,
    ProductsController,
    ProductVariantsController,
    ProductsAttributesController,
    ReviewsController,
  ],
})
export class CatalogModule {}
