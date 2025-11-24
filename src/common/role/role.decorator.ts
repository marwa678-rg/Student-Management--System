import { SetMetadata } from '@nestjs/common';
import { UserRole } from './role.enum';

export const ROLE_KEY = 'roles';

export const Role = (...roles: UserRole[]) => SetMetadata(ROLE_KEY, roles);
