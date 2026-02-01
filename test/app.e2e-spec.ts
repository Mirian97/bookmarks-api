import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from 'src/app.module';
import { AuthDto } from 'src/auth/dto';
import { DatabaseService } from 'src/database/database.service';

describe('App e2e', () => {
  let app: INestApplication;
  let db: DatabaseService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3001);

    db = app.get(DatabaseService);
    await db.cleanAll();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    describe('SignUp', () => {
      const body: AuthDto = {
        email: 'test@email.com',
        password: '12345',
      };
      it('should sign in', () => {
        return pactum
          .spec()
          .post('http://localhost:3001/auth/sign-up')
          .withBody(body)
          .expectStatus(HttpStatus.CREATED);
      });
    });
  });

  describe('SignIn', () => {});

  describe('User', () => {
    describe('Get user', () => {});

    describe('Edit user', () => {});
  });

  describe('Bookmark', () => {
    describe('Get bookmarks', () => {});

    describe('Get bookmark by id', () => {});

    describe('Create bookmark', () => {});

    describe('Edit bookmark', () => {});

    describe('Delete bookmark', () => {});
  });
});
