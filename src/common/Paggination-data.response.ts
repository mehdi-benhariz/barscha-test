import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

interface IPaginatedType<T> {
  data: T[];

  totalItems: number | null;
}

export function PaginationDataResponse<T>(ResourceClass) {
  class Pagination implements IPaginatedType<T> {
    @Expose()
    @Type(() => ResourceClass)
    @ApiProperty({ type: [ResourceClass] })
    data: T[];

    @Expose()
    @ApiProperty()
    totalItems: number;
  }
  return Pagination;
}
