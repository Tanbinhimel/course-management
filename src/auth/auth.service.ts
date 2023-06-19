import { BadRequestException, Injectable } from '@nestjs/common';

import { CryptoJsService } from './utils/crypto-js.service';
import { GoogleIdentityService } from './utils/google-identity.service';
@Injectable()
export class AuthService {
  constructor(
    private cryptoJsService: CryptoJsService,
    private googleIdentityService: GoogleIdentityService,
  ) {}
  async googleAuth(bearerToken) {
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      throw new BadRequestException('Invalid Token');
    }

    const decryptedIdToken = this.cryptoJsService.getDecryptedValue(
      bearerToken.substring(7),
    );

    const payload = await this.googleIdentityService.verifyToken(
      decryptedIdToken,
    );
    console.log('token:', payload);

    return { token: decryptedIdToken };
  }
}
