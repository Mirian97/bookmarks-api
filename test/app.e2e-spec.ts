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
    pactum.request?.setBaseUrl('http://localhost:3001');
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      email: 'test@email.com',
      password: '12345',
    };
    describe('SignUp', () => {
      it('should throw if password is empty', () => {
        return pactum
          .spec()
          .post('/auth/sign-up')
          .withBody({
            email: dto.email,
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should throw if email is empty', () => {
        return pactum
          .spec()
          .post('/auth/sign-up')
          .withBody({
            password: dto.password,
          })
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should sign up', () => {
        return pactum
          .spec()
          .post('/auth/sign-up')
          .withBody(dto)
          .expectStatus(HttpStatus.CREATED);
      });
    });

    describe('SignIn', () => {
      it('should throw if no body was provided', () => {
        return pactum
          .spec()
          .post('/auth/sign-in')
          .expectStatus(HttpStatus.BAD_REQUEST);
      });

      it('should sign in', () => {
        return pactum
          .spec()
          .post('/auth/sign-in')
          .withBody(dto)
          .expectStatus(HttpStatus.OK);
      });
    });
  });

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
