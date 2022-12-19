import { Injectable } from '@nestjs/common';
import * as brain from 'brain.js';

import { MethodEntity } from '../method/method.entity';
import { BrainEntity } from './brain.entity';
import { InputType, OutputType } from './brain.types';

@Injectable()
export class BrainService {
  async createBrain(method: MethodEntity): Promise<number> {
    const { data } = method;

    if (!data) {
      throw new Error(`Method data isn't provided`);
    }

    const net = new brain.NeuralNetwork<InputType, OutputType>({
      hiddenLayers: [10, 10],
    });

    await net.trainAsync(
      data.curve.map(({ color, concentration }) => ({
        input: color,
        output: { concentration },
      })),
    );

    const results = await BrainEntity.insert({
      methodId: method.id,
      brainJson: net.toJSON(),
    });

    return results.identifiers[0].id;
  }
}
