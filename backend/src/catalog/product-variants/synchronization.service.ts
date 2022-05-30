import { btoa } from 'buffer';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Attribute } from '../attributes/attribute.entity';
import { Category } from '../categories/category.entity';
import { Brand } from '../../brands/brand.entity';
import { Product } from '../products/entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { Shop } from '../../shop/shop.entity';
import { Stock } from '../../stocks/entities/stock.entity';
import slugify from '../utils/slugify';
import { User } from '../../users/user.entity';

@Injectable()
export class SynchronizationService {
  constructor(
    private axios: HttpService,
    @InjectRepository(ProductVariant)
    private productVariantRepository: EntityRepository<ProductVariant>,
    @InjectRepository(Attribute)
    private attributeRepository: EntityRepository<Attribute>,
    @InjectRepository(Category)
    private categoryRepository: EntityRepository<Category>,
    @InjectRepository(Product)
    private productRepository: EntityRepository<Product>,
    @InjectRepository(Brand) private brandRepository: EntityRepository<Brand>,
    @InjectRepository(Shop) private shopRepository: EntityRepository<Shop>,
    @InjectRepository(Stock) private stockRepository: EntityRepository<Stock>,
    @InjectRepository(User) private userRepository: EntityRepository<User>,
  ) {}

  async sendRequest(method: 'get' | 'post', url: string, data?: any) {
    const auth = btoa(process.env.CLOGIN + ':' + process.env.CPASSWORD);
    const res = await firstValueFrom(
      this.axios.request({
        method,
        url,
        data,
        headers: {
          authorization: 'Basic ' + auth,
        },
      }),
    );
    return res.data;
  }

  async syncUsers1C() {
    const users = await this.sendRequest(
      'get',
      'https://s1.rntx.ru/evn_retail2/hs/clients/all',
    );

    await this.userRepository
      .createQueryBuilder(users)
      .insert(users)
      .onConflict()
      .merge()
      .execute();
  }

  async syncCategories1C() {
    const oneCData = await this.sendRequest(
      'get',
      'https://s1.rntx.ru/evn_retail2/hs/product/groups',
    );

    // return oneCData;
    const categories = oneCData.map((c) => ({
      guid: c.guid,
      name: c.name,
      parent: c.parentGuid,
      slug: slugify(c.name),
      updateAt: new Date(),
    }));

    await this.categoryRepository
      .createQueryBuilder('category')
      .insert(categories)
      .onConflict('guid')
      .merge(['name', 'parent', 'slug', 'updateAt'])
      .execute();
  }

  async syncProducts1C() {
    const oneCData: Array<Record<string, any>> = await this.sendRequest(
      'get',
      'https://s1.rntx.ru/evn_retail2/hs/product/all',
    );

    const brands = oneCData
      .map((currentValue) => currentValue.manufacturer)
      .filter((i) => i)
      .filter(
        (brand, index, self) =>
          self.findIndex(
            (t) => t.guid === brand.guid && t.name === brand.name,
          ) === index,
      );

    const products = [];
    const variants = [];
    const stocks = [];
    let shops = [];

    oneCData.forEach((item) => {
      const product = {
        guid: item.guid,
        code: item.code,
        name: item.name,
        brand: item.manufacturer?.guid,
        category: item.parentGuid,
        updateAt: new Date(),
      };
      products.push(product);
      item.details.forEach((detail) => {
        const variant = {
          guid: detail.characteristic?.guid ?? item.guid,
          product: item.guid,
          title: detail.characteristic?.name ?? item.name,
          price: detail.price,
          updateAt: new Date(),
        };

        if (detail.storages.length > 0) {
          detail.storages.forEach((s) => {
            const shop = {
              guid: s.guid,
              name: s.name,
            };
            const stock = {
              variant: variant.guid,
              shop: shop.guid,
              remains: s.remains,
              updateAt: new Date(),
            };
            shops.push(shop);
            stocks.push(stock);
          });
        }
        variants.push(variant);
      });
    });

    shops = shops.filter(
      (shop, index, self) =>
        self.findIndex((t) => t.guid === shop.guid && t.name === shop.name) ===
        index,
    );

    await this.brandRepository
      .createQueryBuilder('brand')
      .insert(brands)
      .onConflict('guid')
      .merge(['name'])
      .execute();

    await this.productRepository
      .createQueryBuilder('product')
      .insert(products)
      .onConflict('guid')
      .merge(['code', 'name', 'category', 'brand', 'updateAt'])
      .execute();

    await this.productVariantRepository
      .createQueryBuilder('variant')
      .insert(variants)
      .onConflict('guid')
      .merge(['product', 'title', 'price', 'updateAt']);

    await this.shopRepository
      .createQueryBuilder('shop')
      .insert(shops)
      .onConflict('guid')
      .merge(['name']);

    await this.stockRepository
      .createQueryBuilder('stock')
      .insert(stocks)
      .onConflict(['variant_guid', 'shop_guid'])
      .merge(['remains', 'updateAt']);
    //удалить все товары, варианты, стоки, где updated_at < now()-5 min
    const today = new Date();
    const now = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDay(),
      today.getHours(),
      today.getMinutes() - 5,
      today.getSeconds(),
      today.getMilliseconds(),
    );
    await this.productRepository.nativeDelete({
      updateAt: { $lt: now },
    });
  }
}
