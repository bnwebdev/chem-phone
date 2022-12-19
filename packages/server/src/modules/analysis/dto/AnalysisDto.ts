import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AnalysisDto {
  @Field()
  id: number;
}
