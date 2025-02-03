import { Injectable, OnModuleInit, OnApplicationBootstrap, Inject } from '@nestjs/common';
import { ApiDataDto } from './dto/api.dto';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class ApiService implements OnModuleInit {
  protected readonly mutex: Promise<number>  // int32 *ptr

  constructor(
    @Inject('MUTEX_OP') 
    protected op: Record<'mutex' | 'rlock' | 'shared', boolean>
  ) {
    const MUTEX = op.mutex;
    if (!!MUTEX)
    {
      this.mutex = (!op.rlock) 
        ? Promise.resolve(0x00000000) 
        : Promise.resolve(Promise.resolve(0x00000000))
      console.log("<< Mutex released >>")
    }
  }

  onModuleInit() {
    //console.log('ApiService Module Init')
  }
  onApplicationBootstrap() {
    //console.log('ApiService after bootstrap')
  }
  onModuleDestroy() {
    //console.log('ApiService Module Destroy')
    //setTimeout(()=>{console.log('$P\\done')}, 1000)
  }
  onApplicationShutdown(signal: string) {  //not work
    //console.log(signal)
  }

  private DtoStorage = new Array(); // Non final product - only use test

  createApiData(apiDataDto: ApiDataDto) {
    //console.log(apiDataDto);
    //this.dataSource.getRepository(ApiData).save(apiDataDto);
    this.DtoStorage.push(apiDataDto)
  }

  create(DtoObj: any) {
    this.DtoStorage = DtoObj;
    return 'ok.'
  }
}