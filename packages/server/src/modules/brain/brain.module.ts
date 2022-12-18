import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrainEntity } from './brain.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BrainEntity])],
  exports: [TypeOrmModule],
})
export class BrainModule {}
