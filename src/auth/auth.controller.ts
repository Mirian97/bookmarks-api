import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthContoller {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  signIn(@Body() body: AuthDto) {
    return this.authService.signIn(body);
  }

  @Post('sign-up')
  signUp(@Body() body: AuthDto) {
    return this.authService.signUp(body);
  }
}
