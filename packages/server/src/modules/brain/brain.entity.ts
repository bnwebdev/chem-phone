import * as brain from 'brain.js';
import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { MethodEntity } from '../method/method.entity';
import { InputType, OutputType } from './brain.types';

@Entity('brain')
export class BrainEntity extends CommonEntity {
  @PrimaryColumn('int4', { name: 'method_id' })
  methodId: number;

  @Column('json', { name: 'brain_text' })
  public brainJson: ReturnType<
    brain.NeuralNetwork<InputType, OutputType>['toJSON']
  >;

  public net: brain.NeuralNetwork<InputType, OutputType>;

  @AfterLoad()
  toBrain() {
    this.net = new brain.NeuralNetwork<InputType, OutputType>().fromJSON(
      this.brainJson,
    );
  }

  @OneToOne(() => MethodEntity, (method) => method.brain)
  @JoinColumn({ name: 'method_id' })
  method: MethodEntity;
}
