import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrainModule } from '../brain/brain.module';
import { AnalysisEntity } from './analysis.entity';
import { AnalysisResolver } from './analysis.graphql';

@Module({
  imports: [TypeOrmModule.forFeature([AnalysisEntity]), BrainModule],
  providers: [AnalysisResolver],
  exports: [TypeOrmModule],
})
export class AnalysisModule {}
