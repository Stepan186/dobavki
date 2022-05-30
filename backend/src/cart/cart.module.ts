import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { CartItemController } from './cart-item.controller';
import { CartItemService } from './cart-item.service';
import { CatalogModule } from '../catalog/catalog.module';

@Module({
  imports: [MikroOrmModule.forFeature([Cart, CartItem]), CatalogModule],
  exports: [CartService, CartItemService],
  controllers: [CartController, CartItemController],
  providers: [CartService, CartItemService],
})
export class CartModule {}
