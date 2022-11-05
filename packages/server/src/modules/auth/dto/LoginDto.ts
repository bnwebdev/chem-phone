import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class LoginDto {
  @Field()
  @IsString()
  @MinLength(6)
  username: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;
}
