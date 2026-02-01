/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { DatabaseService } from 'src/database/database.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private db: DatabaseService) {}
  async signIn(body: AuthDto) {
    const hash = await argon.hash(body.password);
    const user = this.db.user.create({
      data: {
        email: body.email,
        hash,
      },
    });
    return user;
  }

  async signUp(body: AuthDto) {
    const emailExists = await this.db.user.findFirst({
      where: { email: body.email },
    });
    if (emailExists) {
      throw new ForbiddenException('Credential taken');
    }
    const hash = await argon.hash(body.password);
    const { hash: _, ...user } = await this.db.user.create({
      data: {
        email: body.email,
        hash,
      },
    });
    return user;
  }
}
