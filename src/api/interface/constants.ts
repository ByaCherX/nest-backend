export interface ApiModuleOptions {
  mutex: boolean,
  rlock: boolean,
  shared: boolean

  globalLock?: Buffer
}

import { ConfigurableModuleBuilder } from "@nestjs/common"

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = 
  new ConfigurableModuleBuilder<ApiModuleOptions>().build();