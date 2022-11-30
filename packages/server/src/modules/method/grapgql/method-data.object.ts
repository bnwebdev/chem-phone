import { MethodData } from '@app/methods/types';
import { Field, ObjectType } from '@nestjs/graphql';
import { UnitValueObject } from './unit-value.object';

@ObjectType()
export class ColorObject {
  @Field(() => [Number])
  value: [number, number, number, number];

  @Field(() => String)
  unit: 'rgba';
}

@ObjectType()
export class PointObject {
  @Field(() => UnitValueObject)
  concentration: UnitValueObject;

  @Field(() => ColorObject)
  color: ColorObject;
}

@ObjectType()
export class MethodDataObject implements MethodData {
  @Field(() => [PointObject])
  curve: PointObject[];

  @Field()
  id: number;
}
