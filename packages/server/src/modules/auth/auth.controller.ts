import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserEntity } from '../user/user.entity';
import { AUTH_TOKEN_NAME } from './auth.constants';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { username, password }: LoginDto,
    @Res({ passthrough: true }) res,
  ) {
    const user = await this.authService.login(username, password);
    const { authToken } = this.authService.generateTokens(user);

    res.cookie(AUTH_TOKEN_NAME, authToken, { httpOnly: true });

    return true;
  }

  @Post('register')
  async register(@Body() { username, password, confirm }: RegisterDto) {
    if (password !== confirm) {
      throw new Error(`Password isn't equal to confirm`);
    }

    await this.authService.register(username, password);

    return true;
  }

  @Get('identity')
  identity(@Req() req: Request & { user: UserEntity }) {
    if (!req.user) {
      return null;
    }

    return {
      username: req.user.username,
      createdAt: req.user.createdAt,
      updatedAt: req.user.updatedAt,
    };
  }
}
