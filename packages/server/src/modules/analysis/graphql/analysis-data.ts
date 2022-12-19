import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('AnalysisDataDto')
export class AnalysisData {
  @Field({ nullable: true })
  raw?: string;

  @Field(() => [Number])
  color: [number, number, number, number];

  @Field({ nullable: true })
  result?: number;

  @Field({ nullable: true })
  resultUnit?: string;
}
