import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const _Tnow = process.hrtime();
    const Tnow = _Tnow[0] * 1000000 + _Tnow[1] / 1000;

    return next.handle().pipe(
      tap(() => {
        const _Enow = process.hrtime();
        const Enow = _Enow[0] * 1000000 + _Enow[1] / 1000;
        console.log(`${(Enow - Tnow).toFixed(2)} µs`);  // MicroSecond Type
      }),
    );
  }
  
}

@Injectable()
export class ApiInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const binit: string = "Api_Interceptor"  //color.bgBlue(color.red(' API Init '));
    console.log(binit);
    //const request = context.switchToHttp().getRequest<Request>();
    //const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      tap(() => {
        const ApiTime = new Date().toISOString();
        console.log(`Api Time: ${ApiTime}\n`);
      }),
    );
  }
}
