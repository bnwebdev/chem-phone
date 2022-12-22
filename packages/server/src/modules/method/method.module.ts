import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrainModule } from '../brain/brain.module';
import { MethodEntity } from './method.entity';
import { MethodResolver } from './method.graphql';

@Module({
  imports: [TypeOrmModule.forFeature([MethodEntity]), BrainModule],
  providers: [MethodResolver, BrainModule],
  exports: [TypeOrmModule],
})
export class MethodModule {}
