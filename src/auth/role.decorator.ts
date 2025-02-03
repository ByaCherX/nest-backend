import { SetMetadata } from '@nestjs/common';

export enum Roles {
  Root = 'root',
  Admin = 'admin',
  Developer = 'dev',
  User = 'user',
}

export const Role = (...roles: Roles[]) => SetMetadata('roles', roles);
