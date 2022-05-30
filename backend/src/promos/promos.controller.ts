import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PromosService } from './promos.service';
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';

@Controller('promos')
export class PromosController {
  constructor(private readonly promoService: PromosService) {}

  @Post()
  create(@Body() dto: CreatePromoDto) {
    return this.promoService.createPromo(dto);
  }

  @Get()
  getAll() {
    return this.promoService.getAllPromos();
  }

  @Delete(':promoId')
  delete(@Param('promoId') promoId: number) {
    return this.promoService.deleteOne(promoId);
  }

  @Put(':promoId')
  update(@Param('promoId') promoId: number, @Body() dto: UpdatePromoDto) {
    return this.promoService.updatePromo(promoId, dto);
  }
}
