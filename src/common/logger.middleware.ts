import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl: url, ip } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode, statusMessage } = res;
      const responseTime = Date.now() - start;
      const currentDate = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD
      const logMessage = `${method} ${url} ${statusCode} ${statusMessage} - ${ip} - ${responseTime}ms\n`;
      const logsDirPath = path.join(__dirname, 'logs');
      const logFilePath = path.join(logsDirPath, `${currentDate}-logs.txt`); // Use currentDate in filename

      // Ensure the logs directory exists
      fs.mkdir(logsDirPath, { recursive: true }, (err) => {
        if (err) {
          console.error('Failed to create logs directory:', err);
          return;
        }

        // Append log message to the file
        fs.appendFile(logFilePath, logMessage, (err) => {
          if (err) {
            console.error('Failed to write to log file:', err);
          }
        });
      });
    });

    next();
  }
}