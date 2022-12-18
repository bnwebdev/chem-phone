import { Field, InputType } from '@nestjs/graphql';
import { MethodType } from '@app/methods';

@InputType()
export class CreateMethodDto {
  @Field(() => Number)
  type: MethodType;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;
}
