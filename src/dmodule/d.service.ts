import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor() {}

  get(key: string): string {
    return '::conf';
  }
}
