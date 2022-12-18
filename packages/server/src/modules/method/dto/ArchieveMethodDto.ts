import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class ArchieveMethodDto {
  @Field()
  @IsNumber()
  id: number;
}
