import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { CommonModule } from './modules/common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

import { UserEntity } from './modules/user/user.entity';
import { AnalysisModule } from './modules/analysis/analysis.module';
import { MethodModule } from './modules/method/method.module';

import configuration from './configuration';
import { AnalysisEntity } from './modules/analysis/analysis.entity';
import { MethodEntity } from './modules/method/method.entity';
import { BrainModule } from './modules/brain/brain.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.name'),
        synchronize: true,
        entities: [UserEntity, AnalysisEntity, MethodEntity, BrainModule],
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req, res }) => ({ req, res }),
      cors: {
        credential: true,
        origin: 'http://localhost:3000',
      },
    }),
    AuthModule,
    UserModule,
    CommonModule,
    AnalysisModule,
    MethodModule,
    BrainModule,
  ],
})
export class AppModule {}
