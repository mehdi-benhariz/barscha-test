import { applyDecorators, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role-guard';
import { RoleEnum } from '../role.enum';

export function JwtAuth(roles?: RoleEnum[]) {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse(),
    UseGuards(JwtAuthGuard, RoleGuard(roles)),
    ApiSecurity('lang'),
  );
}
