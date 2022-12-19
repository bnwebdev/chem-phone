import { MethodStatus } from '@app/methods/types';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
class AllMethodsFiltersDto {
  @Field(() => Number, { nullable: true })
  status?: MethodStatus;
}

@InputType()
export class AllMethodsDto {
  @Field(() => AllMethodsFiltersDto, { nullable: true })
  filters?: AllMethodsFiltersDto;
}
