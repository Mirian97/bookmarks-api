import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from 'src/app.module';
import { AuthDto } from 'src/auth/dto';
import { DatabaseService } from 'src/database/database.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

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
          .expectStatus(HttpStatus.OK)
          .stores('usetAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get user', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get('/users/who-ami')
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.OK);
      });
    });

    describe('Update user', () => {
      it('should update current user', () => {
        const dto: UpdateUserDto = {
          email: 'mirian@gmail.com',
          firstName: 'Mirian',
        };
        return pactum
          .spec()
          .patch('/users/update')
          .withBody(dto)
          .withHeaders({
            Authorization: 'Bearer $S{userAt}',
          })
          .expectStatus(HttpStatus.OK)
          .expectBodyContains(dto.email)
          .expectBodyContains(dto.firstName);
      });
    });
  });

  describe('Bookmark', () => {
    describe('Get bookmarks', () => {});

    describe('Create bookmark', () => {});

    describe('Get bookmark by id', () => {});

    describe('Update bookmark by id', () => {});

    describe('Delete bookmark by id', () => {});
  });
});
