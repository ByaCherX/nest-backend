import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { Request, Response } from 'express';
import { CacheModule } from '@nestjs/cache-manager';
import { TestBed } from '@automock/jest'

/**
 *^ Provider Tester (TEST) 
 ** method[1]: only testing AppService (with moduleRef)
 */
describe('AppService', () => {
  //let appService: Pick<jest.MockedObject<AppService>, 'getHello'>;
  let appService: AppService
  
  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AppService,
          /** Jest.fn example
           *? useValue: {getHello: jest.fn(()=>{return 'AppService return...'})}
           */
          useFactory: (eventEmitter2: EventEmitter2) => {
            return new AppService(eventEmitter2)
          },
          inject: [EventEmitter2],
          //useClass: AppService,
        },
        EventEmitter2
      ],
      imports: [
        EventEmitterModule,
      ],
    })
    .compile()
    appService = moduleRef.get(AppService);
  });

  it('service is builded', () => { expect(appService).toBeDefined() })

  describe('getHello', () => {
    it('should return string', async() => {
      const result = 'hello';
      expect(appService.getHello()).toBe(result)
    })
  })

  describe('callEvent', () => {
    it('eventEmit emit -> testEvent, args: [0]', () => {
      const emit = jest.spyOn(appService.eventEmit, 'emit')
      const out = jest.spyOn(console, 'log')
      appService.buildEvent()
      expect(appService.eventEmit.hasListeners('testEvent')).toBeTruthy()

      appService.callEvent()
      expect(emit.mock.calls[0]).toEqual(['testEvent',0])
      expect(emit).toBeCalled()
      expect(out.mock.lastCall).toEqual(['testEvent called ->0'])
    })
  })
});

/**
 *^ Provider Tester (TEST) 
 ** method[2]: ModuleTester (with moduleRef)
 * This is much more complex. module is for testing
 */
describe('AppModule', () => {
  let appController: AppController;
  let appService: Pick<jest.MockedObject<AppService>, 'getHello'>;
  
  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {getHello: jest.fn(()=>{return 'AppService return...'})}
        }
      ],
      imports: [
        EventEmitterModule,
        //ThrottlerModule.forRoot({ttl: 2, limit: 3}),
        CacheModule.register({ttl: 5000})
      ],
      exports: []
    })
    .compile()
    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get(AppService);
  });

  it('service is builded', () => { expect(appService).toBeDefined() })

  describe('getHello', () => {
    it('should return string', async() => {
      const result = 'AppService return...';
      expect(appService.getHello()).toBe(result)
    })
    it('on controller side', async() => {
      let req: Request
      let res: Response
      const value = await appController.getHello(req,res)
      expect(value).toBe('/=> AppService return...')
    })
  })

  /*describe('d1 async handler', () => {
    it('catch the res object and get obj', async() => {
      let req: Request
      let res: Response
      const value = await appController.getd1(req, res)
      expect(res.statusCode).toBe(200)
    })
  })*///_ It is not possible to test controllers.
});

/**
 *^ Provider Tester (TEST)
 ** method[3]: Service Tester (with Automock)
 * Simple and fast. only for service
 */
describe('AppService(automock)', () => {
  let appService: AppService
  let eventEmit: jest.Mocked<EventEmitter2>

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(AppService).compile()

    appService = unit
    eventEmit = unitRef.get(EventEmitter2)
    eventEmit.hasListeners.mockImplementation(()=>true)
  })
  
  describe('getHello', () => {
    it('should return string', async() => {
      const result = 'hello';
      expect(appService.getHello()).toBe(result)
    })
  })

  describe('callEvent', () => {
    it('EventEmitter2 injected', () => {
      expect(eventEmit).toBeDefined()
    })
    it('eventEmit emit -> testEvent, args: [0]', () => {
      const emit = jest.spyOn(appService.eventEmit, 'emit')
      const out = jest.spyOn(console, 'log')
      appService.buildEvent()
      expect(eventEmit.hasListeners('testEvent')).toBeTruthy()

      appService.callEvent()
      expect(emit.mock.calls[0]).toEqual(['testEvent',0])
      expect(emit).toBeCalled()
      expect(out.mock.lastCall).toEqual(['testEvent called ->0'])
    })
  })
})