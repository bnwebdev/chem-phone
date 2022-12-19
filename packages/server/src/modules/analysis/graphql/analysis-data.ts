import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('AnalysisDataDto')
export class AnalysisData {
  @Field({ nullable: true })
  raw?: string;

  @Field(() => [Number])
  color: [number, number, number, number];

  @Field({ nullable: true })
  result?: string;

  @Field({ nullable: true })
  resultUnit?: string;
}
