import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { UserRole } from './role.enum';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requset: Request = context.switchToHttp().getRequest();

    const userRole: UserRole = requset['user'].role;
    if (!userRole) throw new UnauthorizedException();

    const requiredRoles: UserRole[] = this.reflector.getAllAndOverride(
      ROLE_KEY,
      [context.getClass(), context.getHandler()],
    );

    return requiredRoles.includes(userRole);
  }
}
