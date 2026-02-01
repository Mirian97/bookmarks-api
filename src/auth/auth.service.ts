import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon from 'argon2';
import { DatabaseService } from 'src/database/database.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signIn(body: AuthDto) {
    const user = await this.db.user.findFirst({
      where: { email: body.email },
    });
    if (!user) {
      throw new ForbiddenException('Invalid Credentials');
    }
    const passwordMatches = await argon.verify(user.hash, body.password);
    if (!passwordMatches) {
      throw new ForbiddenException('Invalid Credentials');
    }
    return await this.signToken(user.id, user.email);
  }

  async signUp(body: AuthDto) {
    const emailExists = await this.db.user.findFirst({
      where: { email: body.email },
    });
    if (emailExists) {
      throw new ForbiddenException('Credential taken');
    }
    const hash = await argon.hash(body.password);
    const user = await this.db.user.create({
      data: {
        email: body.email,
        hash,
      },
    });
    return await this.signToken(user.id, user.email);
  }

  private async signToken(
    userId: number,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get<string>('JWT_SECRET');
    const accessToken = await this.jwt.signAsync(payload, {
      secret,
      expiresIn: '7d',
    });
    return { accessToken };
  }
}
