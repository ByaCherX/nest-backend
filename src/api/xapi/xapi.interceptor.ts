import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import color from 'ansi-colors';
import { xApiService } from './xapi.service';
  

@Injectable()
export class xApiInterceptor implements NestInterceptor {
  intercept( context: ExecutionContext, next: CallHandler<any> ): Observable<any> {
    console.log( color.red('<<< xapi >>>') );
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      tap(() => {
        const ApiTime = new Date().toISOString();
        console.log(`API Time: ${ApiTime}\n`);
      }),
    );
  }
}
