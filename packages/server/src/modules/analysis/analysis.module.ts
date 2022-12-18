import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisEntity } from './analysis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnalysisEntity])],
  exports: [TypeOrmModule],
})
export class AnalysisModule {}
