import { GetEventsDto } from './dto/get-events.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/common/services/prisma.service';
import { UserPaylodad } from 'src/user/user-payload';
import { RsvpDto } from './dto/Rsvp.dto';
import { NotFoundError } from 'rxjs';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(getEventsDto: GetEventsDto) {
    const { currentPage = 0, sizePerPage = 10 } = getEventsDto;

    const isPagination = currentPage !== undefined && sizePerPage !== undefined;
    const take = isPagination ? sizePerPage : undefined;
    const skip = isPagination ? (currentPage || 0) * sizePerPage : undefined;

    const [events, totalItems] = await this.prismaService.$transaction(
      async (tx) => {
        const events = await tx.event.findMany({
          take,
          skip,
        });
        let count;
        if (isPagination)
          count = await tx.event.aggregate({
            _count: {
              _all: true,
            },
          });
        return [events, count];
      },
    );

    return { data: events, totalItems: totalItems?._count?._all };
  }

  async create(userId: string, createEventDto: CreateEventDto) {
    return this.prismaService.event.create({
      data: {
        ...createEventDto,
        creatorId: userId,
      },
    });
  }

  async update(eventId: string, updateEventDto: UpdateEventDto) {
    return this.prismaService.event.update({
      where: { id: eventId },
      data: updateEventDto,
    });
  }

  async delete(eventId: string) {
    try {
      const transaction = await this.prismaService.$transaction(async (tx) => {
        await tx.rSVP.deleteMany({
          where: { eventId: eventId },
        });

        await tx.event.delete({
          where: { id: eventId },
        });
      });

      return transaction;
    } catch (error) {
      if (error.code === 'P2025')
        throw new NotFoundException('Event not found');
      throw new BadRequestException('Failed to delete event');
    }
  }
  async findOne(eventId: string) {
    return this.prismaService.event.findUnique({
      where: { id: eventId },
      include: {
        rsvps: true,
        createdBy: true,
      },
    });
  }

  async rsvpToEvent(userId: string, eventId: string, rsvpDto: RsvpDto) {
    try {
      return await this.prismaService.$transaction(
        async (tx) => {
          const event = await tx.event.findUnique({
            where: { id: eventId },
            select: {
              id: true,
              maxCapacity: true,
              dateTime: true,
              rsvps: {
                select: {
                  userId: true,
                },
              },
            },
          });

          if (!event) throw new NotFoundException('Event not found');

          if (event.dateTime < new Date())
            throw new BadRequestException('Cannot RSVP to past events');

          if (event.rsvps.some((rsvp) => rsvp.userId === userId))
            throw new ConflictException('RSVP already exists');

          if (rsvpDto.status === 'ATTENDING')
            if (event.rsvps.length >= event.maxCapacity) {
              throw new ConflictException('Event has reached maximum capacity');
            }

          const rsvp = await tx.rSVP.create({
            data: {
              status: rsvpDto.status,
              event: {
                connect: {
                  id: eventId,
                },
              },
              user: {
                connect: {
                  id: userId,
                },
              },
            },
          });

          return rsvp;
        },
        {
          isolationLevel: 'Serializable',
          maxWait: 5000,
          timeout: 10000,
        },
      );
    } catch (error) {
      if (error.code === 'P2002')
        throw new ConflictException('RSVP already exists');

      throw new BadRequestException('Failed to RSVP to event');
    }
  }
}
