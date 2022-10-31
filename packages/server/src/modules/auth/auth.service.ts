import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { UserEntity } from '../user/user.entity';
import { Payload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userRepository.findOneByOrFail({ username });
    const isSamePassword = await bcrypt.compare(password, user.password);

    if (!isSamePassword) {
      throw new Error(`Password or username is invalid`);
    }

    return user;
  }

  async register(username: string, password: string) {
    const hash = await bcrypt.hash(password, 12);
    const user = await this.userRepository.findOneBy({ username });

    if (user) {
      throw new Error(`User with this username has already been existed`);
    }

    await this.userRepository.insert({ username, password: hash });
  }

  generateTokens(user: UserEntity) {
    const payload: Payload = { user: { id: user.id } };

    const authToken = jwt.sign(
      payload,
      this.config.get<string>('AUTH_SECRET'),
      { expiresIn: '30m' },
    );

    const refreshToken = jwt.sign(
      payload,
      this.config.get<string>('REFRESH_SECRET'),
      { expiresIn: '30d' },
    );

    return { authToken, refreshToken };
  }
}
