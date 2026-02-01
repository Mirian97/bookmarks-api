import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { type User } from 'src/generated/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('who-ami')
  getUser(@GetUser() user: User) {
    return user;
  }

  @Patch('update')
  updateUser(@GetUser('id') userId: number, @Body() body: UpdateUserDto) {
    return this.userService.updateUser(userId, body);
  }
}
