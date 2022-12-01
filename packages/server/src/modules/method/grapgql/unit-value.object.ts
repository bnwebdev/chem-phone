import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType('UnitValueInput')
@ObjectType()
export class UnitValueObject {
  @Field(() => String)
  unit: string;

  @Field(() => Number)
  value: number;
}
