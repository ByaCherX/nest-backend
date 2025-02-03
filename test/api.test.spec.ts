import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, Provider } from '@nestjs/common';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { ApiController } from 'src/api/api.controller';
import { ApiService } from 'src/api/api.service';
import { xApiModule } from 'src/api/xapi/xapi.module';
import { ApiGuard } from 'src/api/api.guard';
import { TestBed } from '@automock/jest';

const moduleMocker = new ModuleMocker(global);

/**
 *^ Module Tester (TEST)
 */
describe('ApiModule', () => {
  let apiService: ApiService
  let apiController: ApiController
  
  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [
        ApiService,
        {
          provide: 'MUTEX_OP',
          useValue: {mutex: true}
        }
      ],
      imports: [
        xApiModule
      ],
      exports: []
    })
      .useMocker((token) => {
        const results = 'ok';
        if (token === ApiService) {
          return { create: jest.fn().mockResolvedValue(results) }
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata
          const Mock = moduleMocker.generateFromMetadata<any>(mockMetadata);
          return new Mock(); //?
        }
      })
      .compile()

    apiController = moduleRef.get<ApiController>(ApiController)
    apiService = moduleRef.get<ApiService>(ApiService)
  });
  
  it('service is builded', () => {
      expect(apiService).toBeDefined()
  })
  
  describe('create', () => {
    const dto_type = {
      id: 1,
      name: 'example',
      process: '*dyn'
    }
    it('get DtoObj and return ', ()=>{
      expect(apiService.create(dto_type)).toBe('ok.')
    })
  })

  describe('api_guard', () => {
    const api_guard = new ApiGuard()
    const mockExecutionContext: Partial<
      Record<jest.FunctionPropertyNames<ExecutionContext>, jest.MockedFunction<any>>
      > = { 
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn(),
          getResponse: jest.fn(),
        }),
      }
  })
});

/**
 *^ With Automock (Recommended)
 */
describe('AppService(automock)', () => {
  let apiService: ApiService
  let mutex_op: jest.Mocked<Record<'mutex'|'rlock', boolean>>

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(ApiService).compile()

    apiService = unit
    mutex_op = unitRef.get('MUTEX_OP')
    //mutex_op.?.mockImplementation(()=>true)
  })
  
  describe('createApiData', () => {
    it('DtoStorage accessed', async() => {
      //Reflect.set(apiService, 'DtoStorage', 0)
      const dto: any = {DataId: 1, data: [], metadata: 'anyMeta'}
      const result = [dto]
      apiService.createApiData(dto)

      expect(apiService['DtoStorage'][0]).toBe(dto)
    })
  })

  describe('create', () => {
    it('MUTEX_OP Injected', () => {
      expect(apiService['op']).toBeDefined()
    })
    it('Mutex be Zero', async () => {
      expect(apiService['op'].mutex).toBeTruthy()
      expect(await apiService['mutex']).toBe(0)
    })
  })
})