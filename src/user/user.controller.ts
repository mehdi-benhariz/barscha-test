import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseDoc } from 'src/common/response-docs.decorator';
import { JwtAuth } from './decorators/jwt-auth.decorator';
import { User } from './decorators/user.decorator';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterDto } from './dto/register-dto';
import * as docs from './swagger-docs';
import { UserPaylodad } from './user-payload';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
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

  // Manage users - Client

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
