import { Injectable, NestMiddleware } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Logging', dayjs().format('YYYY-MM-DD HH:mm:ss'));
    //TODO Need to find more implementation for middleware
    next();
  }
}
