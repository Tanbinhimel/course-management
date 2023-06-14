import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    console.log('login done!');
    return '';
  }
  @Get('google/redirect')
  @UseGuards(AuthGuard())
  googleRedirect() {
    console.log('redirect done!');
    return '';
  }
}
