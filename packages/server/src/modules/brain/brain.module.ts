import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrainEntity } from './brain.entity';
import { BrainService } from './brain.service';

@Module({
  imports: [TypeOrmModule.forFeature([BrainEntity])],
  providers: [BrainService],
  exports: [TypeOrmModule, BrainService],
})
export class BrainModule {}
