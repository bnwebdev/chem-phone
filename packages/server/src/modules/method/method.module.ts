import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MethodEntity } from './method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MethodEntity])],
  exports: [TypeOrmModule],
})
export class MethodModule {}
