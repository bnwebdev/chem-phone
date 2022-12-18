import * as brain from 'brain.js';
import { AfterLoad, Column, OneToOne, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../common/common.entity';
import { MethodEntity } from '../method/method.entity';

type InputType = [number, number, number, number];
type OutputType = { concentration: number };

export class BrainEntity extends CommonEntity {
  @PrimaryColumn('int4', { name: 'method_id' })
  methodId: number;

  @Column('json', { name: 'brain_text' })
  public brainText: ReturnType<
    brain.NeuralNetwork<InputType, OutputType>['toJSON']
  >;

  public net: brain.NeuralNetwork<InputType, OutputType>;

  @AfterLoad()
  toBrain() {
    this.net = new brain.NeuralNetwork<InputType, OutputType>().fromJSON(
      this.brainText,
    );
  }

  @OneToOne(() => MethodEntity, (method) => method.brain)
  method: MethodEntity;
}
