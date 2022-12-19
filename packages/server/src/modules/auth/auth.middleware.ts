import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from '../user/user.entity';

import { AUTH_TOKEN_NAME } from './auth.constants';
import { AuthService } from './auth.service';
import { Payload } from './auth.types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private config: ConfigService,
    private authService: AuthService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  async use(
    req: Request & { user?: UserEntity },
    res: Response,
    next: () => void,
  ) {
    const authToken = req.cookies[AUTH_TOKEN_NAME] || '';
    try {
      const {
        user: { id },
      } = jwt.verify(
        authToken,
        this.config.get<string>('AUTH_SECRET'),
      ) as Payload;

      req.user = await UserEntity.findOneByOrFail({ id });
    } catch (err) {
      if (authToken) {
        const refreshToken = await this.cache.get<string>(authToken);
        const candidate = this.authService.updateAuthToken(refreshToken);

        if (candidate) {
          const { authToken: newAuthToken, payload } = candidate;

          await this.cache.del(authToken);
          await this.cache.set(newAuthToken, refreshToken, 30 * 24 * 60 * 60); // ttl in seconds
          res.cookie(AUTH_TOKEN_NAME, authToken, { httpOnly: true });
          req.user = await UserEntity.findOneBy({ id: payload.user.id });

          return next();
        }
      }

      req.user = null;
    }

    next();
  }
}
