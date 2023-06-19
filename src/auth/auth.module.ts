import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthRepository } from './auth.repository';
import { CryptoJsService } from './utils/crypto-js.service';
import { GoogleIdentityService } from './utils/google-identity.service';

@Module({
  imports: [
    JwtModule.register({
      secretOrPrivateKey: config.get('jwt').secretOrKey,
      signOptions: {
        expiresIn: config.get('jwt').expiresIn,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    GoogleStrategy,
    JwtStrategy,
    CryptoJsService,
    GoogleIdentityService,
  ],
})
export class AuthModule {}
