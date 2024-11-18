import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  mixin,
} from '@nestjs/common';
import { RoleEnum } from '../role.enum';

const getUserRole = (user) => user.role;
export const RoleGuard = (roles?: RoleEnum[]) => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      if (roles) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!roles.some((role) => getUserRole(user).includes(role)))
          throw new ForbiddenException();
      }

      return true;
    }
  }

  const guard = mixin(RoleGuardMixin);
  return guard;
};
