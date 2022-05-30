import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Stock } from './entities/stock.entity';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

@Module({
  imports: [MikroOrmModule.forFeature([Stock])],
  exports: [],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StockModule {}
