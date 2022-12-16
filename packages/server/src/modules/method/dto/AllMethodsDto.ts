import { MethodStatus } from '@app/methods/types';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
class Filters {
  @Field(() => Number, { nullable: true })
  status?: MethodStatus;
}

@InputType()
export class AllMethodsDto {
  @Field(() => Filters, { nullable: true })
  filters?: Filters;
}
