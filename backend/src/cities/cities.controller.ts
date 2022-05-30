import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  create(@Body() dto: CreateCityDto) {
    return this.citiesService.create(dto);
  }

  @Get()
  getAll() {
    return this.citiesService.getCities();
  }

  @Get(':guid')
  getOne(@Param('guid') guid: string) {
    return this.citiesService.getCity(guid);
  }

  @Patch(':guid')
  update(@Param('guid') guid: string, @Body() dto: UpdateCityDto) {
    return this.citiesService.updateCity(guid, dto);
  }

  @Delete(':guid')
  delete(@Param('guid') guid: string) {
    return this.citiesService.deleteCity(guid);
  }
}
