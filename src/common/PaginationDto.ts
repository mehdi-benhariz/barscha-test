import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from '@nestjs/class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class PaginationDto {
  @Min(0)
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({ required: false })
  sizePerPage?: number;

  @Min(0)
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @ApiProperty({ required: false })
  currentPage?: number;
}
