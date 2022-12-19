import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalysisEntity } from './analysis.entity';
import { AnalysisResolver } from './analysis.graphql';

@Module({
  imports: [TypeOrmModule.forFeature([AnalysisEntity])],
  providers: [AnalysisResolver],
  exports: [TypeOrmModule],
})
export class AnalysisModule {}
