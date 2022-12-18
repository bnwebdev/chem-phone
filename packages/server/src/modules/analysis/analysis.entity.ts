import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CommonEntity } from '../common/common.entity';
import { UserEntity } from '../user/user.entity';
import { AnalysisStatus } from './analysis.types';

@Entity('analysis')
export class AnalysisEntity extends CommonEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { default: AnalysisStatus.DRAFT })
  status: AnalysisStatus;

  @Column('int4', { name: 'method_id' })
  methodId: number;

  @Column('int4', { name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.analyses)
  user: UserEntity;
}
