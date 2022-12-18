import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MethodEntity } from './method.entity';
import { MethodResolver } from './method.graphql';

@Module({
  imports: [TypeOrmModule.forFeature([MethodEntity])],
  providers: [MethodResolver],
  exports: [TypeOrmModule],
})
export class MethodModule {}
