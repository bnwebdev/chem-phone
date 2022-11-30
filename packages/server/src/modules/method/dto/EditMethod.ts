import { Field, InputType } from '@nestjs/graphql';
import { MethodDataObject } from '../grapgql/method-data.object';
import { IsNumber } from 'class-validator';

@InputType()
export class EditMethodDto {
  @Field(() => MethodDataObject)
  data: MethodDataObject;

  @Field()
  @IsNumber()
  id: number;
}
