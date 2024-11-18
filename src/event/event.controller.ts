import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from 'src/user/decorators/user.decorator';
import { UserPaylodad } from 'src/user/user-payload';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventService } from './event.service';
import { RsvpDto } from './dto/Rsvp.dto';
import { JwtAuth } from 'src/user/decorators/jwt-auth.decorator';
import { ApiTags } from '@nestjs/swagger';
import { RoleEnum } from 'src/user/role.enum';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // @JwtAuth([RoleEnum.USER])
  @Post()
  create(@Body() createEventDto: CreateEventDto, @User() user: UserPaylodad) {
    return this.eventService.create(
      'c10cdb18-b159-4250-a6e1-89e7f7e17a24',
      createEventDto,
    );
    // return this.eventService.create(user.userId.toString(), createEventDto);
  }

  @JwtAuth([RoleEnum.USER])
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }
  // @JwtAuth([RoleEnum.ADMIN])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.delete(id);
  }
  // @JwtAuth([RoleEnum.USER])
  @Post(':id/rsvp')
  rsvpToEvent(
    @Param('id') eventId: string,
    @User() user: UserPaylodad,
    @Body() rsvpDto: RsvpDto,
  ) {
    return this.eventService.rsvpToEvent(
      // user.userId.toString(),
      'c10cdb18-b159-4250-a6e1-89e7f7e17a24',
      eventId,
      rsvpDto,
    );
  }
}
