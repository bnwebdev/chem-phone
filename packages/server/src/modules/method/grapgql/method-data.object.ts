import { MethodData } from '@app/methods/types';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UnitValueObject } from './unit-value.object';

@InputType('ColorInput')
@ObjectType()
export class ColorObject {
  @Field(() => [Number])
  value: [number, number, number, number];

  @Field(() => String)
  unit: 'rgba';
}

@InputType('PointInput')
@ObjectType()
export class PointObject {
  @Field(() => UnitValueObject)
  concentration: UnitValueObject;

  @Field(() => ColorObject)
  color: ColorObject;
}

@InputType('MethodDataInput')
@ObjectType()
export class MethodDataObject implements MethodData {
  @Field(() => [PointObject])
  curve: PointObject[];
}
