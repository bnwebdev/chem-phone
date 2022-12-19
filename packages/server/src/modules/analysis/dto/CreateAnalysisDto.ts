import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAnalysisDto {
  @Field()
  name: string;

  @Field()
  methodId: number;

  @Field({ nullable: true })
  details?: string;
}
