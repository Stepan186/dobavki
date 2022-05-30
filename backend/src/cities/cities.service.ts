import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, t } from '@mikro-orm/core';
import { City } from './city.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import slugify from '../catalog/utils/slugify';
@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private citiesRepository: EntityRepository<City>,
  ) {}

  async create(dto: CreateCityDto) {
    if (!dto.slug) {
      dto.slug = slugify(dto.name);
    }
    const city = await this.citiesRepository.create(dto);
    await this.citiesRepository.persistAndFlush(city);
    return city;
  }

  async getCities() {
    return this.citiesRepository.findAll();
  }

  async getCity(cityGuid: string) {
    return this.citiesRepository.findOne(cityGuid);
  }

  async updateCity(cityGuid: string, dto: UpdateCityDto) {
    const city = await this.citiesRepository.findOne(cityGuid);
    city.assign(dto);
    await this.citiesRepository.flush();
    return city;
  }

  async deleteCity(cityGuid: string) {
    await this.citiesRepository.nativeDelete(cityGuid);
    await this.citiesRepository.flush();
  }
}
