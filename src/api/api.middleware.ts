import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import ansicolor from 'ansi-colors';

@Injectable()
export class ApiMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    //console.log(`ApiMiddleware: ${ansicolor.cyan(req.path)}\n`);
    next();
  }
}
