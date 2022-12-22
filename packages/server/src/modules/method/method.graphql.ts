import { MethodStatus } from '@app/methods';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { In, Not } from 'typeorm';

import { AppGraphhQLContext } from '../../app.types';
import { BrainService } from '../brain/brain.service';
import { UserEntity } from '../user/user.entity';
import {
  AllMethodsDto,
  ArchieveMethodDto,
  CompleteMethodDto,
  CreateMethodDto,
  EditMethodDto,
  MethodDto,
} from './dto';
import { MethodEntity } from './method.entity';

@Resolver()
export class MethodResolver {
  constructor(private brainService: BrainService) {}

  @Query(() => [MethodEntity])
  async allMethods(
    @Args('input') { filters }: AllMethodsDto,
    @Context() { req }: AppGraphhQLContext<{ user: UserEntity }>,
  ) {
    const whereClause =
      typeof filters?.status === 'number' ? { status: filters.status } : {};

    return MethodEntity.findBy({ userId: req.user.id, ...whereClause });
  }

  @Query(() => MethodEntity)
  async method(
    @Args('input') { id }: MethodDto,
    @Context() { req }: AppGraphhQLContext<{ user: UserEntity }>,
  ) {
    return MethodEntity.findOneBy({ userId: req.user.id, id });
  }

  @Mutation(() => MethodEntity)
  async createMethod(
    @Args('input') input: CreateMethodDto,
    @Context() { req }: AppGraphhQLContext<{ user: UserEntity }>,
  ) {
    const { type, name, description } = input;
    const method = new MethodEntity();

    method.type = type;
    method.name = name;
    method.description = description;

    method.status = MethodStatus.DRAFT;
    method.userId = req.user.id;

    return method.save();
  }

  @Mutation(() => MethodEntity)
  async editMethod(
    @Args('input') { data, id }: EditMethodDto,
    @Context() { req }: AppGraphhQLContext<{ user: UserEntity }>,
  ) {
    const method = await MethodEntity.findOneByOrFail({
      userId: req.user.id,
      id,
      status: Not(In([MethodStatus.ARCHIEVED, MethodStatus.COMPLETED])),
    });

    method.data = data;
    method.status = MethodStatus.EDITABLE;

    return method.save();
  }

  @Mutation(() => Boolean)
  async completeMethod(
    @Args('input') { id }: CompleteMethodDto,
    @Context() { req }: AppGraphhQLContext<{ user: UserEntity }>,
  ) {
    let method = await MethodEntity.findOneByOrFail({
      userId: req.user.id,
      id,
      status: MethodStatus.EDITABLE,
    });

    method.status = MethodStatus.COMPLETED;

    method = await method.save();
    await this.brainService.createBrain(method);

    return true;
  }

  @Mutation(() => MethodEntity)
  async archieveMethod(
    @Args('input') { id }: ArchieveMethodDto,
    @Context() { req }: AppGraphhQLContext<{ user: UserEntity }>,
  ) {
    const method = await MethodEntity.findOneByOrFail({
      userId: req.user.id,
      id,
    });

    if ([MethodStatus.DRAFT, MethodStatus.EDITABLE]) {
      return method.remove();
    }

    method.status = MethodStatus.ARCHIEVED;

    return method.save();
  }
}
