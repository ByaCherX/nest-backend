import { Body, Controller, Get, Inject, Param, Query, Redirect, Req, Res, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

//? DB Module
import { DBservice } from './db/db.service';


import { Cache } from 'cache-manager';    //* Cache Manager
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { ThrottlerGuard } from '@nestjs/throttler';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { LoggingInterceptor } from './api/api.interceptor';

//@UseGuards(ThrottlerGuard)
@Controller()
export class AppController {
  private stream_status: boolean = true;

  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cache: Cache
  ) {}

  @Get('stream/:id')
  async getDocs(@Res() res: Response) {
    res.setHeader('Transfer-Encoding', 'chunked');
    res.write('> Stream Open\n');
    let value = 0;
    while (this.stream_status) {
      res.write(`data: ${JSON.stringify({count: value++})}\n`); // "data:" is important here
      await new Promise((resolve) => setTimeout(()=>{resolve('Ok!')}, 1000))
    }
    res.end('> Stream Closed')
    this.stream_status = true;
  }

  @Get('stream')
  async setStream() {
    this.stream_status = false;
  }
  
  @Get()
  async getHello(req: Request, res: Response) {
    return '/=> ' + this.appService.getHello();
  }

  @Get('data')
  async dataTest(req: Request, @Res() res: Response) {
    res.status(200);
    let mem = Buffer.alloc(1024*1024*2);
    res.send(mem)
  }

  @Get('d1')
  async getd1(@Req() req: Request, @Res() res: Response) {
    async function d1p() {
      await new Promise((resolve) => setTimeout(()=>{resolve('<Ok>')}, 2000))
      return { d1return: 'res.send -> d1p -> return obj' };
    }
    res.status(200).send(await d1p());
  }
  @Get('d2')
  async getd2(@Req() req: Request, @Res() res: Response) {
    async function d2p() {
      //await delay(2000)
      return { d2return: 'res.send -> d2p -> return obj' };
    }
    res.status(200).send(await d2p());
  }

  @UseInterceptors(LoggingInterceptor)
  @Get('fib')
  async cacheset(@Body() fib: {fib: number} = {fib: 1}) {
    function fibo(len: number): number {
      let arr = []
      for(let i = 0; i < 10000000; i++) {
        let _ = 0.0847*i
        arr.push(_)
      }
      return arr.pop()
    }
    let value: {value: string}
    let cached = await this.cache.get<number>(`fib${fib.fib}`)
    if (cached) {
      value = {value: 'cached: '+cached}
    } else {
      let _ = fibo(fib.fib)
      value = {value: _.toString()}
      await this.cache.set(`fib${fib.fib}`, value, 20000)
    }
    return value
  }

  @Get('cookie')
  cookie(@Res() res: Response) {
    res.cookie('keyx', 'some_value', {secure: true, signed: true, sameSite: true})
    res.cookie('location', 'tr-TR', {encode: (val) => val+'/Instanbul'})
    res.sendStatus(200);
  }
  @Get('cookie_r')
  read_cookie(@Req() req: Request) {
    console.log(req.cookies)
  }

  @Get('buildevent')
  buildEvent() {
    this.appService.buildEvent()
  }
  @Get('callEvent')
  callEvent() {
    this.appService.eventEmit.emit('val', {rx:'< Ok! >'})
    //this.appService.callEvent()
  }

  @Get('encrypt')
  async encryptTest(@Body() body: Record<"data", string>) {
    const blob = Buffer.from(body.data)
    return await this.appService.EncryptionTest(blob)
  }

  @Get('decrypt')
  async decryptTest(@Body() body: Record<"data", string>) {
    const blob = Buffer.from(body.data)
    return await this.appService.DecrpytTest(blob)
  }}

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('rnr-/', 'http://localhost:3001/')
    ])
  }
}
