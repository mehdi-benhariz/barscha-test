import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class RsvpDto {
  @ApiProperty({
    description: 'Status',
    example: 'ATTENDING',
    enum: ['ATTENDING', 'MAYBE', 'NOT_ATTENDING'],
    required: true,
  })
  @IsString()
  @Transform(({ value }) => $Enums.RsvpStatus[value.toUpperCase()] || value, {
    toClassOnly: true,
  })
  status: $Enums.RsvpStatus;
}
