import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../role.enum';

export class GetUserResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: RoleEnum })
  role: RoleEnum;
}
