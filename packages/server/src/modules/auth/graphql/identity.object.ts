import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IdentityObject {
  @Field()
  username: string;
}
