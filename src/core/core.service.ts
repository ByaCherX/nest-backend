import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreService {
  constructor() {}
  coreget() {
    return ".ok"
  }
}
