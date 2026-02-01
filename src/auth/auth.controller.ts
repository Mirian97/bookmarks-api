import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthContoller {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() body: AuthDto) {
    return this.authService.signIn(body);
  }

  @Post('sign-up')
  signUp(@Body() body: AuthDto) {
    return this.authService.signUp(body);
  }
}
