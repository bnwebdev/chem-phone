import { Field, InputType } from '@nestjs/graphql';

@InputType()
class Filters {
  @Field({ nullable: true })
  methodId: number;
}

@InputType()
export class AllAnalysesDto {
  @Field(() => Filters, { nullable: true })
  filters?: Filters;
}
