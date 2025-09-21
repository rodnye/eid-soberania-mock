import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { OAuthService } from '../oauth/oauth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly oauthService: OAuthService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException('No token provided', HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];
    const cid = this.oauthService.verifyAccessToken(token);

    if (!cid) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    req['user_cid'] = cid;
    next();
  }
}
