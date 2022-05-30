import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Shop } from './shop.entity';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Shop])],
  exports: [],
  providers: [ShopsService],
  controllers: [ShopsController],
})
export class ShopModule {}
