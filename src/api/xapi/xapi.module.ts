import { Module, Provider } from '@nestjs/common';
import { xApiService } from './xapi.service';
import { xApiRunTimeService } from './xapi_runtime.service';
import { INQUIRER } from '@nestjs/core';

//* Advanced Custom Provider
const xapiService: Provider<xApiService> = {
  provide: 'xapi',
  useFactory: (xapi_runtime: xApiRunTimeService, inquirer: object) => {
    const std = xapi_runtime.get()
    return new xApiService(std, inquirer)
  },
  inject: [
    xApiRunTimeService, 
    { token: INQUIRER, optional: false }
  ],
}

@Module({
  imports: [],
  exports: [xapiService],
  providers: [xapiService, xApiRunTimeService],
})
export class xApiModule {
  constructor() {}
}

