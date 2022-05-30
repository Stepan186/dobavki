import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { City } from './city.entity';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';

@Module({
  imports: [MikroOrmModule.forFeature([City])],
  exports: [],
  providers: [CitiesService],
  controllers: [CitiesController],
})
export class CitiesModule {}
