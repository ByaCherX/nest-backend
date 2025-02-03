//? Core Require
import { ContextIdFactory, HttpAdapterHost, NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readFile } from 'fs/promises';
import http2 from 'http2';
import { createRequire } from 'node:module'  //_ Advanced

//? Express
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';


//? Advanced
import spdy from 'spdy';
import { HyperExpressAdapter } from './http.adapter';

//? Technique
import * as compression from 'compression';
import dotenv from 'dotenv'  // Env [access process.env]
dotenv.config({path: './.env'})
import * as cookieParser from 'cookie-parser'
import { AggregateByTenantContextIdStrategy } from './api/tenant';

//^ Security
import helmet from 'helmet';



//| SPDY HTTPS with HTTP/2.0
/*
async function main() {
  const expressApp = express()
  const httpsOptions: spdy.server.ServerOptions = {
    key: await readFile('src/test.key'),
    cert: await readFile('src/test.crt'),
    spdy: {protocols: ["h2"]},
  }
  const server = spdy.createServer(httpsOptions, expressApp);

  const app: NestApplication = await NestFactory.create(AppModule, 
    new ExpressAdapter(expressApp),
  );
  await app.init()
  await server.listen(3001)

}
main();
*/

//| ExpressAdapter with HTTPS/2.0 - Experimential
/*
async function main() {
  const server = http2Express(express)
  const httpsOptions = {
    key: await readFile('src/test.key'),
    cert: await readFile('src/test.crt'),
  }
  //^ unencrypted server !! NOT SAFE
  const nserver = http2.createServer(server)
  //const nserver = http2.createSecureServer(httpsOptions, server)
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  )
  await app.init();
  await nserver.listen(3001)
}
main();
*/

//| HyperExpress Test standalone server
/*
import HyperExpress from 'hyper-express';
import fs from 'node:fs';

async function hyper_sv() {
  const server = new HyperExpress.Server({fast_buffers: false})
  server.get('/', (req, res)=> {
    res.send('hello')
  })

  server.post('/stream', (req, res)=> {
    const stream = fs.createReadStream(process.cwd()+'/stream_data.so')
    stream.on('error', (err)=>{throw err})

    res.stream(stream)
  })

  server.listen(3001).then((_)=> console.log('hyperExpress listening on 3001'))
}
hyper_sv()
*/

//| Hyper Express HTTP/2.0
/*
async function main() {
  const app: NestApplication = await NestFactory.create(
    AppModule,
    new HyperExpressAdapter({
      //fast_buffers: true
    })
  )
  console.log("HyperExpressAdapter created")
  await app.init();
  await app.listen(3001)
}
main();
*/

//| Fastify Adapter
/*
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
async function main() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.enableShutdownHooks()
  app.use(compression.default());
  app.use(helmet());
  app.enableCors();
  app.use(cookieParser.default('xvalstr'))  // CookieParser
  await app.listen(3001);
}
main();
*/

/*import { WinstonLogger } from './logger';
import winston from 'winston';
const wlogger = winston.createLogger({
  level: 'debug',
  defaultMeta: {},
  transports: [
    new winston.transports.Console({format: winston.format.cli()}),
    new winston.transports.File({ filename: 'err.log', level: 'error' })
  ]
})*/

//| Standart HTTP/1.1

async function main() {
  const app: NestApplication = await NestFactory.create(
    AppModule, {
      //logger: new WinstonLogger(wlogger),
    }
  );
  app.enableShutdownHooks()
  app.use(compression.default());
  app.use(helmet());
  app.enableCors();
  app.use(cookieParser.default('xvalstr'))  // CookieParser
  ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());
  await app.listen(3001);
}
main();
