import {
  BaseEntity,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  PrimaryKeyType,
  Property,
} from '@mikro-orm/core';
import { Brand } from '../../../brands/brand.entity';
import { Category } from '../../categories/category.entity';
import { ProductVariant } from '../../product-variants/entities/product-variant.entity';
import { ProductAttribute } from '../../products-attributes/product-attribute.entity';
import { Stock } from '../../../stocks/entities/stock.entity';
import { Upload } from '../../../uploads/entities/uploud.entity';

@Entity()
export class Product extends BaseEntity<Product, 'guid'> {
  @PrimaryKey()
  guid: string;
  [PrimaryKeyType]: string;

  @Property({ nullable: true })
  code: string;

  @Property()
  name: string;

  @ManyToOne(() => Category)
  category: Category;

  @ManyToOne(() => Brand, { nullable: true })
  brand: Brand;

  @OneToMany(() => ProductVariant, (p) => p.product, { orphanRemoval: true })
  variants = new Collection<ProductVariant>(this);

  @OneToMany(
    () => ProductAttribute,
    (productAttribute) => productAttribute.product,
  )
  productAttributes = new Collection<ProductAttribute>(this);

  @ManyToOne(() => Upload, { nullable: true })
  image: number;

  @Property({ onUpdate: () => new Date() })
  updateAt: Date = new Date();

  @Property({ nullable: true })
  description: string;

  @Property({ nullable: true })
  metaTitle: string;

  @Property({ nullable: true })
  metaDescription: string;
}
