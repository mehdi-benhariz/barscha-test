import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register-dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './decorators/user.decorator';
import { UserPaylodad } from './user-payload';
import { ApiTags } from '@nestjs/swagger';
import * as docs from './swagger-docs';
import { ResponseDoc } from 'src/common/response-docs.decorator';
import { JwtAuth } from './decorators/jwt-auth.decorator';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ResponseDoc(docs.REGISTER_RESPONSE)
  create(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }
  @Post('login')
  @ResponseDoc(docs.LOGIN_RESPONSE)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }

  @JwtAuth()
  @Post('logout')
  logout(@User() user: UserPaylodad) {
    return this.userService.logout(user.userId.toString());
  }

  // Potential endpoint to CRUD users
}
