import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(private db: DatabaseService) {}
  signIn() {
    return 'You re signIn';
  }

  signUp() {
    return {
      Hello: 'World 2',
    };
  }
}
