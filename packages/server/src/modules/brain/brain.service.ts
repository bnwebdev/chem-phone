import { Injectable } from '@nestjs/common';
import * as brain from 'brain.js';

import { MethodEntity } from '../method/method.entity';
import { BrainEntity } from './brain.entity';
import { InputType, OutputType } from './brain.types';
@Injectable()
export class BrainService {
  normalizeColor(color: InputType): InputType {
    const [r, g, b, a] = color;

    return [...[r, g, b].map((c) => c / 255), a] as InputType;
  }
  async createBrain(method: MethodEntity): Promise<number> {
    const { data } = method;

    if (!data) {
      throw new Error(`Method data isn't provided`);
    }

    const net = new brain.NeuralNetwork<InputType, OutputType>();

    await net.trainAsync(
      data.curve.map(({ color, concentration }) => ({
        input: this.normalizeColor(color),
        output: { [concentration]: 1 },
      })),
    );

    const results = await BrainEntity.insert({
      methodId: method.id,
      brainJson: net.toJSON(),
    });

    return results.identifiers[0].id;
  }
}
