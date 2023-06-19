import { Injectable } from '@nestjs/common';
import * as cryptoJS from 'crypto-js';
import { AES } from 'crypto-js';
import * as config from 'config';

@Injectable()
export class CryptoJsService {
  getDecryptedValue(value): string {
    const secretKey = config.get('cryptoJs.secretKey');
    return AES.decrypt(value, secretKey).toString(cryptoJS.enc.Utf8);
  }
}
