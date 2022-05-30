import { Injectable, UploadedFile } from '@nestjs/common';

import * as csv from 'csv-parser';
import * as fs from 'fs';
import path from 'path';
// import * as csv from 'csvtojson';
import { Iconv } from 'iconv';
import { assign } from '@mikro-orm/core';

@Injectable()
export class SynchronizationService {
  constructor() {}

  async synchByFile(file: Express.Multer.File) {
    const iconv = new Iconv('cp1251', 'utf-8');
    const data = iconv.convert(file.buffer).toString();
    const res = data.split('\r\n').map((i) => i.split(';'));
    const products = [];

    res.forEach((item, idx) => {
      const product = {};
      if (idx != 0) {
        item.forEach((value, index) => {
          if (value != '') {
            product[res[0][index]] = value;
          } else {
            product[res[0][index]] = null;
          }
        });
      }
      products.push(product);
    });
    return products;
  }
}
