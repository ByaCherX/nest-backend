import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { ModuleRef, Reflector } from '@nestjs/core';
import { Roles } from './role.decorator';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    /** If @Role is not included -> true */
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest<Request>();
    const _role = req.headers.role
    if (!_role) {
      throw new HttpException('Headers > Role = undefined', 401)
    }
    return requiredRoles.some((role) => _role.includes(role));
  }
}
