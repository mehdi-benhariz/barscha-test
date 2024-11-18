import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDate,
  IsInt,
  IsDateString,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ description: 'Title of the event' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Description of the event' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Date and time of the event',
    example: '2025-04-01T00:00:00.000Z',
  })
  @IsDateString()
  dateTime: Date;

  @ApiProperty({ description: 'Location of the event' })
  @IsString()
  location: string;

  @ApiPropertyOptional({ description: 'Maximum capacity of the event' })
  @IsOptional()
  @IsInt()
  maxCapacity?: number;
}
