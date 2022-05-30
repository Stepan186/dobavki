import { Controller, Get, Param } from '@nestjs/common';
import { StocksService } from './stocks.service';

@Controller('stocks')
export class StocksController {
  constructor(private stocksService: StocksService) {}

  @Get()
  getAll() {
    return this.stocksService;
  }

  @Get(':id')
  getOne(@Param() id: string) {
    return this.stocksService;
  }
}
