import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, SelectQueryBuilder } from '@mikro-orm/postgresql';
import { CategoriesService } from '../categories/categories.service';
import { AttributesService } from '../attributes/attributes.service';
import { ProductAttribute } from '../products-attributes/product-attribute.entity';
import { Product } from '../products/entities/product.entity';
import { GetProductVariantDto } from './dto/get-product-variant.dto';

export class FilterAttributeType {
  name: 'integer' | 'double' | 'select' | 'boolean' | 'string' | 'slug';
}

export class FilterAttribute {
  slug: string;
  unit?: string;
  name: string;
  type: FilterAttributeType;
}

export class Filter {
  attribute: FilterAttribute;
  values?: any[];
  min?: number;
  max?: number;
}

export class FiltersService {
  constructor(
    @InjectRepository(Product)
    private productRepository: EntityRepository<Product>,
    @InjectRepository(ProductAttribute)
    private productAttributeRepository: EntityRepository<ProductAttribute>,
    private attributeService: AttributesService,
    private categoryService: CategoriesService,
  ) {}

  getFiletrs(findOpts: GetProductVariantDto) {
    const qb = this.productRepository.createQueryBuilder('product');
  }

  async getPriceFilter(qb: SelectQueryBuilder<Product>) {}

  async filterProducts(qb: SelectQueryBuilder<Product>) {}
}
