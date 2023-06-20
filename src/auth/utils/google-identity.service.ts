import { BadRequestException, Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import * as config from 'config';

@Injectable()
export class GoogleIdentityService {
  constructor(
    private readonly client: OAuth2Client,
    private readonly clientId: string,
  ) {
    this.clientId = config.get('googleAuth.clientID');
    this.client = new OAuth2Client(clientId);
  }
  async verifyToken(token: string) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: this.clientId,
      });
      const payload = ticket.getPayload();
      if (!payload) {
        return new BadRequestException('Invalid Token');
      }
      return payload;
    } catch (error) {
      throw new BadRequestException('Invalid Token');
    }
  }
  // const client = new OAuth2Client(CLIENT_ID);
  // async function verify() {
  //   const ticket = await client.verifyIdToken({
  //     idToken: token,
  //     audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
  //     // Or, if multiple clients access the backend:
  //     //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  //   });
  //   const payload = ticket.getPayload();
  //   const userid = payload['sub'];
  //   // If request specified a G Suite domain:
  //   // const domain = payload['hd'];
  // }
  // verify().catch(console.error);
}
