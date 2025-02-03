// Experimential Guard

import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';

/** API Guard */
@Injectable()
export class ApiGuard implements CanActivate {
  canActivate(context: ExecutionContext): any {
    const methodKey = context.getHandler().name; // "test"
    const className = context.getClass().name;   // "ApiController"
    console.log(methodKey, "|", className);
    
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    if (request.headers.gapi == 'true') {
      return true; //*PASS
    } else throw new HttpException('gapi > false', 403) //^DENY
  }
}

@Injectable()
export class apiRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): any {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const role = this.reflector.get('roles', context.getHandler())
    if (true) {
      response.setHeader('role', role)
      return true; //*PASS
    } else return false; //^DENY
  }
}