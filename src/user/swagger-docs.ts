import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import { DEFAULT_RESPONSE } from 'src/common/swagger-docs';
import { PaginationEvents } from 'src/common/Paggination-data.response';
import { TokenResponse } from './response/token.response';

export const LOGIN_RESPONSE: ApiResponseOptions[] = [
  ...DEFAULT_RESPONSE,
  {
    type: TokenResponse,
    status: HttpStatus.OK,
    description: 'User logged in successfully',
  },
];

export const REGISTER_RESPONSE: ApiResponseOptions[] = [
  ...DEFAULT_RESPONSE,
  {
    type: TokenResponse,
    status: HttpStatus.CREATED,
    description: 'User registered successfully',
  },
];
