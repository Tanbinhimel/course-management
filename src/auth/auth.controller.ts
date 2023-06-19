import { Controller, Get, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('google')
  googleLogin(@Headers('authorization') bearerToken: string) {
    return this.authService.googleAuth(bearerToken);
  }
  @Get('google/redirect')
  @UseGuards(AuthGuard())
  googleRedirect() {
    console.log('redirect done!');
    return '';
  }
}
