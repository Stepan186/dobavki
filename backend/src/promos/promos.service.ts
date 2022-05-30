import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Promo } from './entities/promo.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { UpdatePromoDto } from './dto/update-promo.dto';

@Injectable()
export class PromosService {
  constructor(
    @InjectRepository(Promo)
    private promoRepository: EntityRepository<Promo>,
  ) {}

  async createPromo(dto) {
    const promo = await this.promoRepository.create(dto);
    await this.promoRepository.persistAndFlush(promo);
    return promo;
  }

  async getAllPromos() {
    return await this.promoRepository.findAll();
  }

  async deleteOne(promoId: number) {
    await this.promoRepository.nativeDelete({ id: promoId });
  }

  async updatePromo(promoId: number, dto: UpdatePromoDto) {
    const promo = await this.promoRepository.findOne(promoId);
    promo.assign(dto);
    await this.promoRepository.flush();
    return promo;
  }
}
