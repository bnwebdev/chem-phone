import { AnalysisStatus } from '@app/methods/types';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CommonEntity } from '../common/common.entity';
import { MethodEntity } from '../method/method.entity';
import { UserEntity } from '../user/user.entity';
import { AnalysisData } from './graphql/analysis-data';

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

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  details?: string;

  @Field()
  @Column('int4', { name: 'method_id' })
  methodId: number;

  @Field()
  @Column('int4', { name: 'user_id' })
  userId: number;

  @Field(() => [AnalysisData])
  @Column('json', { default: [] })
  data: AnalysisData[];

  @ManyToOne(() => UserEntity, (user) => user.analyses)
  user: UserEntity;

  @ManyToOne(() => MethodEntity, (method) => method.analyses)
  method: MethodEntity;

  @Field({ name: 'createdAt' })
  protected get crAt(): Date {
    return this.createdAt;
  }

  @Field({ name: 'updatedAt' })
  protected get updAt(): Date {
    return this.updatedAt;
  }
}
