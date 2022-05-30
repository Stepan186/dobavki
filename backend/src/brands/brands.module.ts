import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Brand } from './brand.entity';
import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Brand])],
  exports: [],
  providers: [BrandsService],
  controllers: [BrandsController],
})
export class BrandsModule {}
