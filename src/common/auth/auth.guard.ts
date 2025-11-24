import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    // return true;

    const requset: Request = context.switchToHttp().getRequest();

    const token = requset.headers['authorization']?.split(' ')[1];
    if (!token) throw new UnauthorizedException('Token Not Provided!');

    try {
      const userData = this.jwtService.verify(token);

      requset['user'] = userData;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid Token Or Expired!');
    }
  }
}
