import { BadRequestException, Injectable } from '@nestjs/common';

import { CryptoJsService } from './utils/crypto-js.service';
import { GoogleIdentityService } from './utils/google-identity.service';
import { TokenPayload } from 'google-auth-library';
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

    const payload: TokenPayload = await this.googleIdentityService.verifyToken(
      decryptedIdToken,
    );
    console.log('token:', payload);

    return { token: decryptedIdToken };
  }
}
