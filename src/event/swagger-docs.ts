import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import { DEFAULT_RESPONSE } from 'src/common/swagger-docs';
import { GetEventResponse } from './response/get-event.response';
import { PaginationEvents } from 'src/common/Paggination-data.response';

export const CREATE_EVENT: ApiResponseOptions[] = [
  ...DEFAULT_RESPONSE,
  {
    type: GetEventResponse,
    status: HttpStatus.OK,
    description: 'Event created successfully',
  },
];
export const GET_EVENT: ApiResponseOptions[] = [
  ...DEFAULT_RESPONSE,
  {
    type: GetEventResponse,
    status: HttpStatus.OK,
    description: 'Event retrieved successfully',
  },
];
export const UPDATE_EVENT: ApiResponseOptions[] = [
  ...DEFAULT_RESPONSE,
  {
    type: GetEventResponse,
    status: HttpStatus.OK,
    description: 'Event updated successfully',
  },
];
export const DELETE_EVENT: ApiResponseOptions[] = [
  ...DEFAULT_RESPONSE,
  {
    status: HttpStatus.OK,
    description: 'Event deleted successfully',
  },
];
export const RSVP_EVENT: ApiResponseOptions[] = [
  ...DEFAULT_RESPONSE,
  {
    status: HttpStatus.OK,
    description: 'RSVP to event successful',
  },
];
export const GET_ALL_EVENTS: ApiResponseOptions[] = [
  ...DEFAULT_RESPONSE,
  {
    type: PaginationEvents,
    status: HttpStatus.OK,
    description: 'All events retrieved successfully',
  },
];
