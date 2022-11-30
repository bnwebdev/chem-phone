import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UnitValueObject {
  @Field(() => String)
  unit: string;

  @Field(() => Number)
  value: number;
}
