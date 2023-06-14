import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';
import * as config from 'config';
import { Injectable } from '@nestjs/common';
import { Callback } from 'typeorm';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    const googleAuthConfig = config.get('googleAuth');
    super({
      clientID: googleAuthConfig.clientID,
      clientSecret: googleAuthConfig.clientSecret,
      callbackURL: googleAuthConfig.callbackURL,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: Callback,
  ) {
    console.log(accessToken);
    console.log(profile.id);
    console.log(profile.displayName);
    console.log(profile.name.familyName);
    console.log(profile.name.givenName);
    console.log(profile.emails[0].value);
    console.log(profile.photos[0].value);

    // search for user, if not found unauthorized; create new user, else return user
    done(null, true);
  }
}
