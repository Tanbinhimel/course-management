import { BadRequestException, Injectable } from '@nestjs/common';

import { CryptoJsService } from './utils/crypto-js.service';
@Injectable()
export class AuthService {
  constructor(private cryptoJsService: CryptoJsService) {}
  googleAuth(bearerToken) {
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      throw new BadRequestException('Invalid Token');
    }

    const decryptedIdToken = this.cryptoJsService.getDecryptedValue(
      bearerToken.substring(7),
    );
    console.log('token:', decryptedIdToken);

    return { token: decryptedIdToken };
  }
}
