import { HttpStatus } from '@nestjs/common';
import { ApiResponseOptions } from '@nestjs/swagger';
import { DEFAULT_RESPONSE } from 'src/common/swagger-docs';
import { GetUserResponse } from './response/get-user.response';
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

export const GET_ALL_USERS_RESPONSE: ApiResponseOptions[] = [
  ...DEFAULT_RESPONSE,
  {
    type: [GetUserResponse],
    status: HttpStatus.OK,
    description: 'All users fetched successfully',
  },
];

export const GET_USER_RESPONSE: ApiResponseOptions[] = [
  ...DEFAULT_RESPONSE,
  {
    type: GetUserResponse,
    status: HttpStatus.OK,
    description: 'User fetched successfully',
  },
];

export const UPDATE_USER_RESPONSE: ApiResponseOptions[] = [
  ...DEFAULT_RESPONSE,
  {
    type: GetUserResponse,
    status: HttpStatus.OK,
    description: 'User updated successfully',
  },
];

export const DELETE_USER_RESPONSE: ApiResponseOptions[] = [
  ...DEFAULT_RESPONSE,
  {
    type: GetUserResponse,
    status: HttpStatus.OK,
    description: 'User deleted successfully',
  },
];
