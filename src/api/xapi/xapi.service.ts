import { Inject, Injectable, Scope } from '@nestjs/common';
import { INQUIRER } from '@nestjs/core';

@Injectable({scope: Scope.TRANSIENT})
export class xApiService {
  std: number   // xapi_runtime
  
  onModuleInit() {
    //console.log('The Module has been initialized')
  }

  constructor(opt: number, @Inject(INQUIRER) private parentClass: object) {
    this.std = opt;
  }

  // Returns the name of the injected site
  public whereInjected() {
    return this.parentClass?.constructor?.name
  }

  public xapi_Client() {
    return 'xapi_service->client\n>'+this.std;
  }
}
