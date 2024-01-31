import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class ExampleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Example of middleware');
    //console.log(req.headers.authorization);
    const { authorization } = req.headers as unknown as IncomingHttpHeaders;
    if (!authorization)
      throw new HttpException('No authorize Token', HttpStatus.FORBIDDEN);
    if (authorization === 'abcd') {
      console.log('done');
      next();
    } else throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);
  }
}
