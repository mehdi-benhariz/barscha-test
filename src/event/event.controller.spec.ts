import { Test, TestingModule } from '@nestjs/testing';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { PrismaService } from 'src/common/services/prisma.service';
import { UserService } from 'src/user/user.service';

describe('EventController', () => {
  let controller: EventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventController],
      providers: [EventService, PrismaService, UserService],
    }).compile();

    controller = module.get<EventController>(EventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
