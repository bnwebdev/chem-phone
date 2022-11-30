import { IsNumber } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class MethodDto {
  @Field()
  @IsNumber()
  id: number;
}
