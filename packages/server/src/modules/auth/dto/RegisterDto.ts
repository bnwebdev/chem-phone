import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
  @Field()
  @IsString()
  @MinLength(6)
  username: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;

  @Field()
  @IsString()
  @MinLength(6)
  confirm: string;
}
