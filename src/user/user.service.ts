import { LoginUserDto } from './dto/login-user.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/services/prisma.service';
import { RegisterDto } from './dto/register-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { password, ...rest } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existUser = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: rest.email }, { name: rest.name }],
      },
    });
    if (existUser) throw new BadRequestException('User already exists');
    const user = await this.prismaService.user.create({
      data: {
        ...rest,
        password: hashedPassword,
      },
    });
    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) throw new NotFoundException('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new BadRequestException('Invalid password');

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };
    const token = this.jwtService.sign(payload);
    return { token };
  }

  async logout(userId: string) {
    return { message: 'Logged out successfully' };
  }

  async findById(id: string) {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  async delete(id: string) {
    try {
      return await this.prismaService.user.delete({
        where: { id },
      });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException('User not found');
      throw new BadRequestException('Something went wrong');
    }
  }

  async update(id: string, data: any) {
    try {
      return await this.prismaService.user.update({
        where: { id },
        data,
      });
    } catch (error) {
      if (error.code === 'P2025') throw new NotFoundException('User not found');
      throw new BadRequestException('Something went wrong');
    }
  }
}
