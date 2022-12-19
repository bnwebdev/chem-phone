import { Field, InputType } from '@nestjs/graphql';
import { AnalysisData } from '../graphql/analysis-data';

@InputType()
export class UpdateAnalysisDataDto {
  @Field()
  id: number;

  @Field(() => [AnalysisData])
  data: AnalysisData[];
}
