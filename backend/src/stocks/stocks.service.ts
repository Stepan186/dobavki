import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Stock } from './entities/stock.entity';
import { EntityRepository } from '@mikro-orm/postgresql';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock) private stockRepository: EntityRepository<Stock>,
  ) {}

  async createStock(dto) {
    const stock = this.stockRepository.create(dto);
    await this.stockRepository.persistAndFlush(stock);
    return stock;
  }

  async getStocks() {
    return await this.stockRepository.findAll();
  }

  async getStock(stockGuid: string) {
    // return this.stockRepository.findOne(stockGuid);
  }
}
