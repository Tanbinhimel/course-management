import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginTicket, OAuth2Client, TokenPayload } from 'google-auth-library';
import * as config from 'config';

@Injectable()
export class GoogleIdentityService {
  private readonly client: OAuth2Client;
  private readonly clientId: string;
  constructor() {
    this.clientId = config.get('googleAuth.clientID');
    this.client = new OAuth2Client(this.clientId);
  }
  async verifyToken(token: string): Promise<TokenPayload> {
    const ticket: LoginTicket = await this.client.verifyIdToken({
      idToken: token,
      audience: this.clientId,
    });
    const payload: TokenPayload = ticket.getPayload();
    if (!payload) {
      throw new BadRequestException('Invalid Token');
    }
    return payload;
  }
}
