import { UserService } from './../user.service';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const accessToken = request.headers['authorization']?.split(' ')[1];

      if (!accessToken)
        throw new UnauthorizedException('Access token not found');

      const { userId } = this.jwtService.verify(accessToken);
      const user = await this.userService.findById(userId as string);
      const payload = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  handleRequest(err, user, info) {
    if (err || !user) throw err || new UnauthorizedException(info);

    return user;
  }
}
