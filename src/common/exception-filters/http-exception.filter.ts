import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
      ),
      transports: [
        new winston.transports.DailyRotateFile({
          filename: 'logs/%DATE%/application.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d'
        }),
        new winston.transports.Console()
      ]
    });
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    let returnedMessage = '';
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const exceptionRes =
      exception instanceof HttpException && exception.getResponse();
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = (exceptionRes as any).message;

    if (Array.isArray(message)) returnedMessage = message[0];
    else returnedMessage = message;
    this.logger.error(
      `${new Date().toISOString()} - request method: ${request.method
      } request url${request.url} error:${returnedMessage}`,
    );

    return response.status(statusCode).json({
      statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: returnedMessage,
    });
  }
}
