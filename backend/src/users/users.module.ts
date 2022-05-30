import { Global, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Cart } from '../cart/entities/cart.entity';
import { CartModule } from '../cart/cart.module';

@Global()
@Module({
  imports: [MikroOrmModule.forFeature([User, Cart]), CartModule],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
