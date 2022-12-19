import { Field, InputType } from '@nestjs/graphql';

@InputType()
class AllAnalysesFiltersDto {
  @Field({ nullable: true })
  methodId: number;
}

@InputType()
export class AllAnalysesDto {
  @Field(() => AllAnalysesFiltersDto, { nullable: true })
  filters?: AllAnalysesFiltersDto;
}
