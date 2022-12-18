import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AnalysisEntity } from '../analysis/analysis.entity';
import { CommonEntity } from '../common/common.entity';
import { MethodEntity } from '../method/method.entity';

@Entity('user')
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  username: string;

  @Column('varchar')
  password: string;

  @OneToMany(() => AnalysisEntity, (analysis) => analysis.user)
  analyses: AnalysisEntity[];

  @OneToMany(() => MethodEntity, (method) => method.user)
  methods: MethodEntity[];
}
