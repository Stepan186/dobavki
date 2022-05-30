import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BrandsModule } from './brands/brands.module';
import { CitiesModule } from './cities/cities.module';
import { DeliveryAddressModule } from './delivery-address/delivery-address.module';
import { ShopModule } from './shop/shop.module';
import { OrdersModule } from './orders/orders.module';
import { DeliveryZoneModule } from './delivery-zone/delivery-zone.module';
import { CartModule } from './cart/cart.module';
import { CatalogModule } from './catalog/catalog.module';
import { AuthModule } from './auth/auth.module';
import { UploadsModule } from './uploads/uploads.module';
import { PromosModule } from './promos/promos.module';
import mikroOrmConfig from './mikro-orm.config';
import { SynchronizationModule } from './synchronization/synchronization.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      ...mikroOrmConfig,
      scope: Scope.REQUEST,
    }),
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    BrandsModule,
    CitiesModule,
    DeliveryAddressModule,
    ShopModule,
    OrdersModule,
    DeliveryZoneModule,
    CartModule,
    CatalogModule,
    UploadsModule,
    PromosModule,
    SynchronizationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
