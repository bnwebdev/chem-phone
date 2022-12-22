import { MethodData } from '@app/methods/types';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType('PointInput')
@ObjectType()
export class PointObject {
  @Field()
  concentration: number;

  @Field(() => [Number])
  color: [number, number, number, number];
}

@InputType('MethodDataInput')
@ObjectType()
export class MethodDataObject implements MethodData {
  @Field(() => [PointObject])
  curve: PointObject[];

  @Field({ nullable: true })
  concentrationUnit: string;

  @Field({ nullable: true })
  colorUnit: string;
}
