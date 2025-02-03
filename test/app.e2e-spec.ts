import { Test } from '@nestjs/testing';
import { BadRequestException, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { ApiController } from 'src/api/api.controller';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    let apiController = module.get(ApiController)
    server = app.getHttpServer();
    await app.init();
  });

  describe('/ [GET]', () => {
    it('expection: /=> hello', async () => {
      const res = await request(server)
        .get('/')
        .expect(200)
        .expect('/=> hello')
    })
  })

  it('[GET] /api', async () => {
    const res = await request(server)
      .get('/api')
      .set('gapi', 'true')
      //.send({ id: 1, name:'e', process:'*' })
    expect(res.statusCode).toBe(400)
    expect(res.body.systemFailure).toBe('BadRequestException')
    expect(res.body.exceptionMsg).toBe('Validation failed')
    expect(res.body.timestamp).toBeDefined()
    expect(res.body.path).toBe('/api')
    expect(res.headers['servertype']).toBe('RNR-Server')
  })

  afterAll(async () => {
    await app.close()
  })
});
