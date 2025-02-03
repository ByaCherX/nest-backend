import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TasksService } from './tasks/tasks.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';


@Injectable()
export class AppService {
  key: Buffer
  iv: Buffer

  constructor(public eventEmit: EventEmitter2) {}
  private readonly logger = new Logger(TasksService.name)
  getHello() {
    //this.logger.debug('AppService Called')
    return 'hello';
  }
  buildEvent() {
    this.eventEmit.on('testEvent', (value) => {
      console.log('testEvent called ->'+0)
    })
  }
  callEvent() {
    this.eventEmit.emit('testEvent', 0)
  }
  @OnEvent('testEvent2',{})
  onevent() {
    console.log('...OnEvent')
  }

  async EncryptionTest(data: Buffer) {
    this.iv = randomBytes(8)
    const password = 'gen_key_0000';

    this.key = await promisify(scrypt)(password, 'salt', 32) as Buffer;
    const cipher = createCipheriv('aes-256-gcm', this.key, this.iv)

    const encryptData = Buffer.concat([
      cipher.update(data),
      cipher.final()
    ])
    return {'data': encryptData.toString('hex')};
  }
  async DecrpytTest(data: Buffer) {
    const decipher = createDecipheriv('aes-256-gcm', this.key, this.iv)
    const decryptedData = Buffer.concat([
      decipher.update(data),
      decipher.final()
    ])
    return {'decrypted_data': decryptedData.toString('utf8')}
  }
}
