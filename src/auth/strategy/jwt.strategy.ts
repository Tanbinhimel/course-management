import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import * as config from 'config';
import { JwtPayload } from '../utils/jwt-payload.interface';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtConfig = config.get('jwt');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secretOrKey,
    });
  }

  async validate(payload: JwtPayload) {
    // search for user, if not found unauthorized, else return user
    return true;
  }
}
