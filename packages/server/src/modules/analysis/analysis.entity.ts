import { AnalysisStatus } from '@app/methods/types';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CommonEntity } from '../common/common.entity';
import { MethodEntity } from '../method/method.entity';
import { UserEntity } from '../user/user.entity';

@Entity('analysis')
@ObjectType('Analysis')
export class AnalysisEntity extends CommonEntity {
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => Number)
  @Column('varchar', { default: AnalysisStatus.DRAFT })
  status: AnalysisStatus;

  @Field()
  @Column('varchar')
  name: string;

  @Field()
  @Column('int4', { name: 'method_id' })
  methodId: number;

  @Field()
  @Column('int4', { name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.analyses)
  user: UserEntity;

  @ManyToOne(() => MethodEntity, (method) => method.analyses)
  method: MethodEntity;
}
