import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { type User } from 'src/generated/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  @Get('who-ami')
  getUser(@GetUser() user: User) {
    return user;
  }
}
