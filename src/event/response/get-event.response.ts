import { ApiProperty } from '@nestjs/swagger';

export class GetEventResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  dateTime: Date;

  @ApiProperty()
  location: string;

  @ApiProperty()
  maxCapacity?: number;

  @ApiProperty()
  creatorId: string;
}
