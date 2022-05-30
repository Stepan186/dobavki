import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, Observable } from 'rxjs';
import { Cart } from '../cart/entities/cart.entity';

@Injectable()
export class DadataService {
  constructor(private axios: HttpService, private httpService: HttpService) {}

  public async findById(fiasId: string) {
    return (
      await firstValueFrom(
        this.axios.post('findById/address', {
          query: fiasId,
        }),
      )
    ).data.suggestions[0];
  }

  async getCoords(query: string) {
    const url =
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
    const secret = 'c421215a93d492cff23a2d1e1240b39bd50ab014';
    const token = 'd017a006b611b6cbfa438ad5b4ec24e80d43bd88';
    const res = await firstValueFrom(
      this.httpService.post(
        url,
        {
          query: query,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Token ' + token,
            'X-Secret': secret,
          },
        },
      ),
    );
    const postalCode = res.data.suggestions[0].data.postal_code;
    const coords = [];
    coords.push(
      res.data.suggestions[0].data.geo_lat,
      res.data.suggestions[0].data.geo_lon,
    );
    // coords.push(res.data.suggestions[0].data.geo_lon);
    const data = { postalCode, coords };
    return data;
  }
}
