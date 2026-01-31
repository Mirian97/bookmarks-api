import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signIn() {
    return 'You re signIn';
  }

  signUp() {
    return {
      Hello: 'World 2',
    };
  }
}
