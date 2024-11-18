import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaService } from 'src/common/services/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaService, UserService],
})
export class EventModule {}
