import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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
import * as docs from './swagger-docs';
import { ResponseDoc } from 'src/common/response-docs.decorator';
import { GetEventsDto } from './dto/get-events.dto';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @JwtAuth([RoleEnum.USER])
  @Post()
  @ResponseDoc(docs.CREATE_EVENT)
  create(@Body() createEventDto: CreateEventDto, @User() user: UserPaylodad) {
    return this.eventService.create(
      // 'c10cdb18-b159-4250-a6e1-89e7f7e17a24',
      user.userId.toString(),
      createEventDto,
    );
  }

  // @JwtAuth([RoleEnum.USER])
  @Get()
  @ResponseDoc(docs.GET_ALL_EVENTS)
  findAll(@Query() getEventsDto: GetEventsDto) {
    return this.eventService.findAll(getEventsDto);
  }

  @Get(':id')
  @ResponseDoc(docs.GET_EVENT)
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }
  @JwtAuth([RoleEnum.ADMIN])
  @Patch(':id')
  @ResponseDoc(docs.UPDATE_EVENT)
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @JwtAuth([RoleEnum.ADMIN])
  @Delete(':id')
  @ResponseDoc(docs.DELETE_EVENT)
  remove(@Param('id') id: string) {
    return this.eventService.delete(id);
  }
  @JwtAuth([RoleEnum.USER])
  @Post(':id/rsvp')
  @ResponseDoc(docs.RSVP_EVENT)
  rsvpToEvent(
    @Param('id') eventId: string,
    @User() user: UserPaylodad,
    @Body() rsvpDto: RsvpDto,
  ) {
    return this.eventService.rsvpToEvent(
      user.userId.toString(),
      // 'c10cdb18-b159-4250-a6e1-89e7f7e17a24',
      eventId,
      rsvpDto,
    );
  }
}
