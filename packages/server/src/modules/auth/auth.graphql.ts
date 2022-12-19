import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppGraphhQLContext } from 'src/app.types';
import { UserEntity } from '../user/user.entity';
import { AUTH_TOKEN_NAME } from './auth.constants';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';
import { IdentityObject } from './graphql/identity.object';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  @Query(() => Boolean)
  async login(
    @Args('input') { username, password }: LoginDto,
    @Context() context: AppGraphhQLContext,
  ) {
    const user = await this.authService.login(username, password);
    const { authToken, refreshToken } = this.authService.generateTokens(user);

    context.res.cookie(AUTH_TOKEN_NAME, authToken, { httpOnly: true });
    await this.cache.set(authToken, refreshToken, 30 * 24 * 60 * 60); // ttl in seconds

    return true;
  }

  @Mutation(() => Boolean)
  async register(@Args('input') { username, password, confirm }: RegisterDto) {
    if (password !== confirm) {
      throw new Error(`Password isn't equal to confirm`);
    }

    await this.authService.register(username, password);

    return true;
  }

  @Query(() => Boolean)
  async logout(@Context() context: AppGraphhQLContext) {
    const { req } = context;
    const authToken = req.cookies[AUTH_TOKEN_NAME] || '';

    context.res.cookie(AUTH_TOKEN_NAME, '', { httpOnly: true });
    await this.cache.del(authToken);

    return true;
  }

  @Query(() => IdentityObject, { nullable: true })
  identity(@Context() { req }: AppGraphhQLContext<{ user: UserEntity }>) {
    if (!req.user) {
      return null;
    }

    return {
      username: req.user.username,
      id: req.user.id,
    };
  }
}
