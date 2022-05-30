import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { CreateAttributesDto } from './dto/create-attributes.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

@Controller('attributes')
export class AttributesController {
  constructor(private readonly service: AttributesService) {}

  @Post()
  create(@Body() dto: CreateAttributesDto) {
    return this.service.createAttribute(dto);
  }

  @Get()
  getAll() {
    return this.service.getAttributes();
  }

  @Get()
  getOne(@Param() id: number) {
    return this.service.getAttribute(id);
  }

  @Put(':id')
  update(@Param() id: number, dto: UpdateAttributeDto) {
    return this.service.updateAttribute(id, dto);
  }

  @Delete(':id')
  delete(@Param() id: number) {
    return this.service.deleteAttribute(id);
  }
}
