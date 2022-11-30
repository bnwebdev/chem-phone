import { Field, InputType } from '@nestjs/graphql';
import { MethodType } from '@app/methods';

@InputType()
export class CreateMethodDto {
  @Field(() => Number)
  type: MethodType;
}
