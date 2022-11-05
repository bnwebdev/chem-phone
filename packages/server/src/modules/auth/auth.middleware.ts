import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from '../user/user.entity';

import { AUTH_TOKEN_NAME } from './auth.constants';
import { Payload } from './auth.types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private config: ConfigService) {}

  async use(
    req: Request & { user?: UserEntity },
    _res: unknown,
    next: () => void,
  ) {
    try {
      const token = req.cookies[AUTH_TOKEN_NAME] || '';

      const {
        user: { id },
      } = jwt.verify(token, this.config.get<string>('AUTH_SECRET')) as Payload;

      req.user = await UserEntity.findOneByOrFail({ id });
    } catch {
      req.user = null;
    }

    next();
  }
}
