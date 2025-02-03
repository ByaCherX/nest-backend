import { Body, Controller, Get, HttpException, HttpStatus, Inject, Post, Req, Res, 
  UseFilters, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { ApiService } from './api.service';          //_ Service
import { ApiDto, ApiDataDto } from './dto/api.dto';  //? DataTypeObject
import { Request, Response } from 'express';         //_ platform-express

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiGuard } from './api.guard';              //_ Guard
import { ApiException } from './api.filter';         //_ Exception
import { ApiValidationPipe } from './api.pipe';      //_ Pipe
import { LoggingInterceptor } from './api.interceptor';  //_ Interceptor
import { API } from './api.decorator';               //_ Custom Decorator

import { xApiService } from './xapi/xapi.service';

/** API Controller
 *? Service: No Aviable
 ** Routes
 ** [GET]:  api/ | api/exp
 *? [POST]: api/
 */
@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService, @Inject('xapi') private xapi: xApiService) {}

  // API Main Route
  @UseGuards(ApiGuard)                  //+ Guards
  @UseInterceptors(LoggingInterceptor)  //+ Interceptor
  @UsePipes(ApiValidationPipe)          //+ Pipes
  @UseFilters(new ApiException())       //+ Exception
  @Get()                                //+ Route
  async test(@Req() req: Request, @Res() res: Response, @Body() apidto: ApiDto) {
    let xhttp = req.headers;
    const std = this.apiService.create(apidto)
    res.status(HttpStatus.OK).send({returnValue: std});
  }

  //* Body Test
  @UsePipes(new ApiValidationPipe())
  @Post()
  async createApiData(@Res() res, @Body() apiDataDto: ApiDataDto) {
    this.apiService.createApiData(apiDataDto);
    res.status(200).send();
  }

  @UseGuards(JwtAuthGuard) //_ Protected Area
  @Get('exp')
  async handler() {
    return { process_exp: 85762 };
  }

  @API('example-metadata','usr-api')
  @UseInterceptors(LoggingInterceptor)
  @UseFilters(ApiException)
  @Get('xapi')
  /**
   * @Request(), @Req()	  req
   * @Response(), @Res()*	res
   * @Next()	            next
   * @Session()	          req.session
   * @Param(key?: str)	  req.params / req.params[key]
   * @Body(key?: str)	    req.body / req.body[key]
   * @Query(key?: str)	  req.query / req.query[key]
   * @Headers(name?: str)	req.headers / req.headers[name]
   * @Ip()	              req.ip
   * @HostParam()	        req.hosts
   */
  xapiTest(@Req() req: Request) {
    if (!req.headers.xapi) {
      throw new HttpException('header > xapi = undefined', HttpStatus.FORBIDDEN)
    }
    return this.xapi.xapi_Client()
  }
}
