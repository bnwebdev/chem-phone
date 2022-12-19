import { AnalysisStatus } from '@app/methods/types';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
class AllAnalysesFiltersDto {
  @Field({ nullable: true })
  methodId?: number;

  @Field(() => Number, { nullable: true })
  status?: AnalysisStatus;
}

@InputType()
export class AllAnalysesDto {
  @Field(() => AllAnalysesFiltersDto, { nullable: true })
  filters?: AllAnalysesFiltersDto;
}
