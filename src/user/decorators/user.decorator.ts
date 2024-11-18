import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPaylodad } from '../user-payload';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserPaylodad;
  },
);
