import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class coreMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.setHeader('X-Handler', 'Core');
    next();
  }
}
