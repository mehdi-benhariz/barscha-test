import { Role } from '@prisma/client';

export class UserPaylodad {
  userId: number;
  email: string;
  role: Role;
}
