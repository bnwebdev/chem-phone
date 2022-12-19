import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ComputeAnalysisDataDto {
  @Field()
  id: number;
}
