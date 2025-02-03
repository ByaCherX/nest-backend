import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ApiException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx      = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request  = ctx.getRequest<Request>();
    const status   = exception.getStatus();
    

    response.status(status).json({
      statusCode: status,
      systemFailure: exception.name,
      exceptionMsg: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
