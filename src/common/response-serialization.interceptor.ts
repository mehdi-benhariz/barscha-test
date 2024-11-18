import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable, map } from 'rxjs';

export function Serialize(dto: any) {
  return UseInterceptors(new ResponseSerializeInterceptor(dto));
}
export class ResponseSerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        const instance = plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
        return instance;
      }),
    );
  }
}
