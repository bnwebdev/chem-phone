import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { MethodType, MethodData, MethodStatus } from '@app/methods';

import { CommonEntity } from '../common/common.entity';
import { UserEntity } from '../user/user.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { MethodDataObject } from './grapgql/method-data.object';

@Entity('method')
@ObjectType('Method')
export class MethodEntity extends CommonEntity {
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field()
  @Column('int4', { name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.methods)
  user: UserEntity;

  @Field(() => Number)
  @Column('int')
  type: MethodType;

  @Field(() => MethodDataObject, { nullable: true })
  @Column('json', { nullable: true })
  data: MethodData;

  @Field(() => Number)
  @Column('int')
  status: MethodStatus;
}
